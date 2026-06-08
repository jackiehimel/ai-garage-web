const intakeSteps = [
  "Submit problem, business case, and proposed outcome.",
  "Qualify through a regular review cadence.",
  "Build with bench engineering support and senior coaching.",
  "Ship with submitter involvement through demo and delivery.",
];

export default function SubmitPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">
          AI Garage / Get Involved
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Submit an Idea
        </h1>
        <p className="max-w-3xl text-slate-300">
          Bring an agent idea to the Workshop track. Approved ideas receive
          engineering support and coaching.
        </p>
      </header>

      <section className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-5">
        <h2 className="text-xl font-semibold text-slate-100">How it works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {intakeSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-5">
        <h2 className="text-xl font-semibold text-slate-100">Submission form</h2>
        <form className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Your name"
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <input
            placeholder="Idea title"
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <textarea
            placeholder="Problem statement"
            rows={4}
            className="sm:col-span-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <textarea
            placeholder="Business case"
            rows={4}
            className="sm:col-span-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <textarea
            placeholder="Proposed solution"
            rows={4}
            className="sm:col-span-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <input
            placeholder="Expected outcome"
            className="sm:col-span-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <button
            type="button"
            className="sm:col-span-2 w-fit rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
