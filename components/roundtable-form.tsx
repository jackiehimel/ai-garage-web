"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  TEAM_OPTIONS,
  isFridayDateString,
  type Team,
} from "@/lib/talk-submission";

type FormState = {
  name: string;
  team: Team | "";
  talkTitle: string;
  talkOverview: string;
  keyTakeaways: string;
  speakerBio: string;
  preferredDate: string;
};

const initialState: FormState = {
  name: "",
  team: "",
  talkTitle: "",
  talkOverview: "",
  keyTakeaways: "",
  speakerBio: "",
  preferredDate: "",
};

const fieldClasses =
  "rounded-sm border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:outline-none";

const labelClasses =
  "font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-faint)]";

export function RoundtableForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const dateIsFriday =
    form.preferredDate === "" || isFridayDateString(form.preferredDate);

  function update<K extends keyof FormState>(key: K) {
    return (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }) as FormState);
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!dateIsFriday) {
      setStatus({
        type: "error",
        message: "Preferred date must be a Friday.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const resp = await fetch("/api/submissions/talk", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (resp.status === 201) {
        setStatus({
          type: "success",
          message: "Submission received. We'll be in touch about scheduling.",
        });
        setForm(initialState);
        return;
      }

      const body = (await resp.json().catch(() => ({}))) as {
        error?: string;
      };
      setStatus({
        type: "error",
        message: body.error ?? "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
      <div className="grid gap-1.5">
        <label htmlFor="rt-name" className={labelClasses}>
          Name
        </label>
        <input
          id="rt-name"
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="rt-team" className={labelClasses}>
          Team
        </label>
        <select
          id="rt-team"
          required
          value={form.team}
          onChange={update("team")}
          className={fieldClasses}
        >
          <option value="" disabled>
            Select your team…
          </option>
          {TEAM_OPTIONS.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="rt-title" className={labelClasses}>
          Talk Title
        </label>
        <input
          id="rt-title"
          type="text"
          required
          value={form.talkTitle}
          onChange={update("talkTitle")}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="rt-overview" className={labelClasses}>
          Brief Overview of Talk{" "}
          <span className="font-sans normal-case tracking-normal text-[var(--ink-faint)]">
            (1–3 sentences)
          </span>
        </label>
        <textarea
          id="rt-overview"
          rows={3}
          required
          value={form.talkOverview}
          onChange={update("talkOverview")}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="rt-takeaways" className={labelClasses}>
          Three Key Takeaways
        </label>
        <textarea
          id="rt-takeaways"
          rows={3}
          required
          value={form.keyTakeaways}
          onChange={update("keyTakeaways")}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="rt-bio" className={labelClasses}>
          Brief Speaker Bio{" "}
          <span className="font-sans normal-case tracking-normal text-[var(--ink-faint)]">
            (2–3 sentences)
          </span>
        </label>
        <textarea
          id="rt-bio"
          rows={3}
          required
          value={form.speakerBio}
          onChange={update("speakerBio")}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="rt-date" className={labelClasses}>
          Preferred Date{" "}
          <span className="font-sans normal-case tracking-normal text-[var(--ink-faint)]">
            (please select a Friday — talks run on Fridays)
          </span>
        </label>
        <input
          id="rt-date"
          type="date"
          required
          value={form.preferredDate}
          onChange={update("preferredDate")}
          className={fieldClasses}
          aria-invalid={!dateIsFriday || undefined}
        />
        {!dateIsFriday && (
          <p className="text-xs text-red-600">
            That&rsquo;s not a Friday. Pick a Friday to continue.
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !dateIsFriday}
          className="rounded-sm bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit talk"}
        </button>
        {status.type === "success" && (
          <p className="text-sm text-[var(--accent)]">{status.message}</p>
        )}
        {status.type === "error" && (
          <p className="text-sm text-red-600">{status.message}</p>
        )}
      </div>
    </form>
  );
}
