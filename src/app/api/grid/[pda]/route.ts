import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../utils";
import { contribute } from "@/lib/grid/ajo_group.mgt";

// Make a Contribution
export const POST = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ pda: string }> }
  ) => {
    const { pda } = await params;

    const address = req.headers.get("x-user-address");
    const auth = req.headers.get("authorization");

    if (!address || !auth) throw new Error("Error in authorization!");
    const response = await contribute(pda, address, auth);

    return NextResponse.json({
      data: response,
    });
  }
);
