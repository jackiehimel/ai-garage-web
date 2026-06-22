# Roadmap

Status of the AI Garage portal and the work remaining to reach a full-stack,
agent-hosting platform. This is the leadership-facing summary; the live internal
execution board is `docs/superpowers/program-board.md`.

## Where things stand

**Done**
- Next.js App Router portal replacing the legacy static site, with all core routes.
- Agentic Library: filterable catalog, per-agent detail pages, and a typed API
  (`GET /api/library/agents`, `GET /api/library/agents/[agentId]`) sharing one
  service layer with the pages.
- AI Espresso live demo: `POST /api/try` runs the rewrite stage against the latest
  edition, rate-limited, with a graceful static fallback.
- Tech-talk (Roundtable) submission form with server-side validation.
- Parity contract + check script (`npm run parity:check`).

**In progress / next**

| Workstream | Outcome | Status |
| --- | --- | --- |
| Submission persistence | Idea and talk submissions stored for a triage workflow, not just validated. | Validation done; storage layer not wired. |
| AI Espresso integration | Native edition display + archive + question-of-the-day endpoint, synced from the publish manifest. | Demo rewrite live; manifest sync + archive pending. |
| Parity & stability gates | Route-by-route parity, smoke tests, and form-flow tests before cutover. | Partial; see `docs/parity.md`. |
| Agent hosting & GitHub approval | Host runnable agents and tie launches to GitHub-based approval. | Scoped for the incoming team; see `docs/architecture.md`. |

## Acceptance gates before cutover

1. Parity checklist complete for all required routes.
2. Submission workflows operational end-to-end (validated and persisted).
3. Espresso sync + display + question-of-the-day path stable.
4. Lint, build, and tests green in CI.
5. Manual smoke tests pass on a preview deployment.

## How work is tracked internally

Detailed execution lives under `docs/superpowers/` (program board and parity
matrix). Earlier session handoffs and process templates are preserved under
`docs/archive/` for history.
