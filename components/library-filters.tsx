"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  initialView: string;
  initialFunction: string;
  initialVertical: string;
  initialExperience: string;
  compact?: boolean;
};

function setOrDelete(params: URLSearchParams, key: string, value: string) {
  if (!value || value === "all") {
    params.delete(key);
    return;
  }
  params.set(key, value);
}

export function LibraryFilters({
  initialView,
  initialFunction,
  initialVertical,
  initialExperience,
  compact = false,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    setOrDelete(params, key, value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <section className="rounded-md border border-[var(--rule)] bg-[var(--paper)] p-5">
      <h2 className="font-[var(--font-fraunces)] text-2xl text-[var(--ink)]">
        Filter agents
      </h2>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">Quickly narrow results.</p>

      <div
        className={`mt-4 grid gap-3 ${
          compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
          View
          <select
            className="mt-1 block w-full rounded-sm border border-[var(--rule)] bg-[var(--paper-warm)] px-3 py-2 text-sm font-normal text-[var(--ink)]"
            defaultValue={initialView}
            onChange={(event) => updateFilter("view", event.target.value)}
          >
            <option value="all">All agents</option>
            <option value="featured">Featured</option>
          </select>
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
          Experience
          <select
            className="mt-1 block w-full rounded-sm border border-[var(--rule)] bg-[var(--paper-warm)] px-3 py-2 text-sm font-normal text-[var(--ink)]"
            defaultValue={initialExperience}
            onChange={(event) => updateFilter("exp", event.target.value)}
          >
            <option value="all">All experiences</option>
            <option value="try_agent">Try Agent</option>
            <option value="guided_tour">Guided Tour</option>
          </select>
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
          Industry
          <select
            className="mt-1 block w-full rounded-sm border border-[var(--rule)] bg-[var(--paper-warm)] px-3 py-2 text-sm font-normal text-[var(--ink)]"
            defaultValue={initialVertical}
            onChange={(event) => updateFilter("industry", event.target.value)}
          >
            <option value="all">All industries</option>
            <option value="Cross-functional">Cross-functional</option>
            <option value="Retail">Retail</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </label>

        <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
          Function
          <select
            className="mt-1 block w-full rounded-sm border border-[var(--rule)] bg-[var(--paper-warm)] px-3 py-2 text-sm font-normal text-[var(--ink)]"
            defaultValue={initialFunction}
            onChange={(event) => updateFilter("fn", event.target.value)}
          >
            <option value="all">All functions</option>
            <option value="Quality Engineering">Quality Engineering</option>
            <option value="Development / ADLC">Development / ADLC</option>
            <option value="Marketing">Marketing</option>
            <option value="Retail & Vertical">Retail & Vertical</option>
          </select>
        </label>
      </div>
    </section>
  );
}
