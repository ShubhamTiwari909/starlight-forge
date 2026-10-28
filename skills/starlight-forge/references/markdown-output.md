# Markdown output

1. Inspect the requested output directory and its existing content. If ownership is unclear, propose a new subdirectory. Never overwrite an existing page silently.
2. Select only useful pages: overview/index, setup, architecture, project structure, configuration, development, testing, deployment, troubleshooting, and package/API guides as evidenced. Avoid empty headings and template filler.
3. Use repository-relative source links and relative links between docs. Do not invent line numbers or source locations. Make links descriptive.
4. Keep each page task-oriented and concise. Explain what a developer needs to do and why; cite the relevant source for project-specific details.
5. For generated documentation, create a manifest listing only files the user agrees are skill-managed. On refresh, inspect diffs and preserve user edits. If no manifest exists, ask before replacing any existing page.
6. Validate local Markdown links and source references. Verify commands against the checked-in scripts/configuration and report any link types the checker cannot assess.

`assets/templates/markdown-index.md` is an optional starting structure, not a mandatory page.
