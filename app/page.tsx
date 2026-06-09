import Link from "next/link";
import {
  accomplishments,
  categories,
  epicCards,
  siteMeta,
  tracks,
} from "@/lib/garage-content";

export default function Home() {
  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          Internal Portal
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          {siteMeta.title}
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          {siteMeta.subtitle}
        </p>
      </header>

      <section aria-labelledby="tracks-heading" className="mb-12">
        <h2
          id="tracks-heading"
          className="mb-5 font-serif text-[30px] tracking-[-0.02em] text-[var(--ink)]"
        >
          Tracks
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <article
              key={track.id}
              id={track.id}
              className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6"
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                {track.index} — {track.status}
              </p>
              <h3 className="mb-2 font-serif text-2xl font-medium text-[var(--ink)] normal-case tracking-[-0.01em]">
                {track.title}
              </h3>
              <p className="text-[15px] leading-7 text-[var(--ink-soft)]">
                {track.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="mb-12">
        <h2
          id="categories-heading"
          className="mb-5 font-serif text-[30px] tracking-[-0.02em] text-[var(--ink)]"
        >
          Agentic Library Categories
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className="rounded-md border border-[var(--rule)] bg-[var(--paper)] px-5 py-4"
            >
              <p className="font-serif text-xl text-[var(--ink)]">
                {category.name}
              </p>
              <p className="mt-2 text-[15px] leading-7 text-[var(--ink-soft)]">
                {category.summary}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 font-serif text-[30px] tracking-[-0.02em] text-[var(--ink)]">
          Accomplished so far
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accomplishments.map((item) => (
            <article
              key={item.label}
              className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-4"
            >
              <p className="font-serif text-4xl text-[var(--ink)]">
                {item.count}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 font-serif text-[30px] tracking-[-0.02em] text-[var(--ink)]">
          Epics in flight
        </h2>
        <div className="grid gap-px overflow-hidden rounded-md border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
          {epicCards.map((epic) => (
            <Link
              key={epic.id}
              href="/epics"
              className="bg-[var(--paper)] p-5 no-underline transition hover:bg-[var(--paper-warm)]"
            >
              <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--ink-faint)]">
                Epic {epic.id}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium normal-case tracking-[-0.01em] text-[var(--ink)]">
                {epic.title}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-[var(--ink-soft)]">
                {epic.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
