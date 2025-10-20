import { prisma } from "@/lib/db";
import { getServerSession, withErrorHandler } from "../../utils";
import { NextRequest, NextResponse } from "next/server";
import { joinAjoGroupSchema } from "../schema";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const bodyData = typeof body === "string" ? JSON.parse(body) : body;
  const { name, pda, signature } = joinAjoGroupSchema.parse(bodyData);

  const address = getServerSession(req);

  const groupJoin = prisma.group.update({
    where: { pda },
    data: {
      waiting_room: {
        push: address,
      },
    },
  });
  const activity = prisma.activity.create({
    data: {
      title: `Request to Join ${name} Ajo Group`,
      type: "create",
      userId: address,
      sig: signature,
      group_pda: pda,
    },
  });

  await Promise.all([groupJoin, activity]);

  return NextResponse.json({
    message: `You are in the waiting room to join ${name} Ajo Group`,
  });
});
