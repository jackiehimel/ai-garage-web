import Link from "next/link";
import { notFound } from "next/navigation";
import { LaunchAction, LaunchReason } from "@/components/agent-launch-actions";
import { experienceLabels, statusLabels } from "@/lib/agent-library";
import { getAgentDetail, isValidAgentIdFormat } from "@/lib/library-service";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;

  if (!isValidAgentIdFormat(agentId)) {
    notFound();
  }

  const detail = getAgentDetail(agentId);

  if (!detail) {
    notFound();
  }

  const { agent, collections } = detail;

  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Library / Agent Preview
        </p>
        <h1 className="mb-4 font-[var(--font-fraunces)] text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          {agent.title}
        </h1>
        <p className="max-w-[62ch] font-[var(--font-fraunces)] text-xl leading-relaxed text-[var(--ink-soft)]">
          {agent.summary}
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-sm bg-[var(--accent-soft)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">
            {statusLabels[agent.status]}
          </span>
          <span className="rounded-sm border border-[var(--rule)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
            {experienceLabels[agent.experience]}
          </span>
          <span className="rounded-sm border border-[var(--rule)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
            {agent.function}
          </span>
          <span className="rounded-sm border border-[var(--rule)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
            {agent.vertical}
          </span>
        </div>

        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          Owner: {agent.owner} · Stack: {agent.stack}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="font-[var(--font-fraunces)] text-2xl text-[var(--ink)]">
              Required inputs
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink-soft)]">
              {agent.previewInputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-[var(--font-fraunces)] text-2xl text-[var(--ink)]">
              Capabilities
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink-soft)]">
              {agent.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <LaunchAction launch={agent.launch} />
          <Link
            href="/library"
            className="rounded-sm border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink-soft)] no-underline hover:bg-[var(--paper-warm)]"
          >
            Back to Library
          </Link>
        </div>
        <LaunchReason launch={agent.launch} />
      </section>

      <section className="mt-8 rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
        <h2 className="font-[var(--font-fraunces)] text-2xl text-[var(--ink)]">
          Collections
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--ink-soft)]">
          {collections.map((collection) => (
            <li key={collection.id}>
              {collection.title}: {collection.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
