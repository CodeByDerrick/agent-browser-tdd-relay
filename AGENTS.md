# Agent Guide

Relative path: `AGENTS.md`
Project: Agent Bridge

Purpose: This document is the top-level operating guide for agents and contributors working in Agent Bridge. It explains the default delivery mode, the relay workflow, the role of rituals, and the core references that anchor work in this repo. Use it as the first stop when deciding how work should be approached and which docs define the current operating model.

## Default delivery mode

- Work from a brief, not a broad feature spec
- Keep briefs as minimal vertical slices
- Optimize for token economy
- Prefer TDD with explicit `red -> green -> verification -> refactor` intent
- Use slice ritual as the normal entrypoint

## Relay Workflow

- `slice ritual`: execute one brief-sized vertical slice
- `checkpoint ritual`: run whenever maintenance or reconciliation is needed
- `milestone ritual`: run at seam boundaries or phase completion
- `reanchor ritual`: run when context needs to be compressed for continuity or handoff

## Ritual expectations

- Rituals are human-invoked wrappers in this repo
- Checklists, prompts, and skills are intended to work together
- The codebase tracks checkpoint cadence in domain logic, while docs and rituals are the system-of-record for how humans operate that workflow
- Planning, history, and wiring docs should be maintained through the relevant rituals rather than by ad hoc drift

## Core references

- [README.md](/e:/build/agent-browser-tdd-relay/README.md)
- [Documentation Guide](/e:/build/agent-browser-tdd-relay/docs/README.md)
- [Project Profile](/e:/build/agent-browser-tdd-relay/docs/project/project_profile.md)
- [Architecture Overview](/e:/build/agent-browser-tdd-relay/docs/architecture/README.md)
- [Development Playbook](/e:/build/agent-browser-tdd-relay/docs/process/development_playbook.md)
- [Workflow Operating Model](/e:/build/agent-browser-tdd-relay/docs/process/workflow_operating_model.md)
- [Documentation Wiring Guide](/e:/build/agent-browser-tdd-relay/docs/process/docs_system_wiring_guide.md)

## Artifact posture

- Keep active context small
- Archive old briefs and packets instead of keeping everything in the active lane
- Prefer derivative relay-specific docs over porting artifact-heavy source-project docs verbatim
