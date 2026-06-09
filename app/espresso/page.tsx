"use client";

import { useState } from "react";

interface Story {
  headline: string;
  blurb: string;
  why_it_matters: string;
  source: string;
  url: string;
}

const STEPS = [
  {
    icon: "🔍",
    name: "Discover",
    desc: "Pulls candidate stories from RSS feeds and a Perplexity search pass.",
  },
  {
    icon: "⚖️",
    name: "Rank & select",
    desc: "Claude scores candidates and picks 3–6 stories worth covering.",
  },
  {
    icon: "✍️",
    name: "Rewrite",
    desc: "Drafts headlines, blurbs, and kickers in the briefing voice.",
  },
  {
    icon: "🎨",
    name: "Illustrate & ship",
    desc: "Generates images, assembles HTML, and sends the email.",
  },
];

export default function EspressoPage() {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTry() {
    setLoading(true);
    setError("");
    setStories(null);
    try {
      const resp = await fetch("/api/try", { method: "POST" });
      if (resp.status === 429) {
        setError("Rate limit reached. Try again in an hour.");
        return;
      }
      if (!resp.ok) throw new Error("Request failed.");
      const data = await resp.json();
      setStories(data.stories);
    } catch {
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Programs
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          AI Espresso <span aria-hidden="true">☕</span>
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          An AI agent that writes and ships a daily news briefing — discovery
          to inbox, no editor required.
        </p>
      </header>

      <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">Pipeline</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Four stages run in sequence on every briefing.
        </p>
        <ol className="mt-5 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {STEPS.map((s, i) => (
            <li
              key={s.name}
              className="grid grid-cols-[auto_auto_1fr] items-baseline gap-4 py-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="text-xl leading-none">
                {s.icon}
              </span>
              <div>
                <p className="font-serif text-lg text-[var(--ink)]">
                  {s.name}
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={handleTry}
            disabled={loading}
            className="rounded-sm bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white no-underline transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Running agent…" : "Try it out"}
          </button>
          <a
            href="https://github.com/jackiehimel/ai-espresso-finalized"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink-soft)] no-underline hover:bg-[var(--paper-warm)]"
          >
            View source →
          </a>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
        {loading && !error && (
          <p className="mt-4 text-sm italic text-[var(--ink-faint)]">
            Rewriting stories…
          </p>
        )}
      </section>

      {stories && (
        <section className="mt-8 rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
          <h2 className="font-serif text-2xl text-[var(--ink)]">
            Today&rsquo;s briefing
          </h2>
          <ul className="mt-4 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {stories.map((s, i) => (
              <li key={i} className="py-4">
                <h3 className="font-serif text-lg leading-snug text-[var(--ink)]">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline hover:underline"
                  >
                    {s.headline}
                  </a>
                </h3>
                {s.why_it_matters && (
                  <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
                    {s.why_it_matters}
                  </p>
                )}
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                  {s.source}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8 rounded-md border border-[var(--rule)] bg-[var(--paper)] p-6">
        <h2 className="font-serif text-2xl text-[var(--ink)]">
          Run it yourself
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Available as a self-contained Docker image.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-sm border border-[var(--rule)] bg-[var(--paper-warm)] px-4 py-3 font-mono text-[13px] leading-6 text-[var(--ink)]">
          <code>
            docker run -e ANTHROPIC_API_KEY=your-key
            ghcr.io/jackiehimel/ai-espresso-finalized
          </code>
        </pre>
      </section>
    </main>
  );
}
