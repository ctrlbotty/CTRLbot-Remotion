// Verify a narration edit's track or render against planned clips.
//
//   npm run narration:verify -- <generated.ts> <edit.m4a | render.mp4>
//
// Transcribes with scripts/lib/transcribe.py, compares each clip's planned edit
// words with the heard words in the same window (+-0.3s), and checks audio levels
// (ffmpeg -af astats) at edge differences.
//
// Exit 1 only when an extra edge word measures above -50 dB, or a missing edge
// word's span measures below -50 dB. All else exits 0.

import {existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import ts from 'typescript';

let fullFfmpeg;
const findFfmpeg = () => {
  if (fullFfmpeg !== undefined) return fullFfmpeg;
  fullFfmpeg = null;
  for (const candidate of [process.env.FFMPEG_FULL, process.env.FFMPEG_PATH, 'ffmpeg'].filter(Boolean)) {
    const result = spawnSync(candidate, ['-hide_banner', '-filters'], {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    });
    if (result.status === 0 && / astats /.test(result.stdout || '')) {
      fullFfmpeg = candidate;
      break;
    }
  }
  if (!fullFfmpeg) {
    fullFfmpeg = 'ffmpeg';
  }
  return fullFfmpeg;
};

const ffmpeg = findFfmpeg();
const python = process.env.PYTHON || 'python';

const normalize = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const loadGenerated = async (path) => {
  const {outputText} = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

/** Compute longest common subsequence indices for two word arrays. */
export const lcs = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({length: m + 1}, () => new Int32Array(n + 1));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (a[i].norm === b[j].norm) dp[i + 1][j + 1] = dp[i][j] + 1;
      else dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const matchesA = [];
  const matchesB = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1].norm === b[j - 1].norm) {
      matchesA.push(i - 1);
      matchesB.push(j - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  matchesA.reverse();
  matchesB.reverse();
  return {matchesA, matchesB};
};

/** Measure audio RMS level in dB over [startSec, endSec] using ffmpeg astats. */
export const measureRms = (mediaPath, startSec, endSec) => {
  const duration = Math.max(0.01, endSec - startSec);
  const result = spawnSync(
    ffmpeg,
    [
      '-hide_banner',
      '-nostats',
      '-ss',
      startSec.toFixed(3),
      '-t',
      duration.toFixed(3),
      '-i',
      mediaPath,
      '-af',
      'astats',
      '-f',
      'null',
      '-',
    ],
    {encoding: 'utf8', maxBuffer: 16 * 1024 * 1024},
  );
  if (result.error) {
    throw new Error(`FFmpeg execution failed: ${result.error.message}`);
  }
  const output = (result.stderr || '') + (result.stdout || '');
  if (result.status !== 0) {
    throw new Error(`FFmpeg failed with exit code ${result.status} on ${mediaPath}: ${output.trim()}`);
  }
  const match =
    output.match(/Overall[\s\S]*?RMS level dB:\s*([-\d.inf]+)/i) ??
    output.match(/RMS level dB:\s*([-\d.inf]+)/i);
  if (!match) {
    throw new Error(`FFmpeg astats failed to report RMS level on ${mediaPath}: ${output.trim()}`);
  }
  const val = match[1].toLowerCase();
  if (val.includes('-inf')) return -Infinity;
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) {
    throw new Error(`FFmpeg astats returned invalid RMS level '${match[1]}' on ${mediaPath}`);
  }
  return num;
};

