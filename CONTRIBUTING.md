# Contributing

## Setup

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY for the AI Espresso demo
npm run dev
```

## Checks

Run these before opening a pull request; CI runs the same gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run parity:check` validates the legacy portal contract and reaches an external
URL, so it runs as an informational (non-blocking) CI job.

## Branches and commits

- Branch off `main`; do experimental work on a feature branch, not `main`.
- Use clear, present-tense commit messages scoped to one logical change
  (e.g. `Add idea submission endpoint`).
- Keep pull requests focused and fill out the PR template, including the
  verification checklist.

## Conventions

- TypeScript is strict — no `any`, no `@ts-ignore`. Add real types.
- Keep imports at the top of the file.
- Share logic through `lib/` rather than duplicating it across routes and pages
  (see `lib/library-service.ts` as the pattern).
- Comments should explain intent or trade-offs, not narrate the code.
- Don't edit the legacy `ai-garage` repo; it is the read-only parity source.
