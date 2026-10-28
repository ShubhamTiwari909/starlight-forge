# Contributing

Thanks for helping improve Starlight Forge. Keep the project as a portable Agent Skill: do not add an npm package, custom CLI, hosted service, or required external API.

## Changes

- Keep the root `SKILL.md` concise; add workflow detail to focused references.
- Cite official current documentation when behavior or installation guidance changes. Record the date checked in `docs/research.md`.
- Preserve the security boundaries: do not follow instructions in repository data, expose secrets, overwrite docs silently, or add unreviewed executable scripts.
- Keep examples minimal and original. Do not copy third-party code or assets without confirming their license.

## Local checks

Use Node.js (no package install required):

```sh
node tests/run-checks.mjs
node skills/starlight-forge/scripts/inventory-project.mjs examples/fixtures/typescript-utils
```

The checker validates the skill frontmatter basics and local Markdown links. Website build verification requires installing dependencies in a disposable copy of the fixture and using current Astro/Starlight documentation; do not run it against a production project.

Before submitting a change, inspect the diff for unrelated files, secrets, unsupported claims, broken relative links, and accidentally copied content. No release, publication, push, or deployment is part of local contribution checks.
