# Project Brief

The product target for AI Garage: what it is, what it must do, and what is
explicitly out of scope for the current program.

## Purpose

Convert the legacy static AI Garage portal into a maintainable, full-stack Next.js
application that can host runnable agents and support real submission and review
workflows.

## Product goals

1. Replace the legacy static portal with a maintainable Next.js app.
2. Keep informational parity for the core sections.
3. Add real interaction and backend support for submissions.
4. Provide an agentic library where users can browse, filter, preview, and open
   runnable agents.

## Required routes

`/` · `/library` · `/library/[agentId]` · `/epics` · `/plan` · `/espresso` ·
`/roundtable` · `/submit` · `/contact`

## Functional requirements

**Library**
- Card-based catalog with clear ownership and status.
- Filters for function, vertical, and readiness.
- Per-agent preview/detail surface.
- A launch action for runnable agents.

**Submissions**
- Real server-side endpoints (not placeholders).
- Validation for required fields and user-visible success/error states.
- Persistence for review workflows.

**AI Espresso**
- Display the latest edition and archive metadata.
- A stable daily sync from the publish manifest.
- A validated, persisted question-of-the-day path.

## Non-goals (current program)

- Immediate replacement of the legacy production URL.
- A large design-system rewrite ahead of functionality.
- Rebuilding systems outside the AI Garage scope.

## Constraints

- Do not edit the legacy `ai-garage` repo; use it read-only for parity.
- Build and validate all migration work inside this repo.
- Defer cutover until the parity and stability gates in `docs/roadmap.md` pass.
