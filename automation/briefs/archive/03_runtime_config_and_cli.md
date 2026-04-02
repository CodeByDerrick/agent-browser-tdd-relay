# 03_runtime_config_and_cli

**Relative path:** `automation/briefs/archive/03_runtime_config_and_cli.md`
**Project:** Agent Bridge

## Purpose
This brief introduces the formal application entrypoint and runtime configuration logic. It allows the system to be invoked as a CLI tool that can toggle between "fake" and "live" modes via environment variables or configuration files.

## Slice
Create a `src/index.ts` (or `main.ts`) that initializes the `RelayOrchestrator` using a real configuration provider. This includes wiring the `SqliteStore` and the chosen `BrowserAdapter` based on the environment.

## Red
1. **Existing Test Guard**: All 20 existing tests must pass.
2. **Failing CLI Test**: Create `tests/integration/cliEntrypoint.spec.ts`. Assert that the application fails to start if the required `RELAY_DB_PATH` or `TRANSFER_DIR` environment variables are missing.
3. **Failing Config Test**: Assert that the system defaults to "fake" mode if no adapter type is specified, but fails if "live" mode is requested without a valid `TRANSFER_DIR`.

## Green
1. **Configuration Layer**: Introduce a lean configuration utility (using `dotenv` or similar) to read:
    - `ADAPTER_MODE` (fake | live)
    - `RELAY_DB_PATH`
    - `TRANSFER_DIR`
2. **Main Entrypoint**: Implement the boot logic in `src/index.ts`:
    - Initialize `SqliteStore`.
    - Use `createBrowserAdapter()` to get the runtime adapter.
    - Instantiate and run the `RelayOrchestrator` loop.
3. **Graceful Exit**: Ensure the process handles `SIGINT` (Ctrl+C) by saving the current state before exiting.

## Verification
### **TDD Verification Report**
Codex must generate a report including:
- **Summary**: Description of the CLI wiring and configuration management.
- **Test Metrics**:
    - **Existing Tests**: 20 (Status: PASS)
    - **New Tests Added**: [Count]
    - **Total Test Suite**: [Total Count]
- **Evidence**:
    - Demonstrate the CLI booting in "live" mode and successfully identifying the SQLite database path from the environment.
    - Confirm the orchestrator correctly picks up the project identity from the environment or a `project_profile.json`.

## Refactor
- Ensure no hardcoded paths remain in the `RelayOrchestrator` or `SqliteStore` constructors; they should all be injected from the config layer.
- Verify `Project: Agent Bridge` documentation consistency.
