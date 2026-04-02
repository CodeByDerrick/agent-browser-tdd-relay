# Documentation System Wiring Guide

Relative path: `docs/process/docs_system_wiring_guide.md`
Project: Agent Bridge

Purpose: This document explains how the documentation and ritual system of Agent Bridge is wired together and why each part exists. It is the explicit map for how roadmap, backlog, changelog, developer journal, architecture docs, process docs, briefs, prompts, checklists, skills, and ritual wrappers interact. Use this guide when onboarding, reconciling drift, or deciding where a piece of information belongs.

## Core Wiring

- `backlog.md` holds the full future inventory.
- `roadmap.md` holds only near-term, current-phase work.
- Briefs translate roadmap-ready work into minimal vertical slices.
- `slice-ritual` is the default execution wrapper for those briefs.
- `checkpoint-ritual` is the main maintenance boundary whenever the operator wants reconciliation, freshness review, or checkpoint packaging.
- `milestone-ritual` handles seam or phase boundary review and stabilization.
- `reanchor-ritual` compresses trusted context for continuity and handoff.
- `CHANGELOG.md` records implemented and verified outcomes.
- `developer_journal.md` records the narrative and reasoning around checkpoints, milestones, and significant work.

## Maintenance Ownership

- `checkpoint-ritual` and `doc-refresh` maintain `README.md`, `docs/project/project_profile.md`, architecture docs, process docs, and `docs/documentation_freshness_watchlist.md`.
- `repo-reconcile` maintains the documentation inventory, top-level documentation guides, and checks that every maintained doc belongs to an active ritual or skill path.
- `milestone-ritual` owns deeper architecture refresh plus stable history updates.
- `reanchor-ritual` maintains continuity-sensitive planning and journal context for restart and handoff.
