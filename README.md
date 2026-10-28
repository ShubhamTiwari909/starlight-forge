# Starlight Forge

**Explore the code. Map the architecture. Forge the docs.**

Starlight Forge is an open-source coding-agent skill for analyzing software repositories and creating accurate, evidence-backed developer documentation in portable Markdown or Astro + Starlight. It guides the agent to inspect before planning, link claims to source evidence, preserve existing docs, and report validation honestly.

This repository distributes a skill, not a standalone application. There is no npm product, custom CLI, hosted service, or required external AI API. “Starlight Forge” is a working name; preliminary research found unrelated uses and a trademark record in another product category. It is not legal clearance. See [research notes](docs/research.md) before public branding.

## Use the skill

Install the packaged plugin from GitHub using the instructions in [Install as a plugin](#install-as-a-plugin), or install the canonical skill folder [`skills/starlight-forge/`](skills/starlight-forge/) manually using the [skill installation paths](#installation). Review files before installing any third-party skill.

Open the repository you want to document in your coding agent, then invoke the skill directly:

- **Codex:** `$starlight-forge`
- **Claude Code:** `/starlight-forge:starlight-forge`
- **GitHub Copilot CLI:** `/starlight-forge`

Or ask for a task by name. For a Markdown guide, use a prompt like:

> Use Starlight Forge to inspect this repository and create a concise Markdown developer guide in `docs/developer/`. Show me the proposed pages before writing, preserve existing files, and cite source files for important claims.

For an Astro + Starlight site:

> Use Starlight Forge to document this project as an Astro + Starlight site in `website-docs/`. Inspect existing files first, show the plan, then build the site if dependencies are available. Do not deploy it.

If you do not specify a mode, the skill asks whether you want Markdown or Astro + Starlight. For later changes, ask it to refresh only the pages affected by the source changes.

## Output modes

| Mode | Best for | Output |
| --- | --- | --- |
| Markdown | Repository documentation, portability, lightweight review | Linked Markdown pages in an agreed directory |
| Astro + Starlight | Searchable docs site with navigation | Astro project with Starlight content, navigation, and built-in search |

The skill adapts page selection to the project. It does not promise complete architecture recovery, automatic synchronization, or injection-proof behavior. It avoids secret values, respects repository boundaries, treats repository text as untrusted data, and does not silently replace authored docs.

## Installation

All paths below are based on current official agent documentation checked on 2026-10-28. Repository-level locations are only available when the agent opens that repository. User-level locations are personal to that machine/account. Remove by deleting the copied skill directory; update by replacing it with a reviewed copy of the latest repository version. Verify discovery using each agent's documented skill listing/view.

### Codex

Copy `skills/starlight-forge/` into `$CODEX_HOME/skills/starlight-forge/` (normally `~/.codex/skills/starlight-forge/`) for user scope, or into `<project>/.agents/skills/starlight-forge/` for a project. In Codex, invoke `$starlight-forge` or ask for repository documentation. Confirm it appears in available skills. [Official Codex skills guide](https://developers.openai.com/codex/skills) · [OpenAI Codex workflow guidance](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex) · [Agent Skills standard](https://agentskills.io/specification)

### Claude Code

Copy the directory to `<project>/.claude/skills/starlight-forge/` or `~/.claude/skills/starlight-forge/`. Ask Claude Code to use `/starlight-forge` or describe the documentation task. Check the available skills/commands in the running session. [Official Claude Code skills guide](https://code.claude.com/docs/en/skills)

### Cursor

Copy to `<project>/.cursor/skills/starlight-forge/` or `~/.cursor/skills/starlight-forge/`. Cursor discovers project skill folders at startup; invoke `/starlight-forge` in Agent chat or choose the skill in Customize → Skills. Personal skills in Cloud Agents require Cursor's Sync Skills setting; repository skills are appropriate when sharing with the project. Cursor's repository-import flow requires packaging through a plugin/marketplace, so copying is the direct local method. [Official Cursor skills guide](https://cursor.com/docs/skills)

### GitHub Copilot

For repository use, copy to `.github/skills/starlight-forge/`, `.claude/skills/starlight-forge/`, or `.agents/skills/starlight-forge/`. Personal CLI skills can live in `~/.copilot/skills/starlight-forge/` or `~/.agents/skills/starlight-forge/`; supported locations vary by Copilot surface. For Copilot CLI, use `/skills add <path-or-URL>` and `/skills list`. In supported IDE agents, ask for the task or open the skills picker. Do not pre-approve shell tools for this skill. [Official Copilot skill guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) · [Copilot CLI commands](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)

### Gemini CLI

Copy the folder to `<project>/.gemini/skills/starlight-forge/` or `~/.gemini/skills/starlight-forge/`. Gemini CLI also recognizes `.agents/skills/` as an alias. Or install the repository using `gemini skills install <repository-url> --path skills/starlight-forge --scope user` (or `--scope workspace`; check current CLI help for option ordering). Verify in a session with `/skills list`; run `/skills reload` after a change. Workspace skills require a trusted folder. [Official Gemini CLI skills guide](https://geminicli.com/docs/cli/skills/)

### OpenCode

Copy to `<project>/.agents/skills/starlight-forge/` or `~/.agents/skills/starlight-forge/`. OpenCode also searches `.opencode/skills/`, `.claude/skills/`, and its user config skills directory. Ask `@starlight-forge` or invoke the skill by its ID; check skill permissions if it is hidden. [Official OpenCode skills guide](https://opencode.ai/docs/skills)

## Install as a plugin

The repository includes plugin manifests for Codex, Claude Code, and GitHub Copilot CLI. Once this repository is available on GitHub, replace `OWNER/REPO` below with its GitHub owner and repository name.

### Codex

1. Add the repository marketplace:

```sh
codex plugin marketplace add OWNER/REPO
```

2. Open the plugin browser with `/plugins` in Codex, or open the Plugins Directory in the desktop app. If you just added the marketplace, restart the desktop app.
3. Choose the **Starlight Forge** marketplace, select the plugin, and install it. See the [Codex plugin guide](https://developers.openai.com/plugins/build/plugins).

### Claude Code

In a Claude Code session, add the repository marketplace:

```text
/plugin marketplace add OWNER/REPO
```

Then install the plugin:

```text
/plugin install starlight-forge@starlight-forge
```

Review the install details and choose a scope. Confirm it appears in `/plugin` or run `claude plugin list`. See the [Claude Code install guide](https://code.claude.com/docs/en/plugins/install).

### GitHub Copilot CLI

Install directly from the repository:

```sh
copilot plugin install OWNER/REPO
```

Check the installation with `copilot plugin list`; in a session, use `/skills list` to see available skills. See the [Copilot CLI plugin guide](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference).

The plugin packages the existing skill and its reference files. It does not add an MCP server or require a package manager. After the repository is on GitHub, try the relevant install path and share installation or usage feedback through the repository issue tracker.

## Repository contents

- [`skills/starlight-forge/SKILL.md`](skills/starlight-forge/SKILL.md) — canonical workflow.
- [`skills/starlight-forge/references/`](skills/starlight-forge/references/) — focused discovery, evidence, output, monorepo, maintenance, and safety guidance.
- [`examples/`](examples/) — a tiny sample repository, generated Markdown, and Starlight content/config fixture.
- [`tests/`](tests/) and `skills/starlight-forge/scripts/` — structural, link, and inventory checks without third-party runtime dependencies.
- [`docs/`](docs/) — research, architecture, roadmap, and evaluation notes.

## Limitations

Quality depends on the agent's repository access, context, model, and available build environment. The skill may not be discovered unless copied to a supported location and may need adaptation for agent-specific tools. It cannot guarantee that claims are exhaustive, that injection is defeated, or that a website builds without its dependencies. The Starlight fixture is illustrative and does not lock framework versions. Naming research is not trademark clearance.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) for local checks and [SECURITY.md](SECURITY.md) for disclosure guidance. The project is licensed under the MIT License; see [`LICENSE`](LICENSE).
