"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-wrap flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
        Something went wrong
      </p>
      <h1 className="mb-6 font-serif text-4xl tracking-[-0.02em] text-[var(--ink)]">
        {error.message || "Unexpected error"}
      </h1>
      <button
        onClick={reset}
        className="rounded-md border border-[var(--rule)] bg-[var(--paper)] px-5 py-2 font-mono text-sm text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        Try again
      </button>
    </main>
  );
}
