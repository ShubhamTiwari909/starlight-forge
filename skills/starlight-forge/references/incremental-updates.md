# Incremental documentation updates

When asked to refresh docs after source changes:

1. Read the existing documentation and any generated-file manifest. Compare source changes with the claims and pages that depend on them.
2. Build an impact map from changed source files to docs using links, a manifest, or inspected content. Do not regenerate unrelated pages by default.
3. Preserve edits outside the requested scope. Review the diff before saving; ask before overwriting an existing user-authored page.
4. Recheck every changed claim and the links/commands affected by the source change. Mark unresolved drift and uncertainty.
5. Update the manifest only for files the user agreed are generated/managed. If no ownership evidence exists, propose a new path or ask before taking ownership.

Do not describe docs as automatically synchronized or drift-free; this workflow runs only when requested or when the active agent is instructed to maintain them.
