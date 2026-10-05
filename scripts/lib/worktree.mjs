// Clean worktrees for verification: HEAD of the main checkout plus exactly the files under
// test, so another lane's half-finished edits never reach a check, a still or a render, and
// no lane has to stop while another is verified. Found in the 2026-10-02 walkthrough run,
// where freezing every worker for each review had been most of the coordination cost.
//
// They live beside the repository, in `<repo>.worktrees/<name>`, never inside it: an agent
// searching the repository must not find a second copy of `src/` to edit. node_modules is
// shared through a junction, which needs no admin rights on Windows.

import {copyFileSync, existsSync, mkdirSync, symlinkSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {basename, dirname, join} from 'node:path';

const git = (cwd, ...args) => {
  const result = spawnSync('git', args, {cwd, encoding: 'utf8'});
  if (result.status !== 0) throw new Error(`git ${args.join(' ')}: ${(result.stderr || '').trim()}`);
  return result.stdout.trim();
};

/** The main checkout — the first worktree git lists — whichever checkout this runs from. */
export const mainCheckout = (cwd = process.cwd()) => {
  const first = git(cwd, 'worktree', 'list', '--porcelain')
    .split('\n')
    .find((line) => line.startsWith('worktree '));
  return first.slice('worktree '.length);
};

export const checkoutRoot = (cwd = process.cwd()) => git(cwd, 'rev-parse', '--show-toplevel');

/** A detached worktree at `base`, reset and cleaned of untracked source, node_modules linked. */
export const cleanWorktree = (name, base = 'HEAD') => {
  const main = mainCheckout();
  const rev = git(main, 'rev-parse', base);
  const path = join(dirname(main), `${basename(main)}.worktrees`, name);
  if (!existsSync(path)) {
    mkdirSync(dirname(path), {recursive: true});
    git(main, 'worktree', 'add', '--detach', path, rev);
  } else {
    git(path, 'checkout', '-q', '-f', '--detach', rev);
    // out/ is ignored and survives, so earlier renders and stills stay available.
    git(path, 'clean', '-q', '-fd', '--', 'src', 'public', 'videos', 'scripts');
  }
  const modules = join(path, 'node_modules');
  if (!existsSync(modules)) symlinkSync(join(main, 'node_modules'), modules, 'junction');
  return {main, path, rev: rev.slice(0, 7)};
};

/** Copies repository-relative files from one checkout into another. */
export const copyInto = (from, to, files) => {
  for (const file of files) {
    mkdirSync(dirname(join(to, file)), {recursive: true});
    copyFileSync(join(from, file), join(to, file));
  }
};

export const diffStat = (path) => git(path, 'diff', '--ignore-cr-at-eol', '--stat').split('\n').at(-1) || 'no changes';

/**
 * Runs an npm or npx command line in a checkout. On Windows npm is a .cmd file and only runs
 * through a shell, so arguments must be relative paths without spaces; the checkout's own
 * path, which may contain spaces, is only ever the working directory.
 */
export const run = (cwd, command, {env = {}, log} = {}) => {
  const started = Date.now();
  const result = spawnSync(command, {
    cwd,
    shell: true,
    encoding: 'utf8',
    env: {...process.env, ...env},
    maxBuffer: 256 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  if (log) writeFileSync(log, output);
  return {status: result.status, seconds: Math.round((Date.now() - started) / 1000), output};
};

/** Arguments of the form --name=value, plus the positionals. */
export const parseArgs = (argv) => {
  const options = {};
  const positional = [];
  for (const argument of argv) {
    const match = /^--([^=]+)(?:=(.*))?$/.exec(argument);
    if (match) options[match[1]] = match[2] ?? true;
    else positional.push(argument);
  }
  return {options, positional};
};
