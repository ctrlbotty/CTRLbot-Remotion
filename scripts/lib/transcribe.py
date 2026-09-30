"""Transcribe a narration track word by word with faster-whisper.

Called by scripts/ingest-recording.mjs, which owns every other ingest step. This file
does one thing: turn an audio file into words.json, the raw record of what was said and
when. It deliberately does no product-name correction; that happens downstream so the
raw words stay true to the recording.

    python scripts/lib/transcribe.py <audio> <words.json> [--model medium.en] [--device auto]

Times are seconds in the input file. Pass the prepared narration track
(public/narration/<slug>/source-normalized.m4a), which shares the recording's time base,
so a narration edit list can be cut straight from these numbers.
"""

import argparse
import json
import sys
import time

# Biases recognition toward the words these recordings actually use. Whisper reads it as
# preceding context, so it nudges spelling without forcing it. Product-name correction
# still happens in ingest-recording.mjs.
VOCABULARY = (
    "CTRLbot, CTRLbot IoT, CTRLbot.AI, CTRLbot.IO, CTRLbot Mirror, CTRLbot Terminator. "
    "Find Devices, Web page, Terminal, presets, switching, encoder, decoder, EUI. "
    "IPMX, AVoIP, RS-232, TCP, Telnet, SSH, Global Caché, iTach, PUSR, Kramer, Matrox, "
    "Hall Research Versa, Android, Windows."
)


def expose_cuda_libraries():
    """Make pip-installed CUDA 12 libraries loadable, if they are installed.

    ctranslate2 needs cuBLAS 12 and cuDNN 9 on the GPU path. The CUDA toolkit is not
    required: `pip install nvidia-cublas-cu12 nvidia-cudnn-cu12==9.*` puts the DLLs in
    site-packages, and this adds them to the search path. Without them the GPU attempt
    fails and ingest-recording.mjs retries on the CPU.
    """
    import os
    import site

    for base in site.getsitepackages() + [site.getusersitepackages()]:
        for package in ("cublas", "cudnn"):
            path = os.path.join(base, "nvidia", package, "bin")
            if os.path.isdir(path):
                os.environ["PATH"] = path + os.pathsep + os.environ.get("PATH", "")
                if hasattr(os, "add_dll_directory"):
                    os.add_dll_directory(path)


def load(model_name, device):
    if device == "cuda":
        expose_cuda_libraries()
    from faster_whisper import WhisperModel

    compute = "float16" if device == "cuda" else "int8"
    return WhisperModel(model_name, device=device, compute_type=compute), f"{device}/{compute}"


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("audio")
    parser.add_argument("output")
    parser.add_argument("--model", default="medium.en")
    parser.add_argument("--device", default="cuda", choices=["cuda", "cpu"])
    args = parser.parse_args()

    import faster_whisper

    started = time.time()
    model, device = load(args.model, args.device)
    segments, info = model.transcribe(
        args.audio,
        language="en",
        beam_size=5,
        vad_filter=True,
        word_timestamps=True,
        condition_on_previous_text=False,
        initial_prompt=VOCABULARY,
    )

    duration = float(info.duration or 0)
    out = []
    reported = 0.0
    for segment in segments:
        out.append(
            {
                "start": round(segment.start, 2),
                "end": round(segment.end, 2),
                "text": segment.text.strip(),
                "words": [
                    {
                        "text": word.word,
                        "start": round(word.start, 2),
                        "end": round(word.end, 2),
                        "p": round(word.probability, 3),
                    }
                    for word in (segment.words or [])
                ],
            }
        )
        if duration and segment.end - reported >= 30:
            reported = segment.end
            print(
                f"  transcribed {segment.end / 60:4.1f} of {duration / 60:.1f} min",
                file=sys.stderr,
                flush=True,
            )

    result = {
        "tool": f"faster-whisper {faster_whisper.__version__}",
        "model": args.model,
        "device": device,
        "settings": "language=en beam_size=5 vad_filter word_timestamps "
        "condition_on_previous_text=False, product vocabulary as initial_prompt",
        "source": args.audio.replace("\\", "/"),
        "duration": round(duration, 2),
        "seconds": round(time.time() - started, 1),
        "segments": out,
    }
    with open(args.output, "w", encoding="utf-8", newline="\n") as handle:
        json.dump(result, handle, ensure_ascii=False, indent=1)
        handle.write("\n")

    words = sum(len(segment["words"]) for segment in out)
    print(
        f"  {len(out)} segments, {words} words in {result['seconds']}s on {device}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
