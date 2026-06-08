# Parity Foundation Plan

## Goal
Establish a contract-first foundation in `ai-garage-next` so parity and stability can be measured before any cutover decision.

## Scope
1. Add an explicit portal contract artifact that defines critical sections and parity phrases.
2. Replace starter homepage with contract-driven portal scaffolding.
3. Add a repeatable parity validation script that checks baseline expectations against the current legacy production site.
4. Run lint/build verification and fix regressions.

## Non-Goals
- Full visual parity in this pass.
- Cutover, migration, or edits to `ai-garage`.
- Wiring every legacy form/workflow.

## Tasks
1. Create `parity/portal-contract.json` and include:
   - title
   - legacy URL
   - required sections
   - required phrase anchors for validation
2. Implement a new `app/page.tsx` that renders section cards from the contract data.
3. Update metadata in `app/layout.tsx` for the new portal identity.
4. Add `scripts/check-parity-contract.mjs` and npm script `parity:check`.
5. Run `npm run lint` and `npm run build`; resolve any issues.

## Verification Commands
- `npm run parity:check`
- `npm run lint`
- `npm run build`
