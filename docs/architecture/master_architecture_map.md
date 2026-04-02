# Master Architecture Map

Relative path: `docs/architecture/master_architecture_map.md`

Purpose: This document gives the highest-level architectural map for `agent-browser-tdd-relay`. It explains the relay's purpose, the main loop, the checkpoint workflow rule shared with domain logic, and the major ownership boundaries between domain, application, infrastructure, and process docs. Use it when you need the big-picture structure before diving into module-level or process-level detail.

## Purpose

`agent-browser-tdd-relay` is a bounded relay orchestrator that coordinates:

- Codex implementation work from a brief
- ChatGPT review/next-brief generation through a browser adapter seam
- A mandatory human approval gate before continuation

## Main loop

1. Start from the current brief
2. Run Codex against that brief
3. Persist the slice artifact
4. Submit the artifact to the browser/ChatGPT review seam
5. Parse the review response into recap + next brief
6. Require explicit human approval
7. Continue the next slice or enter checkpoint workflow after 3 approved slices

## Relay workflow rule

The domain layer treats 3 approved slices as the threshold for entering `running_checkpoint`. That rule is the canonical checkpoint workflow and should stay aligned with ritual docs and wrappers.

## Phase model

- `idle`: no active work underway
- `waiting_for_codex`: active brief is ready for implementation
- `waiting_for_chatgpt`: latest slice artifact is awaiting review
- `waiting_for_approval`: recap and next brief are awaiting explicit human approval
- `running_checkpoint`: checkpoint workflow is due before continuing slice work
- `failed`: approval rejection or quit path halted the loop

## Architectural boundaries

- Domain owns pure state transitions and workflow thresholds
- Application owns orchestration between seams
- Infrastructure owns persistence, logging, checkpoint execution seam, and adapter seams
- Process docs own the human operating model layered over those seams
