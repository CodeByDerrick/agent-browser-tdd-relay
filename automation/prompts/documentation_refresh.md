# Documentation Refresh Prompt

Relative path: `automation/prompts/documentation_refresh.md`
Project: Agent Bridge

Purpose: This prompt frames the documentation maintenance work that should happen during checkpoint or milestone refresh work in Agent Bridge. Use it to refresh only the docs affected by the current maintenance pass while keeping the output compact and aligned with actual repo behavior.

Refresh only the docs affected by the current maintenance pass.

Requirements:

- align docs with actual code and ritual behavior
- keep updates compact
- call out any intentional drift that could not be resolved
- update the version journal summary when a real boundary was completed
- note roadmap, backlog, or journal maintenance if the findings changed them
