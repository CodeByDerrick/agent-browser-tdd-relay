# Ritual Contracts

Relative path: `docs/process/ritual_contracts.md`

Purpose: This document defines the stable contracts for the ritual wrappers in `agent-browser-tdd-relay`. It clarifies the inputs, outputs, and shared expectations for slice, checkpoint, milestone, and reanchor work, and it explains how lower-level skills are composed beneath the wrappers. Use it when maintaining ritual behavior, onboarding contributors, or reconciling how process assets should coordinate.

## Slice Ritual

Inputs:

- active minimal brief
- relevant seam references
- latest state or slice context

Outputs:

- implemented slice
- updated test evidence
- slice report
- next brief candidate
- verification evidence

## Checkpoint Ritual

Inputs:

- last 3 approved slices
- affected docs
- repo state
- relay version journal context

Outputs:

- refreshed docs
- reconciliation notes
- checkpoint packet
- commit/version recommendation
- next brief recommendation
- roadmap/backlog maintenance review
- developer journal update when checkpoint narrative matters

## Milestone Ritual

Inputs:

- seam or phase boundary summary
- relevant checkpoint history
- current architecture docs

Outputs:

- refreshed architecture/process docs
- milestone packet
- acceptance/risk note
- milestone version recommendation
- roadmap/changelog/journal updates for stabilized work

## Reanchor Ritual

Inputs:

- current work state
- open questions
- next action lane

Outputs:

- concise handoff package
- drift watchlist
- resume instructions
- trusted planning/history context

## Shared wrapper rule

Every ritual wrapper should reference:

- one primary checklist
- any supporting checklist(s)
- the prompt asset(s) it uses
- the underlying skill(s) it composes
- the expected artifact outputs
