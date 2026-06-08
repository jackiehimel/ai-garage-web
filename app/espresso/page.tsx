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
  { icon: "🔍", name: "Discover", desc: "RSS + Perplexity search" },
  { icon: "⚖️", name: "Rank & Select", desc: "Claude picks 3-6 stories" },
  { icon: "✍️", name: "Rewrite", desc: "Headlines, blurbs, kickers" },
  { icon: "🎨", name: "Illustrate & Ship", desc: "Images, HTML, email" },
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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">
          AI Garage / Programs
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          AI Espresso ☕
        </h1>
        <p className="max-w-[62ch] text-[15px] leading-relaxed text-slate-300">
          AI agent that writes and ships a daily news briefing.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-700/70 bg-slate-700/70 sm:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.name}
            className="flex flex-col items-center gap-1 bg-slate-900/80 px-4 py-5 text-center"
          >
            <span className="text-2xl">{s.icon}</span>
            <strong className="text-sm text-white">{s.name}</strong>
            <span className="text-xs text-slate-400">{s.desc}</span>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleTry}
          disabled={loading}
          className="rounded-md bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Running agent…" : "Try it out"}
        </button>
        <a
          href="https://github.com/jackiehimel/ai-espresso-finalized"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          View source →
        </a>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {loading && (
        <p className="text-sm italic text-slate-400">Rewriting stories…</p>
      )}

      {stories && (
        <section className="divide-y divide-slate-700/70 overflow-hidden rounded-xl border border-slate-700/70">
          {stories.map((s, i) => (
            <article key={i} className="bg-slate-900/60 px-5 py-4">
              <h3 className="text-base font-semibold text-white">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {s.headline}
                </a>
              </h3>
              {s.why_it_matters && (
                <p className="mt-1 text-sm text-slate-300">
                  {s.why_it_matters}
                </p>
              )}
              <span className="mt-2 inline-block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                {s.source}
              </span>
            </article>
          ))}
        </section>
      )}

      <section className="border-t border-slate-700/70 pt-6">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
          Run it yourself
        </span>
        <code className="block rounded-lg bg-slate-950 px-4 py-3 font-mono text-sm text-slate-300">
          docker run -e ANTHROPIC_API_KEY=your-key
          ghcr.io/jackiehimel/ai-espresso-finalized
        </code>
      </section>
    </main>
  );
}
