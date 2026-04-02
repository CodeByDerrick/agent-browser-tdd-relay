# Repo Reconcile

Relative path: `.agents/skills/repo-reconcile/SKILL.md`

Purpose: This support skill reconciles the wider repo operating state for `agent-browser-tdd-relay`, including automation assets, trusted docs, and planning/history drift. It is normally called from checkpoint or reanchor ritual rather than directly. Use it when a ritual needs to assess whether the repo's maintenance system still fits together cleanly.

This is usually called from `checkpoint-ritual` or `reanchor-ritual`, not as a top-level entrypoint.
