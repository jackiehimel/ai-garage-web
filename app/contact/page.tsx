const contactRows = [
  {
    goal: "Use a Library agent on a customer engagement",
    action:
      "Browse the Library catalog and follow the contact path listed on the entry.",
  },
  {
    goal: "Propose a new agent",
    action: "Submit through the intake form.",
  },
  {
    goal: "Present at the AI Roundtable",
    action: "Use the roundtable submission queue.",
  },
  {
    goal: "Contribute engineering time",
    action: "Raise availability with your manager, then flag interest via intake.",
  },
  {
    goal: "Share an idea informally",
    action: "Reach out through ASE leadership channels.",
  },
];

export default function ContactPage() {
  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Get Involved
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Contact
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          How to engage with the Garage based on what you want to do.
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">
          How to reach us
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--rule)] text-left">
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                  If you want to…
                </th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                  Do this
                </th>
              </tr>
            </thead>
            <tbody>
              {contactRows.map((row) => (
                <tr
                  key={row.goal}
                  className="border-b border-[var(--rule)] last:border-b-0"
                >
                  <td className="py-3 pr-3 font-serif text-base text-[var(--ink)]">
                    {row.goal}
                  </td>
                  <td className="py-3 text-sm leading-6 text-[var(--ink-soft)]">
                    {row.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
