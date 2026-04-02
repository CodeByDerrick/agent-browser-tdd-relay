# Pipeline Contract Sheet

Relative path: `docs/architecture/pipeline_contract_sheet.md`

Purpose: This document defines the important human-facing contracts that sit around the relay flow, including briefs, structured review responses, checkpoint outputs, and milestone outputs. Use it when clarifying what kinds of artifacts the relay and rituals are expected to produce and how planning/history docs connect to those outputs.

## Brief contract

Each active brief should be a minimal vertical slice and include only:

- brief title
- target slice
- failing-test intent
- success criteria
- touched seam(s)
- evidence expected

## Review response contract

The relay expects structured ChatGPT output containing:

- `RECAP`
- `NEXT_TASK_BRIEF`
- optional `ARCHITECTURE_NOTES`

## Relay workflow artifacts

The operating model recognizes these artifact classes:

- slice brief
- slice report
- checkpoint packet
- milestone packet
- reanchor package
- relay version journal entry

These are conceptual categories for repo operation. Only some of them are runtime-written today.

## Checkpoint contract

Checkpoint ritual inputs:

- current repo state
- last 3 approved slice outcomes
- current architecture/process docs
- outstanding reconciliation gaps

Checkpoint ritual outputs:

- refreshed docs
- repo reconciliation notes
- checkpoint packet
- commit recommendation
- relay version journal entry
- next brief recommendation

## Milestone contract

Milestone ritual inputs:

- seam boundary or phase boundary summary
- relevant slice/checkpoint history
- current architecture/process docs

Milestone ritual outputs:

- architecture reconciliation
- milestone packet
- acceptance/risk notes
- versioning recommendation
- next-phase brief or seam brief
