# TDD Implementation Checklist

Relative path: `automation/checklists/tdd-implementation-checklist.md`

Purpose: This checklist defines the minimum TDD discipline expected when implementing a slice in `agent-browser-tdd-relay`. Use it during slice execution to keep the work grounded in failing proof, passing behavior, verification, and controlled refactor. It is a compact execution aid, not a full policy document, and should stay aligned with the development playbook and slice ritual.

- Start from a failing test or failing observable behavior
- Make the minimum change to pass
- Re-run relevant tests
- Perform verification with the tests or checks that prove the slice actually works as intended
- Refactor only if it lowers ongoing complexity
- Treat the workflow as `red -> green -> verification -> refactor`
- Capture evidence in the slice report
