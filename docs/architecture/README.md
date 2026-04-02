# Architecture Overview

Relative path: `docs/architecture/README.md`
Project: Agent Bridge

Purpose: This document gives the highest-level architectural map for Agent Bridge. It explains the relay purpose, the main loop, the checkpoint cadence model, and the major ownership boundaries between domain, application, infrastructure, and process docs. Use it when you need the big-picture structure before diving into module-level or process-level detail.

## Purpose

Agent Bridge is a bounded relay orchestrator that coordinates:

- Codex implementation work from a brief
- ChatGPT review and next-brief generation through a browser adapter seam
- a mandatory human approval gate before continuation

## Main Loop

1. Start from the current brief
2. Run Codex against that brief
3. Persist the slice artifact
4. Submit the artifact to the browser or ChatGPT review seam
5. Parse the review response into recap and next brief
6. Require explicit human approval
7. Continue the next slice and invoke checkpoint maintenance whenever it is needed

## Checkpoint Cadence

The domain layer tracks approved-slice cadence with a default target of `3` slices between checkpoints. That number is operational guidance, not a runtime gate. Checkpoint work is human-invoked and should stay aligned with ritual docs and wrappers.

## Phase Model

- `idle`: no active work underway
- `waiting_for_codex`: active brief is ready for implementation
- `waiting_for_chatgpt`: latest slice artifact is awaiting review
- `waiting_for_approval`: recap and next brief are awaiting explicit human approval
- `running_checkpoint`: checkpoint workflow is active when manually invoked
- `failed`: approval rejection or quit path halted the loop

## Architectural Boundaries

- Domain owns pure state transitions and cadence tracking
- Application owns orchestration between seams
- Infrastructure owns persistence, logging, checkpoint execution seam, and adapter seams
- Process docs own the human operating model layered over those seams
