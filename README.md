# README

Relative path: `README.md`

Purpose: This document introduces `agent-browser-tdd-relay` at a project level. It explains what the relay scaffold does, what is implemented versus intentionally stubbed, how the source tree is organized, and where the process system begins. Use it as the user-facing entrypoint before diving into architecture or workflow details.

# double-loop-relay

A bounded first-pass TypeScript scaffold for a relay orchestrator that coordinates:

- local Codex implementation execution
- cloud ChatGPT architecture/review messaging via a browser adapter seam
- a **mandatory human CLI approval gate**

## Runtime approval rule (critical)

This scaffold intentionally requires explicit human approval (`Y/N/E/R/Q`) before advancing from `waiting_for_approval`.
There is no runtime auto-approval or autonomous continuation.

## Implementation boundaries for this pass

Implemented:

- pure domain state model + transitions
- durable local state file (`relay_state.json`)
- append-only event log (`relay_events.ndjson`)
- artifact writing helpers
- CLI approval gate with injected I/O
- fake Codex and fake ChatGPT/browser adapters
- orchestrator flow using these fake adapters
- Vitest unit + integration tests

Intentionally stubbed / bounded:

- `CodexRpcClient` is a stub
- live browser adapter is a stub seam, not production automation
- no GUI, no cloud deployment, no DB, no autonomous runtime loops, no concurrency system

## Project layout

- `src/domain`: types and pure transitions
- `src/infra/persistence`: state and artifact storage
- `src/infra/logging`: NDJSON event log
- `src/cli`: approval gate
- `src/infra/codex`: pluggable codex seams and fake CLI implementation
- `src/infra/browser`: browser seam and live stub
- `src/infra/chatgpt`: fake chatgpt/browser adapter
- `src/application`: orchestrator
- `tests/unit`, `tests/integration`

## Operating model

This repo includes a lean ritual-driven process layer for TDD work:

- briefs are minimal vertical slices
- slice ritual is the default implementation entrypoint
- checkpoint ritual runs after every 3 approved slices
- milestone ritual runs at seam or phase boundaries
- reanchor ritual compresses context for continuity
- roadmap/backlog/history docs keep planning and execution aligned without drift

Start with:

- [AGENTS.md](/e:/build/agent-browser-tdd-relay/AGENTS.md)
- [development_playbook.md](/e:/build/agent-browser-tdd-relay/docs/process/development_playbook.md)
- [relay_workflow_operating_model.md](/e:/build/agent-browser-tdd-relay/docs/process/relay_workflow_operating_model.md)
- [docs_system_wiring_guide.md](/e:/build/agent-browser-tdd-relay/docs/process/docs_system_wiring_guide.md)
