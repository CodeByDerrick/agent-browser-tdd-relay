# Directory Structure

Relative path: `directory_structure.md`

Purpose: This document maps the major repo areas of `agent-browser-tdd-relay` and explains how source code, process docs, automation assets, skills, and runtime artifacts are separated. Use it to orient quickly in the repo and to understand where new material belongs before creating or moving files.

## Source

- `src/application`: relay orchestration flow
- `src/domain`: relay state and transition rules
- `src/infra`: persistence, logging, checkpoint seam, browser/codex adapters
- `src/cli`: approval gate
- `src/config`: default paths and repo conventions
- `src/parsers`: structured ChatGPT response parsing

## Tests

- `tests/unit`: fast behavior tests for pure logic and small seams
- `tests/integration`: orchestration and restart flow coverage

## Process docs

- `docs/architecture`: relay architecture maps and contracts
- `docs/process`: relay workflow, planning, history, wiring, ritual contracts, and version journal
- `automation/checklists`: operator checklists used by rituals
- `automation/prompts`: prompt assets used by rituals
- `automation/briefs`: active, archive, and templates for minimal vertical slices
- `.agents/skills`: Codex skill entrypoints and ritual wrappers

## Artifacts

Runtime artifacts are written under `artifacts/` by the relay and should be treated as execution outputs rather than source-of-truth docs.

- `artifacts/briefs`
- `artifacts/slice_reports`
- `artifacts/checkpoints`
- `artifacts/chatgpt_responses`
- `artifacts/logs`
