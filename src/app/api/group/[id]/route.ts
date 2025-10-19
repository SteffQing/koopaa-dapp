import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../utils";
import { prisma } from "@/lib/db";

// Get an Ajo Group
export const GET = withErrorHandler(async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const group = await prisma.group.findUniqueOrThrow({ where: { pda: id } });

  return NextResponse.json({
    data: group,
  });
});
