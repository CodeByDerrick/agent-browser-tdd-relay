# Docs System Wiring Guide

Relative path: `docs/process/docs_system_wiring_guide.md`

Purpose: This document explains how the documentation and ritual system of `agent-browser-tdd-relay` is wired together and why each part exists. It is the explicit map for how roadmap, backlog, changelog, developer journal, architecture docs, process docs, briefs, prompts, checklists, skills, and ritual wrappers interact. Use this guide when onboarding, reconciling drift, or deciding where a piece of information belongs.

## Core Wiring

- `backlog.md` holds the full future inventory.
- `roadmap_to_mvp.md` holds only near-term, current-phase MVP work.
- Briefs translate roadmap-ready work into minimal vertical slices.
- `slice-ritual` is the default execution wrapper for those briefs.
- `checkpoint-ritual` is the main maintenance boundary after every 3 approved slices.
- `milestone-ritual` handles seam or phase boundary review and stabilization.
- `reanchor-ritual` compresses trusted context for continuity and handoff.
- `CHANGELOG.md` records implemented and verified outcomes.
- `developer_journal.md` records the narrative and reasoning around checkpoints, milestones, and significant work.
