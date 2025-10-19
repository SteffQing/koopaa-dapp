import { NextRequest, NextResponse } from "next/server";
import { getServerSession, withErrorHandler } from "../../../utils";
import { prisma } from "@/lib/db";

// Get an Ajo Group Activities for a specific user
export const GET = withErrorHandler(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const address = getServerSession(req);
  const activities = await prisma.activity.findMany({
    where: { userId: address, group_pda: id },
  });

  return NextResponse.json({
    data: activities,
  });
});
