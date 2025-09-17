import prisma from "@/lib/prisma";
import { getServerSession, withErrorHandler } from "../utils";
import { NextRequest, NextResponse } from "next/server";
import { createdAjoGroupSchema, joinAjoGroupSchema } from "./schema";

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
  const joinActivity = prisma.activity.create({
    data: {
      title: `Joined ${name} Ajo Group`,
      type: "create",
      userId: address,
      sig: signature,
      group_pda: pda,
    },
  });

  await Promise.all([groupCreate, createActivity, joinActivity]);

  return NextResponse.json({
    message: `${name} Ajo Group has been successfully created`,
  });
});

// Join an Ajo Group
export const PUT = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { name, pda, signature } = joinAjoGroupSchema.parse(body);

  const address = getServerSession(req);

  const groupJoin = prisma.group.update({
    where: { pda },
    data: {
      participants: {
        connect: {
          address,
        },
      },
    },
  });
  const joinActivity = prisma.activity.create({
    data: {
      title: `Joined ${name} Ajo Group`,
      type: "create",
      userId: address,
      sig: signature,
      group_pda: pda,
    },
  });

  await Promise.all([groupJoin, joinActivity]);

  return NextResponse.json({
    message: `You have successfully joined ${name} Ajo Group`,
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
