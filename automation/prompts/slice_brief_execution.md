# Slice Brief Execution Prompt

Relative path: `automation/prompts/slice_brief_execution.md`

Purpose: This prompt frames how a minimal brief should be executed in `agent-browser-tdd-relay`. Use it as the compact instruction layer beneath slice ritual so the work stays bounded, token-efficient, and TDD-driven. It should reinforce the repo's preferred delivery pattern without repeating the full operating model.

Use this prompt when running the default slice ritual.

## Prompt

Implement the brief as one minimal vertical slice using TDD.

Requirements:

- optimize for token economy
- keep scope limited to the brief
- start from red, move to green, perform verification, and refactor only if justified
- note the seam(s) touched
- produce concise evidence
- return a minimal next brief candidate
