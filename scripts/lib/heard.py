"""Write down every sound a narration contains, fillers and repeats included.

Called by scripts/ingest-recording.mjs after transcribe.py. Whisper hears whole phrases and
writes what the speaker meant: "a, a, a terminal, uh, app" comes out "a terminal app", with
"a" stretched across the stumble. That is right for a transcript and wrong for an edit,
which has to know the stumble is there to cut it out. Two passes find it:

  letters  An acoustic CTC model (wav2vec2 fine-tuned on LibriSpeech, run with onnxruntime
           on the CPU) that has no idea what English is supposed to sound like. It spells
           what it hears every 20ms, so a repeat comes out twice. scripts/lib/voice.mjs
           lines the letters up against Whisper's words; letters Whisper has no word for
           are what an edit removes.
  phrases  Whisper again, on one phrase at a time (the voice between pauses of 100ms or
           more), where there is too little context for it to tidy anything up. An "uh"
           on its own comes out "Uh," and a false start as a lone letter. Those are listed
           as fillers, with their times, because to the letter model an "uh" is just an "a".

    python scripts/lib/heard.py <audio> <heard.json> [--model medium.en] [--device cuda|cpu]

Times are seconds in the input file, like words.json. The letter model is downloaded once
from Hugging Face into the usual cache and pinned to a revision, so a re-run hears the same.
"""

import argparse
import json
import re
import sys
import time

REPO = "Xenova/wav2vec2-base-960h"
FILE = "onnx/model_quantized.onnx"
REVISION = "a19f851b3d42865797e410752b4c570c871e4825"

RATE = 16000
# wav2vec2's feature encoder: a 400-sample receptive field every 320 samples, so frame i
# is centred 200 samples past i * 320.
HOP = 320
CENTRE = 200
# The letter model attends over its whole input, so audio goes in as pieces of at most
# this long, each cut at the quietest moment in its last third.
LONGEST = 20.0

# Phrases: 10ms levels more than PAUSE_BELOW dB under the voice's 90th percentile are a
# pause, and a pause of PHRASE_GAP or longer ends a phrase.
PAUSE_BELOW = 22
PHRASE_GAP = 0.10
PAD = 0.3

FILLER = re.compile(r"^(u+h+|u+m+|u+h+m+|a+h+|e+h+|e+r+m*|h+m+|m+h*m+)$")
# A false start: a lone letter that is not a word ("P" for a "PC" begun twice), or a word
# Whisper marks as broken off.
FRAGMENT = re.compile(r"^([b-hj-z]|[a-z]+-)$")


def levels(audio, numpy):
    window = RATE // 100
    frames = len(audio) // window
    power = (audio[: frames * window].reshape(frames, window) ** 2).mean(axis=1)
    return 10 * numpy.log10(power + 1e-12)


def quiet_cuts(level, numpy):
    """Piece boundaries in samples, each at the lowest 10ms level near the length limit."""
    window = RATE // 100
    cuts = [0]
    longest = int(LONGEST * 100)
    while len(level) - cuts[-1] // window > longest:
        start = cuts[-1] // window
        lo, hi = start + longest * 2 // 3, start + longest
        cuts.append(int(lo + numpy.argmin(level[lo:hi])) * window)
    cuts.append(len(level) * window)
    return cuts


def hear_letters(audio, level, numpy):
    import onnxruntime
    from huggingface_hub import hf_hub_download

    model = hf_hub_download(REPO, FILE, revision=REVISION)
    with open(hf_hub_download(REPO, "vocab.json", revision=REVISION), encoding="utf-8") as handle:
        vocab = json.load(handle)
    letters = {index: token for token, index in vocab.items()}
    blank = vocab["<pad>"]
    session = onnxruntime.InferenceSession(model, providers=["CPUExecutionProvider"])
    feed = session.get_inputs()[0].name

    text, times = [], []
    cuts = quiet_cuts(level, numpy)
    for begin, end in zip(cuts, cuts[1:]):
        piece = audio[begin:end].astype(numpy.float32)
        if len(piece) < RATE // 10:
            continue
        # do_normalize, as the model's feature extractor does.
        piece = (piece - piece.mean()) / numpy.sqrt(piece.var() + 1e-7)
        best = session.run(None, {feed: piece[None, :]})[0][0].argmax(-1)
        previous = blank
        for frame, index in enumerate(best):
            index = int(index)
            if index != previous and index != blank:
                token = letters[index]
                at = round((begin + frame * HOP + CENTRE) / RATE, 2)
                if token == "|":
                    if text and text[-1] != " ":
                        text.append(" ")
                        times.append(at)
                elif len(token) == 1:
                    text.append(token.lower())
                    times.append(at)
            previous = index
        if text and text[-1] != " ":
            text.append(" ")
            times.append(round(end / RATE, 2))
        print(f"  letters {end / RATE / 60:4.1f} of {len(audio) / RATE / 60:.1f} min", file=sys.stderr, flush=True)
    while text and text[-1] == " ":
        text.pop()
        times.pop()
    return "".join(text), times, f"onnxruntime {onnxruntime.__version__}"


