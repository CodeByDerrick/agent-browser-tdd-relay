# Doc Reconcile

Relative path: `.agents/skills/doc-reconcile/SKILL.md`

Purpose: This support skill reconciles code and documentation when drift is possible in `agent-browser-tdd-relay`. It is normally called from checkpoint or milestone ritual rather than directly. Use it when the repo needs a trust check between actual behavior and the docs that describe it.

This is usually called from `checkpoint-ritual` or `milestone-ritual`, not as a top-level entrypoint.
