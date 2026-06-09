"use client";

import { useState, type KeyboardEvent } from "react";

type BacklogCardProps = {
  title: string;
  whatItDoes: string;
  shouldAccomplish: string;
  acceptanceCriteria: string;
};

export function BacklogCard({
  title,
  whatItDoes,
  shouldAccomplish,
  acceptanceCriteria,
}: BacklogCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((value) => !value);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={onKeyDown}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `${title} — showing details. Activate to flip back.`
          : `${title} — activate to view details.`
      }
      className="backlog-card"
    >
      <div className={`backlog-card-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="backlog-card-face backlog-card-front">
          <h3 className="m-0 font-serif text-2xl font-medium normal-case tracking-[-0.01em] text-[var(--ink)]">
            {title}
          </h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
            Click to flip
          </p>
        </div>
        <div className="backlog-card-face backlog-card-back">
          <div className="backlog-card-back-content">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)]">
                What it does
              </p>
              <p className="mt-1 text-[13px] leading-5 text-[var(--ink-soft)]">
                {whatItDoes}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)]">
                Should accomplish
              </p>
              <p className="mt-1 text-[13px] leading-5 text-[var(--ink-soft)]">
                {shouldAccomplish}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)]">
                Acceptance criteria
              </p>
              <p className="mt-1 text-[13px] leading-5 text-[var(--ink-soft)]">
                {acceptanceCriteria}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
