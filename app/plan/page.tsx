import { accomplishments } from "@/lib/garage-content";

const planTracks = [
  "QE / Zebrunner — 7 agents · finalize reporting + failure analysis",
  "ADLC — Plan → Build → Quality → Release → Learn loop",
  "Marketing — SEO · email · accessibility · campaign",
  "Retail / Vertical — Personalization · content contracts",
  "Internal workflows — AI Espresso → intranet agents",
];

export default function PlanPage() {
  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Internal
        </p>
        <h1 className="mb-4 font-[var(--font-fraunces)] text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Execution Plan
        </h1>
        <p className="max-w-[62ch] font-[var(--font-fraunces)] text-xl leading-relaxed text-[var(--ink-soft)]">
          Where the Garage is on the seven-month plan and what has shipped so
          far.
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-[var(--font-fraunces)] text-[30px] tracking-[-0.02em] text-[var(--ink)]">
          Plan, June – December 2026
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
          {planTracks.map((track) => (
            <li key={track} className="rounded-sm bg-[var(--paper-warm)] px-3 py-2">
              {track}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="font-[var(--font-fraunces)] text-[30px] tracking-[-0.02em] text-[var(--ink)]">
          Accomplished so far
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accomplishments.map((item) => (
            <article
              key={item.label}
              className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-4"
            >
              <p className="font-[var(--font-fraunces)] text-4xl text-[var(--ink)]">
                {item.count}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
