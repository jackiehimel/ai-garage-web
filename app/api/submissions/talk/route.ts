import { NextRequest, NextResponse } from "next/server";
import { validateTalkSubmission } from "@/lib/talk-submission";

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const result = validateTalkSubmission(payload);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors: result.errors },
      { status: 422 },
    );
  }

  return NextResponse.json(
    { ok: true, submission: result.value },
    { status: 201 },
  );
}
