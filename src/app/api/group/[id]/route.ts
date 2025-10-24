import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../utils";
import { getAjoOffchain } from "../helpers";

// Get an Ajo Group
export const GET = withErrorHandler(
  async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await params;
    const group = await getAjoOffchain(id);

    return NextResponse.json({
      data: group,
    });
  }
);
