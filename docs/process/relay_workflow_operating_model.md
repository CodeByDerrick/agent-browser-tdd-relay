# Relay Workflow Operating Model

Relative path: `docs/process/relay_workflow_operating_model.md`

Purpose: This document defines the high-level operating flow for `agent-browser-tdd-relay`, including how slice work advances, when checkpoints and milestones happen, and where maintenance and history updates belong. Use it to understand the sequencing of work across implementation, approval, maintenance, and continuity boundaries. It should stay aligned with both the domain transition rules and the surrounding planning and ritual documents.

## Core relay workflow

- Slice workflow is the default operating loop
- Every 3 approved slices trigger a checkpoint
- Milestones happen at seam boundaries or phase completions
- Reanchor packages happen when context compression is needed for continuity

## Slice workflow

Entry condition:

- There is an approved or newly authored brief

Expected outputs:

- updated tests/code
- slice report
- review recap
- next minimal brief
- verification evidence

## Checkpoint workflow

Trigger:

- 3 approved slices since the last checkpoint

Expected activities:

- refresh affected docs
- reconcile repo/process drift
- review roadmap and backlog drift
- capture checkpoint packet
- prepare commit recommendation
- update relay version journal
- update developer journal when checkpoint-level narrative matters
- recommend checkpoint tag/label

## Milestone workflow

Trigger:

- seam boundary crossed
- major phase completed
- architecture meaningfully changed

Expected activities:

- architecture refresh
- acceptance/risk review
- update roadmap, changelog, and developer journal when milestone outcomes stabilize
- milestone packet
- versioning recommendation

## Reanchor workflow

Trigger:

- long pause
- handoff
- growing prompt/context cost

Expected activities:

- compress current state into a resumable package
- capture the trusted roadmap, backlog, and journal context for restart
- record what is done, what is next, and what must not drift
