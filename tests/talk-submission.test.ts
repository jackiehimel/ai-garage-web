import { describe, it, expect } from "vitest";
import { validateTalkSubmission } from "@/lib/talk-submission";

// 2026-06-05 is a Friday.
const validSubmission = {
  name: "Alex Doe",
  team: "QE",
  talkTitle: "Agent-driven testing",
  talkOverview: "A walkthrough of how we use agents in the QE pipeline.",
  keyTakeaways: "1) faster cases 2) self-healing 3) better coverage",
  speakerBio: "Alex is a QE engineer focused on automation and tooling.",
  preferredDate: "2026-06-05",
};

describe("validateTalkSubmission", () => {
  it("accepts a well-formed submission and trims fields", () => {
    const result = validateTalkSubmission({
      ...validSubmission,
      name: "  Alex Doe  ",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe("Alex Doe");
      expect(result.value.team).toBe("QE");
    }
  });

  it("rejects a non-Friday preferred date", () => {
    const result = validateTalkSubmission({
      ...validSubmission,
      preferredDate: "2026-06-04",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === "preferredDate")).toBe(true);
    }
  });

  it("rejects an unknown team", () => {
    const result = validateTalkSubmission({
      ...validSubmission,
      team: "Marketing",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === "team")).toBe(true);
    }
  });

  it("collects multiple errors for empty input", () => {
    const result = validateTalkSubmission({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(1);
    }
  });
});
