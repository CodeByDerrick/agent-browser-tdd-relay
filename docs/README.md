# Documentation Guide

Relative path: `docs/README.md`
Project: Agent Bridge

Purpose: This document maps the major documentation areas in the repository and explains where project, architecture, process, and maintenance materials belong. Use it as the documentation entrypoint when you need to place, find, or refresh a repo-authored document.

## Main Areas

- `docs/project`: project identity and high-level positioning
- `docs/architecture`: runtime shape, contracts, and module boundaries
- `docs/process`: operating model, planning, journals, and maintenance wiring

## Supporting Areas

- `automation/briefs`: active, archived, and template brief materials
- `automation/checklists`: operator checklists used by rituals and support skills
- `automation/prompts`: compact prompt assets used by rituals and reconciliation work
- `.agents/skills`: ritual wrappers and supporting maintenance skills

## Runtime Artifacts

Runtime outputs belong under `artifacts/` and are not the source of truth for maintained documentation.

- `artifacts/briefs`
- `artifacts/slice_reports`
- `artifacts/checkpoints`
- `artifacts/chatgpt_responses`
- `artifacts/logs`

## Usage Notes

- Keep maintained docs concise and purpose-specific.
- Prefer conventional filenames when they fit the document type.
- Keep project identity inside each document header rather than in the filename.
