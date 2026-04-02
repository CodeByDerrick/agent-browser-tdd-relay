# Doc Reconcile

Relative path: `.agents/skills/doc-reconcile/SKILL.md`
Project: Agent Bridge

Purpose: This support skill reconciles code and documentation when drift is possible in Agent Bridge. It is normally called from checkpoint or milestone ritual rather than directly. Use it when the repo needs a trust check between actual behavior and the docs that describe it.

## References

- [workflow_contracts.md](/e:/build/agent-browser-tdd-relay/docs/architecture/workflow_contracts.md)
- [module_responsibility_map.md](/e:/build/agent-browser-tdd-relay/docs/architecture/module_responsibility_map.md)
- [ritual_contracts.md](/e:/build/agent-browser-tdd-relay/docs/process/ritual_contracts.md)
- [docs_system_wiring_guide.md](/e:/build/agent-browser-tdd-relay/docs/process/docs_system_wiring_guide.md)

This is usually called from `checkpoint-ritual` or `milestone-ritual`, not as a top-level entrypoint.
