import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-wrap flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
        404
      </p>
      <h1 className="mb-6 font-serif text-4xl tracking-[-0.02em] text-[var(--ink)]">
        Page not found
      </h1>
      <Link
        href="/"
        className="rounded-md border border-[var(--rule)] bg-[var(--paper)] px-5 py-2 font-mono text-sm text-[var(--ink)] no-underline transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        Back to home
      </Link>
    </main>
  );
}
