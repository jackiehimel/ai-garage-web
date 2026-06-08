import { NextResponse, type NextRequest } from "next/server";
import {
  collectionCatalog,
  listAgents,
  validateFilters,
} from "@/lib/library-service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const validation = validateFilters({
    view: searchParams.get("view"),
    fn: searchParams.get("fn"),
    industry: searchParams.get("industry"),
    status: searchParams.get("status"),
    exp: searchParams.get("exp"),
    collection: searchParams.get("collection"),
  });

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: {
          code: "invalid_filter",
          message: "One or more filter values are not recognized.",
          details: validation.errors,
        },
      },
      { status: 400 },
    );
  }

  const agents = listAgents(validation.filters);

  return NextResponse.json({
    data: {
      agents,
      total: agents.length,
      filters: validation.filters,
      collections: collectionCatalog,
    },
  });
}
