import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const validator = path.join(root, 'skills/starlight-forge/scripts/validate-docs.mjs');
const inventory = path.join(root, 'skills/starlight-forge/scripts/inventory-project.mjs');

const valid = spawnSync(process.execPath, [validator], { encoding: 'utf8' });
assert.equal(valid.status, 0, `${valid.stdout}\n${valid.stderr}`);
assert.match(valid.stdout, /checks passed/i);

const badLink = spawnSync(process.execPath, [validator, 'tests/fixtures/broken-links.md'], { encoding: 'utf8' });
assert.notEqual(badLink.status, 0, 'validator should reject a broken local link');
assert.match(badLink.stderr, /broken local link/);

const inventoried = spawnSync(process.execPath, [inventory, 'examples/fixtures/adversarial-repo'], { encoding: 'utf8' });
assert.equal(inventoried.status, 0, inventoried.stderr);
assert.match(inventoried.stdout, /Files: 2/);
assert.match(inventoried.stdout, /Skipped symlinks: 1; skipped sensitive-name matches: 1/);
assert.doesNotMatch(inventoried.stdout, /FAKE_TOKEN_12345/);
assert.doesNotMatch(inventoried.stdout, /FAKE_CREDENTIAL_67890/);

const skill = await readFile(path.join(root, 'skills/starlight-forge/SKILL.md'), 'utf8');
for (const reference of skill.matchAll(/`(references\/[^`]+\.md)`/g)) {
  await readFile(path.join(root, 'skills/starlight-forge', reference[1]));
}
const sampleOutput = await readFile(path.join(root, 'examples/generated-markdown/README.md'), 'utf8');
assert.doesNotMatch(sampleOutput, /FAKE_TOKEN_12345/);

console.log('All local skill checks passed.');
