#!/usr/bin/env node

import { readdir, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const MAX_ENTRIES = 1200;
const DEFAULT_SKIP_DIRS = new Set([
  '.git', '.hg', '.svn', 'node_modules', 'vendor', 'dist', 'build', 'out',
  'coverage', '.next', '.astro', '.turbo', '.cache', 'target', 'Pods',
]);
const SENSITIVE_NAME = /(^|[._-])(secrets?|credentials?|private[-_.]?keys?|id_rsa|id_ed25519|\.env)([._-]|$)|\.(?:pem|p12|pfx|key|asc)$/i;
const MANIFESTS = new Set([
  'package.json', 'pnpm-workspace.yaml', 'Cargo.toml', 'go.mod', 'pyproject.toml',
  'requirements.txt', 'composer.json', 'Gemfile', 'pom.xml', 'build.gradle',
  'astro.config.mjs', 'astro.config.ts', 'next.config.js', 'next.config.mjs',
  'vite.config.ts', 'tsconfig.json', 'turbo.json', 'Makefile', 'Dockerfile',
]);

const supplied = process.argv[2] ?? '.';
let root;
try {
  root = await realpath(supplied);
  if (!(await stat(root)).isDirectory()) throw new Error('target is not a directory');
} catch (error) {
  console.error(`Cannot inspect target: ${error.message}`);
  process.exit(2);
}

const files = [];
const dirs = [];
const manifests = [];
let examined = 0;
let skippedSensitive = 0;
let skippedSymlinks = 0;
let capped = false;

async function walk(current, relative = '.') {
  let entries;
  try {
    entries = await readdir(current, { withFileTypes: true });
  } catch {
    return;
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    if (++examined > MAX_ENTRIES) {
      capped = true;
      return;
    }
    if (entry.isSymbolicLink()) {
      skippedSymlinks++;
      continue;
    }
    if (SENSITIVE_NAME.test(entry.name)) {
      skippedSensitive++;
      continue;
    }
    const rel = path.posix.join(relative === '.' ? '' : relative, entry.name);
    if (entry.isDirectory()) {
      if (DEFAULT_SKIP_DIRS.has(entry.name)) continue;
      dirs.push(rel);
      await walk(path.join(current, entry.name), rel);
      if (capped) return;
    } else if (entry.isFile()) {
      files.push(rel);
      if (MANIFESTS.has(entry.name) || /^(AGENTS|CLAUDE|CONTRIBUTING)(\.md)?$/i.test(entry.name)) {
        manifests.push(rel);
      }
    }
  }
}

await walk(root);
const extCounts = new Map();
for (const file of files) {
  const ext = path.extname(file).toLowerCase() || '[no extension]';
  extCounts.set(ext, (extCounts.get(ext) ?? 0) + 1);
}

console.log(`# Repository inventory: ${path.basename(root) || root}`);
console.log(`Entries visited: ${Math.min(examined, MAX_ENTRIES)}${capped ? ' (limit reached)' : ''}`);
console.log(`Files: ${files.length}; directories: ${dirs.length}`);
console.log(`Skipped symlinks: ${skippedSymlinks}; skipped sensitive-name matches: ${skippedSensitive}`);
console.log('\n## Top-level directories');
console.log(dirs.filter((dir) => !dir.includes('/')).slice(0, 80).map((dir) => `- ${dir}/`).join('\n') || '- (none)');
console.log('\n## Relevant manifests and guidance (paths only)');
console.log(manifests.slice(0, 160).map((file) => `- ${file}`).join('\n') || '- (none found)');
console.log('\n## File types');
console.log([...extCounts].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([ext, count]) => `- ${ext}: ${count}`).join('\n') || '- (none)');
if (capped) console.log('\nInventory is partial. Narrow the target to a package or subdirectory.');
console.log('\nThis helper lists paths only; inspect selected files before documenting claims.');
