import { NextResponse, type NextRequest } from "next/server";
import { getAgentDetail, isValidAgentIdFormat } from "@/lib/library-service";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;

  if (!isValidAgentIdFormat(agentId)) {
    return NextResponse.json(
      {
        error: {
          code: "invalid_agent_id",
          message:
            "Agent id must be a lowercase slug (letters, numbers, and hyphens).",
        },
      },
      { status: 400 },
    );
  }

  const detail = getAgentDetail(agentId);

  if (!detail) {
    return NextResponse.json(
      {
        error: {
          code: "agent_not_found",
          message: `No agent found for id "${agentId}".`,
        },
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: detail });
}
