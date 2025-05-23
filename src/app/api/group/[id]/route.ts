import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../utils";
import prisma from "@/lib/prisma";

// Get an Ajo Group
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const group = await prisma.group.findUniqueOrThrow({ where: { pda: id } });

    return NextResponse.json({
      data: group,
    });
  }
);
