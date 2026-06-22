<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev          # next dev — localhost:3000 (falls back to 3001)
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm test             # vitest run (20 tests)
npm run build        # next build
npm run parity:check # legacy site contract check (informational only)
```

Before committing: `npm run lint && npm run typecheck && npm test && npm run build`

## Key Files

| Concern | Entry point |
|---------|------------|
| Agent catalog (pages + API) | `lib/library-service.ts` → `lib/agent-library.ts` |
| Agent catalog API | `app/api/library/agents/route.ts`, `app/api/library/agents/[agentId]/route.ts` |
| AI Espresso live demo | `lib/espresso-demo.ts` → `app/api/try/route.ts` |
| Rate limiting | `lib/rate-limit.ts` (in-memory; swap for KV/Upstash in production) |
| Talk submission | `lib/talk-submission.ts` → `app/api/submissions/talk/route.ts` |
| Idea submission | `lib/idea-submission.ts` → `app/api/submissions/idea/route.ts` |
| Shared validation helpers | `lib/validation-utils.ts` |
| Idea form (client) | `components/idea-form.tsx` |
| Edition data | `public/data/latest-edition.json` |
| Design tokens | `app/globals.css` |

## Code Style

- TypeScript `strict: true`. No `any`, no `@ts-ignore`, no stray `console.log`.
- Path alias: `@/*` maps to project root (e.g. `import { foo } from "@/lib/foo"`).
- Imports at top of file only — no inline imports in function bodies.
- Lib files use zero comments; let types and names self-document.
- CSS uses design-system variables (`--ink`, `--paper`, `--rule`, `--accent`) — do not introduce raw colors.
- Page titles are centered; preserve the existing layout in `globals.css`.
- No Mermaid in README or shared docs — use prose or ASCII diagrams.

## Testing

Tests live in `tests/` using Vitest. Run `npm test` (CI) or `npm run test:watch` (dev).

Existing coverage: `library-service`, `talk-submission`, `idea-submission`, `espresso-demo` — all pure-function unit tests. No component or integration tests yet.

To add a test: create `tests/<module>.test.ts`, import from `@/lib/<module>`, follow existing describe/it pattern.

## Learned User Preferences

- Never edit the original `ai-garage` repo; all migration work happens in `ai-garage-next`.
- Review prior chats and existing docs before reworking UI or structure; do not re-litigate already-settled decisions.
- Inspect rendered pages yourself in the browser (screenshots/snapshots) to find visual issues.
- Do risky or experimental feature work on a separate branch, never directly on `main`.
- For deferred features, document the plan in a local uncommitted markdown file and return to `main`.
- Use gitignored `docs/handoff-session-*.md` for session notes (never committed).
- Pause after implementing UI changes so the user can visually review on the local preview.
- Keep code clean and professional; no over-commenting; do not add anything unnecessary.
- Keep commit messages concise (one short sentence, no verbose explanations).

## Learned Workspace Facts

- Vercel deployment is not yet configured for this repo. The legacy portal deploys from `ai-garage` at `ai-garage-navy.vercel.app`. The only env var the app needs is `ANTHROPIC_API_KEY`.
- AI Espresso is the only agent with a live demo. The full pipeline lives externally (repo `jackiehimel/ai-espresso-finalized`); this site hosts only the rewrite stage via `/api/try`, reading stories from `public/data/latest-edition.json`.
- `/api/try` must never hard-error — always fall back to static story text on any failure path.
- Neither idea nor talk submissions persist yet — storage is deferred to the incoming team.
- Tech talks run only on Fridays; a Microsoft Forms calendar integration is planned but deferred.
- Leadership-facing docs live under `docs/` (architecture.md, roadmap.md, parity.md, project-brief.md).
- GitHub repo is private on the free plan; branch protection requires GitHub Pro or making the repo public.
- CI runs via `.github/workflows/ci.yml` on push/PR: lint, typecheck, test, build.
- `docs/superpowers/`, `parity/`, and `scripts/` are gitignored (local-only, not pushed to GitHub remote).
- `postcss` is pinned via npm `overrides` in `package.json` to resolve transitive audit warnings without downgrading Next.js.
