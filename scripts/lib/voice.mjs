// The narration edit: which sounds a clip keeps, and exactly where it is cut.
//
// A narration clip names a range of a recording, and the words Whisper heard in that range
// are what the clip says. This file decides what the clip plays:
//
//   - Every cut lands where the voice is actually quiet, measured in the waveform, never on
//     a transcript time. Whisper's word times run early at the end of a phrase and stretch
//     across pauses, and a cut placed on them clips the last syllable.
//   - Fillers, repeats and false starts come out. Whisper hides them ("a, a, a terminal, uh,
//     app" comes out "a terminal app"), so ingest/<slug>/heard.json, written by
//     scripts/lib/heard.py, spells what an acoustic model heard. Lined up against Whisper's
//     words, the sounds Whisper has no word for are the stumbles, and a voiced stretch made
//     of nothing else is removed.
//   - Long pauses shorten: to 0.5s after a sentence, 0.3s after a comma, 0.2s mid-phrase,
//     and 0.1s after a word like "the" that nothing ends on.
//
// Only whole voiced stretches between pauses are ever removed, never part of one, so every
// join falls in silence and is crossfaded there. The result is rendered to one audio file
// per short, sample-accurate, instead of being trimmed frame by frame at render time.

import {spawnSync} from 'node:child_process';

export const RATE = 48000;
const HOP = 240; // 5ms between level readings
const WINDOW = 480; // each over 10ms

// Levels are read relative to the loud end of the voice, its 90th-percentile 10ms level,
// so a quiet recording and a loud one are measured the same way.
const PAUSE_BELOW = 22; // dB under the voice: a pause
const SILENT_BELOW = 35; // dB under the voice: silence, past any breath or decay
const DIP = 0.015; // a pause shorter than this is inside a word, not between two sounds

const LEAD = 0.05; // silence kept before a clip's first sound
const TAIL = 0.04; // and after its last
const FADE_IN = 0.005;
const FADE_OUT = 0.02;
export const CROSSFADE = 0.012;

/**
 * The longest pause kept, by the punctuation Whisper put after the word before it. After a
 * word nothing can end on ("the", "a", "to"), a pause is only ever a hesitation.
 */
export const CAPS = {sentence: 0.5, clause: 0.3, phrase: 0.2, hesitation: 0.1};
export const TUTORIAL_CAPS = {sentence: 0.8, clause: 0.45, phrase: 0.3, hesitation: 0.15};
const LEADS_ON = new Set(['the', 'a', 'an', 'to', 'of', 'and', 'or', 'my', 'your', 'our', 'their']);

const FILLER = /^(u+[hm]+|a+h+|e+r+m*|h+m+|m+h*m+)$/;

