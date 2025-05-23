import { NextRequest, NextResponse } from "next/server";
import { getSearchParams, withErrorHandler } from "../utils";
import prisma from "@/lib/prisma";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { address } = getSearchParams(req);
  const user = await prisma.user.findUniqueOrThrow({ where: { address } });
  return NextResponse.json({ data: user });
});
