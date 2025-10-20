import { prisma } from "@/lib/db";
import { getServerSession, withErrorHandler } from "../../utils";
import { NextRequest, NextResponse } from "next/server";
import { approvalJoinAjoGroupSchema } from "../schema";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { name, pda, signature, approval, participant } =
    approvalJoinAjoGroupSchema.parse(body);

  const address = getServerSession(req);

  const group = await prisma.group.findUnique({
    where: { pda },
    select: { waiting_room: true, admin: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }
  if (group.admin.toLowerCase() !== address.toLowerCase()) {
    throw new Error("You are not the admin of this group");
  }

  const groupJoin = prisma.group.update({
    where: { pda },
    data: {
      waiting_room: group.waiting_room.filter((addr) => addr !== participant),
      ...(approval && {
        participants: {
          connect: {
            address: participant,
          },
        },
      }),
    },
  });

  const activity_data = {
    title: `Request to Join ${name} Ajo Group ${approval ? "Approved" : "Rejected"}`,
    type: "create",
    sig: signature,
    group_pda: pda,
  } as const;

  const admin_activity = prisma.activity.create({
    data: {
      ...activity_data,
      userId: address,
    },
  });
  const participant_activity = prisma.activity.create({
    data: {
      ...activity_data,
      userId: participant,
    },
  });

  await Promise.all([groupJoin, participant_activity, admin_activity]);

  return NextResponse.json({
    message: `Successfully added to the ${name} Ajo Group`,
  });
});
