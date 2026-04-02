# Project Profile

Relative path: `docs/project/project_profile.md`
Project: Agent Bridge

Purpose: This document defines the identity of Agent Bridge at a project level. Use it when a document needs the canonical project name, the current maturity statement, or the high-level description of what the system is intended to coordinate.

## Identity

- project name: `Agent Bridge`
- current form: bounded TypeScript scaffold with a ritual-driven maintenance layer
- primary job: coordinate implementation, review, approval, and artifact flow across human and agent participants

## What It Is

Agent Bridge is a relay-oriented orchestration project. It connects local implementation work, structured review output, and explicit human approval into a controlled loop that can later support stronger auditability and operational trust.

## Major Actors

- `User`: supplies direction, approves continuation, and invokes rituals
- `Codex`: executes implementation work from a brief
- `ChatGPT`: reviews outputs and proposes the next brief
- `System`: persists state, logs events, stores artifacts, and tracks workflow context

## Current Maturity

- core state transitions and orchestration scaffold exist
- fake Codex and browser/ChatGPT seams exist for development and testing
- SQLite-backed persistence and audit logging exist
- runtime configuration and a CLI entrypoint now exist for fake and file-transfer live modes
- process docs, rituals, and skills are maintained system assets
- checkpoint execution remains a human-invoked maintenance workflow rather than an automatic runtime boundary

## Boundaries and Non-Goals

- no autonomous continuation past explicit approval
- no production browser automation claim yet; the live seam is file-transfer based
- no production deployment or distributed runtime yet
