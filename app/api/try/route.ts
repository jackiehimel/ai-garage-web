import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

export const maxDuration = 30;

const SYSTEM_PROMPT =
  "You write headlines and blurbs for AI Espresso, a concise daily AI news briefing. " +
  "Rewrite each story with a sharp, conversational tone. No jargon. No hype. " +
  'Return a JSON array. Each element: {"headline": ..., "blurb": (50 words max), ' +
  '"why_it_matters": (1 sentence)}. Return ONLY the JSON array, no markdown fences.';

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

interface EditionStory {
  original_headline: string;
  source_name: string;
  source_url: string;
  blurb: string;
}

interface Rewrite {
  headline?: string;
  blurb?: string;
  why_it_matters?: string;
}

function loadStories(): EditionStory[] {
  const filePath = join(process.cwd(), "public", "data", "latest-edition.json");
  const raw = JSON.parse(readFileSync(filePath, "utf-8"));
  return raw.stories ?? [];
}

function buildStaticFallback(candidates: EditionStory[]) {
  return candidates.map((c) => ({
    headline: c.original_headline,
    blurb: c.blurb,
    why_it_matters: "",
    source: c.source_name,
    url: c.source_url,
  }));
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 },
    );
  }

  const candidates = loadStories();
  if (!candidates.length) {
    return NextResponse.json(
      { error: "No stories available." },
      { status: 404 },
    );
  }

  try {
    const client = new Anthropic();

    let prompt = "Rewrite these stories for AI Espresso:\n\n";
    candidates.forEach((c, i) => {
      prompt += `${i + 1}. ${c.original_headline} (${c.source_name})\n   ${c.blurb.slice(0, 150)}\n\n`;
    });

    const resp = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });

    let text =
      resp.content[0].type === "text" ? resp.content[0].text.trim() : "";
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]") + 1;
    if (start >= 0 && end > start) {
      text = text.slice(start, end);
    }

    let rewrites: Rewrite[];
    try {
      rewrites = JSON.parse(text);
    } catch {
      return NextResponse.json({ stories: buildStaticFallback(candidates) });
    }

    const stories = candidates.map((c, i) => ({
      headline: rewrites[i]?.headline ?? c.original_headline,
      blurb: rewrites[i]?.blurb ?? c.blurb,
      why_it_matters: rewrites[i]?.why_it_matters ?? "",
      source: c.source_name,
      url: c.source_url,
    }));

    return NextResponse.json({ stories });
  } catch {
    return NextResponse.json({ stories: buildStaticFallback(candidates) });
  }
}
