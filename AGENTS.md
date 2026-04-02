# AGENTS

Relative path: `AGENTS.md`

Purpose: This document is the top-level operating guide for agents and contributors working in `agent-browser-tdd-relay`. It explains the default delivery mode, the relay workflow, the role of rituals, and the core references that anchor work in this repo. Use it as the first stop when deciding how work should be approached and which docs define the current operating model.

## Default delivery mode

- Work from a brief, not a broad feature spec
- Keep briefs as minimal vertical slices
- Optimize for token economy
- Prefer TDD with explicit `red -> green -> verification -> refactor` intent
- Use slice ritual as the normal entrypoint

## Relay Workflow

- `slice ritual`: execute one brief-sized vertical slice
- `checkpoint ritual`: run after every 3 approved slices
- `milestone ritual`: run at seam boundaries or phase completion
- `reanchor ritual`: run when context needs to be compressed for continuity or handoff

## Ritual expectations

- Rituals are human-invoked wrappers in this repo
- Checklists, prompts, and skills are intended to work together
- The codebase already enforces checkpoint workflow timing in domain logic; docs and rituals are the system-of-record for how humans operate that workflow
- Planning, history, and wiring docs should be maintained through the relevant rituals rather than by ad hoc drift

## Core references

- [README.md](/e:/build/agent-browser-tdd-relay/README.md)
- [directory_structure.md](/e:/build/agent-browser-tdd-relay/directory_structure.md)
- [master_architecture_map.md](/e:/build/agent-browser-tdd-relay/docs/architecture/master_architecture_map.md)
- [development_playbook.md](/e:/build/agent-browser-tdd-relay/docs/process/development_playbook.md)
- [relay_workflow_operating_model.md](/e:/build/agent-browser-tdd-relay/docs/process/relay_workflow_operating_model.md)
- [docs_system_wiring_guide.md](/e:/build/agent-browser-tdd-relay/docs/process/docs_system_wiring_guide.md)

## Artifact posture

- Keep active context small
- Archive old briefs and packets instead of keeping everything in the active lane
- Prefer derivative relay-specific docs over porting artifact-heavy source-project docs verbatim
