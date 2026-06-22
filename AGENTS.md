<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Never edit the original `ai-garage` repo; all migration work happens in `ai-garage-next`, with a controlled switchover only after feature parity is validated.
- Review prior chats and existing docs before reworking UI or structure; do not re-litigate or regress already-settled decisions (library categories, backlog contents, demo availability).
- Inspect rendered pages yourself in the browser (screenshots/snapshots) to find and fix visual issues instead of asking the user to describe them.
- Do risky or experimental feature work on a separate branch, never directly on `main`.
- For deferred features, document the plan in a local uncommitted markdown file and return to `main` instead of building immediately.
- Update progress docs as work proceeds: `docs/superpowers/program-board.md`, `docs/superpowers/checklists/parity-matrix.md`. Use gitignored `docs/handoff-session-*.md` for session notes (never committed).
- Pause after implementing UI changes so the user can visually review on the local preview before continuing.
- Keep code clean and professional; no over-commenting; do not add anything unnecessary.
- Avoid Mermaid diagrams in the README or shared docs; prefer prose explanations or plain-text/ASCII diagrams that render the same in GitHub, editors, and terminals. When briefing the site verbally, lead with prose architecture, not a diagram.

## Learned Workspace Facts

- `npm run dev` is plain `next dev`; the local preview binds to `localhost:3000` by default and falls back to `3001` if `3000` is in use. Validate changes with `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and smoke-checking routes/API responses.
- Planning and tracking docs live under `docs/superpowers/` (specs, plans, checklists, program board, handoffs, session-handoff template).
- Leadership-facing docs live under `docs/` (architecture.md, roadmap.md, parity.md, project-brief.md).
- The Agentic Library lists completed agents only (the QE agents plus AI Espresso), organized into 4 categories shown as a dropdown of subcategories in the left panel; guided-tour functionality was removed.
- The Agent Backlog is a separate page of roughly 15–20 planned agents rendered as flip cards; the back face shows "what it does, what it should accomplish, acceptance criteria" in the brand green.
- AI Espresso is the only agent with a live demo; `app/espresso/page.tsx` calls the same-origin `/api/try` route (Claude-backed, in-memory rate limiting, static fallback).
- The full AI Espresso pipeline lives externally (repo `jackiehimel/ai-espresso-finalized`, GHCR Docker image); the site only hosts the rewrite stage live via `/api/try`, which reads stories from `public/data/latest-edition.json` and is synced manually until WS3 wires the publish-manifest pipeline.
- `/api/try` enforces a per-IP rate limit (10 runs/hour) via `lib/rate-limit.ts` and falls back to the original story text whenever the Claude call fails or returns unparseable JSON, so the demo never errors out. Core logic is extracted into `lib/espresso-demo.ts`.
- `lib/library-service.ts` is the shared backbone for both library pages and the library API (`GET /api/library/agents` and `GET /api/library/agents/{id}`); `/api/submissions/talk` validates via `lib/talk-submission.ts` but does not persist yet.
- `lib/idea-submission.ts` validates idea submissions; `POST /api/submissions/idea` returns 422 on validation errors, 201 on success. Neither idea nor talk submissions persist yet — storage is deferred.
- The app deploys to Vercel from `github.com/jackiehimel/ai-garage-next`; the only required env var is `ANTHROPIC_API_KEY`.
- Tech talks run only on Fridays; a Microsoft Forms–driven tech-talk calendar integration is planned but deferred.
- Page titles are centered across pages; preserve the existing design system in `globals.css` rather than restyling.
