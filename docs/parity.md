# Legacy-to-Next Parity

Migration status from the legacy static portal (`ai-garage`) to this Next.js app.
The legacy site stays the read-only source of truth until parity and stability
gates pass; cutover is deferred until then.

## Status legend

`DONE` · `IN PROGRESS` · `NOT STARTED` · `N/A`

| Area | Next target | Status | Notes |
| --- | --- | --- | --- |
| Home hero / tracks | `/` | IN PROGRESS | Core structure moved; detailed reveal behavior pending. |
| Category cards/details | `/` + `/library` | IN PROGRESS | Summary moved; full card-detail interaction pending. |
| Epics page | `/epics` | IN PROGRESS | QE table migrated; deeper story modeling pending. |
| Plan timeline/accomplishments | `/plan` | IN PROGRESS | Snapshot present; timeline parity pending. |
| Library catalog | `/library` | IN PROGRESS | Filterable cards + detail page, API-backed via shared service. Visual polish pending. |
| Library data contract | `/api/library/agents` (+ `/[agentId]`) | DONE | Typed endpoints; strict filter validation (400), unknown agent 404, invalid id 400. |
| Library launch behavior | per-agent `launch` metadata | DONE | `open_url` / `guided_tour` / `unavailable` with reason text. |
| Espresso edition display | `/espresso` | IN PROGRESS | Live rewrite demo; native manifest/archive integration pending. |
| Espresso question-of-the-day | `/espresso` + API | NOT STARTED | Needs validated backend path. |
| Roundtable form | `/roundtable` | IN PROGRESS | Form validates client + server; persistence pending. |
| Submit idea workflow | `/submit` + API | IN PROGRESS | Form + `POST /api/submissions/idea` validate end-to-end; persistence pending. |
| Contact routing | `/contact` | IN PROGRESS | Base content ported. |
| Routing model | App Router links | DONE | Route-based nav replaces legacy hash routing. |
| Manifest hydration / sync | server/data layer | NOT STARTED | Typed data-access layer pending. |

## Backend readiness checklist

- [x] `POST /api/submissions/idea` (validated; persistence pending)
- [x] `POST /api/submissions/talk` (validated; persistence pending)
- [ ] `POST /api/espresso/qotd`
- [ ] Persistent storage selected and wired
- [ ] Validation and error handling on all form endpoints
- [ ] Triage/status model for submissions
