import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../../utils";
import { getAjoGroup } from "../helpers";

// Get an Ajo Group and its onchain data
export const GET = withErrorHandler(
  async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await params;
    const group = await getAjoGroup(id);
    return NextResponse.json({
      data: group,
    });
  }
);
