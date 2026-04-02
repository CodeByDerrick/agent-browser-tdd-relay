# 02_live_browser_adapter_seam

**Relative path:** `automation/briefs/archive/02_live_browser_adapter_seam.md`
**Project:** Agent Bridge

## Purpose
This brief coordinates the transition of the browser adapter from a `FakeChatGptBrowserAdapter` to a `LiveBrowserAdapter`. It establishes the real-world communication seam needed to read structured ChatGPT responses and write prompts to a browser environment.

## Slice
Implement the `LiveBrowserAdapter` in `src/infra/browser/` that satisfies the `BrowserAdapter` interface. For this initial implementation, the "live" mechanism will use a file-system watch (polling) on a specific `transfer_dir` to simulate the interaction with a browser-based LLM.

## Red
1. **Existing Test Guard**: All 15 existing tests (including the new SQLite suite) must pass before proceeding.
2. **Failing Unit Test**: Create `tests/unit/liveBrowserAdapter.spec.ts`. Assert that `LiveBrowserAdapter` fails to "read" if the target input file is missing or contains unstructured data.
3. **Failing Integration Test**: Create `tests/integration/orchestratorLiveBrowser.spec.ts`. Inject the `LiveBrowserAdapter` into the `RelayOrchestrator` and assert that the orchestrator enters a `waiting_for_chatgpt` timeout state when no external file input is provided.

## Green
1. **Implementation**: Create `src/infra/browser/liveBrowserAdapter.ts`.
    - **Write**: The `sendPrompt()` method must write the formatted prompt to a `prompts/` directory within the `transfer_dir`.
    - **Read**: The `readResponse()` method must poll/watch a `responses/` directory for a new file and parse it using the established `parseStructuredResponse` logic.
2. **Fingerprinting**: Ensure the `LiveBrowserAdapter` correctly generates a unique fingerprint for each read message to prevent duplicate processing.
3. **Orchestrator Wiring**: Update the factory or entry point to allow switching between `Fake` and `Live` adapters based on a configuration flag or environment variable.

## Verification
### **TDD Verification Report**
Codex must generate a report including:
- **Summary**: Description of the file-based live seam implementation.
- **Test Metrics**:
    - **Existing Tests**: 15 (Status: PASS)
    - **New Tests Added**: [Count]
    - **Total Test Suite**: [Total Count]
- **Evidence**:
    - Demonstrate a successful "Round Trip": Orchestrator writes a prompt -> Manual/Simulated file is placed in `responses/` -> Orchestrator reads and transitions to `waiting_for_approval`.
    - Confirm the `RECAP` and `NEXT_TASK_BRIEF` blocks are correctly extracted from the "live" file input.

## Refactor
1. **Error Handling**: Ensure the adapter provides a clear error message if the file-system permissions prevent reading/writing to the `transfer_dir`.
2. **Identity Check**: Confirm the `Project: Agent Bridge` header is present in the new adapter and test files.
