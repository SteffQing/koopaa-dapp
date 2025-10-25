import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../../utils";
import { prisma } from "@/lib/db";

export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { waiting_room, name } =
      await prisma.group.findUniqueOrThrow({
        where: { pda: id },
        select: { waiting_room: true, name: true, participants: true },
      });

    const waitlist = await prisma.user.findMany({
      where: { address: { in: waiting_room } },
      select: { username: true, address: true },
    });

    return NextResponse.json({
      data: { waitlist, name },
    });
  }
);
