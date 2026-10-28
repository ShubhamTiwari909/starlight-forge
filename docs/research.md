# Research notes

Checked: **2026-10-28**. Technical choices are based on official documentation where available. Documentation and installation details can change; recheck before a public release.

## Agent Skills format

The [Agent Skills specification](https://agentskills.io/specification) defines a skill as a directory with a required `SKILL.md`; the document starts with YAML frontmatter and Markdown instructions. `name` and `description` are required. Names are lowercase alphanumeric/hyphen, 1–64 characters, no edge/consecutive hyphens, and match the parent directory; descriptions are nonempty and at most 1,024 characters. `license`, `metadata`, and experimental `allowed-tools` are optional. References, scripts, and assets are supported directories. The implementation uses only the portable required fields plus an optional MIT license.

## Installation and discovery research

| Agent | Official source checked | Documented path / behavior |
| --- | --- | --- |
| Codex | [Codex Skills](https://developers.openai.com/codex/skills), [OpenAI Skills](https://developers.openai.com/api/docs/guides/tools-skills) | Skills are directories with `SKILL.md`; user-level and repository skill directories are supported. Copying into a skills directory is documented. |
| Claude Code | [Claude Code Skills](https://code.claude.com/docs/en/skills) | Project `.claude/skills/<name>/SKILL.md`, personal `~/.claude/skills/<name>/SKILL.md`; skills are invokable by slash command. |
| Cursor | [Cursor Agent Skills](https://cursor.com/docs/skills) | `.cursor/skills/<name>/SKILL.md` and personal `~/.cursor/skills/`; folder discovery on startup, manual slash invocation. Repository import from GitHub requires a plugin/marketplace. |
| GitHub Copilot | [Adding Agent Skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills), [CLI commands](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | Project `.github/skills`, `.claude/skills`, or `.agents/skills`; personal `~/.copilot/skills` or `~/.agents/skills` on supported surfaces. CLI offers `/skills add` and `/skills list`. Paths vary across Copilot surfaces. |
| Gemini CLI | [Agent Skills](https://geminicli.com/docs/cli/skills/), [Getting started](https://geminicli.com/docs/cli/tutorials/skills-getting-started/) | `.gemini/skills/<name>/SKILL.md` and `.agents/skills` alias; user/workspace scopes; `gemini skills install`, `/skills list`, `/skills reload`; workspace trust affects loading. |
| OpenCode | [Agent Skills](https://opencode.ai/docs/skills) | Project `.opencode/skills`, `.claude/skills`, `.agents/skills`; global `~/.config/opencode/skills`, `~/.claude/skills`, `~/.agents/skills`; permissions can hide/block loading. |

The table above records official installation and discovery documentation. It does not report user testing. Community installation tools are optional and are not required or endorsed here.

## Plugin packaging and GitHub installation

Checked: **2026-10-28**. The [OpenAI plugin packaging guide](https://developers.openai.com/plugins/build/plugins) documents the portable Agent Plugins manifest at the repository/plugin root, skills under `skills/`, and repository marketplaces under `.agents/plugins/marketplace.json`. [Claude Code plugin documentation](https://code.claude.com/docs/en/plugins/create) uses `.claude-plugin/plugin.json` with skills under the plugin root; its [marketplace guide](https://code.claude.com/docs/en/plugin-marketplaces) supports GitHub repositories and marketplace files under `.claude-plugin/`. [GitHub Copilot CLI plugin docs](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) support root plugin manifests, direct installation from `OWNER/REPO`, and marketplace catalogs under `.github/plugin/` or `.claude-plugin/`.

This repository now carries the portable root manifest and all three marketplace manifests. The install commands are documented in the README. No runtime installation has been performed in Codex, Claude Code, or Copilot CLI; users can try them after the repository is on GitHub and report issues through its issue tracker.

## Astro + Starlight

Sources checked on 2026-10-28:

- [Starlight Getting Started](https://starlight.astro.build/getting-started/) — official create commands include `npm create astro@latest -- --template starlight`, `pnpm create astro --template starlight`, and Yarn. Start with official supported runtime requirements at time of use; this skill avoids hard-coded minimum versions.
- [Starlight Markdown authoring](https://starlight.astro.build/guides/authoring-content/) and [frontmatter reference](https://starlight.astro.build/reference/frontmatter/) — docs use Markdown/MDX; each page needs `title`, with `description` supported; content goes in the docs content collection.
- [Sidebar navigation](https://starlight.astro.build/guides/sidebar/) — configure links/groups through `starlight.sidebar` in Astro config or use appropriate generated navigation. Internal docs links accept a page slug string or a `{ slug }` object.
- [Site search](https://starlight.astro.build/guides/site-search/) — built-in Pagefind search is available.
- [Astro installation](https://docs.astro.build/en/install-and-setup/) and [develop/build](https://docs.astro.build/en/develop-and-build/) — on the date checked, the official install page lists Node.js `v22.23.4` or higher and excludes odd-numbered releases. Project runtime and commands are version-sensitive, so recheck official guidance and the generated project manifest before describing them. The default shell Node is `v22.14.0`, but a bundled Node `v24.22.1` is available. An isolated attempt to install current Astro/Starlight dependencies produced no output and was stopped; the site build is unverified.

The example site is a minimal content/config fixture, not a dependency-pinned project or deployed website. No Starlight build is claimed until actually run.

## Existing tools and positioning

The landscape includes code documentation generators, hosted codebase Q&A/wiki tools, and codebase documentation research such as [CodeWiki (research paper)](https://arxiv.org/abs/2510.24428). These systems differ in automation, hosting, indexing, language coverage, and output. Starlight Forge's chosen focus is an agent-native workflow that inspects evidence, adapts an output plan, supports both Markdown and Starlight, and preserves user-owned docs. This is a product scope statement, not a claim of uniqueness or superiority. This first research pass is not an exhaustive competitive benchmark.

## Security decisions

[OWASP's prompt injection guidance](https://genai.owasp.org/glossary/prompt-injection/) explains indirect injection through external and repository content and notes that prompt hardening cannot eliminate the risk. Accordingly, the skill treats repository content as untrusted, limits inspection and execution, excludes likely secrets, constrains writes, and avoids promising immunity. [OWASP prevention guidance](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) supports layered controls, least privilege, and treating model output as untrusted downstream.

## Name and license

“Starlight Forge” is retained as the working name requested in the plan. An exact-phrase search on 2026-10-28 found other uses, including an established game modification and an indexed U.S. trademark record for jewelry (serial `99632464`; [third-party record](https://trademarks.justia.com/996/32/starlight-99632464.html)). The [USPTO trademark search](https://tmsearch.uspto.gov/) is the primary source to check current records; its application renders client-side and the record was not independently confirmed in this research pass. There is also a company with that name in an indexed company directory. These results are a naming collision signal, not an assessment of likelihood of confusion or of rights for software. No comprehensive GitHub, domain, international registry, or trademark clearance search was completed. Keep the name as a working label only; do not describe it as available or cleared before a comprehensive review.

The text, examples, and templates in this repository are original. MIT is used as a permissive default for this repository, with no third-party assets or copied implementation snippets included. Maintainers should confirm contributor/copyright preferences before a public release.
