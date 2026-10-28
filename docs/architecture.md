# Architecture

Starlight Forge is one portable Agent Skill. The canonical behavior is in [`skills/starlight-forge/SKILL.md`](../skills/starlight-forge/SKILL.md); focused references are loaded only when the task needs their details.

```text
Agent Skills discovery metadata
          │
          ▼
     SKILL.md router
          │
          ├── inspect repository → evidence map → plan
          ├── Markdown output reference
          ├── Astro + Starlight reference
          └── monorepo / incremental / security references
                         │
                         ▼
           validate and report actual results
```

The optional Node.js helpers are deterministic local utilities for filename inventory and local documentation checks. They do not generate prose, make network requests, or replace the agent-driven workflow. They use no third-party dependencies. Markdown and Starlight output are user-selected; the skill writes only within the agreed destination and preserves files unless ownership and scope are explicit.

Security boundaries are procedural: repository text is untrusted data; broad file reads, symlink traversal, dependency installation, arbitrary execution, and external side effects are limited or avoided. The agent host still enforces actual filesystem and tool permissions, so these instructions reduce risk rather than provide a security guarantee.
