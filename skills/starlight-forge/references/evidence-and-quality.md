# Evidence and documentation quality

## Claim traceability

For each meaningful technical claim, keep a nearby source link to the actual workspace manifest or identify the actual source path and symbol. Use line numbers only when read from the current source. Link to the source repository rather than duplicating implementation details. Label architectural interpretation as **Inference** and explain its evidence. State **Unknown** when the repository does not establish a fact.

Build a small claim ledger while planning:

| Claim | Evidence | Confidence |
| --- | --- | --- |
| A package is an application entry point | manifest script and source entry | Observed |
| A module boundary implies a service boundary | imports and deployment config | Inference |

Do not include a claim without a path, inspected configuration, test, or explicit inference rationale. Commands must match scripts or automation. Environment-variable names must be evidenced and values must not be reproduced.

## Review checklist

- Readers can find the right page and follow useful relative links.
- Setup, tests, build, and deployment steps match checked-in evidence.
- Claims, routes, interfaces, dependencies, and diagrams are supported.
- Uncertainty is explicit; no framework-default assumptions are presented as project facts.
- Pages do not repeat one another or merely restate the source tree.
- Existing docs and source files remain untouched unless expressly included in scope.
- No credentials, personal data, unreviewed embeds, or unsafe MDX are introduced.
- Internal links and referenced files resolve.
- Results distinguish **passed**, **failed**, **skipped**, and **not checked**.

When the user asks for a quality review, give specific examples and trace each finding to evidence. Do not claim a numeric quality score unless its rubric and measurements are shown.
