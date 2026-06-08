# AI Garage Next Target Spec

## Purpose
Define the production target for `ai-garage-next` so implementation can continue across many short chats without losing context.

## Constraints
- Do not edit `ai-garage` directly.
- Use `ai-garage` as read-only source of truth for parity.
- Build and validate all migration work inside `ai-garage-next`.
- Defer cutover until parity + stability gates pass.

## Product Goals
1. Convert the legacy static portal into a maintainable Next.js app.
2. Keep informational parity for core sections.
3. Add true interaction and backend support for submissions.
4. Provide an agentic library experience where users can browse, filter, preview, and click into runnable agents.

## Required Routes
- `/` Home
- `/library`
- `/epics`
- `/plan`
- `/espresso`
- `/roundtable`
- `/submit`
- `/contact`

## Functional Requirements
### Library
- Card-based catalog of agents with clear ownership and status.
- Filters for function, vertical, and readiness.
- Per-agent preview/detail surface.
- "Try/Open" action for runnable agents.

### Submissions
- Real server-side submission endpoints (not placeholders).
- Validation for required fields.
- Persistence for review workflows.
- User-visible success/error states.

### AI Espresso
- Display latest edition and archive metadata.
- Stable daily sync pipeline from publish manifest.
- QOTD submission path with validation and persistence.

## Non-Goals (Current Program)
- Immediate replacement of legacy production URL.
- Large design-system rewrite before functionality.
- Rebuilding unrelated systems outside AI Garage scope.

## Acceptance Gates Before Cutover Discussion
1. Feature parity checklist complete for all required routes.
2. Submission workflows operational end-to-end.
3. Espresso sync + display + QOTD path stable.
4. Lint/build/tests pass in CI.
5. Manual smoke tests pass on preview deployment.
