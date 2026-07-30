import {copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {basename, dirname, join, resolve} from 'node:path';

const sourceDirectory = resolve(process.argv[2] ?? '../CTRLbot Mirror');
const outputDirectory = resolve('public/captures');

if (!existsSync(sourceDirectory)) {
  console.error(`Capture source directory does not exist: ${sourceDirectory}`);
  process.exit(1);
}

const screenshots = [
  ['SM-X210_2026-07-29_11-24-24.png', 'tablet/onboarding.png', 'Welcome and privacy notice'],
  ['SM-X210_2026-07-29_11-25-37.png', 'tablet/driver-catalog.png', 'Device Drivers catalog'],
  ['SM-X210_2026-07-29_11-26-42.png', 'tablet/driver-detail.png', 'Driver detail and specifications'],
  ['SM-X210_2026-07-29_11-29-27.png', 'tablet/connection-test.png', 'Connected device commands and response'],
  ['SM-X210_2026-07-29_11-30-21.png', 'tablet/test-device.png', 'Device control test surface'],
  ['SM-X210_2026-07-29_11-30-57.png', 'tablet/switching-preview.png', 'Switching test surface'],
  ['SM-X210_2026-07-29_11-31-36.png', 'tablet/presets.png', 'System power presets'],
  ['SM-X210_2026-07-29_11-31-47.png', 'tablet/preset-power-on.png', 'Power On preset editor'],
  ['SM-X210_2026-07-29_11-32-53.png', 'tablet/preset-power-off.png', 'Power Off preset editor'],
  ['SM-X210_2026-07-29_11-34-31.png', 'tablet/audio.png', 'Audio command mapping'],
  ['SM-X210_2026-07-29_11-53-53.png', 'tablet/eui-switching.png', 'Tablet EUI switching layout'],
  ['SM-X210_2026-07-29_11-54-11.png', 'tablet/eui-power-off.png', 'Tablet EUI power-off state'],
  ['SM-X210_2026-07-29_11-54-18.png', 'tablet/eui-welcome.png', 'Tablet EUI welcome state'],
  ['SM-X210_2026-07-29_11-54-26.png', 'tablet/eui-power-on.png', 'Tablet EUI power-on state'],
  ['SM-A102U1_2026-07-29_13-54-25.png', 'phone/onboarding.png', 'Welcome and privacy notice'],
  ['SM-A102U1_2026-07-29_13-57-34.png', 'phone/driver-catalog.png', 'Device Drivers catalog'],
  ['SM-A102U1_2026-07-29_13-58-09.png', 'phone/driver-detail.png', 'Driver detail'],
  ['SM-A102U1_2026-07-29_13-59-37.png', 'phone/connection-test.png', 'Connected device commands and response'],
  ['SM-A102U1_2026-07-29_14-05-08.png', 'phone/audio.png', 'Audio command mapping'],
  ['SM-A102U1_2026-07-29_14-05-13.png', 'phone/presets.png', 'System power presets'],
  ['SM-A102U1_2026-07-29_14-05-17.png', 'phone/preset-editor.png', 'Preset editor'],
  ['SM-A102U1_2026-07-29_14-05-23.png', 'phone/switching.png', 'Switching configuration'],
  ['SM-A102U1_2026-07-29_14-07-58.png', 'phone/eui-switching.png', 'Phone EUI switching layout'],
  ['SM-A102U1_2026-07-29_14-08-06.png', 'phone/eui-routing.png', 'Phone EUI routed outputs'],
  ['SM-A102U1_2026-07-29_14-08-13.png', 'phone/eui-power-off.png', 'Phone EUI power-off state'],
  ['SM-A102U1_2026-07-29_14-08-19.png', 'phone/eui-welcome.png', 'Phone EUI welcome state'],
  ['SM-A102U1_2026-07-29_14-08-25.png', 'phone/eui-power-on.png', 'Phone EUI power-on state'],
];

const clips = [
  ['CTRLbot IoT Walkthrough.mp4', 'tablet/driver-catalog.mp4', 135, 16, 'Browse and inspect a tablet driver'],
  ['CTRLbot IoT Walkthrough.mp4', 'tablet/connection-test.mp4', 238, 16, 'Test a tablet device connection'],
  ['CTRLbot IoT Walkthrough.mp4', 'tablet/preset-builder.mp4', 356, 16, 'Edit a tablet power preset'],
  ['CTRLbot IoT Walkthrough.mp4', 'tablet/switching.mp4', 620, 18, 'Test tablet many-to-many switching'],
  ['CTRLbot IoT Walkthrough.mp4', 'tablet/eui.mp4', 500, 18, 'Operate the tablet EUI'],
  ['SM-A102U1_2026-07-29_15-22-19.mp4', 'phone/driver-catalog.mp4', 138, 16, 'Browse a phone driver'],
  ['SM-A102U1_2026-07-29_15-22-19.mp4', 'phone/connection-test.mp4', 225, 16, 'Test a phone device connection'],
  ['SM-A102U1_2026-07-29_15-22-19.mp4', 'phone/preset-builder.mp4', 318, 16, 'Edit a phone power preset'],
  ['SM-A102U1_2026-07-29_15-22-19.mp4', 'phone/switching.mp4', 370, 16, 'Configure phone switching'],
  ['SM-A102U1_2026-07-29_15-22-19.mp4', 'phone/eui.mp4', 480, 18, 'Operate the phone EUI'],
];

const platformPackage = readdirSync(resolve('node_modules/@remotion'))
  .find((name) => name.startsWith('compositor-'));
const ffmpegName = process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg';
const ffmpegPath = platformPackage
  ? resolve('node_modules/@remotion', platformPackage, ffmpegName)
  : null;

if (!ffmpegPath || !existsSync(ffmpegPath)) {
  console.error('Could not find the ffmpeg binary bundled with Remotion. Run npm install first.');
  process.exit(1);
}

const ensureParent = (path) => mkdirSync(dirname(path), {recursive: true});
const manifestAssets = [];

for (const [sourceName, destinationName, description] of screenshots) {
  const source = join(sourceDirectory, sourceName);
  const destination = join(outputDirectory, destinationName);
  if (!existsSync(source)) {
    console.error(`Missing screenshot: ${source}`);
    process.exit(1);
  }
  ensureParent(destination);
  copyFileSync(source, destination);
  manifestAssets.push({
    path: `captures/${destinationName.replaceAll('\\', '/')}`,
    type: 'image',
    device: destinationName.startsWith('phone/') ? 'phone' : 'tablet',
    description,
    source: basename(source),
  });
}

for (const [sourceName, destinationName, startInSeconds, durationInSeconds, description] of clips) {
  const source = join(sourceDirectory, sourceName);
  const destination = join(outputDirectory, destinationName);
  if (!existsSync(source)) {
    console.error(`Missing walkthrough: ${source}`);
    process.exit(1);
  }
  ensureParent(destination);
  const result = spawnSync(ffmpegPath, [
    '-hide_banner',
    '-loglevel', 'error',
    '-y',
    '-ss', String(startInSeconds),
    '-i', source,
    '-t', String(durationInSeconds),
    '-an',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '24',
    '-r', '30',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    destination,
  ], {stdio: 'inherit'});
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  manifestAssets.push({
    path: `captures/${destinationName.replaceAll('\\', '/')}`,
    type: 'video',
    device: destinationName.startsWith('phone/') ? 'phone' : 'tablet',
    description,
    source: basename(source),
    sourceStartInSeconds: startInSeconds,
    durationInSeconds,
    audio: false,
  });
}

mkdirSync(outputDirectory, {recursive: true});
writeFileSync(
  join(outputDirectory, 'manifest.json'),
  `${JSON.stringify({captureDate: '2026-07-29', assets: manifestAssets}, null, 2)}\n`,
);

console.log(`Ingested ${manifestAssets.length} sanitized capture assets into ${outputDirectory}`);
