# 01_sqlite_persistence_implementation

**Relative path:** `automation/briefs/active/01_sqlite_persistence_implementation.md`
**Project:** Agent Bridge

## Purpose
This brief coordinates the migration from flat-file JSON/NDJSON persistence to a unified SQLite implementation for state and audit logging. It also synchronizes the repository's automation rituals with the new `active`/`archive` folder structure.

## Slice
Implement a `SqliteStore` that persists the `RelayState` and provides an append-only `audit_events` table. This slice includes updating the **Checkpoint Ritual** to handle brief archival.

## Red
1. **Existing Test Guard**: Run all existing tests; they must pass before any new code is written.
2. **Failing Unit Test**: Create `tests/unit/sqliteStore.spec.ts`. Assert that `SqliteStore` (not yet created) cannot be instantiated and fails to perform a `save()`.
3. **Failing Integration Test**: Create `tests/integration/orchestratorSqlite.spec.ts`. Inject a mocked or empty `SqliteStore` into the `RelayOrchestrator` and assert that it fails to recover state.
4. **Failing Ritual Test**: Attempt to invoke a (simulated) Checkpoint Ritual; it should fail to find or move briefs in the new `automation/briefs/active/` path.

## Green
1. **Implementation**: Create `src/infra/persistence/sqliteStore.ts`.
    - **Relay State**: Map all fields from `RelayState` into a `relay_state` table.
    - **Audit Log**: Create `audit_events` with fields: `id`, `source_actor`, `target_actor`, `timestamp`, `payload` (JSON), and `data_category`.
2. **Orchestrator Update**: Update `src/application/orchestrator.ts` to utilize the new SQLite-backed interface.
3. **Ritual Update**: Modify the logic/documentation for the **Checkpoint Ritual** in `docs/process/ritual_contracts.md` to explicitly include: "Move all briefs from `automation/briefs/active/` to `automation/briefs/archive/` upon successful checkpoint completion".

## Verification
### **TDD Verification Report**
Codex must generate a report in the following format to ensure Gemini can verify the implementation:
- **Summary**: Brief description of the SQLite migration and ritual updates.
- **Test Metrics**:
    - **Existing Tests**: [Count] (Status: PASS)
    - **New Tests Added**: [Count]
    - **Total Test Suite**: [Total Count]
- **Evidence**:
    - Provide the `CREATE TABLE` statements for `relay_state` and `audit_events`.
    - Confirm `source_actor` and `target_actor` mapping (User, Codex, ChatGPT, System).
    - Confirm successful state recovery after a simulated process restart.

## Refactor
1. **Template Alignment**: Review `automation/briefs/templates/task-brief-template.md`. Ensure the template structure matches this active brief.
    - **Codex Suggestion**: If Codex identifies a more token-efficient way to represent the "Red/Green" steps for its own consumption, it should propose an update to the template.
2. **Path Cleanup**: Ensure the project name `Agent Bridge` is present in the header of all modified files.