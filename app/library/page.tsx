import Link from "next/link";
import { LaunchAction, LaunchReason } from "@/components/agent-launch-actions";
import { statusLabels } from "@/lib/agent-library";
import { collectionCatalog, listAgents, sanitizeFilters } from "@/lib/library-service";

type SearchValue = string | string[] | undefined;
type SearchParams = Record<string, SearchValue>;

function toSingle(value: SearchValue) {
  if (Array.isArray(value)) return value[0] ?? "all";
  return value ?? "all";
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const filters = sanitizeFilters({
    view: toSingle(params.view),
    fn: toSingle(params.fn),
    audience: toSingle(params.audience),
    industry: toSingle(params.industry),
    status: toSingle(params.status),
    exp: toSingle(params.exp),
    collection: toSingle(params.collection),
  });

  const agents = listAgents(filters);
  const collectionTitleById = new Map(
    collectionCatalog.map((collection) => [collection.id, collection.title]),
  );

  return (
    <main className="page-wrap page-wrap-wide">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Library
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Agentic Library
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          Explore AI Garage agents by category, team, and audience.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="m-0 font-serif text-[30px] leading-none tracking-[-0.02em] text-[var(--ink)]">
            Agents ({agents.length})
          </h2>
          <p className="m-0 pt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
            Compact view
          </p>
        </div>

        <div className="library-cards">
          {agents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-md border border-[var(--rule)] bg-[var(--paper-warm)] p-5 text-center"
            >
              <div className="mb-2 space-y-2">
                <h3 className="m-0 font-serif text-2xl font-medium normal-case tracking-[-0.01em] text-[var(--ink)]">
                  {agent.title}
                </h3>
                <span className="inline-block rounded-sm bg-[var(--accent-soft)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">
                  {statusLabels[agent.status]}
                </span>
              </div>

              <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                {agent.collections
                  .map(
                    (collectionId) =>
                      collectionTitleById.get(collectionId) ?? "Uncategorized",
                  )
                  .join(" · ")}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link
                  href={`/library/${agent.id}`}
                  className="rounded-sm border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink-soft)] no-underline hover:bg-[var(--paper-warm)]"
                >
                  About
                </Link>
                <LaunchAction launch={agent.launch} />
              </div>
              <LaunchReason launch={agent.launch} />
            </article>
          ))}
        </div>
      </section>

      {agents.length === 0 ? (
        <section className="mt-6 rounded-md border border-[var(--rule)] bg-[var(--paper-warm)] p-5">
          <h2 className="font-serif text-2xl text-[var(--ink)]">
            No matches yet
          </h2>
          <p className="mt-2 text-[15px] text-[var(--ink-soft)]">
            No agents match this filter combination. Try widening one or more
            filters to see available cards.
          </p>
        </section>
      ) : null}
    </main>
  );
}
