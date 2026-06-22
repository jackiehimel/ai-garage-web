import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { isRateLimited } from "@/lib/rate-limit";
import {
  SYSTEM_PROMPT,
  buildPrompt,
  buildStaticFallback,
  loadStories,
  mergeStories,
  parseRewrites,
} from "@/lib/espresso-demo";

export const maxDuration = 30;

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
      { status: 503 },
    );
  }

  try {
    const client = new Anthropic();
    const resp = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(candidates) }],
    });

    const text =
      resp.content[0]?.type === "text" ? resp.content[0].text.trim() : "";
    const rewrites = parseRewrites(text);
    if (!rewrites) {
      return NextResponse.json({ stories: buildStaticFallback(candidates) });
    }

    return NextResponse.json({ stories: mergeStories(candidates, rewrites) });
  } catch {
    return NextResponse.json({ stories: buildStaticFallback(candidates) });
  }
}
