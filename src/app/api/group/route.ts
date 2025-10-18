import prisma from "@/lib/prisma";
import { getServerSession, withErrorHandler } from "../utils";
import { NextRequest, NextResponse } from "next/server";
import { approvalJoinAjoGroupSchema, createdAjoGroupSchema, joinAjoGroupSchema } from "./schema";

// Create and Join new Ajo Group
export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { name, pda, tag, group_cover_photo, description, signature } = createdAjoGroupSchema.parse(body);

  const address = getServerSession(req);

  const groupCreate = prisma.group.create({
    data: {
      name,
      pda,
      tag,
      cover_photo: group_cover_photo,
      description,
      admin: address,
      participants: {
        connect: {
          address,
        },
      },
    },
  });
  const createActivity = prisma.activity.create({
    data: {
      title: `Created ${name} Ajo Group`,
      type: "create",
      userId: address,
      sig: signature,
      group_pda: pda,
    },
  });
  const activity = prisma.activity.create({
    data: {
      title: `Joined ${name} Ajo Group`,
      type: "create",
      userId: address,
      sig: signature,
      group_pda: pda,
    },
  });

  await Promise.all([groupCreate, createActivity, activity]);

  return NextResponse.json({
    message: `${name} Ajo Group has been successfully created`,
  });
});

// Request to Join an Ajo Group
export const PUT = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { name, pda, signature } = joinAjoGroupSchema.parse(body);

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

// Approval to Join an Ajo Group
export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { name, pda, signature, approval, participant } = approvalJoinAjoGroupSchema.parse(body);

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

export const GET = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const avbl_groups = prisma.group.findMany({
    where: { participants: { none: { address } } },
    include: { participants: true },
  });
  const joined_groups = prisma.group.findMany({
    where: { participants: { some: { address } } },
    include: { participants: true },
  });

  const res = await Promise.all([avbl_groups, joined_groups]);

  return NextResponse.json({
    data: { avbl_groups: res[0], joined_groups: res[1] },
  });
});
