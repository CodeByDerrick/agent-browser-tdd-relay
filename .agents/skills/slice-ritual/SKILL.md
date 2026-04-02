# Slice Ritual

Relative path: `.agents/skills/slice-ritual/SKILL.md`
Project: Agent Bridge

Purpose: This ritual wrapper is the normal entrypoint for implementing a minimal vertical slice in Agent Bridge. Use it when an active brief is ready for execution. It coordinates the slice checklist, the slice execution prompt, and the `tdd-feature-slice` support skill while keeping scope bounded and token-efficient.

## Use when

- there is an active brief
- the next action should be a minimal vertical slice

## References

- [slice-ritual-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/slice-ritual-checklist.md)
- [tdd-feature-slice skill](/e:/build/agent-browser-tdd-relay/.agents/skills/tdd-feature-slice/SKILL.md)
- [slice_brief_execution.md](/e:/build/agent-browser-tdd-relay/automation/prompts/slice_brief_execution.md)

## Composed skills

- `tdd-feature-slice`: primary execution skill for implementing the brief

## Workflow

1. Validate the brief against the slice ritual checklist.
2. Call `tdd-feature-slice` to run the brief with TDD discipline and minimal context.
3. Capture the slice result, report, and next brief candidate.
4. If cadence is due or maintenance needs surfaced, recommend `checkpoint-ritual` before continuing deeper slice work.
