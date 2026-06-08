# Legacy-to-Next Parity Matrix

Track migration status from `ai-garage` (legacy static portal) to `ai-garage-next`.

## Status Legend
- `NOT STARTED`
- `IN PROGRESS`
- `DONE`
- `N/A`

| Legacy Area | Legacy Reference | Next Target | Status | Notes |
|---|---|---|---|---|
| Home hero tracks | `ai_garage_portal_merged.html#page-home` | `/` | IN PROGRESS | Core structure moved; detailed reveal behavior pending |
| Home category cards/details | `#reveal-library` + category details | `/` + `/library` | IN PROGRESS | Summary moved; full card-detail interaction pending |
| Epics page content | `#page-epics` | `/epics` | IN PROGRESS | QE table migrated; deeper story modeling pending |
| Plan timeline/accomplishments | `#page-plan` | `/plan` | IN PROGRESS | Snapshot present; timeline component parity pending |
| Library catalog shell | `#page-library` | `/library` | IN PROGRESS | Filterable cards + status badges + preview metadata + detail page; now API-backed via shared service with explicit launch actions. Visual polish/parity sweep pending |
| Library data contract | n/a (new) | `/api/library/agents` + `/api/library/agents/[agentId]` | DONE | Typed GET endpoints sharing `lib/library-service`; strict filter validation (400), unknown agent 404, invalid id format 400 |
| Library launch behavior | implicit links | per-agent `launch` metadata | DONE | `open_url` / `guided_tour` / `unavailable`; unavailable shows disabled action + reason text |
| Espresso edition embed | `#page-espresso` | `/espresso` | IN PROGRESS | Needs native manifest/archive integration |
| Espresso QOTD submission | outer + embedded forms | `/espresso` + API | NOT STARTED | Must implement validated backend path |
| Roundtable content + form | `#page-roundtable` | `/roundtable` | IN PROGRESS | Form is UI-only currently |
| Submit idea workflow | `#page-submit` | `/submit` + API | NOT STARTED | Must persist submissions |
| Contact routing table | `#page-squad` | `/contact` | IN PROGRESS | Base content ported |
| Hash routing behavior | inline JS nav | App Router links | DONE | Route-based nav implemented |
| Legacy reveal toggles | inline JS toggles | React client components | NOT STARTED | Specific interaction parity pending |
| Gantt "we are here" marker | inline JS date calc | `/plan` timeline logic | NOT STARTED | Dynamic marker pending |
| Manifest hydration | fetch `editions/manifest.json` | server/data layer | NOT STARTED | Needs typed data access layer |
| Edition sync pipeline | `scripts/sync-espresso-from-manifest.mjs` | migrated/retained in next repo | IN PROGRESS | Strategy chosen, full integration pending |

## Backend Readiness Checklist
- [ ] `POST /api/submissions/idea`
- [ ] `POST /api/submissions/roundtable`
- [ ] `POST /api/espresso/qotd`
- [ ] persistent storage selected and wired
- [ ] validation and error handling on all form endpoints
- [ ] triage/status model defined for submissions
