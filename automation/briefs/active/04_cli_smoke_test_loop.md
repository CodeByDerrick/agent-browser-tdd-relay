# 04_cli_smoke_test_loop

**Relative path:** `automation/briefs/active/04_cli_smoke_test_loop.md`
**Project:** Agent Bridge

## Purpose
This brief executes a "smoke test" of the `src/index.ts` entrypoint. It verifies that the CLI can boot, run a simulated slice, and produce a physical artifact (the slice report) without manual intervention.

## Slice
A single-run execution of the Agent Bridge CLI using `ADAPTER_MODE=fake` to verify the "wiring" from `index.ts` through to artifact storage.

## Red
1. **Existing Test Guard**: All 24 existing tests must pass.
2. **Failing Smoke Test**: Create `tests/e2e/smoke.spec.ts`. This test should invoke the compiled `dist/index.js` (or `ts-node src/index.ts`) and assert that it fails if it cannot find a starting brief in the file system.

## Green
1. **End-to-End Run**: Configure the smoke test to:
    - Provide a dummy starting brief at `artifacts/briefs/00_smoke_start.md`.
    - Run the CLI in `fake` mode.
    - Assert that the process exits with code `0` after one "tick" of the orchestrator.
2. **Artifact Verification**: Confirm that a `slice_report.md` was physically written to the `artifacts/slice_reports/` directory.
3. **Database Check**: Confirm the `relay_state` table in the SQLite database reflects `slice_count: 1` and `phase: waiting_for_codex` (or the next appropriate state).

## Verification
### **TDD Verification Report**
- **Summary**: Confirmation that the CLI entrypoint is functionally linked to the domain and infrastructure layers.
- **Metrics**: 24 existing + new smoke tests (Status: PASS).
- **Evidence**: Provide a snippet of the terminal output from the successful CLI run showing the "Project: Agent Bridge" boot message.

## Refactor
- Ensure the `npm start` script is correctly wired to the new `index.ts` entrypoint.