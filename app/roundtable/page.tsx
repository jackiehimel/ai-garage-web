import { RoundtableForm } from "@/components/roundtable-form";

export default function RoundtablePage() {
  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Programs
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          AI Roundtable
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          Weekly 30-minute session where one presenter walks through an idea or
          build using a five-point format.
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">Format</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
          Each session includes a 15-minute presentation and 15 minutes of
          Q&amp;A. Sessions are recorded and open to the company.
        </p>
      </section>

      <section className="mt-8 rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">
          Submit to present
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
          Pitch a talk for an upcoming Friday roundtable.
        </p>
        <RoundtableForm />
      </section>
    </main>
  );
}
