const intakeSteps = [
  "Submit problem, business case, and proposed outcome.",
  "Qualify through a regular review cadence.",
  "Build with bench engineering support and senior coaching.",
  "Ship with submitter involvement through demo and delivery.",
];

const inputClasses =
  "rounded-sm border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:outline-none";

export default function SubmitPage() {
  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Get Involved
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Submit an Idea
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          Bring an agent idea to the Workshop track. Approved ideas receive
          engineering support and coaching.
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">How it works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-[var(--ink-soft)] marker:font-mono marker:text-[var(--ink-faint)]">
          {intakeSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">
          Submission form
        </h2>
        <form className="mt-4 grid gap-3 sm:grid-cols-2">
          <input placeholder="Your name" className={inputClasses} />
          <input placeholder="Idea title" className={inputClasses} />
          <textarea
            placeholder="Problem statement"
            rows={4}
            className={`${inputClasses} sm:col-span-2`}
          />
          <textarea
            placeholder="Business case"
            rows={4}
            className={`${inputClasses} sm:col-span-2`}
          />
          <textarea
            placeholder="Proposed solution"
            rows={4}
            className={`${inputClasses} sm:col-span-2`}
          />
          <input
            placeholder="Expected outcome"
            className={`${inputClasses} sm:col-span-2`}
          />
          <button
            type="button"
            className="w-fit rounded-sm bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 sm:col-span-2"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
