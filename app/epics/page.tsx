import { qeAgents } from "@/lib/garage-content";

const storyFields = [
  ["Title", "Short, action-oriented description of the agent or feature"],
  ["Description", "What's needed and why — the problem the story solves"],
  ["Effort", "Story points, set during sprint planning"],
  ["Start date", "Sprint start when the story is picked up"],
  ["Projected end", "Sprint end target"],
];

export default function EpicsPage() {
  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Library
        </p>
        <h1 className="mb-4 font-[var(--font-fraunces)] text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Epics & Stories
        </h1>
        <p className="max-w-[62ch] font-[var(--font-fraunces)] text-xl leading-relaxed text-[var(--ink-soft)]">
          Problem statements grouped into epics, broken into stories with effort
          and timing.
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-[var(--font-fraunces)] text-[30px] tracking-[-0.02em] text-[var(--ink)]">
          Epic 01 — QE agent workflow
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-[var(--ink-soft)]">
          Multi-agent QE workflow on Zebrunner across seven agents. Five are
          shipped, while failure analysis and report generation remain in build.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--rule)] text-left">
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  Agent
                </th>
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  Status
                </th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  What it does
                </th>
              </tr>
            </thead>
            <tbody>
              {qeAgents.map((agent) => (
                <tr key={agent.agent} className="border-b border-[var(--rule-soft)]">
                  <td className="py-3 pr-3 font-medium text-[var(--ink)]">
                    {agent.agent}
                  </td>
                  <td className="py-3 pr-3 text-[var(--accent)]">{agent.status}</td>
                  <td className="py-3 text-[var(--ink-soft)]">{agent.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
          <h3 className="font-[var(--font-fraunces)] text-2xl font-medium normal-case text-[var(--ink)]">
            Epic 02 — ADLC agents
          </h3>
          <p className="mt-2 text-[15px] leading-7 text-[var(--ink-soft)]">
            Closed-loop agents across Plan, Build, Quality, Release, and Learn.
            Story breakdown is in progress.
          </p>
        </article>
        <article className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
          <h3 className="font-[var(--font-fraunces)] text-2xl font-medium normal-case text-[var(--ink)]">
            Epic 03–05 — Internal, Marketing, Retail
          </h3>
          <p className="mt-2 text-[15px] leading-7 text-[var(--ink-soft)]">
            Internal workflow agents, marketing functions, and vertical retail
            use cases are queued for story sequencing.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
        <h2 className="font-[var(--font-fraunces)] text-[30px] tracking-[-0.02em] text-[var(--ink)]">
          Story format
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--rule)] text-left">
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  Field
                </th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {storyFields.map(([field, description]) => (
                <tr key={field} className="border-b border-[var(--rule-soft)]">
                  <td className="py-3 pr-3 font-medium text-[var(--ink)]">{field}</td>
                  <td className="py-3 text-[var(--ink-soft)]">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
