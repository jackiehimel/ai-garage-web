import Link from "next/link";
import { LibraryFilters } from "@/components/library-filters";
import { LaunchAction, LaunchReason } from "@/components/agent-launch-actions";
import { statusLabels } from "@/lib/agent-library";
import {
  collectionCatalog,
  listAgents,
  sanitizeFilters,
} from "@/lib/library-service";

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
    industry: toSingle(params.industry),
    status: toSingle(params.status),
    exp: toSingle(params.exp),
    collection: toSingle(params.collection),
  });

  const agents = listAgents(filters);

  return (
    <main className="page-wrap page-wrap-wide">
      <header className="mb-12 border-b border-[var(--rule)] pb-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Library
        </p>
        <h1 className="mb-4 font-[var(--font-fraunces)] text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Agentic Library
        </h1>
        <p className="max-w-[62ch] font-[var(--font-fraunces)] text-xl leading-relaxed text-[var(--ink-soft)]">
          Browse agents, filter quickly, and open details only when needed.
        </p>
      </header>

      <div className="library-layout">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-[var(--font-fraunces)] text-[30px] tracking-[-0.02em] text-[var(--ink)]">
              Agent cards ({agents.length})
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
              Compact view
            </p>
          </div>

          <div className="library-cards">
            {agents.map((agent) => (
              <article
                key={agent.id}
                className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-[var(--font-fraunces)] text-2xl font-medium normal-case tracking-[-0.01em] text-[var(--ink)]">
                    {agent.title}
                  </h3>
                  <span className="rounded-sm bg-[var(--accent-soft)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">
                    {statusLabels[agent.status]}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-[15px] leading-6 text-[var(--ink-soft)]">
                  {agent.summary}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  {agent.function} · {agent.vertical}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/library/${agent.id}`}
                    className="rounded-sm border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink-soft)] no-underline hover:bg-[var(--paper-warm)]"
                  >
                    Preview
                  </Link>
                  <LaunchAction launch={agent.launch} />
                </div>
                <LaunchReason launch={agent.launch} />
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <LibraryFilters
            initialView={filters.view}
            initialFunction={filters.fn}
            initialVertical={filters.vertical}
            initialExperience={filters.experience}
            compact
          />

          <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
            <h2 className="font-[var(--font-fraunces)] text-2xl text-[var(--ink)]">
              Collections
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/library"
                  className={`block rounded-sm px-2 py-2 no-underline ${
                    filters.collection === "all"
                      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--paper-warm)]"
                  }`}
                >
                  All collections
                </Link>
              </li>
              {collectionCatalog.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/library?collection=${encodeURIComponent(item.id)}`}
                    className={`block rounded-sm px-2 py-2 no-underline ${
                      filters.collection === item.id
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "text-[var(--ink-soft)] hover:bg-[var(--paper-warm)]"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {agents.length === 0 ? (
        <section className="mt-6 rounded-md border border-[var(--rule)] bg-[var(--paper-warm)] p-5">
          <h2 className="font-[var(--font-fraunces)] text-2xl text-[var(--ink)]">
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
