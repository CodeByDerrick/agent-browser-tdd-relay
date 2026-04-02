# Module Responsibility Map

Relative path: `docs/architecture/module_responsibility_map.md`
Project: Agent Bridge

Purpose: This document maps the major modules and seams in Agent Bridge, including application flow, domain state, infrastructure seams, CLI behavior, and parser responsibilities. Use it when you need to understand where responsibilities live in the codebase and how the process layer overlays those modules.

## Application

- `src/application/orchestrator.ts`
  - coordinates the relay flow
  - calls Codex, browser, parser, persistence, and approval seams

## Domain

- `src/domain/types.ts`
  - defines relay phases, loop mode, approval state, and response contracts
- `src/domain/transitions.ts`
  - implements the state machine
  - tracks the checkpoint cadence target

## Infrastructure

- `src/infra/codex`
  - Codex execution seam and fake implementation
- `src/infra/browser`
  - browser adapter seam and live stub
- `src/infra/chatgpt`
  - fake ChatGPT adapter
- `src/infra/persistence`
  - SQLite-backed relay state and audit persistence
  - artifact storage
- `src/infra/logging`
  - file-based append-only audit log compatibility seam
- `src/infra/checkpoint`
  - checkpoint runner seam that archives completed active briefs during checkpoint completion

## CLI and Parsing

- `src/cli/approvalGate.ts`
  - human approval gate with explicit `Y/N/E/R/Q`
- `src/parsers/chatgptBlocks.ts`
  - parses recap and next-task brief blocks from ChatGPT output

## Process Overlay

The docs, prompts, checklists, and skills in this repo wrap the existing seams above. They do not replace the code architecture; they define how humans should operate it consistently.

