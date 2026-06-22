# AI Garage — Solvd

Internal portal for Solvd's AI Garage: a categorized library of working agents,
a backlog of planned agents, an intake workflow for new ideas, and a live demo of
the **AI Espresso** briefing agent. Built with the Next.js App Router so the static
legacy portal can grow into a full-stack, agent-hosting platform.

> Status: pre-handoff. The portal and the AI Espresso rewrite demo are live; the
> submission persistence, full Espresso publish pipeline, and agent-hosting /
> GitHub-approval surfaces are scoped but not yet built. See
> [docs/roadmap.md](docs/roadmap.md) for what is done and what is next.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- React 19
- TypeScript 5 (strict)
- Tailwind CSS 4
- [`@anthropic-ai/sdk`](https://www.npmjs.com/package/@anthropic-ai/sdk) for the
  AI Espresso live demo
- Deployed on [Vercel](https://vercel.com)

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then fill in ANTHROPIC_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is taken, Next
falls back to 3001.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes (for the AI Espresso demo) | Server-side key used by `POST /api/try`. The demo degrades to a static fallback if it is missing or the call fails, so the rest of the app runs without it. |
| `NEXT_PUBLIC_ESPRESSO_DEMO_API` | No | Optional external Espresso demo endpoint. |
| `MICROSOFT_*`, `OUTLOOK_*` | No | Reserved for the deferred tech-talk calendar integration. |

See [.env.example](.env.example) for the full list.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript). |
| `npm run test` | Run the Vitest unit suite. |
| `npm run parity:check` | Verify legacy portal content anchors (dev-only, requires local `parity/` and `scripts/`). |

## Routes

| Route | Description |
| --- | --- |
| `/` | Home portal: tracks, library categories, accomplishments, epics. |
| `/library` | Filterable catalog of completed agents. |
| `/library/[agentId]` | Per-agent detail page. |
| `/epics` | Agent backlog as flip cards. |
| `/plan` | Execution plan and accomplishments. |
| `/espresso` | AI Espresso pipeline overview + live "try it" demo. |
| `/roundtable` | AI Roundtable tech-talk submission form. |
| `/submit` | Idea intake for the Workshop track. |
| `/contact` | Contact / routing table. |

### API

| Endpoint | Description |
| --- | --- |
| `POST /api/try` | Runs the AI Espresso rewrite stage against the latest edition; rate-limited, with a static fallback. |
| `GET /api/library/agents` | Filtered agent list. Validates filters (400 on invalid). |
| `GET /api/library/agents/[agentId]` | Single agent detail (400 invalid id, 404 unknown). |
| `POST /api/submissions/talk` | Validates a tech-talk submission (422 on invalid). Persistence is not yet wired. |

## Architecture

`lib/library-service.ts` is the shared backbone feeding both the library pages and
the library API. The AI Espresso demo hosts only the rewrite stage in this repo via
`POST /api/try`; the full discovery-to-email pipeline lives in the external
[`ai-espresso-finalized`](https://github.com/jackiehimel/ai-espresso-finalized)
repository and GHCR image. For request flows, the agent-readiness story, and where
future agent-hosting hooks attach, see [docs/architecture.md](docs/architecture.md).

## Documentation

- [docs/architecture.md](docs/architecture.md) — system overview and agent design
- [docs/roadmap.md](docs/roadmap.md) — workstream status and what's next
- [docs/parity.md](docs/parity.md) — legacy-to-Next parity tracking

## Deployment

Not yet deployed. The legacy portal runs from
[`ai-garage`](https://github.com/jackiehimel/ai-garage) at
`ai-garage-navy.vercel.app`. When ready, create a new Vercel project pointing at
this repo. The only required environment variable is `ANTHROPIC_API_KEY`.
