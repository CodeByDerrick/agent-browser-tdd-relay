# Agent Bridge

Relative path: `README.md`
Project: Agent Bridge

Purpose: This document introduces Agent Bridge at a project level. It explains what the current scaffold does, what is implemented versus intentionally stubbed, and where to start in the maintained documentation set.

Agent Bridge is a bounded TypeScript scaffold for a relay orchestrator that coordinates:

- local Codex implementation execution
- cloud ChatGPT architecture and review messaging through a browser adapter seam
- a mandatory human CLI approval gate

## Runtime Approval Rule

This scaffold intentionally requires explicit human approval (`Y/N/E/R/Q`) before advancing from `waiting_for_approval`.
There is no runtime auto-approval or autonomous continuation.

## Current Implementation Boundaries

Implemented:

- pure domain state model and transitions
- durable SQLite-backed relay state persistence
- append-only SQLite-backed audit log
- artifact writing helpers
- CLI approval gate with injected I/O
- fake Codex and fake ChatGPT/browser adapters
- orchestrator flow using these fake adapters
- Vitest unit coverage for transition behavior

Intentionally stubbed or bounded:

- `CodexRpcClient` is a stub
- live browser adapter is a stub seam, not production automation
- checkpoint execution is a human-invoked maintenance workflow
- no GUI, cloud deployment, autonomous runtime loop, or concurrency system yet

## Runtime Layout

- `src/domain`: types and pure transitions
- `src/infra/persistence`: SQLite-backed state and audit persistence plus artifact storage
- `src/infra/logging`: file-based audit log compatibility seam
- `src/cli`: approval gate
- `src/infra/codex`: pluggable Codex seams and fake CLI implementation
- `src/infra/browser`: browser seam and live stub
- `src/infra/chatgpt`: fake ChatGPT/browser adapter
- `src/application`: orchestrator
- `tests/unit`

## Operating Model

This repo includes a lean ritual-driven process layer for TDD work:

- briefs are minimal vertical slices
- slice ritual is the default implementation entrypoint
- checkpoint ritual is operator-invoked whenever maintenance is needed
- milestone ritual runs at seam or phase boundaries
- reanchor ritual compresses context for continuity
- the 3-slice checkpoint cadence is a tracking target, not a hard runtime gate
- roadmap, backlog, and history docs keep planning and execution aligned without drift

Start with:

- [AGENTS.md](/e:/build/agent-browser-tdd-relay/AGENTS.md)
- [Project Profile](/e:/build/agent-browser-tdd-relay/docs/project/project_profile.md)
- [Development Playbook](/e:/build/agent-browser-tdd-relay/docs/process/development_playbook.md)
- [Workflow Operating Model](/e:/build/agent-browser-tdd-relay/docs/process/workflow_operating_model.md)
- [Documentation Wiring Guide](/e:/build/agent-browser-tdd-relay/docs/process/docs_system_wiring_guide.md)
