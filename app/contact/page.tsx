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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">
          AI Garage / Get Involved
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Contact</h1>
        <p className="max-w-3xl text-slate-300">
          How to engage with the Garage based on what you want to do.
        </p>
      </header>

      <section className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-5">
        <h2 className="text-xl font-semibold text-slate-100">How to reach us</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-left text-slate-200">
                <th className="py-2 pr-3">If you want to…</th>
                <th className="py-2">Do this</th>
              </tr>
            </thead>
            <tbody>
              {contactRows.map((row) => (
                <tr key={row.goal} className="border-b border-slate-800/70">
                  <td className="py-2 pr-3 text-slate-100">{row.goal}</td>
                  <td className="py-2 text-slate-300">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
