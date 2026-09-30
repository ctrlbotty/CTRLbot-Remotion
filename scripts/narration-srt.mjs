// Captions for a long video's landscape cut, as an .srt to upload beside it.
//
//   npm run narration:srt -- <narration.ts> <export> <ingest slug> <out.srt>
//   npm run narration:srt -- src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts \
//     MIRROR_WALKTHROUGH_NARRATION_CLIPS mirror-walkthrough out/mirror-walkthrough.srt
//
// The portrait cut burns its captions in; the landscape cut keeps its frame for the step
// text and ships them as this file. Both come from src/audio/narrationCaptions.ts — the
// recording's word timings moved to where each clip plays — and are paged by the same
// `captionPages`, eight words at most here against six on the burned-in version, because
// a player's caption line is wider than a phone's.
//
// The narration module is transpiled, not bundled: it may hold only `import type`.

import {serializeSrt} from '@remotion/captions';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
import ts from 'typescript';

const [modulePath, exportName, slug, outPath] = process.argv.slice(2);
if (!modulePath || !exportName || !slug || !outPath) {
  console.error('usage: narration:srt -- <narration.ts> <export> <ingest slug> <out.srt>');
  process.exit(2);
}

const load = async (path) => {
  const {outputText} = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

const wordsPath = `ingest/${slug}/captions.json`;
if (!existsSync(wordsPath)) {
  console.error(`  no ${wordsPath}: run npm run ingest:recording for ${slug} first`);
  process.exit(1);
}

const clips = (await load(modulePath))[exportName];
if (!Array.isArray(clips) || clips.length === 0) {
  console.error(`  ${modulePath} exports no clips named ${exportName}`);
  process.exit(1);
}
const {captionsFromClips, captionPages} = await load('src/audio/narrationCaptions.ts');

const captions = captionsFromClips(clips, JSON.parse(readFileSync(wordsPath, 'utf8')));
const lines = captionPages(captions, 8).map((page) => page.words);

mkdirSync(dirname(outPath), {recursive: true});
writeFileSync(outPath, serializeSrt({lines}));
if (!existsSync(outPath)) {
  console.error(`  ${outPath} was not written`);
  process.exit(1);
}
console.log(`  ${outPath}: ${lines.length} captions, ${captions.length} words from ${clips.length} clips`);
