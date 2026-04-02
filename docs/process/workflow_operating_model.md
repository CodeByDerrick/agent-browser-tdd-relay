# Workflow Operating Model

Relative path: `docs/process/workflow_operating_model.md`
Project: Agent Bridge

Purpose: This document defines the high-level operating flow for Agent Bridge, including how slice work advances, when checkpoints and milestones happen, and where maintenance and history updates belong. Use it to understand the sequencing of work across implementation, approval, maintenance, and continuity boundaries. It should stay aligned with both the domain transition rules and the surrounding planning and ritual documents.

## Core Workflow

- Slice workflow is the default operating loop
- Checkpoints are operator-invoked when maintenance is needed
- Milestones happen at seam boundaries or phase completions
- Reanchor packages happen when context compression is needed for continuity

## Slice Workflow

Entry condition:

- There is an approved or newly authored brief

Expected outputs:

- updated tests and code
- slice report
- review recap
- next minimal brief
- verification evidence

## Checkpoint Workflow

Trigger:

- operator requests maintenance
- checkpoint cadence target has been reached or exceeded
- docs, planning, or repo state need reconciliation

Expected activities:

- refresh affected docs
- reconcile repo and process drift
- review roadmap and backlog drift
- capture checkpoint packet
- prepare commit recommendation
- update version journal
- update developer journal when checkpoint-level narrative matters
- recommend checkpoint tag or label

## Milestone Workflow

Trigger:

- seam boundary crossed
- major phase completed
- architecture meaningfully changed

Expected activities:

- architecture refresh
- acceptance and risk review
- update roadmap, changelog, and developer journal when milestone outcomes stabilize
- milestone packet
- versioning recommendation

## Reanchor Workflow

Trigger:

- long pause
- handoff
- growing prompt or context cost

Expected activities:

- compress current state into a resumable package
- capture trusted roadmap, backlog, and journal context for restart
- record what is done, what is next, and what must not drift
