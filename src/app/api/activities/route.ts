import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession, withErrorHandler } from "../utils";
import prisma from "@/lib/prisma";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const user = await getUserFromSession(req);
  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
    orderBy: { created_at: "desc" },
  });
  return NextResponse.json({ data: activities });
});
