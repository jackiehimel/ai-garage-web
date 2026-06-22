"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type FormState = {
  name: string;
  ideaTitle: string;
  problemStatement: string;
  businessCase: string;
  proposedSolution: string;
  expectedOutcome: string;
};

const initialState: FormState = {
  name: "",
  ideaTitle: "",
  problemStatement: "",
  businessCase: "",
  proposedSolution: "",
  expectedOutcome: "",
};

const inputClasses =
  "rounded-sm border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:outline-none";

export function IdeaForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  function update<K extends keyof FormState>(key: K) {
    return (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "idle" });
    setSubmitting(true);
    try {
      const resp = await fetch("/api/submissions/idea", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (resp.status === 201) {
        setStatus({
          type: "success",
          message: "Idea received. We'll qualify it in the next review cadence.",
        });
        setForm(initialState);
        return;
      }

      const body = (await resp.json().catch(() => ({}))) as { error?: string };
      setStatus({
        type: "error",
        message: body.error ?? "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
      <input
        placeholder="Your name"
        required
        value={form.name}
        onChange={update("name")}
        className={inputClasses}
      />
      <input
        placeholder="Idea title"
        required
        value={form.ideaTitle}
        onChange={update("ideaTitle")}
        className={inputClasses}
      />
      <textarea
        placeholder="Problem statement"
        rows={4}
        required
        value={form.problemStatement}
        onChange={update("problemStatement")}
        className={`${inputClasses} sm:col-span-2`}
      />
      <textarea
        placeholder="Business case"
        rows={4}
        required
        value={form.businessCase}
        onChange={update("businessCase")}
        className={`${inputClasses} sm:col-span-2`}
      />
      <textarea
        placeholder="Proposed solution"
        rows={4}
        required
        value={form.proposedSolution}
        onChange={update("proposedSolution")}
        className={`${inputClasses} sm:col-span-2`}
      />
      <input
        placeholder="Expected outcome"
        required
        value={form.expectedOutcome}
        onChange={update("expectedOutcome")}
        className={`${inputClasses} sm:col-span-2`}
      />
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-fit rounded-sm bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
        {status.type === "success" && (
          <p className="text-sm text-[var(--accent)]">{status.message}</p>
        )}
        {status.type === "error" && (
          <p className="text-sm text-[var(--error)]">{status.message}</p>
        )}
      </div>
    </form>
  );
}