def phrase_spans(level, numpy):
    loud = numpy.percentile(level, 90)
    voiced = level > loud - PAUSE_BELOW
    spans = []
    frame = 0
    while frame < len(voiced):
        if not voiced[frame]:
            frame += 1
            continue
        end = frame
        while end < len(voiced) and voiced[end]:
            end += 1
        start, stop = frame / 100, end / 100
        if spans and start - spans[-1][1] < PHRASE_GAP:
            spans[-1][1] = stop
        else:
            spans.append([start, stop])
        frame = end
    return [(a, b) for a, b in spans if b - a >= 0.08]


def hear_phrases(audio, level, numpy, model_name, device):
    import os

    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import transcribe

    model, used = transcribe.load(model_name, device)
    pad = numpy.zeros(int(PAD * RATE), dtype=audio.dtype)
    duration = len(audio) / RATE
    phrases, fillers = [], []
    reported = 0.0
    for start, end in phrase_spans(level, numpy):
        lo = max(0.0, start - 0.05)
        hi = min(duration, end + 0.05)
        chunk = numpy.concatenate([pad, audio[int(lo * RATE) : int(hi * RATE)], pad])
        segments, _ = model.transcribe(
            chunk,
            language="en",
            beam_size=5,
            word_timestamps=True,
            vad_filter=False,
            condition_on_previous_text=False,
        )
        words = []
        for segment in segments:
            if segment.no_speech_prob > 0.6 and segment.avg_logprob < -1:
                continue
            words.extend(segment.words or [])
        shift = lo - PAD
        spoken = []
        for word in words:
            text = word.word.strip()
            a = round(min(hi, max(lo, shift + word.start)), 2)
            b = round(min(hi, max(lo, shift + word.end)), 2)
            spoken.append(text)
            bare = re.sub(r"[^a-z0-9-]", "", text.lower())
            if FILLER.match(bare) or FRAGMENT.match(bare):
                fillers.append({"start": a, "end": b, "text": text})
        phrases.append({"start": round(start, 2), "end": round(end, 2), "text": " ".join(spoken)})
        if end - reported >= 60:
            reported = end
            print(f"  phrases {end / 60:4.1f} of {duration / 60:.1f} min", file=sys.stderr, flush=True)
    return phrases, fillers, used


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("audio")
    parser.add_argument("output")
    parser.add_argument("--model", default="medium.en")
    parser.add_argument("--device", default="cuda", choices=["cuda", "cpu"])
    args = parser.parse_args()

    import numpy
    import faster_whisper
    from faster_whisper import decode_audio

    started = time.time()
    audio = decode_audio(args.audio, sampling_rate=RATE)
    level = levels(audio, numpy)
    text, times, runtime = hear_letters(audio, level, numpy)
    phrases, fillers, device = hear_phrases(audio, level, numpy, args.model, args.device)

    result = {
        "letters": {
            "tool": runtime,
            "model": REPO,
            "file": FILE,
            "revision": REVISION,
            "settings": "greedy CTC, one letter per 20ms frame, pieces cut at the quietest point",
        },
        "phrases": {
            "tool": f"faster-whisper {faster_whisper.__version__}",
            "model": args.model,
            "device": device,
            "settings": f"one phrase at a time, split at pauses of {PHRASE_GAP}s, "
            f"padded with {PAD}s of silence, no prompt, no VAD",
        },
        "source": args.audio.replace("\\", "/"),
        "duration": round(len(audio) / RATE, 2),
        "seconds": round(time.time() - started, 1),
        "text": text,
        "times": times,
        "fillers": fillers,
        "said": phrases,
    }
    with open(args.output, "w", encoding="utf-8", newline="\n") as handle:
        json.dump(result, handle, ensure_ascii=False)
        handle.write("\n")
    print(
        f"  {len(text.split())} sounds, {len(phrases)} phrases, {len(fillers)} fillers in {result['seconds']}s",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
