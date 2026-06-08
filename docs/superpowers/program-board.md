# AI Garage Next Program Board

Use this as the durable migration board for short-session execution.

## Current Objective
Complete `ai-garage-next` to production-ready parity + functional backend workflows before any cutover decision.

## Workstream Backlog

### WS1 — Library Experience (Writer-style interaction model)
**Outcome:** users can browse, filter, preview, and open runnable agents.
- [x] Define `Agent` data model
- [x] Build filter bar + query-state sync
- [x] Build card grid with status badges
- [x] Build preview/detail panel/page
- [x] Wire `Open/Try` action path
- [x] Define library API contract (`GET /api/library/agents`, `GET /api/library/agents/[agentId]`)
- [x] Add per-agent launch metadata (`open_url` | `guided_tour` | `unavailable`)
- [x] Server-side validation + error payloads (400 invalid filter/id, 404 unknown agent)
- [x] Wire pages to shared typed service layer (single source feeding API + pages)

### WS2 — Submission Backend
**Outcome:** forms are real workflows, not placeholders.
- [ ] `POST /api/submissions/idea`
- [ ] `POST /api/submissions/roundtable`
- [ ] validation schema + error responses
- [ ] persistence layer + migration(s)
- [ ] submission status model for triage

### WS3 — AI Espresso Integration
**Outcome:** stable edition display + archive + QOTD handling.
- [ ] define Espresso data access contract
- [ ] render latest issue metadata in app
- [ ] render archive list from manifest data
- [ ] implement QOTD backend endpoint
- [ ] verify sync pipeline and failure handling

### WS4 — Parity and Stability Gates
**Outcome:** confident, measurable readiness before cutover.
- [ ] complete parity matrix route-by-route
- [ ] add smoke tests for all required routes
- [ ] add form flow tests (happy + error paths)
- [ ] document go/no-go and rollback criteria

## Working Rules
1. One vertical slice per session.
2. Always update parity matrix and handoff note before ending session.
3. No direct edits to `ai-garage`.
4. Validate with lint/build/tests every session.
