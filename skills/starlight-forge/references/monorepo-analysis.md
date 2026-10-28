# Monorepo analysis

1. Identify workspace roots from package-manager and task-runner configuration (for example `pnpm-workspace.yaml`, `workspaces`, `turbo.json`, or project config).
2. List packages and classify them from their own manifests, entry points, framework configs, and CI tasks. Do not infer runtime dependencies from directory names.
3. Trace shared package edges from declared workspace dependencies and import paths. Distinguish build-time dependencies from runtime/service boundaries.
4. Sample representative packages across distinct application types; do not read every source file. Record any excluded or unexamined packages.
5. Plan a root overview plus package-specific pages only where a package has a distinct developer workflow or interface. Avoid duplicating per-package details in the root page.
6. Verify commands at the root and package level and name the workspace filter syntax only when evidenced.

If package boundaries or ownership are ambiguous, state the uncertainty and keep docs at the verified level.
