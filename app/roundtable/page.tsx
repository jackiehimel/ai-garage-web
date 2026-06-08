export default function RoundtablePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">
          AI Garage / Programs
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          AI Roundtable
        </h1>
        <p className="max-w-3xl text-slate-300">
          Weekly 30-minute session where one presenter walks through an idea or
          build using a five-point format.
        </p>
      </header>

      <section className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-5">
        <h2 className="text-xl font-semibold text-slate-100">Format</h2>
        <p className="mt-3 text-sm text-slate-300">
          Each session includes a 15-minute presentation and 15 minutes of Q&A.
          Sessions are recorded and open to the company.
        </p>
      </section>

      <section className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-5">
        <h2 className="text-xl font-semibold text-slate-100">Submit to present</h2>
        <p className="mt-2 text-sm text-slate-300">
          The submission flow is being migrated from static mocks to native app
          forms. Final routing to the review queue is pending backend hookup.
        </p>
      </section>
    </main>
  );
}
