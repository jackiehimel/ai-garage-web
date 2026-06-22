import { describe, it, expect } from "vitest";
import { validateIdeaSubmission } from "@/lib/idea-submission";

const validIdea = {
  name: "Alex Doe",
  ideaTitle: "Release-notes agent",
  problemStatement: "Writing release notes by hand is slow and inconsistent.",
  businessCase: "Saves each squad time every release and improves quality.",
  proposedSolution: "An agent that drafts notes from merged PRs for review.",
  expectedOutcome: "Drafts ready in minutes instead of hours.",
};

describe("validateIdeaSubmission", () => {
  it("accepts a well-formed idea and trims fields", () => {
    const result = validateIdeaSubmission({ ...validIdea, name: "  Alex Doe  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.name).toBe("Alex Doe");
  });

  it("rejects a too-short problem statement", () => {
    const result = validateIdeaSubmission({ ...validIdea, problemStatement: "no" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === "problemStatement")).toBe(true);
    }
  });

  it("collects multiple errors for empty input", () => {
    const result = validateIdeaSubmission({});
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.length).toBeGreaterThan(1);
  });
});
