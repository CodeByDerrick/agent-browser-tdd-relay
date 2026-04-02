# Development Playbook

Relative path: `docs/process/development_playbook.md`

Purpose: This document defines the normal operating behavior for developing `agent-browser-tdd-relay`. It explains the preferred slice-first delivery path, the role of rituals, the wrapper-first skill posture, and how planning, verification, versioning, and maintenance should happen as work moves through the relay workflow. Use this playbook as the default process reference before consulting more specialized ritual, roadmap, or architecture documents.

## Default mode

The default delivery path is:

1. Write or refine a minimal brief
2. Run slice ritual
3. Review the result
4. Approve or redirect
5. After 3 approved slices, run checkpoint ritual
6. At major seam or phase boundaries, run milestone ritual

## Brief standards

- One vertical slice per brief
- No broad backlog dumping
- Use only enough context to safely execute the slice
- Prefer one touched seam, or one dominant seam with one adjacent seam at most
- Describe the red/green target explicitly

## TDD expectations

- Start from the smallest failing test that proves the slice matters
- Implement the minimum behavior to pass
- Perform verification after green using the relevant tests or observable checks
- Refactor only when it improves local clarity or reduces future ritual cost
- Record evidence in the slice report, not in sprawling prompt context
- Treat the expected flow as `red -> green -> verification -> refactor`

## Ritual hierarchy

- `slice ritual`: default entrypoint for implementing work from a brief
- `checkpoint ritual`: relay workflow maintenance after every 3 approved slices
- `milestone ritual`: architecture and acceptance maintenance at boundaries
- `reanchor ritual`: continuity package for resuming work efficiently

## Wrapper-first rule

- Ritual wrappers should be the normal entrypoints for work in this repo
- Lower-level skills exist to support rituals and may be reused across multiple rituals
- Call a lower-level skill directly only when there is a special circumstance and the wrapper would not add meaningful coordination
- Checkpoint usually happens just before milestone, so checkpoint owns most repo-wide reconciliation while milestone focuses on boundary quality and architecture alignment

## Planning and History Docs

- `roadmap_to_mvp.md` is the lean near-term priority lane
- `backlog.md` is the full future inventory and idea pool
- `CHANGELOG.md` records implemented and verified outcomes
- `developer_journal.md` records implementation reasoning and milestone/checkpoint narrative
- `docs_system_wiring_guide.md` explains how these docs and the ritual assets fit together

## Versioning posture

- Track relay workflow boundaries in the version journal
- Use documented git tag/label names at checkpoint and milestone boundaries
- Treat tags/labels as manual ritual steps in v1, not automated side effects
