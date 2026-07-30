import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

mkdirSync('out', {recursive: true});

const jobs = [
  ['render:first-use:phone'],
  ['render:first-use:tablet'],
  ['render:overview'],
  ['render:lesson'],
  ['render:short'],
  ['render:thumbnail'],
];

for (const [script] of jobs) {
  const result = spawnSync('npm', ['run', script], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
