# Architecture

This document explains how AI Garage is put together, how the one live agent
endpoint works, and where the incoming team can attach agent-hosting and GitHub
agent-approval surfaces.

## Overview

AI Garage is a Next.js App Router application. Most of the site is server-rendered
content sourced from typed modules under `lib/`; a few interactive surfaces are
client components that call same-origin API routes.

```
                 ┌────────────────────────────────────────────┐
                 │                  Browser                     │
                 │   server-rendered pages + a few client       │
                 │   components (/espresso, /roundtable)        │
                 └───────────────┬──────────────────────────────┘
                                 │ same-origin fetch
                 ┌───────────────▼──────────────────────────────┐
                 │            Next.js (App Router)               │
                 │                                               │
                 │  Pages          API routes                    │
                 │  /              /api/try ───────► Anthropic    │
                 │  /library       /api/library/agents            │
                 │  /library/[id]  /api/library/agents/[id]       │
                 │  /epics         /api/submissions/talk          │
                 │  /plan                                        │
                 │  /espresso      lib/                          │
                 │  /roundtable    ├─ library-service.ts (shared)│
                 │  /submit        ├─ agent-library.ts (data)    │
                 │  /contact       ├─ garage-content.ts (content)│
                 │                 └─ talk-submission.ts (valid.) │
                 └───────────────┬──────────────────────────────┘
                                 │ reads
                 ┌───────────────▼──────────────────────────────┐
                 │  public/data/latest-edition.json              │
                 │  (synced from the external Espresso pipeline) │
                 └───────────────────────────────────────────────┘
```

## Shared service layer

`lib/library-service.ts` is the single source of truth for the agent library. Both
the library pages (`/library`, `/library/[agentId]`) and the library API
(`GET /api/library/agents`, `GET /api/library/agents/[agentId]`) call it, so
filtering, validation, and detail lookups behave identically whether reached
through the UI or the API. Static catalog data lives in `lib/agent-library.ts`.

Keeping the validation/filtering logic in one module (rather than duplicated in each
route) is what lets the API and the rendered pages stay in lockstep as the catalog
grows.

## The live agent path: `POST /api/try`

`/espresso` hosts the **rewrite** stage of the AI Espresso agent. The full
discovery → rank → rewrite → illustrate → email pipeline runs in the external
[`ai-espresso-finalized`](https://github.com/jackiehimel/ai-espresso-finalized)
repository (also published as a GHCR Docker image). This site only re-runs the
rewrite stage on demand so visitors can see the agent work.

Request flow:

1. The browser POSTs to `/api/try` (no body).
2. The route enforces a per-IP rate limit (`lib/rate-limit.ts`).
3. It loads the current stories from `public/data/latest-edition.json`.
4. It calls the Anthropic Messages API to rewrite each story's headline, blurb,
   and "why it matters".
5. The model output is parsed and shape-checked; the response is returned to the
   client.

Failure handling is deliberate: if the edition file is missing/unreadable, the
model call fails, or the output is unparseable, the route returns the original
story text instead of an error. The demo never hard-fails in front of an audience.

### Production note

The rate limiter is an in-memory map scoped to a single serverless instance, which
is fine for a demo but resets on cold start and is not shared across instances. For
production, swap `lib/rate-limit.ts` for a durable store (e.g. Vercel KV / Upstash
Redis). The module is isolated so this is a drop-in change.

The edition JSON is currently synced manually from the external pipeline. Wiring
the publish-manifest sync is tracked in [roadmap.md](roadmap.md) (WS3).

## Where future agent work attaches

The repo is structured so the incoming team can extend it toward a full
agent-hosting platform without re-architecting:

- **More live agents** follow the `/api/try` pattern: an API route that loads
  inputs, calls a model, validates output, and degrades gracefully.
- **Submission persistence** attaches behind the existing validated endpoints
  (`/api/submissions/talk`, `/api/submissions/idea`). Validation already
  lives in `lib/`, so only a storage adapter is needed.
- **GitHub agent-approval / agent hosting** would sit behind new API routes plus a
  persistence and auth layer. The shared-service and graceful-fallback patterns
  above are the conventions to follow.

See [roadmap.md](roadmap.md) for the sequenced plan and [parity.md](parity.md) for
migration status against the legacy portal.
