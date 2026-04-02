# Checkpoint Ritual

Relative path: `.agents/skills/checkpoint-ritual/SKILL.md`

Purpose: This ritual wrapper is the primary maintenance boundary in `agent-browser-tdd-relay`. Use it after every 3 approved slices to refresh docs, review roadmap/backlog drift, reconcile repo state, and update the version and journal records that keep the process system aligned with the actual work.

## Use when

- 3 approved slices have completed
- `running_checkpoint` is due or the repo relay workflow says checkpoint work is next

## References

- [checkpoint-ritual-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/checkpoint-ritual-checklist.md)
- [doc-update-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/doc-update-checklist.md)
- [doc-reconciliation-checklist.md](/e:/build/agent-browser-tdd-relay/automation/checklists/doc-reconciliation-checklist.md)
- [docs_checkpoint_update.md](/e:/build/agent-browser-tdd-relay/automation/prompts/docs_checkpoint_update.md)
- [relay_version_journal.md](/e:/build/agent-browser-tdd-relay/docs/process/relay_version_journal.md)
- [roadmap_to_mvp.md](/e:/build/agent-browser-tdd-relay/docs/process/roadmap_to_mvp.md)
- [backlog.md](/e:/build/agent-browser-tdd-relay/docs/process/backlog.md)
- [developer_journal.md](/e:/build/agent-browser-tdd-relay/docs/process/developer_journal.md)

## Composed skills

- `doc-refresh`: refresh affected docs after the slice batch
- `doc-reconcile`: reconcile drift between code, docs, and ritual expectations
- `repo-reconcile`: reconcile repo-operating state, automation assets, planning/history docs, and checkpoint readiness

## Workflow

1. Confirm the 3-slice boundary and gather the latest slice outputs.
2. Call `doc-refresh` to update only the docs touched by those slices.
3. Call `doc-reconcile` to verify that refreshed docs and actual repo behavior still align.
4. Call `repo-reconcile` to capture repo drift, automation drift, and checkpoint readiness.
5. Review roadmap/backlog drift and update the developer journal when checkpoint-level narrative matters.
6. Produce the checkpoint packet, relay version journal update, commit recommendation, and next brief recommendation.
