import { describe, it, expect } from "vitest";
import {
  isValidAgentIdFormat,
  sanitizeFilters,
  validateFilters,
} from "@/lib/library-service";

describe("validateFilters", () => {
  it("accepts an empty input and defaults every field to 'all'", () => {
    const result = validateFilters({});
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.filters.view).toBe("all");
      expect(result.filters.fn).toBe("all");
      expect(result.filters.collection).toBe("all");
    }
  });

  it("accepts known values", () => {
    const result = validateFilters({ view: "featured" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.filters.view).toBe("featured");
  });

  it("rejects an unknown value with a structured error", () => {
    const result = validateFilters({ view: "bogus" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe("view");
      expect(result.errors[0].value).toBe("bogus");
      expect(result.errors[0].allowed).toContain("all");
    }
  });
});

describe("sanitizeFilters", () => {
  it("coerces unknown values to 'all' instead of throwing", () => {
    const filters = sanitizeFilters({ view: "nonsense", status: "" });
    expect(filters.view).toBe("all");
    expect(filters.status).toBe("all");
  });

  it("maps the 'industry' query key onto the vertical filter", () => {
    const filters = sanitizeFilters({ industry: "totally-made-up" });
    expect(filters.vertical).toBe("all");
  });
});

describe("isValidAgentIdFormat", () => {
  it("accepts lowercase slug ids", () => {
    expect(isValidAgentIdFormat("ai-news-agent")).toBe(true);
    expect(isValidAgentIdFormat("agent1")).toBe(true);
  });

  it("rejects malformed ids", () => {
    expect(isValidAgentIdFormat("Bad_Id")).toBe(false);
    expect(isValidAgentIdFormat("-leading")).toBe(false);
    expect(isValidAgentIdFormat("")).toBe(false);
    expect(isValidAgentIdFormat("a".repeat(81))).toBe(false);
  });
});
