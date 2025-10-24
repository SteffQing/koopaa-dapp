import { NextRequest, NextResponse } from "next/server";
import { getServerSession, withErrorHandler } from "../../utils";
import { prisma } from "@/lib/db";

type GroupSummary = { name: string; pda: string }[];
export const GET = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);

  const groups = await prisma.group.findMany({
    where: {
      OR: [
        {
          participants: {
            some: { address },
          },
        },
        {
          waiting_room: {
            has: address,
          },
        },
      ],
      closed_at: null,
    },
    select: {
      pda: true,
      name: true,
      started_at: true,
      waiting_room: true,
      participants: { select: { address: true } },
    },
  });

  const categorized = {
    activeGroupsIn: [] as GroupSummary,
    notStartedGroupsIn: [] as GroupSummary,
    inWaitingRoomGroups: [] as GroupSummary,
  };

  for (const g of groups) {
    const isParticipant = g.participants.some((p) => p.address === address);
    const inWaitingRoom = g.waiting_room.includes(address);

    if (inWaitingRoom && !isParticipant) {
      categorized.inWaitingRoomGroups.push({
        name: g.name,
        pda: g.pda,
      });
    } else if (isParticipant) {
      if (g.started_at) {
        categorized.activeGroupsIn.push({
          name: g.name,
          pda: g.pda,
        });
      } else {
        categorized.notStartedGroupsIn.push({
          name: g.name,
          pda: g.pda,
        });
      }
    }
  }

  return NextResponse.json({
    data: categorized,
  });
});
