# Security

## Reporting a vulnerability

This is an internal Solvd project. If you discover a security issue, report it
privately to the maintainer (see `.github/CODEOWNERS`) rather than opening a public
issue. Include steps to reproduce and the potential impact.

## Secret handling

- The only secret this app needs is `ANTHROPIC_API_KEY`. It is read **server-side**
  only (in `app/api/try/route.ts`) and is never exposed to the browser.
- Never commit real secrets. `.env*` files are gitignored; use `.env.example` as
  the template and store real values in `.env.local` (local) or the Vercel project
  settings (deployed).
- Only variables prefixed with `NEXT_PUBLIC_` are sent to the client. Do not put
  secrets behind that prefix.

## Notes for production hardening

- `POST /api/try` uses an in-memory, per-instance rate limiter (`lib/rate-limit.ts`).
  Replace it with a durable store (e.g. Vercel KV / Upstash Redis) before relying on
  it as a real abuse control. See `docs/architecture.md`.
- Submission endpoints validate input but do not yet persist or authenticate; add
  authn/authz alongside persistence.
