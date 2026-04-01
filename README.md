# double-loop-relay

A bounded first-pass TypeScript scaffold for a relay orchestrator that coordinates:

- local Codex implementation execution
- cloud ChatGPT architecture/review messaging via a browser adapter seam
- a **mandatory human CLI approval gate**

## Runtime approval rule (critical)

This scaffold intentionally requires explicit human approval (`Y/N/E/R/Q`) before advancing from `waiting_for_approval`.
There is no runtime auto-approval or autonomous continuation.

## Implementation boundaries for this pass

Implemented:

- pure domain state model + transitions
- durable local state file (`relay_state.json`)
- append-only event log (`relay_events.ndjson`)
- artifact writing helpers
- CLI approval gate with injected I/O
- fake Codex and fake ChatGPT/browser adapters
- orchestrator flow using these fake adapters
- Vitest unit + integration tests

Intentionally stubbed / bounded:

- `CodexRpcClient` is a stub
- live browser adapter is a stub seam, not production automation
- no GUI, no cloud deployment, no DB, no autonomous runtime loops, no concurrency system

## Project layout

- `src/domain`: types and pure transitions
- `src/infra/persistence`: state and artifact storage
- `src/infra/logging`: NDJSON event log
- `src/cli`: approval gate
- `src/infra/codex`: pluggable codex seams and fake CLI implementation
- `src/infra/browser`: browser seam and live stub
- `src/infra/chatgpt`: fake chatgpt/browser adapter
- `src/application`: orchestrator
- `tests/unit`, `tests/integration`

## Run tests

```bash
npm install
npm test
```

Or by scope:

```bash
npm run test:unit
npm run test:integration
```

## Extending live browser adapter later

Use `BrowserAdapter` as the seam.

1. Implement `submitPrompt` and `readLastAssistantMessage` using Playwright or Stagehand.
2. Reuse bounded selector strategy helpers in `liveBrowserAdapter.ts`.
3. Add selector-cache-backed recovery and confidence-based fallback.
4. Keep this adapter behind tests with mocked DOM fixtures before any real browser session coupling.

Stop at seam quality; do not claim production readiness until real interaction tests exist.
