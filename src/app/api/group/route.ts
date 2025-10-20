import { prisma } from "@/lib/db";
import { getServerSession, withErrorHandler } from "../utils";
import { NextRequest, NextResponse } from "next/server";
import { createdAjoGroupSchema } from "./schema";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const bodyData = typeof body === "string" ? JSON.parse(body) : body;
  const { name, pda, tag, group_cover_photo, description, signature } =
    createdAjoGroupSchema.parse(bodyData);

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