/** Run transcription via transcribe.py. */
const runTranscription = (mediaPath, options = {}) => {
  const model = options.model || 'medium.en';
  const device = options.device || 'auto';
  const tempJson = join(tmpdir(), `narration-verify-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);

  const attempt = (dev) =>
    spawnSync(python, ['scripts/lib/transcribe.py', mediaPath, tempJson, '--model', model, '--device', dev], {
      stdio: 'inherit',
    });

  try {
    if (device === 'cpu' || device === 'cuda') {
      const res = attempt(device);
      if (res.status !== 0) throw new Error(`Transcription failed on ${device}.`);
    } else {
      const res = attempt('cuda');
      if (res.status !== 0) {
        console.log('  Transcription failed on GPU; retrying on CPU.');
        const cpuRes = attempt('cpu');
        if (cpuRes.status !== 0) throw new Error('Transcription failed on both GPU and CPU.');
      }
    }
    return JSON.parse(readFileSync(tempJson, 'utf8'));
  } finally {
    if (existsSync(tempJson)) {
      try {
        unlinkSync(tempJson);
      } catch {
        // Temp cleanup best effort
      }
    }
  }
};

/** Transcribe an isolated clip from mediaPath. */
export const transcribeClipIsolated = (mediaPath, clip, options = {}) => {
  const clipStart = Math.max(0, clip.at);
  const clipDuration = Math.max(0.1, clip.seconds);
  const tempWav = join(tmpdir(), `narration-isolated-${Date.now()}-${Math.random().toString(36).slice(2)}.wav`);

  try {
    const extractRes = spawnSync(
      ffmpeg,
      [
        '-hide_banner',
        '-nostats',
        '-ss',
        clipStart.toFixed(3),
        '-t',
        clipDuration.toFixed(3),
        '-i',
        mediaPath,
        '-c:a',
        'pcm_s16le',
        '-ar',
        '16000',
        '-ac',
        '1',
        '-y',
        tempWav,
      ],
      {encoding: 'utf8', maxBuffer: 16 * 1024 * 1024},
    );
    if (extractRes.error) {
      throw new Error(`FFmpeg isolated clip extraction failed: ${extractRes.error.message}`);
    }
    if (extractRes.status !== 0) {
      throw new Error(
        `FFmpeg failed to extract isolated clip from ${mediaPath} at ${clipStart}s for ${clipDuration}s: ${
          extractRes.stderr || extractRes.stdout
        }`,
      );
    }
    return runTranscription(tempWav, options);
  } finally {
    if (existsSync(tempWav)) {
      try {
        unlinkSync(tempWav);
      } catch {
        // Temp cleanup best effort
      }
    }
  }
};

/**
 * Check a suspected extra edge word for audio level and boundary straddling.
 *
 * Suspected extra words straddling a clip boundary with a silent outside gap (<= -50 dB)
 * and an isolated full-clip transcription confirming the planned edge and omitting the extra
 * are classified as ASR timing NOTEs instead of defects.
 *
 * Audible outside speech (> -50 dB), unconfirmed edges, or non-straddling extra words
 * retain the defect.
 */
const checkExtraEdge = ({
  word,
  type,
  clip,
  editWords,
  mediaPath,
  measureRmsFn,
  getIsolatedTranscript,
}) => {
  const span = [word.start, word.end];
  const rms = measureRmsFn(mediaPath, span[0], span[1]);
  if (rms <= -50) {
    return {
      type,
      word: word.text,
      span,
      rms,
      isDefect: false,
      isNote: false,
    };
  }

  // Word is audible (> -50 dB). Check for boundary-straddling exception.
  const clipStart = clip.at;
  const clipEnd = clip.at + clip.seconds;
  const isStraddling =
    type === 'extra-first'
      ? word.start < clipStart && word.end > clipStart
      : word.start < clipEnd && word.end > clipEnd;

  if (!isStraddling) {
    return {
      type,
      word: word.text,
      span,
      rms,
      isDefect: true,
      isNote: false,
    };
  }

  const outsideSpan =
    type === 'extra-first' ? [word.start, clipStart] : [clipEnd, word.end];
  const outsideRms = measureRmsFn(mediaPath, outsideSpan[0], outsideSpan[1]);

  if (outsideRms > -50) {
    return {
      type,
      word: word.text,
      span,
      rms,
      isDefect: true,
      isNote: false,
      outsideSpan,
      outsideRms,
    };
  }

  // Outside portion is silent (<= -50 dB).
  // Transcribe isolated clip once to confirm planned edge and omit alleged extra.
  let isolatedJson;
  try {
    isolatedJson = getIsolatedTranscript();
  } catch (err) {
    return {
      type,
      word: word.text,
      span,
      rms,
      isDefect: true,
      isNote: false,
      outsideSpan,
      outsideRms,
      isolatedError: err.message,
    };
  }

  const isolatedWords = (isolatedJson?.segments || [])
    .flatMap((s) => s.words || [])
    .map((w) => ({
      norm: normalize(w.text),
      text: (w.text || '').trim(),
    }))
    .filter((w) => w.norm.length > 0);

  let confirmedEdge = false;
  let omittedExtra = false;

  if (type === 'extra-first') {
    const plannedFirstWord = editWords[0];
    confirmedEdge =
      isolatedWords.length > 0 &&
      plannedFirstWord !== undefined &&
      isolatedWords[0].norm === plannedFirstWord.norm;
    omittedExtra = isolatedWords.length === 0 || isolatedWords[0].norm !== word.norm;
  } else {
    const plannedLastWord = editWords[editWords.length - 1];
    const isolatedLastWord = isolatedWords[isolatedWords.length - 1];
    confirmedEdge =
      isolatedWords.length > 0 &&
      plannedLastWord !== undefined &&
      isolatedLastWord.norm === plannedLastWord.norm;
    omittedExtra = isolatedWords.length === 0 || isolatedLastWord.norm !== word.norm;
  }

  if (confirmedEdge && omittedExtra) {
    return {
      type,
      word: word.text,
      span,
      rms,
      isDefect: false,
      isNote: true,
      outsideSpan,
      outsideRms,
      isolatedConfirmed: true,
    };
  }

  return {
    type,
    word: word.text,
    span,
    rms,
    isDefect: true,
    isNote: false,
    outsideSpan,
    outsideRms,
    isolatedConfirmed: false,
  };
};

/** Verify narration edit against transcription. */
export const verifyNarration = (
  edit,
  transcriptJson,
  mediaPath,
  measureRmsFn = measureRms,
  transcribeClipFn = transcribeClipIsolated,
  options = {},
) => {
  const heardWords = (transcriptJson.segments || []).flatMap((s) => s.words || []);
  const clips = edit.clips || [];

  let defectCount = 0;
  let diffCount = 0;
  const results = [];

  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    const prev = clips[i - 1];
    const next = clips[i + 1];

    const clipStartMs = Math.round(clip.at * 1000);
    const clipEndMs = Math.round((clip.at + clip.seconds) * 1000);

    const editWords = (edit.words || [])
      .filter((w) => w.startMs >= clipStartMs && w.startMs <= clipEndMs)
      .map((w) => ({
        norm: normalize(w.text),
        text: (w.text || '').trim(),
        startMs: w.startMs,
        endMs: w.endMs,
      }))
      .filter((w) => w.norm.length > 0);

    const clipStart = clip.at;
    const clipEnd = clip.at + clip.seconds;
    const leftLimit = prev ? (prev.at + prev.seconds + clipStart) / 2 : 0;
    const rightLimit = next ? (clipEnd + next.at) / 2 : Infinity;

    const winStart = Math.max(clipStart - 0.3, leftLimit);
    const winEnd = Math.min(clipEnd + 0.3, rightLimit);

    const heard = heardWords
      .filter((w) => {
        const mid = (w.start + w.end) / 2;
        if (mid < leftLimit || mid >= rightLimit) return false;
        return mid >= winStart && mid <= winEnd;
      })
      .map((w) => ({
        norm: normalize(w.text),
        text: (w.text || '').trim(),
        start: w.start,
        end: w.end,
      }))
      .filter((w) => w.norm.length > 0);

    const editNormSeq = editWords.map((w) => w.norm).join(' ');
    const heardNormSeq = heard.map((w) => w.norm).join(' ');

    if (editNormSeq === heardNormSeq) {
      continue;
    }

    diffCount++;
    const clipReport = {
      clipId: clip.id,
      at: clip.at,
      editWords: editWords.map((w) => w.text),
      heardWords: heard.map((w) => w.text),
      edgeChecks: [],
    };

    let cachedIsolated = null;
    const getIsolatedTranscript = () => {
      if (!cachedIsolated) {
        cachedIsolated = transcribeClipFn(mediaPath, clip, options);
      }
      return cachedIsolated;
    };

    const {matchesA, matchesB} = lcs(editWords, heard);

    if (matchesA.length === 0) {
      if (editWords.length > 0) {
        const word = editWords[0];
        const spanStart = word.startMs / 1000;
        const spanEnd = word.endMs / 1000;
        const rms = measureRmsFn(mediaPath, spanStart, spanEnd);
        const isDefect = rms < -50;
        if (isDefect) defectCount++;
        clipReport.edgeChecks.push({
          type: 'missing-first',
          word: word.text,
          span: [spanStart, spanEnd],
          rms,
          isDefect,
        });
      }
      if (editWords.length > 1) {
        const word = editWords[editWords.length - 1];
        const spanStart = word.startMs / 1000;
        const spanEnd = word.endMs / 1000;
        const rms = measureRmsFn(mediaPath, spanStart, spanEnd);
        const isDefect = rms < -50;
        if (isDefect) defectCount++;
        clipReport.edgeChecks.push({
          type: 'missing-last',
          word: word.text,
          span: [spanStart, spanEnd],
          rms,
          isDefect,
        });
      }
      if (heard.length > 0) {
        const word = heard[0];
        const type = heard.length === 1 && word.start >= clipEnd ? 'extra-last' : 'extra-first';
        const check = checkExtraEdge({
          word,
          type,
          clip,
          editWords,
          mediaPath,
          measureRmsFn,
          getIsolatedTranscript,
        });
        if (check.isDefect) defectCount++;
        clipReport.edgeChecks.push(check);
      }
      if (heard.length > 1) {
        const word = heard[heard.length - 1];
        const check = checkExtraEdge({
          word,
          type: 'extra-last',
          clip,
          editWords,
          mediaPath,
          measureRmsFn,
          getIsolatedTranscript,
        });
        if (check.isDefect) defectCount++;
        clipReport.edgeChecks.push(check);
      }
    } else {
      const firstA = matchesA[0];
      const firstB = matchesB[0];
      const lastA = matchesA[matchesA.length - 1];
      const lastB = matchesB[matchesB.length - 1];

      // Missing word at first position
      if (firstA > 0 && firstB === 0) {
        const word = editWords[0];
        const spanStart = word.startMs / 1000;
        const spanEnd = word.endMs / 1000;
        const rms = measureRmsFn(mediaPath, spanStart, spanEnd);
        const isDefect = rms < -50;
        if (isDefect) defectCount++;
        clipReport.edgeChecks.push({
          type: 'missing-first',
          word: word.text,
          span: [spanStart, spanEnd],
          rms,
          isDefect,
        });
      }

      // Extra word at first position
      if (firstB > 0 && firstA === 0) {
        const word = heard[0];
        const check = checkExtraEdge({
          word,
          type: 'extra-first',
          clip,
          editWords,
          mediaPath,
          measureRmsFn,
          getIsolatedTranscript,
        });
        if (check.isDefect) defectCount++;
        clipReport.edgeChecks.push(check);
      }

      // Missing word at last position
      if (lastA < editWords.length - 1 && lastB === heard.length - 1) {
        const word = editWords[editWords.length - 1];
        const spanStart = word.startMs / 1000;
        const spanEnd = word.endMs / 1000;
        const rms = measureRmsFn(mediaPath, spanStart, spanEnd);
        const isDefect = rms < -50;
        if (isDefect) defectCount++;
        clipReport.edgeChecks.push({
          type: 'missing-last',
          word: word.text,
          span: [spanStart, spanEnd],
          rms,
          isDefect,
        });
      }

      // Extra word at last position
      if (lastB < heard.length - 1 && lastA === editWords.length - 1) {
        const word = heard[heard.length - 1];
        const check = checkExtraEdge({
          word,
          type: 'extra-last',
          clip,
          editWords,
          mediaPath,
          measureRmsFn,
          getIsolatedTranscript,
        });
        if (check.isDefect) defectCount++;
        clipReport.edgeChecks.push(check);
      }
    }

    results.push(clipReport);
  }

  return {defectCount, diffCount, results};
};

const runSelfTest = () => {
  console.log('Running narration:verify selftest fixtures...');

  // Unit Test 1: LCS alignment
  const a = [{norm: 'welcome'}, {norm: 'to'}, {norm: 'ctrlbot'}];
  const b = [{norm: 'to'}, {norm: 'ctrlbot'}];
  const lcsRes = lcs(a, b);
  if (lcsRes.matchesA[0] !== 1 || lcsRes.matchesB[0] !== 0) {
    console.error('FAIL: lcs calculation incorrect');
    process.exit(1);
  }

  // Unit Test 2: Edge threshold semantics
  const mockEdit = {
    clips: [{id: 'test', at: 1.0, seconds: 2.0}],
    words: [
      {text: 'hello', startMs: 1000, endMs: 1500},
      {text: 'world', startMs: 1500, endMs: 2500},
    ],
  };

  // Case A: Missing first word that is digital silence (< -50 dB) -> MUST FAIL (defect)
  const mockTranscriptMissing = {
    segments: [{words: [{text: 'world', start: 1.5, end: 2.5}]}],
  };
  const resMissingSilence = verifyNarration(mockEdit, mockTranscriptMissing, 'dummy', () => -65.0);
  if (resMissingSilence.defectCount !== 1) {
    console.error('FAIL: expected defect for missing word in silence');
    process.exit(1);
  }

  // Case B: Missing first word that has speech (>= -50 dB) -> MUST PASS (0 defects)
  const resMissingSpeech = verifyNarration(mockEdit, mockTranscriptMissing, 'dummy', () => -19.5);
  if (resMissingSpeech.defectCount !== 0) {
    console.error('FAIL: expected pass for missing word when speech is present');
    process.exit(1);
  }

  // Case C: Extra edge word that is digital silence (<= -50 dB) -> MUST PASS (0 defects)
  const mockTranscriptExtra = {
    segments: [
      {
        words: [
          {text: 'hello', start: 1.0, end: 1.5},
          {text: 'world', start: 1.5, end: 2.5},
          {text: 'leaked', start: 3.1, end: 3.4},
        ],
      },
    ],
  };
  const resExtraSilence = verifyNarration(mockEdit, mockTranscriptExtra, 'dummy', () => -Infinity);
  if (resExtraSilence.defectCount !== 0) {
    console.error('FAIL: expected pass for extra edge word in digital silence');
    process.exit(1);
  }

  // Case D: Extra edge word that is real sound (> -50 dB) -> MUST FAIL (defect)
  const resExtraSound = verifyNarration(mockEdit, mockTranscriptExtra, 'dummy', () => -22.0);
  if (resExtraSound.defectCount !== 1) {
    console.error('FAIL: expected defect for extra edge word with audio leak');
    process.exit(1);
  }

  // Case E: measureRms must throw on non-existent or undecodable media
  let measureThrew = false;
  try {
    measureRms('out/coordinator/does-not-exist.wav', 0, 1);
  } catch {
    measureThrew = true;
  }
  if (!measureThrew) {
    console.error('FAIL: measureRms did not throw on non-existent media');
    process.exit(1);
  }

  // Case F: With no aligned words, inspect both first and last edges
  // [hello audible, ghost silent] against empty heard must catch the silent last word
  const mockEditNoCommon = {
    clips: [{id: 'test', at: 1.0, seconds: 2.0}],
    words: [
      {text: 'hello', startMs: 1000, endMs: 1500},
      {text: 'ghost', startMs: 2800, endMs: 2900},
    ],
  };
  const resNoCommon = verifyNarration(
    mockEditNoCommon,
    {segments: []},
    'dummy',
    (_media, start, end) => (start >= 2.5 ? -Infinity : -18.0),
  );
  if (resNoCommon.defectCount !== 1 || !resNoCommon.results[0]?.edgeChecks.some((c) => c.type === 'missing-last' && c.isDefect)) {
    console.error('FAIL: no-common-words did not detect silent last word defect');
    process.exit(1);
  }

  // Case G: Full extra-word span measurement
  let measuredSpan = null;
  verifyNarration(
    mockEdit,
    {
      segments: [
        {
          words: [
            {text: 'leak', start: 0.9, end: 1.1},
            {text: 'hello', start: 1.0, end: 1.5},
            {text: 'world', start: 1.5, end: 2.5},
          ],
        },
      ],
    },
    'dummy',
    (_media, start, end) => {
      if (!measuredSpan) measuredSpan = [start, end];
      return -18.0;
    },
    () => ({segments: []}),
  );
  if (!measuredSpan || Math.abs(measuredSpan[0] - 0.9) > 0.001 || Math.abs(measuredSpan[1] - 1.1) > 0.001) {
    console.error(`FAIL: extra word span was truncated: expected [0.9, 1.1], got [${measuredSpan}]`);
    process.exit(1);
  }

  // Case H: Straddling extra word with silent gap (<= -50 dB) and confirmed edge -> MUST PASS (0 defects, ASR timing note)
  const mockEditStraddle = {
    clips: [{id: 'straddle-clip', at: 10.0, seconds: 5.0}],
    words: [
      {text: 'we', startMs: 10000, endMs: 10500},
      {text: 'have', startMs: 10500, endMs: 11000},
      {text: 'a', startMs: 11000, endMs: 11500},
      {text: 'shell', startMs: 11500, endMs: 12000},
    ],
  };
  const mockTranscriptStraddle = {
    segments: [
      {
        words: [
          {text: 'And', start: 9.7, end: 10.2},
          {text: 'we', start: 10.2, end: 10.5},
          {text: 'have', start: 10.5, end: 11.0},
          {text: 'a', start: 11.0, end: 11.5},
          {text: 'shell', start: 11.5, end: 12.0},
        ],
      },
    ],
  };
  const mockIsolatedConfirmed = {
    segments: [
      {
        words: [
          {text: 'We', start: 0.0, end: 0.3},
          {text: 'have', start: 0.3, end: 0.8},
          {text: 'a', start: 0.8, end: 1.3},
          {text: 'shell', start: 1.3, end: 1.8},
        ],
      },
    ],
  };

  const resStraddleSilent = verifyNarration(
    mockEditStraddle,
    mockTranscriptStraddle,
    'dummy',
    (_media, start, end) => {
      // Full word [9.7, 10.2] is audible speech (-26.0 dB)
      // Outside gap [9.7, 10.0] is digital silence (-65.0 dB)
      if (start >= 9.69 && end <= 10.01) return -65.0;
      return -26.0;
    },
    () => mockIsolatedConfirmed,
  );
  if (
    resStraddleSilent.defectCount !== 0 ||
    !resStraddleSilent.results[0]?.edgeChecks.some((c) => c.type === 'extra-first' && !c.isDefect && c.isNote)
  ) {
    console.error('FAIL: straddling extra word with silent gap and confirmed edge did not classify as ASR timing note');
    process.exit(1);
  }

  // Case I: Straddling extra word with audible gap (> -50 dB) -> MUST FAIL (1 defect)
  const resStraddleAudible = verifyNarration(
    mockEditStraddle,
    mockTranscriptStraddle,
    'dummy',
    (_media, start, end) => {
      // Full word [9.7, 10.2] is audible (-26.0 dB)
      // Outside gap [9.7, 10.0] is also audible (-22.0 dB, real leak!)
      if (start >= 9.69 && end <= 10.01) return -22.0;
      return -26.0;
    },
    () => mockIsolatedConfirmed,
  );
  if (
    resStraddleAudible.defectCount !== 1 ||
    !resStraddleAudible.results[0]?.edgeChecks.some((c) => c.type === 'extra-first' && c.isDefect)
  ) {
    console.error('FAIL: straddling extra word with audible outside gap failed to detect defect');
    process.exit(1);
  }

  // Case J: Straddling extra word with silent gap but unconfirmed isolated edge -> MUST FAIL (1 defect)
  const mockIsolatedUnconfirmed = {
    segments: [
      {
        words: [
          {text: 'And', start: 0.0, end: 0.3},
          {text: 'we', start: 0.3, end: 0.8},
        ],
      },
    ],
  };
  const resStraddleUnconfirmed = verifyNarration(
    mockEditStraddle,
    mockTranscriptStraddle,
    'dummy',
    (_media, start, end) => {
      if (start >= 9.69 && end <= 10.01) return -65.0;
      return -26.0;
    },
    () => mockIsolatedUnconfirmed,
  );
  if (
    resStraddleUnconfirmed.defectCount !== 1 ||
    !resStraddleUnconfirmed.results[0]?.edgeChecks.some((c) => c.type === 'extra-first' && c.isDefect)
  ) {
    console.error('FAIL: straddling extra word with unconfirmed isolated edge failed to detect defect');
    process.exit(1);
  }

  // Case K: Non-straddling extra word (entirely inside) -> MUST FAIL (1 defect)
  const mockTranscriptEntirelyInside = {
    segments: [
      {
        words: [
          {text: 'extra', start: 10.1, end: 10.3},
          {text: 'we', start: 10.3, end: 10.5},
          {text: 'have', start: 10.5, end: 11.0},
          {text: 'a', start: 11.0, end: 11.5},
          {text: 'shell', start: 11.5, end: 12.0},
        ],
      },
    ],
  };
  const resEntirelyInside = verifyNarration(
    mockEditStraddle,
    mockTranscriptEntirelyInside,
    'dummy',
    () => -25.0,
    () => mockIsolatedConfirmed,
  );
  if (
    resEntirelyInside.defectCount !== 1 ||
    !resEntirelyInside.results[0]?.edgeChecks.some((c) => c.type === 'extra-first' && c.isDefect)
  ) {
    console.error('FAIL: entirely inside extra word failed to detect defect');
    process.exit(1);
  }

  // Case L: Measured regression with actual out/coordinator/w01-shell-isolated.json
  if (existsSync('out/coordinator/w01-shell-isolated.json')) {
    const w01Isolated = JSON.parse(readFileSync('out/coordinator/w01-shell-isolated.json', 'utf8'));
    const w01ShellEdit = {
      clips: [{id: 'shell-logs', at: 119.25, seconds: 5.409}],
      words: [
        {text: 'we', startMs: 119250, endMs: 119500},
        {text: 'have', startMs: 119500, endMs: 120000},
      ],
    };
    const w01ShellHeard = {
      segments: [
        {
          words: [
            {text: 'And', start: 118.91, end: 119.43},
            {text: 'we', start: 119.43, end: 119.7},
            {text: 'have', start: 119.7, end: 120.0},
          ],
        },
      ],
    };
    // 1) Silent outside gap -> PASS (0 defects)
    const w01ResPass = verifyNarration(
      w01ShellEdit,
      w01ShellHeard,
      'dummy',
      (_media, start, end) => (start < 119.25 && end <= 119.25 ? -Infinity : -26.6),
      () => w01Isolated,
    );
    if (w01ResPass.defectCount !== 0) {
      console.error('FAIL: w01 shell isolated regression failed to pass with silent outside gap');
      process.exit(1);
    }

    // 2) Audible outside gap counterexample -> FAIL (1 defect)
    const w01ResFail = verifyNarration(
      w01ShellEdit,
      w01ShellHeard,
      'dummy',
      (_media, start, end) => (start < 119.25 && end <= 119.25 ? -24.0 : -26.6),
      () => w01Isolated,
    );
    if (w01ResFail.defectCount !== 1) {
      console.error('FAIL: w01 shell counterexample failed to detect defect with audible outside gap');
      process.exit(1);
    }
  }

  // Real audio negative fixture:
  // Synthetic missing word placed in known digital silence (0.05s-0.25s) -> MUST detect defect
  if (existsSync('out/mirror-walkthrough.mp4')) {
    const negativeEdit = {
      clips: [{id: 'silence-clip', at: 0.05, seconds: 1.0}],
      words: [{text: 'ghost', startMs: 50, endMs: 250}],
    };
    const emptyTranscript = {segments: []};
    const realNegativeRes = verifyNarration(negativeEdit, emptyTranscript, 'out/mirror-walkthrough.mp4');
    if (realNegativeRes.defectCount !== 1) {
      console.error('FAIL: real audio negative fixture did not detect defect');
      process.exit(1);
    }
  }

  console.log('selftest PASS: All positive and negative fixtures verified.');
};

const main = async () => {
  const args = process.argv.slice(2);

  if (args.includes('--selftest')) {
    runSelfTest();
    return;
  }

  const positional = args.filter((a) => !a.startsWith('--'));
  const transcriptArg = args.find((a) => a.startsWith('--transcript='));
  const transcriptPath = transcriptArg ? transcriptArg.slice('--transcript='.length) : undefined;
  const modelArg = args.find((a) => a.startsWith('--model='));
  const model = modelArg ? modelArg.slice('--model='.length) : undefined;
  const deviceArg = args.find((a) => a.startsWith('--device='));
  const device = deviceArg ? deviceArg.slice('--device='.length) : undefined;

  if (positional.length < 2) {
    console.error('Usage: npm run narration:verify -- <generated.ts> <edit.m4a | render.mp4> [options]');
    console.error('Options:');
    console.error('  --transcript=<file.json>   Use existing transcription JSON');
    console.error('  --model=medium.en          faster-whisper model');
    console.error('  --device=auto|cuda|cpu     whisper compute device');
    console.error('  --selftest                 Run edge defect fixture tests');
    process.exit(2);
  }

  const [generatedPath, mediaPath] = positional;

  if (!existsSync(generatedPath)) {
    console.error(`Error: generated narration file not found: ${generatedPath}`);
    process.exit(1);
  }
  if (!existsSync(mediaPath)) {
    console.error(`Error: audio/video file not found: ${mediaPath}`);
    process.exit(1);
  }

  const mod = await loadGenerated(generatedPath);
  const edit = mod.NARRATION_EDIT ?? mod.default ?? mod;

  if (!edit || !Array.isArray(edit.clips) || !Array.isArray(edit.words)) {
    console.error(`Error: ${generatedPath} does not export valid NARRATION_EDIT with clips and words`);
    process.exit(1);
  }

  let transcriptJson;
  if (transcriptPath) {
    if (!existsSync(transcriptPath)) {
      console.error(`Error: transcript file not found: ${transcriptPath}`);
      process.exit(1);
    }
    transcriptJson = JSON.parse(readFileSync(transcriptPath, 'utf8'));
  } else {
    console.log(`Transcribing ${mediaPath} with scripts/lib/transcribe.py...`);
    transcriptJson = runTranscription(mediaPath, {model, device});
  }

  const {defectCount, diffCount, results} = verifyNarration(
    edit,
    transcriptJson,
    mediaPath,
    measureRms,
    transcribeClipIsolated,
    {model, device},
  );

  console.log(`\nNarration verification: ${mediaPath}`);
  console.log(`Checked ${edit.clips.length} clips against planned edit.`);

  if (results.length === 0) {
    console.log('All heard words match the planned edit exactly.');
  } else {
    console.log(`Found ${diffCount} differing clip(s):\n`);
    for (const res of results) {
      console.log(`Clip '${res.clipId}' at ${res.at.toFixed(2)}s:`);
      console.log(`  edit:  ${res.editWords.join(' ')}`);
      console.log(`  heard: ${res.heardWords.join(' ')}`);

      for (const check of res.edgeChecks) {
        const rmsStr = Number.isFinite(check.rms) ? `${check.rms.toFixed(1)} dB` : '-inf dB';
        const spanStr = `${check.span[0].toFixed(3)}s-${check.span[1].toFixed(3)}s`;
        if (check.type === 'missing-first') {
          const status = check.isDefect ? 'FAIL (< -50 dB, audio is silent)' : 'PASS (speech present)';
          console.log(`  missing first word "${check.word}" span ${spanStr}: ${rmsStr} [${status}]`);
        } else if (check.type === 'extra-first') {
          let status;
          if (check.isDefect) {
            status = 'FAIL (> -50 dB, audio leaked)';
          } else if (check.isNote) {
            const outRmsStr = Number.isFinite(check.outsideRms) ? `${check.outsideRms.toFixed(1)} dB` : '-inf dB';
            const outSpanStr = `${check.outsideSpan[0].toFixed(3)}s-${check.outsideSpan[1].toFixed(3)}s`;
            status = `NOTE (ASR timing artifact; outside gap ${outSpanStr} is ${outRmsStr} <= -50 dB; isolated transcript confirmed edge)`;
          } else {
            status = 'PASS (gap is silent)';
          }
          console.log(`  extra first word "${check.word}" span ${spanStr}: ${rmsStr} [${status}]`);
        } else if (check.type === 'missing-last') {
          const status = check.isDefect ? 'FAIL (< -50 dB, audio is silent)' : 'PASS (speech present)';
          console.log(`  missing last word "${check.word}" span ${spanStr}: ${rmsStr} [${status}]`);
        } else if (check.type === 'extra-last') {
          let status;
          if (check.isDefect) {
            status = 'FAIL (> -50 dB, audio leaked)';
          } else if (check.isNote) {
            const outRmsStr = Number.isFinite(check.outsideRms) ? `${check.outsideRms.toFixed(1)} dB` : '-inf dB';
            const outSpanStr = `${check.outsideSpan[0].toFixed(3)}s-${check.outsideSpan[1].toFixed(3)}s`;
            status = `NOTE (ASR timing artifact; outside gap ${outSpanStr} is ${outRmsStr} <= -50 dB; isolated transcript confirmed edge)`;
          } else {
            status = 'PASS (gap is silent)';
          }
          console.log(`  extra last word "${check.word}" span ${spanStr}: ${rmsStr} [${status}]`);
        }
      }
      console.log('');
    }
  }

  if (defectCount > 0) {
    console.error(`narration:verify: FAIL (${defectCount} edge defect(s) detected)`);
    process.exit(1);
  } else {
    console.log(`narration:verify: PASS (${diffCount} difference(s) noted, 0 edge defects)`);
    process.exit(0);
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('narration-verify.mjs')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
