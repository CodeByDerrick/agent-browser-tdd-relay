# Backlog

Relative path: `docs/process/backlog.md`
Project: Agent Bridge

Purpose: This document is the full future-facing inventory for Agent Bridge. It captures planned phases, wishlist items, deferred ideas, open questions, and features that may matter later but are not yet important enough or discussed enough to belong on the roadmap. This document works together with `roadmap.md`: backlog is the source pool, roadmap is the current commitment lane.

## Planned Phases

### MVP Foundation

- Harden the relay process layer and keep it aligned with runtime seams.
- Improve brief, ritual, and maintenance discipline.
- Clarify the minimum trustworthy relay flow.

### Relay Execution Maturity

- Expand checkpoint and milestone outputs into richer packets.
- Improve recovery, reconciliation, and operational trust.
- Strengthen live adapter readiness without over-claiming production maturity.
- Add SQLite-backed audit storage that records project name, source actor, target actor, timestamp, payload, data category such as `task-brief`, and any additional fields required for later auditability.

## Discussion Needed Before Roadmap

- Features whose value is clear but whose implementation path is still vague.
- Ideas that require new architectural decisions.
- Larger feature concepts that are not yet reducible to minimal vertical slices.
- Future policy details for verification and refactor standards beyond the current required stages.
