# Ritual Contracts

Relative path: `docs/process/ritual_contracts.md`
Project: Agent Bridge

Purpose: This document defines the stable contracts for the ritual wrappers in Agent Bridge. It clarifies the inputs, outputs, and shared expectations for slice, checkpoint, milestone, and reanchor work, and it explains how lower-level skills are composed beneath the wrappers. Use it when maintaining ritual behavior, onboarding contributors, or reconciling how process assets should coordinate.

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

- current repo state
- recent slices when relevant
- affected docs
- version journal context

Outputs:

- refreshed docs
- reconciliation notes
- checkpoint packet
- commit or version recommendation
- next brief recommendation
- roadmap and backlog maintenance review
- developer journal update when checkpoint narrative matters

## Milestone Ritual

Inputs:

- seam or phase boundary summary
- relevant checkpoint history
- current architecture docs

Outputs:

- refreshed architecture and process docs
- milestone packet
- acceptance and risk note
- milestone version recommendation
- roadmap, changelog, and journal updates for stabilized work

## Reanchor Ritual

Inputs:

- current work state
- open questions
- next action lane

Outputs:

- concise handoff package
- drift watchlist
- resume instructions
- trusted planning and history context

## Shared Wrapper Rule

Every ritual wrapper should reference:

- one primary checklist
- any supporting checklist(s)
- the prompt asset(s) it uses
- the underlying skill(s) it composes
- the expected artifact outputs

Every maintained document should be referenced by at least one ritual wrapper or composed support skill.
