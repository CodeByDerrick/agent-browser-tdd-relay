# Checkpoint Ritual

Relative path: `.agents/skills/checkpoint-ritual/SKILL.md`
Project: Agent Bridge

Purpose: This ritual wrapper is the primary maintenance boundary in Agent Bridge. Use it whenever checkpoint reconciliation, freshness review, or boundary packaging is needed.

## Use when

- checkpoint maintenance is requested
- cadence, drift, or documentation freshness suggests a checkpoint would be useful

## References

- [checkpoint-ritual-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/checkpoint-ritual-checklist.md)
- [doc-update-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/doc-update-checklist.md)
- [doc-reconciliation-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/doc-reconciliation-checklist.md)
- [documentation_refresh.md](/e:/build/agent-browser-tdd-relay/automation/prompts/documentation_refresh.md)
- [version_journal.md](/e:/build/agent-browser-tdd-relay/docs/process/version_journal.md)
- [roadmap.md](/e:/build/agent-browser-tdd-relay/docs/process/roadmap.md)
- [backlog.md](/e:/build/agent-browser-tdd-relay/docs/process/backlog.md)
- [developer_journal.md](/e:/build/agent-browser-tdd-relay/docs/process/developer_journal.md)
- [documentation_freshness_watchlist.md](/e:/build/agent-browser-tdd-relay/docs/documentation_freshness_watchlist.md)
- [project_profile.md](/e:/build/agent-browser-tdd-relay/docs/project/project_profile.md)

## Composed skills

- `doc-refresh`: refresh maintained docs affected by the checkpoint
- `doc-reconcile`: reconcile drift between code, docs, and ritual expectations
- `repo-reconcile`: reconcile repo-operating state, automation assets, planning and history docs, and checkpoint readiness

## Workflow

1. Confirm the checkpoint intent, review recent slice cadence, and gather current repo context.
2. Call `doc-refresh` to update only the docs touched by the current maintenance pass.
3. Call `doc-reconcile` to verify that refreshed docs and actual repo behavior still align.
4. Call `repo-reconcile` to capture repo drift, automation drift, and checkpoint readiness.
5. Review roadmap and backlog drift and update the developer journal when checkpoint-level narrative matters.
6. Produce the checkpoint packet, version journal update, commit recommendation, and next brief recommendation.