// Letters, for lining Whisper's words up against what the acoustic model spelled: words as
// they are said, not as they are written. Digits are said out loud, and CTRLbot is "control
// bot", or the sound of a number or of "con" would have no word and look like a stumble.
const SAID = [[/ctrlbot/g, 'controlbot']];
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
  'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const spoken = (digits) => {
  if (digits.length > 2) return [...digits].map((d) => ONES[d]).join('');
  const n = Number(digits);
  return n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ONES[n % 10] : '');
};
const letters = (text) =>
  SAID.reduce((said, [written, spokenAs]) => said.replace(written, spokenAs), text.toLowerCase())
    .replace(/\d+/g, spoken)
    .replace(/[^a-z']/g, '');

/** Decode a prepared narration track and measure its level every 5ms. */
export const loadVoice = (path, ffmpeg = 'ffmpeg') => {
  const result = spawnSync(ffmpeg, ['-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', String(RATE), '-'], {
    maxBuffer: 2 ** 31 - 1,
  });
  if (result.status !== 0 || !result.stdout?.length) throw new Error(`Could not decode ${path}\n${result.stderr}`);
  const bytes = result.stdout;
  const pcm =
    bytes.byteOffset % 4 === 0
      ? new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >> 2)
      : new Float32Array(Uint8Array.from(bytes).buffer);
  const frames = Math.max(0, Math.floor((pcm.length - WINDOW) / HOP) + 1);
  const level = new Float32Array(frames);
  for (let i = 0; i < frames; i++) {
    let sum = 0;
    for (let j = i * HOP, end = j + WINDOW; j < end; j++) sum += pcm[j] * pcm[j];
    level[i] = 10 * Math.log10(sum / WINDOW + 1e-12);
  }
  const loud = Float32Array.from(level).sort()[Math.floor((frames - 1) * 0.9)];
  return {pcm, level, pause: loud - PAUSE_BELOW, silent: loud - SILENT_BELOW, seconds: pcm.length / RATE};
};

const frameAt = (voice, t) =>
  Math.max(0, Math.min(voice.level.length - 1, Math.round((t * RATE - WINDOW / 2) / HOP)));
const timeAt = (frame) => (frame * HOP + WINDOW / 2) / RATE;
const round = (t) => Math.round(t * 1000) / 1000;

/** Voiced stretches in [from, to]: runs above the pause level, joined across dips under DIP. */
const islands = (voice, from, to) => {
  const out = [];
  const last = frameAt(voice, to);
  for (let i = frameAt(voice, from); i <= last; ) {
    if (voice.level[i] <= voice.pause) {
      i++;
      continue;
    }
    let j = i;
    while (j <= last && voice.level[j] > voice.pause) j++;
    const previous = out.at(-1);
    if (previous && timeAt(i) - previous.end < DIP) previous.end = timeAt(j);
    else out.push({start: timeAt(i), end: timeAt(j)});
    i = j;
  }
  return out;
};

// A word's quiet onset (an "s", an "h") and its decay are part of it, but only so far: past
// these, what is louder than silence is a breath, not the word.
const ONSET = 0.1;
const DECAY = 0.12;

// Either walk stops early where the level turns and climbs again: that is the next sound
// (usually a breath) starting, not this one fading.
const TURN = 3;

/** Back from `t` while louder than silence, to find where a sound's soft onset begins. */
const softStart = (voice, t, limit) => {
  const floor = Math.max(limit, t - ONSET);
  let i = frameAt(voice, t);
  const stop = frameAt(voice, floor);
  let low = voice.level[i];
  while (i > stop && voice.level[i - 1] > voice.silent && voice.level[i - 1] <= low + TURN) {
    i--;
    low = Math.min(low, voice.level[i]);
  }
  return Math.max(floor, timeAt(i));
};

/** On from `t` while louder than silence, to find where a sound's decay ends. */
const softEnd = (voice, t, limit) => {
  const ceiling = Math.min(limit, t + DECAY);
  let i = frameAt(voice, t);
  const stop = frameAt(voice, ceiling);
  let low = voice.level[i];
  while (i < stop && voice.level[i] > voice.silent && voice.level[i] <= low + TURN) {
    low = Math.min(low, voice.level[i]);
    i++;
  }
  return Math.min(ceiling, timeAt(i));
};

/**
 * From `t`, the first moment 10dB under `peak` in the direction `step` (+1 or -1), then on
 * down to the bottom of that dip, never past `limit`. Null if the level never drops that far.
 */
const dipFrom = (voice, t, step, limit, peak) => {
  const stop = frameAt(voice, limit);
  let f = frameAt(voice, t);
  while (f !== stop && voice.level[f] >= peak - 10) f += step;
  if (voice.level[f] >= peak - 10) return null;
  while (f !== stop && voice.level[f + step] < voice.level[f]) f += step;
  return timeAt(f);
};

// What an acoustic model mistakes for what: vowels for vowels, and consonants made the same
// way in the mouth. Those substitutions cost what skipping a letter costs; any other costs
// more, so a word is never pinned to sounds that only line up because both are letters.
const ALIKE = ['aeiouy', 'ckgq', 'td', 'pb', 'sz', 'fv', 'mn', 'lr', 'wv'];
const alike = (a, b) => ALIKE.some((group) => group.includes(a) && group.includes(b));

/**
 * For each heard letter, the index of the word it spells, or -1 for a sound Whisper has no
 * word for. An edit-distance alignment whose ties go to the latest match, so of three "a"s
 * before "terminal" the one kept is the one beside it.
 */
const alignLetters = (words, heard) => {
  const w = [];
  const wordOf = [];
  words.forEach((word, k) => {
    if (k) {
      w.push('|');
      wordOf.push(-1);
    }
    for (const ch of letters(word.text)) {
      w.push(ch);
      wordOf.push(k);
    }
  });
  const c = heard.map((h) => h.ch);
  const n = w.length;
  const m = c.length;
  const width = m + 1;
  const cost = new Int32Array((n + 1) * width);
  const gap = (ch) => (ch === '|' ? 1 : 2);
  // A heard word break in the middle of a written word costs more: of "make the the next",
  // "make" keeps its own "e" rather than borrowing the one from the "the" said twice.
  const heardGap = (i, ch) => (ch === '|' && i > 0 && i < n && w[i - 1] !== '|' && w[i] !== '|' ? 4 : gap(ch));
  const sub = (a, b) => (a === b ? 0 : a === '|' || b === '|' ? 5 : alike(a, b) ? 2 : 3);
  for (let i = 1; i <= n; i++) cost[i * width] = cost[(i - 1) * width] + gap(w[i - 1]);
  for (let j = 1; j <= m; j++) cost[j] = cost[j - 1] + gap(c[j - 1]);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      cost[i * width + j] = Math.min(
        cost[(i - 1) * width + j - 1] + sub(w[i - 1], c[j - 1]),
        cost[(i - 1) * width + j] + gap(w[i - 1]),
        cost[i * width + j - 1] + heardGap(i, c[j - 1]),
      );
    }
  }
  const owner = new Array(m).fill(-1);
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    const here = cost[i * width + j];
    if (here === cost[(i - 1) * width + j - 1] + sub(w[i - 1], c[j - 1])) {
      if (w[i - 1] !== '|' && c[j - 1] !== '|') owner[j - 1] = wordOf[i - 1];
      i--;
      j--;
    } else if (here === cost[i * width + j - 1] + heardGap(i, c[j - 1])) {
      j--;
    } else {
      i--;
    }
  }
  return owner;
};

