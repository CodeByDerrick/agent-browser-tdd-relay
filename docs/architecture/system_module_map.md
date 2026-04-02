# System Module Map

Relative path: `docs/architecture/system_module_map.md`

Purpose: This document maps the major modules and seams in `agent-browser-tdd-relay`, including application flow, domain state, infrastructure seams, CLI behavior, and parser responsibilities. Use it when you need to understand where responsibilities live in the codebase and how the process layer overlays those modules.

## Application

- `src/application/orchestrator.ts`
  - Coordinates the relay flow
  - Calls Codex, browser, parser, persistence, and approval seams

## Domain

- `src/domain/types.ts`
  - Defines relay phases, loop mode, approval state, and response contracts
- `src/domain/transitions.ts`
  - Implements the state machine
  - Encodes the 3-slice checkpoint threshold

## Infrastructure

- `src/infra/codex`
  - Codex execution seam and fake implementation
- `src/infra/browser`
  - Browser adapter seam and live stub
- `src/infra/chatgpt`
  - Fake ChatGPT adapter
- `src/infra/persistence`
  - State and artifact storage
- `src/infra/logging`
  - Append-only event log
- `src/infra/checkpoint`
  - Checkpoint runner seam for future ritual execution integration

## CLI and parsing

- `src/cli/approvalGate.ts`
  - Human approval gate with explicit `Y/N/E/R/Q`
- `src/parsers/chatgptBlocks.ts`
  - Parses recap and next-task brief blocks from ChatGPT output

## Process overlay

The docs, prompts, checklists, and skills in this repo wrap the existing seams above. They do not replace the code architecture; they define how humans should operate it consistently.
