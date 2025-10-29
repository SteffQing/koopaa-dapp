import { NextRequest, NextResponse } from "next/server";
import { getServerSession, withErrorHandler } from "../../utils";
import { prisma } from "@/lib/db";
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
    include: { participants: true },
  });

  const categorized = {
    activeGroupsIn: [] as typeof groups,
    notStartedGroupsIn: [] as typeof groups,
    inWaitingRoomGroups: [] as typeof groups,
  };

  for (const g of groups) {
    const isParticipant = g.participants.some((p) => p.address === address);
    const inWaitingRoom = g.waiting_room.includes(address);

    if (inWaitingRoom && !isParticipant) {
      categorized.inWaitingRoomGroups.push({ ...g });
    } else if (isParticipant) {
      if (g.started_at) {
        categorized.activeGroupsIn.push({ ...g });
      } else {
        categorized.notStartedGroupsIn.push({ ...g });
      }
    }
  }

  return NextResponse.json({
    data: categorized,
  });
});