const pauseCap = (word, caps = CAPS) => {
  const text = word.text.trim();
  if (/[.?!]["')\]]*$/.test(text)) return caps.sentence;
  if (/[,;:—-]["')\]]*$/.test(text)) return caps.clause;
  return LEADS_ON.has(text.toLowerCase()) ? caps.hesitation : caps.phrase;
};

/** Two runs of letters where the first is the start of the second: "an" before "analog". */
const restarts = (a, b) => {
  if (!a || !b) return false;
  if (a.length === 1) return a === b;
  if (b.startsWith(a)) return true;
  if (a.length < 4) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
  return diff <= 1;
};

/**
 * What one clip plays: pieces of the source, in source seconds, joined by crossfades.
 *
 * `words` is the recording's Whisper words ({text, start, end} in seconds) and `heard` its
 * heard.json, or null to cut on the waveform alone without removing anything. `verbatim`
 * keeps every sound between the first word and the last, and every pause at its length.
 */
export const planClip = (voice, words, heard, clip, {verbatim = false, debug = false, caps = CAPS} = {}) => {
  const notes = [];
  const inRange = (word) => {
    const overlap = Math.min(word.end, clip.sourceEnd) - Math.max(word.start, clip.sourceStart);
    return overlap >= Math.min(0.15, (word.end - word.start) * 0.6);
  };
  const firstIndex = words.findIndex(inRange);
  if (firstIndex === -1) throw new Error(`clip ${clip.id}: no words between ${clip.sourceStart}s and ${clip.sourceEnd}s`);
  let lastIndex = firstIndex;
  while (lastIndex + 1 < words.length && inRange(words[lastIndex + 1])) lastIndex++;

  // The clip's words, less any filler Whisper did write down and the first of a repeat.
  const chosen = [];
  for (let k = firstIndex; k <= lastIndex; k++) {
    const bare = letters(words[k].text);
    if (!verbatim && FILLER.test(bare)) {
      notes.push(`dropped "${words[k].text.trim()}" (filler)`);
      continue;
    }
    if (!verbatim && k < lastIndex && bare && bare === letters(words[k + 1].text)) {
      notes.push(`dropped the first "${words[k].text.trim()}" (repeat)`);
      continue;
    }
    chosen.push(words[k]);
  }
  const before = words.slice(Math.max(0, firstIndex - 6), firstIndex).filter((w) => w.end > words[firstIndex].start - 3);
  const after = words.slice(lastIndex + 1, lastIndex + 7).filter((w) => w.start < words[lastIndex].end + 3);
  const local = [...before, ...chosen, ...after];
  const role = local.map((_, k) => (k < before.length || k >= before.length + chosen.length ? 'other' : 'keep'));

  const from = Math.max(0, Math.min(clip.sourceStart, local[0].start) - 0.6);
  const to = Math.min(voice.seconds, Math.max(clip.sourceEnd, local.at(-1).end) + 0.6);
  const found = islands(voice, from, to);
  // The stretch a letter was heard in: the one holding it, or the nearest within 40ms, since
  // a letter can land just outside the sound it spells.
  const islandAt = (t) => {
    const holding = found.findIndex((isl) => t >= isl.start && t <= isl.end);
    if (holding !== -1) return holding;
    let best = -1;
    let distance = 0.04;
    found.forEach((isl, i) => {
      const d = Math.min(Math.abs(t - isl.start), Math.abs(t - isl.end));
      if (d <= distance) {
        best = i;
        distance = d;
      }
    });
    return best;
  };

  // Who owns each voiced stretch: the clip's words, the words around it, or nobody. An "uh"
  // is an "a" to the letter model, so letters inside a filler Whisper heard are left out
  // of the alignment, and a stretch that is mostly filler is one.
  const fillers = (heard?.fillers ?? []).filter((f) => f.end > from && f.start < to);
  const inFiller = (t) => fillers.some((f) => t >= f.start - 0.02 && t <= f.end + 0.02);
  const fillerShare = (isl) =>
    fillers.reduce((sum, f) => sum + Math.max(0, Math.min(isl.end, f.end) - Math.max(isl.start, f.start)), 0) /
    (isl.end - isl.start);
  const owners = found.map(() => ({keep: [], other: [], extra: []}));
  const letterTimes = local.map(() => []);
  if (heard) {
    const span = [];
    for (let i = 0; i < heard.text.length; i++) {
      const t = heard.times[i];
      if (t < from || t > to || inFiller(t)) continue;
      span.push({ch: heard.text[i] === ' ' ? '|' : heard.text[i], t});
    }
    const owner = alignLetters(local, span);
    span.forEach((h, i) => {
      if (h.ch === '|') return;
      if (owner[i] >= 0) letterTimes[owner[i]].push(h.t);
      const isl = islandAt(h.t);
      if (isl === -1) return;
      if (owner[i] === -1) owners[isl].extra.push(h);
      else owners[isl][role[owner[i]]].push({...h, word: owner[i]});
    });
  } else {
    local.forEach((word, k) => {
      found.forEach((isl, i) => {
        const overlap = Math.min(isl.end, word.end) - Math.max(isl.start, word.start);
        if (overlap > (isl.end - isl.start) * 0.5) owners[i][role[k]].push({t: (isl.start + isl.end) / 2, word: k});
      });
    });
  }
  // A stumble said straight into a word, with no pause either side ("an SSH, a host", the
  // "a" run into the "h"; "make the the next"), sits inside a voiced stretch. Its letters are
  // split off at the quietest moment on each side, provided the level there falls 10dB
  // under the stumble's own peak and the letter model heard it well apart from the words.
  if (heard && !verbatim) {
    for (let i = found.length - 1; i >= 0; i--) {
      const o = owners[i];
      if (!o.keep.length || o.other.length || !o.extra.length) continue;
      const all = [...o.keep.map((h) => ({...h, keep: true})), ...o.extra].sort((a, b) => a.t - b.t);
      const runs = [];
      all.forEach((h, k) => {
        if (h.keep) return;
        if (all[k - 1] && !all[k - 1].keep) runs.at(-1).push(h);
        else runs.push([h]);
      });
      // A stumble at the end of a stretch counts only when the next stretch holds a word, so
      // it sits between two words rather than at the end of the line.
      const wordNext = owners[i + 1]?.keep.length && found[i + 1].start - found[i].end < 0.3;
      const cuts = [];
      for (const run of runs) {
        const before = all[all.indexOf(run[0]) - 1];
        const after = all[all.indexOf(run.at(-1)) + 1];
        if (!before && !after) continue;
        if (after ? after.t - run.at(-1).t < 0.06 : !wordNext) continue;
        if (before && run[0].t - before.t < 0.06) continue;
        let peak = -Infinity;
        for (let f = frameAt(voice, run[0].t - 0.05); f <= frameAt(voice, run.at(-1).t + 0.05); f++) peak = Math.max(peak, voice.level[f]);
        const right = after ? dipFrom(voice, run.at(-1).t, 1, after.t - 0.02, peak) : found[i].end;
        const left = before ? dipFrom(voice, run[0].t, -1, before.t + 0.02, peak) : found[i].start;
        if (right === null || left === null || right - left < 0.08) continue;
        cuts.push({left, right, run});
      }
      if (!cuts.length) continue;
      const parts = [];
      let from = found[i].start;
      for (const {left, right, run} of cuts) {
        if (left > from) parts.push({isl: {start: from, end: left}, keep: true});
        parts.push({isl: {start: left, end: right}, stray: run});
        from = right;
      }
      if (found[i].end - from > 0.005) parts.push({isl: {start: from, end: found[i].end}, keep: true});
      // Every other letter goes to the part it falls in, or the nearest one it falls beside.
      const stray = new Set(cuts.flatMap((c) => c.run));
      const partOf = (h) => {
        let k = parts.findIndex((p) => h.t < p.isl.end);
        if (k === -1) k = parts.length - 1;
        if (!parts[k].stray) return k;
        const nearerStart = h.t - parts[k].isl.start < parts[k].isl.end - h.t;
        return (nearerStart && k > 0) || k === parts.length - 1 ? k - 1 : k + 1;
      };
      const split = parts.map((p) => (p.stray ? {keep: [], other: [], extra: p.stray} : {keep: [], other: [], extra: []}));
      for (const h of o.keep) split[partOf(h)].keep.push(h);
      for (const h of o.extra) if (!stray.has(h)) split[partOf(h)].extra.push(h);
      found.splice(i, 1, ...parts.map((p) => p.isl));
      owners.splice(i, 1, ...split);
    }
  }
  const kind = owners.map((o, i) =>
    o.keep.length
      ? o.other.length
        ? 'mixed'
        : 'keep'
      : o.other.length
        ? 'other'
        : fillerShare(found[i]) >= 0.5
          ? 'filler'
          : o.extra.length
            ? 'extra'
            : 'silent',
  );
  // A clip's optional hard edges, `notBefore` and `notAfter`, in source seconds: when Whisper
  // stretches the first or last word across the pause, the letters can claim the sound of
  // the phrase beside it. A stretch wholly outside the edges is not the clip's, and letters
  // heard there spell nothing of the clip's words.
  const outside = new Set();
  found.forEach((isl, i) => {
    if ((clip.notBefore != null && isl.end <= clip.notBefore) || (clip.notAfter != null && isl.start >= clip.notAfter)) {
      if (kind[i] === 'keep' || kind[i] === 'mixed') kind[i] = 'other';
      outside.add(i);
    }
  });
  if (outside.size) {
    letterTimes.forEach((times, k) => {
      letterTimes[k] = times.filter((t) => !outside.has(islandAt(t)));
    });
  }
  // A word the letter model spelled nothing for ("mode", said softly at the end of a line)
  // still has a sound: a silent stretch its Whisper time covers, beside a spelled word, is it.
  if (heard) {
    const spelledNear = (i) =>
      [i - 1, i + 1].some((j) => owners[j]?.keep.length && !outside.has(j) && Math.abs((j < i ? found[i].start - found[j].end : found[j].start - found[i].end)) < 0.3);
    local.forEach((word, k) => {
      if (role[k] !== 'keep' || letterTimes[k].length) return;
      found.forEach((isl, i) => {
        const overlap = Math.min(isl.end, word.end) - Math.max(isl.start, word.start);
        if (kind[i] !== 'silent' || outside.has(i) || overlap < (isl.end - isl.start) * 0.5 || !spelledNear(i)) return;
        kind[i] = 'keep';
        owners[i].keep.push({ch: '?', t: isl.start + 0.01, word: k});
        letterTimes[k].push(isl.start + 0.01);
      });
    });
  }
  let first = kind.findIndex((k) => k === 'keep' || k === 'mixed');
  let last = kind.findLastIndex((k) => k === 'keep' || k === 'mixed');
  if (first === -1) throw new Error(`clip ${clip.id}: none of its words could be found in the waveform`);
  // A stop's release (the burst after "network" closes on its k) or a soft onset can stand
  // apart from its word as a sliver the letter model spelled nothing in. It belongs to it.
  const sliver = (i) => kind[i] === 'silent' && !outside.has(i) && found[i].end - found[i].start < 0.12;
  if (first > 0 && kind[first] !== 'mixed' && sliver(first - 1) && found[first].start - found[first - 1].end < 0.1) first--;
  if (last + 1 < found.length && kind[last] !== 'mixed' && sliver(last + 1) && found[last + 1].start - found[last].end < 0.12) last++;
  // Inside a hard end, unspelled sound run straight on from the last word is that word's tail.
  if (clip.notAfter != null) {
    while (last + 1 < found.length && !outside.has(last + 1) && kind[last + 1] === 'silent' && found[last + 1].start - found[last].end < 0.1) last++;
  }

  if (heard && !verbatim) {
    // Letters with no word, in a stretch with the same word on both sides of it, are that
    // word said differently from how it is written ("con" in CTRLbot), not a stumble.
    const wordAt = (i, step) => {
      for (let j = i + step; j >= first && j <= last; j += step) {
        const mine = owners[j].keep;
        if (mine.length) return [...mine].sort((a, b) => a.t - b.t).at(step < 0 ? -1 : 0).word;
      }
      return -1;
    };
    for (let i = first + 1; i < last; i++) {
      if (kind[i] === 'extra' && wordAt(i, -1) === wordAt(i, 1)) kind[i] = 'silent';
    }
    // Between the clip's words, a voiced stretch the letter model spelled nothing in is a
    // stumble it could not name, when it is too long or too far from its neighbours to be
    // the tail of a word, and no word Whisper wrote but the letter model missed sits on it.
    const unspelled = local.filter((_, k) => role[k] === 'keep' && !letterTimes[k].length);
    for (let i = first + 1; i < last; i++) {
      if (kind[i] !== 'silent' || owners[i].extra.length) continue;
      const isl = found[i];
      const length = isl.end - isl.start;
      const apart = isl.start - found[i - 1].end >= 0.06 && found[i + 1].start - isl.end >= 0.06;
      const claimed = unspelled.some((w) => w.end > isl.start && w.start < isl.end);
      if (!claimed && (length >= 0.25 || (length >= 0.1 && apart))) kind[i] = 'noise';
    }
    // A restart: a stretch whose letters are how the next one begins ("an", "an", "and
    // allow"). Whisper writes the word once, so only the last one is kept.
    const spelled = (i) =>
      [...owners[i].keep, ...owners[i].other, ...owners[i].extra]
        .filter((h) => h.ch !== '?')
        .sort((a, b) => a.t - b.t)
        .map((h) => h.ch)
        .join('');
    for (let i = last - 1; i >= first; i--) {
      if (!['keep', 'extra', 'silent'].includes(kind[i])) continue;
      const next = found.findIndex((_, j) => j > i && !['extra', 'filler', 'noise', 'repeat'].includes(kind[j]));
      if (next === -1 || next > last || found[next].start - found[i].end > 0.5) continue;
      if (restarts(spelled(i), spelled(next))) kind[i] = 'repeat';
    }
  }

  // What plays: every stretch from the first word to the last but the stumbles.
  const kept = [];
  const removed = [];
  const gone = new Set();
  for (let i = first; i <= last; i++) {
    if (['extra', 'filler', 'noise', 'repeat'].includes(kind[i]) && !verbatim) {
      const said =
        kind[i] === 'filler'
          ? fillers.filter((f) => f.end > found[i].start && f.start < found[i].end).map((f) => f.text).join(' ')
          : [...owners[i].keep, ...owners[i].extra].sort((a, b) => a.t - b.t).map((h) => h.ch).join('');
      removed.push({from: round(found[i].start), to: round(found[i].end), kind: kind[i], heard: said});
      gone.add(i);
    } else {
      kept.push(i);
    }
  }
  if (!kept.length) throw new Error(`clip ${clip.id}: nothing left once its stumbles are removed`);
  const head = kept[0];
  const foot = kept.at(-1);

  // Where the clip starts and ends: in the quiet around its first and last sound, or at the
  // quietest moment between two words that were said without a pause.
  let start;
  let fadeIn = FADE_IN;
  const opening = owners[head];
  const leadingOther = opening.other.filter((h) => h.t < Math.min(...opening.keep.map((k) => k.t)));
  // Words said without a pause meet in the middle of a sound as often as in a dip ("things.
  // It", where the s runs into the I), so the cut goes where the first word's first letter
  // was heard, less the 30ms the letter model hears a sound after it starts.
  if (kind[head] === 'mixed' && leadingOther.length) {
    const lastOther = Math.max(...leadingOther.map((h) => h.t));
    const firstKeep = Math.min(...opening.keep.map((h) => h.t));
    start = Math.max(lastOther + 0.02, firstKeep - 0.03);
    notes.push(`starts mid-phrase at ${round(start)}s, where "${local[opening.keep[0].word].text.trim()}" begins`);
  } else {
    const floor = (found[head - 1]?.end ?? from) + 0.01;
    start = Math.max(floor, softStart(voice, found[head].start, floor) - LEAD);
  }
  // A hard edge inside the opening stretch ("So you", said as one sound) starts the clip there.
  if (clip.notBefore != null && start < clip.notBefore) {
    start = clip.notBefore;
    notes.push(`starts at its notBefore, ${round(start)}s`);
  }
  let end;
  let fadeOut = FADE_OUT;
  const closing = owners[foot];
  const trailingOther = closing.other.filter((h) => h.t > Math.max(...closing.keep.map((k) => k.t)));
  if (kind[foot] === 'mixed' && trailingOther.length) {
    const lastKeep = Math.max(...closing.keep.map((h) => h.t));
    const firstOther = Math.min(...trailingOther.map((h) => h.t));
    end = Math.max(lastKeep + 0.04, firstOther - 0.03);
    fadeOut = 0.01;
    notes.push(`ends mid-phrase at ${round(end)}s, where the next word begins`);
  } else {
    const ceiling = (found[foot + 1]?.start ?? to) - 0.01;
    end = Math.min(ceiling, softEnd(voice, found[foot].end, ceiling) + TAIL);
  }

  // Long pauses shorten, and a removed stretch closes up to a pause of the same length. A
  // pause is only ever cut from its middle, clear of both sounds' soft edges.
  const lastKeepWord = (i) => {
    const mine = owners[i].keep;
    return mine.length ? local[Math.max(...mine.map((h) => h.word))] : null;
  };
  const pieces = [];
  const tightened = [];
  let pieceFrom = start;
  let lastWord = null;
  for (let n = 0; n + 1 < kept.length; n++) {
    const a = found[kept[n]];
    const b = found[kept[n + 1]];
    lastWord = lastKeepWord(kept[n]) ?? lastWord;
    const skipped = kept[n + 1] - kept[n] > 1;
    const quietAfter = found[kept[n] + 1].start - a.end;
    const quietBefore = b.start - found[kept[n + 1] - 1].end;
    const natural = skipped ? quietAfter + quietBefore : b.start - a.end;
    const cap = verbatim ? Infinity : lastWord ? pauseCap(lastWord, caps) : caps.phrase;
    if (!skipped && natural <= cap) continue;
    const want = Math.min(cap, natural);
    const tailA = softEnd(voice, a.end, a.end + quietAfter) - a.end + CROSSFADE;
    const headB = b.start - softStart(voice, b.start, b.start - quietBefore) + CROSSFADE;
    // Half the pause from each side, or what one side has and the rest from the other.
    let x = Math.max(tailA, want / 2);
    let y = Math.max(headB, want - x);
    if (y > quietBefore) {
      y = quietBefore;
      x = Math.max(tailA, want - y);
    }
    if (x > quietAfter) {
      x = quietAfter;
      y = Math.min(quietBefore, Math.max(headB, want - x));
    }
    const cutA = a.end + x;
    const cutB = b.start - y;
    if (!skipped && cutB - cutA < 0.03) continue;
    pieces.push({from: round(pieceFrom), to: round(cutA)});
    pieceFrom = cutB;
    if (!skipped) tightened.push({at: round(a.end), from: round(natural), to: round(x + y)});
  }
  pieces.push({from: round(pieceFrom), to: round(end)});

  // The clip's words, timed by the letters that spell them rather than by Whisper: a word
  // starts just before its first letter and runs to the next word, or to the end of its
  // sound when a pause follows.
  const timed = [];
  local.forEach((word, k) => {
    if (role[k] !== 'keep') return;
    const times = letterTimes[k].filter((t) => !gone.has(islandAt(t)) && !outside.has(islandAt(t)) && (clip.notBefore == null || t >= start));
    timed.push(times.length ? {text: word.text, first: times[0], last: times.at(-1)} : {text: word.text, guessed: true});
  });
  timed.forEach((word, k) => {
    if (word.guessed) return;
    word.start = Math.max(word.first - 0.04, timed[k - 1]?.first ?? -Infinity);
    const next = timed.slice(k + 1).find((w) => !w.guessed);
    const isl = found[islandAt(word.last)];
    const sound = isl ? softEnd(voice, isl.end, isl.end + DECAY) : word.last + 0.08;
    word.end = next && next.first - word.last < 0.25 ? next.first - 0.04 : Math.max(word.last + 0.08, sound);
  });
  timed.forEach((word, k) => {
    if (!word.guessed) return;
    // A word the letter model missed sits between its neighbours.
    word.start = timed[k - 1]?.end ?? start;
    word.end = timed.slice(k + 1).find((w) => !w.guessed)?.start ?? Math.min(end, word.start + 0.3);
  });
  timed.forEach((word, k) => {
    if (timed[k + 1]) word.end = Math.max(word.start + 0.03, Math.min(word.end, timed[k + 1].start));
  });

  const seconds = pieces.reduce((sum, p) => sum + (p.to - p.from), 0) - CROSSFADE * (pieces.length - 1);
  if (debug) {
    for (let i = 0; i < found.length; i++) {
      const o = owners[i];
      const spell = (list) => list.map((h) => h.ch + (h.word !== undefined ? `${h.word}` : '')).join('');
      console.log(
        `    ${round(found[i].start).toFixed(3)}-${round(found[i].end).toFixed(3)} ${kind[i].padEnd(6)} ` +
          `keep:${spell(o.keep)} other:${spell(o.other)} extra:${spell(o.extra)}`,
      );
    }
    console.log(`    words: ${local.map((w, k) => `${k}${role[k] === 'keep' ? '' : '*'}=${w.text.trim()}`).join(' ')}`);
  }
  return {
    id: clip.id,
    start: round(start),
    end: round(end),
    fadeIn,
    fadeOut,
    pieces,
    seconds: round(seconds),
    removed,
    tightened,
    words: timed.map((w) => ({text: w.text, start: round(Math.max(w.start, start)), end: round(Math.min(w.end, end))})),
    notes,
  };
};

/** Where a source time lands in a clip that starts playing at `at`. */
export const clipTime = (plan, at, t) => {
  let cursor = at;
  for (let k = 0; k < plan.pieces.length; k++) {
    const piece = plan.pieces[k];
    if (t <= piece.from) return cursor;
    if (t <= piece.to) return cursor + (t - piece.from);
    cursor += piece.to - piece.from - (k + 1 < plan.pieces.length ? CROSSFADE : 0);
  }
  return cursor;
};

/**
 * One track holding every clip at its place, `seconds` long. Each piece is faded in and out
 * with equal-power curves; consecutive pieces overlap by CROSSFADE, inside their silences.
 */
export const renderTrack = (voice, placed, seconds) => {
  const out = new Float32Array(Math.ceil(seconds * RATE));
  const xf = Math.round(CROSSFADE * RATE);
  for (const {plan, at} of placed) {
    let cursor = Math.round(at * RATE);
    plan.pieces.forEach((piece, k) => {
      const from = Math.round(piece.from * RATE);
      const length = Math.round(piece.to * RATE) - from;
      const fadeIn = k === 0 ? Math.round(plan.fadeIn * RATE) : xf;
      const fadeOut = k === plan.pieces.length - 1 ? Math.round(plan.fadeOut * RATE) : xf;
      for (let s = 0; s < length; s++) {
        let gain = 1;
        if (s < fadeIn) gain *= Math.sin(((s + 0.5) / fadeIn) * (Math.PI / 2));
        if (s >= length - fadeOut) gain *= Math.cos(((s - (length - fadeOut) + 0.5) / fadeOut) * (Math.PI / 2));
        const o = cursor + s;
        if (o >= 0 && o < out.length) out[o] += voice.pcm[from + s] * gain;
      }
      cursor += length - (k + 1 < plan.pieces.length ? xf : 0);
    });
  }
  return out;
};

/** 32-bit float WAV bytes. */
export const wav = (samples) => {
  const data = Buffer.from(samples.buffer, samples.byteOffset, samples.byteLength);
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(3, 20); // IEEE float
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(RATE, 24);
  header.writeUInt32LE(RATE * 4, 28);
  header.writeUInt16LE(4, 32);
  header.writeUInt16LE(32, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);
  return Buffer.concat([header, data]);
};
