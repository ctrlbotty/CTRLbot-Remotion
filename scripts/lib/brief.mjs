// Reading a video brief.
//
// A brief is one markdown file: frontmatter a machine reads, prose a person and an agent
// read, and a beats table that is both. The table is the contract — it says what the cut
// is, in order, and what the viewer must actually see in each shot. Everything the gates
// do downstream is derived from it.

import {existsSync, readFileSync} from 'node:fs';

/** `videos/<slug>.md` */
export const briefPath = (slug) => `videos/${slug}.md`;

const parseFrontmatter = (text) => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].trim();
  }
  return fields;
};

/**
 * The beats table, by column name rather than position — so adding a column later does
 * not silently shift every field by one.
 */
const parseBeats = (text) => {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => /^\|\s*id\s*\|/i.test(line));
  if (start === -1) return [];

  const columns = lines[start]
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim().toLowerCase());

  const beats = [];
  for (let index = start + 2; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith('|')) break;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== columns.length) continue;

    const row = Object.fromEntries(columns.map((column, i) => [column, cells[i]]));
    if (!row.id || row.id.startsWith('-')) continue;
    beats.push({
      id: row.id,
      claim: row.claim ?? '',
      surface: (row.surface ?? '').replace(/`/g, ''),
      evidence: row.evidence ?? '',
      seconds: Number(row.sec ?? row.seconds ?? 0),
    });
  }
  return beats;
};

export const readBrief = (slug) => {
  const path = briefPath(slug);
  if (!existsSync(path)) throw new Error(`No brief at ${path}`);
  const text = readFileSync(path, 'utf8');
  const front = parseFrontmatter(text);
  const beats = parseBeats(text);

  // Where each beat starts, and the frame a still should be sampled at.
  // AUTHORING.md: sample about 25 frames in, once the copy has finished staggering —
  // earlier than that and the still shows missing text, which reads as a bug that is
  // not there. That mistake cost a render during this very build.
  let elapsed = 0;
  for (const beat of beats) {
    beat.startSeconds = elapsed;
    elapsed += beat.seconds;
  }

  return {
    slug,
    id: front.id ?? slug,
    destination: front.destination ?? null,
    beats,
    totalSeconds: elapsed,
    raw: text,
  };
};

export const SETTLE_FRAMES = 25;

/**
 * Where to photograph a beat.
 *
 * Two competing constraints. Too early and the copy is still staggering in, so the
 * still shows missing text and reads as a bug that is not there — AUTHORING.md puts
 * that at about 25 frames. But too early also misses the point: the `evidence` column
 * describes the *payoff* — a source going blue, four outputs following, a room powering
 * down — and a payoff never lands on the first frame of its beat.
 *
 * 62% through satisfies both. Copy has long settled, and the state change the beat
 * exists to show has happened.
 */
export const stillFrameFor = (beat, fps) =>
  // The synthetic poster beat is zero-length and means frame 0 exactly.
  beat.seconds === 0
    ? 0
    : Math.round(beat.startSeconds * fps) +
      Math.max(SETTLE_FRAMES, Math.floor(beat.seconds * fps * 0.62));

/**
 * Checks that need only the brief and its destination — no render required, so they can
 * fail in a second rather than after a two-minute encode.
 */
export const validateBrief = (brief, destination) => {
  const problems = [];

  if (!brief.destination) problems.push('frontmatter has no `destination:`');
  if (brief.beats.length === 0) problems.push('no beats table found');

  for (const beat of brief.beats) {
    if (!beat.evidence) {
      problems.push(
        `beat "${beat.id}" has no evidence — a beat with nothing to see is a title card`,
      );
    }
    if (!beat.surface) problems.push(`beat "${beat.id}" names no surface`);
    if (!Number.isFinite(beat.seconds) || beat.seconds <= 0) {
      problems.push(`beat "${beat.id}" has no duration`);
    }
  }

  if (!destination) return problems;

  if (brief.totalSeconds > destination.duration.max) {
    problems.push(
      `beats total ${brief.totalSeconds}s, over the ${destination.duration.max}s ceiling ` +
      `for ${destination.id}`,
    );
  }
  if (brief.totalSeconds < destination.duration.min) {
    problems.push(
      `beats total ${brief.totalSeconds}s, under the ${destination.duration.min}s minimum ` +
      `for ${destination.id}`,
    );
  }

  // first-ten: on an autoplay surface nothing past the first impression is guaranteed to
  // play, so the promise cannot be waiting behind three beats of setup.
  const promise = brief.beats.find((beat) => beat.id === 'promise') ?? brief.beats[0];
  if (promise && promise.startSeconds >= destination.firstImpressionSeconds) {
    problems.push(
      `the promise beat starts at ${promise.startSeconds}s but ${destination.id} only ` +
      `reliably plays the first ${destination.firstImpressionSeconds}s`,
    );
  }

  return problems;
};
