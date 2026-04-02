# Workflow Contracts

Relative path: `docs/architecture/workflow_contracts.md`
Project: Agent Bridge

Purpose: This document defines the important human-facing contracts that sit around the relay flow, including briefs, structured review responses, checkpoint outputs, and milestone outputs. Use it when clarifying what kinds of artifacts the relay and rituals are expected to produce and how planning and history docs connect to those outputs.

## Brief Contract

Each active brief should be a minimal vertical slice and include only:

- brief title
- target slice
- failing-test intent
- success criteria
- touched seam(s)
- evidence expected

## Review Response Contract

The relay expects structured ChatGPT output containing:

- `RECAP`
- `NEXT_TASK_BRIEF`
- optional `ARCHITECTURE_NOTES`

## Relay Workflow Artifacts

The operating model recognizes these artifact classes:

- slice brief
- slice report
- checkpoint packet
- milestone packet
- reanchor package
- version journal entry

## Checkpoint Contract

Checkpoint ritual inputs:

- current repo state
- recent approved slice outcomes when relevant
- current architecture and process docs
- outstanding reconciliation gaps

Checkpoint ritual outputs:

- refreshed docs
- repo reconciliation notes
- checkpoint packet
- commit recommendation
- version journal entry
- next brief recommendation

## Milestone Contract

Milestone ritual inputs:

- seam boundary or phase boundary summary
- relevant slice and checkpoint history
- current architecture and process docs

Milestone ritual outputs:

- architecture reconciliation
- milestone packet
- acceptance and risk notes
- versioning recommendation
- next-phase brief or seam brief
