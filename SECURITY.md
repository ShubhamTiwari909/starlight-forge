# Security policy

Starlight Forge is an instruction set and optional local helper scripts for coding agents. Its security scope includes safe repository discovery, bounded file handling, generated-document review, and avoiding unapproved side effects. It does not control the agent host's permissions and cannot guarantee protection from prompt injection or secret exposure.

## Reporting a vulnerability

Please do not put an unpatched vulnerability or private repository data in a public issue. Use GitHub's private vulnerability reporting feature if it is enabled for this repository. Otherwise, contact the repository maintainers through a private channel listed on the repository profile. This project currently has no published private contact address.

Include the affected file/version, impact, reproduction steps using harmless data, and a suggested mitigation if available. Do not include real credentials or third-party personal data.

## Handling guidance

Review the skill and scripts before installation. Do not grant broad tool permissions solely because a skill requests them. Follow the local agent's permission controls and review file changes before accepting. See `skills/starlight-forge/references/security-guidelines.md` for the workflow safeguards.
