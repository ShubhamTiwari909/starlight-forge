# Roadmap

Implementation status as of **2026-10-28**.

| Phase | Scope | Status / evidence |
| --- | --- | --- |
| 0. Research and scope | Verify skill format, installation surfaces, Starlight conventions, security, name/license limits | Complete for initial research; see [research.md](research.md). Competitive and legal research is explicitly limited. |
| 1. Core skill | Canonical workflow, discovery, evidence, safe Markdown output | Implemented in the skill and references; local structure/link checks are available. |
| 2. Website mode | Starlight guidance, content/config fixture, navigation/search/build instructions | Guidance and illustrative fixture implemented. `astro.config.mjs` passes Node syntax check. Current dependencies did not install during an isolated attempt (no output; stopped), so the Starlight build remains unverified. |
| 3. Security and quality | Hostile fixture, documentation quality criteria, bounded helpers | Implemented with harmless secret-like and injection strings; static checks do not prove model resistance. |
| 4. Plugin packaging | Add GitHub install manifests and per-agent marketplace catalogs | Portable plugin manifest plus Codex, Claude Code, and Copilot CLI catalogs are included. Users are invited to try the published repository link and report their experience. |
| 5. Repository readiness | README, license, contributing, security, changelog, docs, checks | Implemented. No publication, release, or push performed. |

## Acceptance criteria and remaining work

The skill has a canonical spec-shaped folder, both output workflows, safety/traceability guidance, original examples, helper checks, and repository governance files. A test fixture contains a user-authored page to model preservation, and an adversarial fixture contains harmless injection and secret-like values. The automated checks are local and dependency-free.

Remaining validation before a public-ready release: run real Markdown and Starlight documentation tasks in representative repositories; build the Starlight example with current official package versions; complete broader competitor/name research; confirm copyright holder preferences; and review this checkout's hosting/repository settings before release.
