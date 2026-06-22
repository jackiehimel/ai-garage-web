import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface EditionStory {
  original_headline: string;
  source_name: string;
  source_url: string;
  blurb: string;
}

export interface Rewrite {
  headline?: string;
  blurb?: string;
  why_it_matters?: string;
}

export interface DemoStory {
  headline: string;
  blurb: string;
  why_it_matters: string;
  source: string;
  url: string;
}

export const SYSTEM_PROMPT =
  "You write headlines and blurbs for AI Espresso, a concise daily AI news briefing. " +
  "Rewrite each story with a sharp, conversational tone. No jargon. No hype. " +
  'Return a JSON array. Each element: {"headline": ..., "blurb": (50 words max), ' +
  '"why_it_matters": (1 sentence)}. Return ONLY the JSON array, no markdown fences.';

// Reads the synced edition. Returns [] on any failure so callers never crash on a
// missing or malformed file.
export function loadStories(): EditionStory[] {
  try {
    const filePath = join(process.cwd(), "public", "data", "latest-edition.json");
    const raw = JSON.parse(readFileSync(filePath, "utf-8"));
    return Array.isArray(raw?.stories) ? raw.stories : [];
  } catch {
    return [];
  }
}

export function buildPrompt(candidates: EditionStory[]): string {
  let prompt = "Rewrite these stories for AI Espresso:\n\n";
  candidates.forEach((c, i) => {
    prompt += `${i + 1}. ${c.original_headline} (${c.source_name})\n   ${c.blurb.slice(0, 150)}\n\n`;
  });
  return prompt;
}

// Pulls the JSON array out of a model response and validates it is an array of
// objects. Returns null when the output can't be trusted, signaling a fallback.
export function parseRewrites(text: string): Rewrite[] | null {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;
  const slice = start >= 0 && end > start ? text.slice(start, end) : text;

  let parsed: unknown;
  try {
    parsed = JSON.parse(slice);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed)) return null;
  if (!parsed.every((item) => typeof item === "object" && item !== null)) {
    return null;
  }
  return parsed as Rewrite[];
}

export function mergeStories(
  candidates: EditionStory[],
  rewrites: Rewrite[],
): DemoStory[] {
  return candidates.map((c, i) => ({
    headline: rewrites[i]?.headline ?? c.original_headline,
    blurb: rewrites[i]?.blurb ?? c.blurb,
    why_it_matters: rewrites[i]?.why_it_matters ?? "",
    source: c.source_name,
    url: c.source_url,
  }));
}

export function buildStaticFallback(candidates: EditionStory[]): DemoStory[] {
  return candidates.map((c) => ({
    headline: c.original_headline,
    blurb: c.blurb,
    why_it_matters: "",
    source: c.source_name,
    url: c.source_url,
  }));
}
