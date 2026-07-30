import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

mkdirSync('out', {recursive: true});

for (const script of ['render:first-use:phone', 'render:first-use:tablet']) {
  const result = spawnSync('npm', ['run', script], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
