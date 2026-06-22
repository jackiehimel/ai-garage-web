import { describe, it, expect } from "vitest";
import {
  buildStaticFallback,
  mergeStories,
  parseRewrites,
  type EditionStory,
} from "@/lib/espresso-demo";

const candidates: EditionStory[] = [
  {
    original_headline: "Original A",
    source_name: "Source A",
    source_url: "https://example.com/a",
    blurb: "Blurb A",
  },
  {
    original_headline: "Original B",
    source_name: "Source B",
    source_url: "https://example.com/b",
    blurb: "Blurb B",
  },
];

describe("parseRewrites", () => {
  it("returns null for unparseable text", () => {
    expect(parseRewrites("not json at all")).toBeNull();
  });

  it("returns null when the JSON is not an array", () => {
    expect(parseRewrites('{"headline":"x"}')).toBeNull();
  });

  it("extracts a JSON array embedded in surrounding prose", () => {
    const text = 'Here you go: [{"headline":"New A"}] thanks';
    const rewrites = parseRewrites(text);
    expect(rewrites).not.toBeNull();
    expect(rewrites?.[0].headline).toBe("New A");
  });
});

describe("mergeStories", () => {
  it("uses rewrite fields when present", () => {
    const rewrites = [
      { headline: "New A", blurb: "Fresh A", why_it_matters: "It matters." },
    ];
    const stories = mergeStories(candidates, rewrites);
    expect(stories[0].headline).toBe("New A");
    expect(stories[0].blurb).toBe("Fresh A");
    expect(stories[0].why_it_matters).toBe("It matters.");
    expect(stories[0].source).toBe("Source A");
  });

  it("falls back to original fields when a rewrite is missing", () => {
    const stories = mergeStories(candidates, []);
    expect(stories[0].headline).toBe("Original A");
    expect(stories[1].headline).toBe("Original B");
    expect(stories[0].why_it_matters).toBe("");
  });
});

describe("buildStaticFallback", () => {
  it("maps every candidate to original text", () => {
    const stories = buildStaticFallback(candidates);
    expect(stories).toHaveLength(2);
    expect(stories[0].headline).toBe("Original A");
    expect(stories[0].url).toBe("https://example.com/a");
  });
});
