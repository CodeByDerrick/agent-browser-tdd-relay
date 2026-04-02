# Documentation Freshness Watchlist

Relative path: `docs/documentation_freshness_watchlist.md`
Project: Agent Bridge

Purpose: This document lists the maintained docs that should be reviewed for freshness when the system, process, planning state, or maintenance model changes. Use it during checkpoint, milestone, and reconciliation work to keep documentation ownership explicit and to avoid orphaned docs.

| Doc | Refresh trigger | Primary maintenance owner |
| --- | --- | --- |
| `README.md` | User-facing behavior, setup, or project framing changes | `checkpoint-ritual`, `doc-refresh` |
| `AGENTS.md` | Operating guidance or core doc entrypoints change | `repo-reconcile` |
| `docs/README.md` | Documentation layout or doc placement rules change | `repo-reconcile` |
| `docs/INDEX.md` | Maintained doc inventory changes | `repo-reconcile` |
| `docs/project/project_profile.md` | Project identity, maturity, or boundaries change | `checkpoint-ritual`, `doc-refresh` |
| `docs/architecture/README.md` | Main workflow or architectural shape changes | `milestone-ritual`, `doc-refresh` |
| `docs/architecture/module_responsibility_map.md` | Modules, seams, or ownership boundaries change | `milestone-ritual`, `doc-refresh` |
| `docs/architecture/workflow_contracts.md` | Artifact contracts or workflow I/O expectations change | `milestone-ritual`, `doc-reconcile` |
| `docs/process/development_playbook.md` | Ritual behavior or operating defaults change | `checkpoint-ritual`, `doc-refresh` |
| `docs/process/workflow_operating_model.md` | Slice, checkpoint, milestone, or approval flow changes | `checkpoint-ritual`, `doc-refresh` |
| `docs/process/ritual_contracts.md` | Wrapper inputs, outputs, or ownership change | `checkpoint-ritual`, `repo-reconcile` |
| `docs/process/docs_system_wiring_guide.md` | Wiring between docs, rituals, prompts, or skills changes | `repo-reconcile` |
| `docs/process/roadmap.md` | Near-term priorities change | `checkpoint-ritual`, `reanchor-ritual` |
| `docs/process/backlog.md` | Future work or audit-storage design changes | `checkpoint-ritual`, `reanchor-ritual` |
| `docs/process/version_journal.md` | A checkpoint or milestone is recorded | `checkpoint-ritual`, `milestone-ritual` |
| `docs/process/developer_journal.md` | Narrative baseline, checkpoint, or milestone context changes | `checkpoint-ritual`, `reanchor-ritual`, `milestone-ritual` |
| `docs/process/CHANGELOG.md` | Work is implemented and verified | `milestone-ritual` |

## Coverage Rule

- If a maintained doc is added, it must be added here and referenced by at least one ritual wrapper or support skill.
