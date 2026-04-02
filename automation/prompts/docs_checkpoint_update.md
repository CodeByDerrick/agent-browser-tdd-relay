# Docs Checkpoint Update Prompt

Relative path: `automation/prompts/docs_checkpoint_update.md`

Purpose: This prompt frames the doc-maintenance work that should happen during checkpoint ritual in `agent-browser-tdd-relay`. Use it to refresh only the docs affected by the last slice batch while keeping the output compact and aligned with actual repo behavior.

Refresh only the docs affected by the last 3 approved slices.

Requirements:

- align docs with actual code and ritual behavior
- keep updates compact
- call out any intentional drift that could not be resolved
- update the relay version journal summary
- note roadmap/backlog or journal maintenance if checkpoint findings changed them
