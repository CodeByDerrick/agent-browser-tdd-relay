# Repo Reconcile

Relative path: `.agents/skills/repo-reconcile/SKILL.md`
Project: Agent Bridge

Purpose: This support skill reconciles the wider repo operating state for Agent Bridge, including automation assets, trusted docs, and planning and history drift. It is normally called from checkpoint or reanchor ritual rather than directly. Use it when a ritual needs to assess whether the repo's maintenance system still fits together cleanly.

## References

- [Documentation Guide](/e:/build/agent-browser-tdd-relay/docs/README.md)
- [Documentation Index](/e:/build/agent-browser-tdd-relay/docs/INDEX.md)
- [documentation_freshness_watchlist.md](/e:/build/agent-browser-tdd-relay/docs/documentation_freshness_watchlist.md)
- [docs_system_wiring_guide.md](/e:/build/agent-browser-tdd-relay/docs/process/docs_system_wiring_guide.md)

This is usually called from `checkpoint-ritual` or `reanchor-ritual`, not as a top-level entrypoint.
