import { NextRequest, NextResponse } from "next/server";
import { getSearchParams, withErrorHandler } from "./utils";
import { prisma } from "@/lib/db";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { q } = getSearchParams(req);
  const query = q?.trim();

  if (!query) return NextResponse.json({ data: [] });

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { address: { equals: query, mode: "insensitive" } }, // exact match for address
        { externalId: { equals: query, mode: "insensitive" } }, // exact match for externalId
        { username: { contains: query, mode: "insensitive" } }, // partial match
        { email: { contains: query, mode: "insensitive" } }, // partial match
      ],
    },
    take: 20,
    select: { address: true, username: true },
  });
  return NextResponse.json({ data: users });
});
