#!/usr/bin/env node

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const defaultRoots = ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CHANGELOG.md', 'docs', 'skills', 'examples'];
const inputPaths = process.argv.slice(2).length ? process.argv.slice(2) : defaultRoots;
const errors = [];

async function markdownFiles(target) {
  const absolute = path.resolve(repoRoot, target);
  if (!absolute.startsWith(repoRoot + path.sep) && absolute !== repoRoot) {
    errors.push(`Outside repository: ${target}`);
    return [];
  }
  let info;
  try { info = await stat(absolute); } catch { errors.push(`Missing path: ${target}`); return []; }
  if (info.isFile()) return absolute.endsWith('.md') || absolute.endsWith('.mdx') ? [absolute] : [];
  if (!info.isDirectory()) return [];
  const found = [];
  for (const ent of await readdir(absolute, { withFileTypes: true })) {
    if (ent.isSymbolicLink() || ['node_modules', '.git', 'dist', 'build'].includes(ent.name)) continue;
    const child = path.join(absolute, ent.name);
    if (ent.isDirectory()) found.push(...await markdownFiles(child));
    else if (ent.isFile() && /\.mdx?$/.test(ent.name)) found.push(child);
  }
  return found;
}

const files = [...new Set((await Promise.all(inputPaths.map(markdownFiles))).flat())].sort();
for (const file of files) {
  const content = await readFile(file, 'utf8');
  const noCode = content.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
  const relFile = path.relative(repoRoot, file);
  const linkPattern = /!??\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)|<((?:\.\.?\/)[^>]+)>/g;
  let match;
  while ((match = linkPattern.exec(noCode))) {
    const href = (match[1] ?? match[2]).replace(/^<|>$/g, '');
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(href)) continue;
    const [pathname, fragment] = decodeURIComponent(href).split('#', 2);
    const base = path.resolve(path.dirname(file), pathname || path.basename(file));
    let candidates = [base];
    if (pathname.endsWith('/')) candidates.push(path.join(base, 'index.md'), path.join(base, 'README.md'), path.join(base, 'index.mdx'));
    try {
      const existing = await Promise.all(candidates.map(async (candidate) => {
        try {
          const info = await stat(candidate);
          return info.isFile() || (info.isDirectory() && !fragment) ? candidate : null;
        } catch { return null; }
      }));
      const found = existing.find(Boolean);
      if (!found) errors.push(`${relFile}: broken local link ${href}`);
      else if (fragment) {
        const targetText = await readFile(found, 'utf8');
        const ids = new Set([...targetText.matchAll(/^#{1,6}\s+(.+)$/gm)].map((heading) => heading[1].trim().toLowerCase().replace(/[^\p{L}\p{N} -]/gu, '').replace(/\s+/g, '-')));
        if (ids.size && !ids.has(decodeURIComponent(fragment).toLowerCase())) errors.push(`${relFile}: missing heading #${fragment} in ${path.relative(repoRoot, found)}`);
      }
    } catch {
      errors.push(`${relFile}: invalid local link ${href}`);
    }
  }
}

const skillPath = path.join(repoRoot, 'skills/starlight-forge/SKILL.md');
try {
  const text = await readFile(skillPath, 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!frontmatter) errors.push('SKILL.md must begin with YAML frontmatter');
  else {
    const name = frontmatter[1].match(/^name:\s*([^\r\n]+)$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (name !== 'starlight-forge') errors.push('SKILL.md name must match its directory: starlight-forge');
    if (!name || name.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) errors.push('SKILL.md name does not meet Agent Skills naming rules');
    if (!description || description.length > 1024) errors.push('SKILL.md needs a description of 1–1024 characters');
    if (!frontmatter[2].trim()) errors.push('SKILL.md body must not be empty');
  }
} catch { errors.push('Missing canonical skills/starlight-forge/SKILL.md'); }

if (errors.length) {
  console.error(`Documentation validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Documentation checks passed for ${files.length} Markdown files.`);
  console.log('Checks cover local file links and basic Agent Skills frontmatter only.');
}
