import { NextRequest, NextResponse } from "next/server";
import { getSearchParams, getServerSession, withErrorHandler } from "../utils";
import { BASE_URL } from "@/lib/fetch";
import { prisma, redis } from "@/lib/db";
import { getAjoGroup } from "../group/[id]/helpers";
import { generateShortCode, TTL } from "../helpers";

// For use in Dapp
export const POST = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const { pda } = await req.json();

  if (!pda)
    return NextResponse.json(
      {
        error: "A pda value must be passed for the ajo group invite",
      },
      { status: 400 }
    );

  const url = `/savings/ajo/${pda}?inviter=${address}`;
  const code = await generateShortCode(url);
  await redis.setex(code, TTL, url);

  return NextResponse.json({ data: `${BASE_URL}/invite/${code}` });
});

// For use in Telegram/Whatsapp
export const PUT = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const { pda } = await req.json();

  if (!pda)
    return NextResponse.json(
      {
        error: "Ajo group pda value is missing",
      },
      { status: 400 }
    );

  const url = `${pda}:${address}`;
  const code = await generateShortCode(url);
  await redis.setex(code, TTL, url);

  return NextResponse.json({
    data: code,
    message:
      "Invite code is successfully generated! You can forward this code to friends & family to pass when prompted with an invite code to join. Copy code below",
  });
});

// For use in Telegram/Whatsapp
export const GET = withErrorHandler(async (req: NextRequest) => {
  const address = getServerSession(req);
  const { code } = getSearchParams(req);

  if (!code)
    return NextResponse.json(
      {
        error: "A code must be passed for the ajo group invite",
      },
      { status: 404 }
    );

  const content = await redis.get<string>(code);
  if (!content)
    return NextResponse.json(
      { error: "Code provided is either invalid or expired!" },
      { status: 400 }
    );

  const [pda, inviter] = content.split(":");

  const [group, invite] = await Promise.all([
    getAjoGroup(pda),
    prisma.user.findUniqueOrThrow({
      where: { address: inviter },
      select: { username: true },
    }),
  ]);

  const { startTimestamp, isClosed, name } = group;
  if (startTimestamp)
    return NextResponse.json({
      error: `Sorry, unfortunately, this group is filled and contributions are already underway!`,
    });
  if (isClosed)
    return NextResponse.json({
      error: `Sorry, unfortunately, this group is closed and contributions are ended!`,
    });
  if (group.isAdmin(address))
    return NextResponse.json({
      error: `You are the admin of this group!`,
    });
  if (group.youParticipant(address) !== null)
    return NextResponse.json({
      error: `You are already a member of this group`,
    });
  if (group.inWaitingRoom(address))
    return NextResponse.json({
      error: `You are already in the waiting room for this group! Reach out to the admin/creator of the group to fast track your admission`,
    });

  return NextResponse.json({
    data: group,
    message: `${invite.username} has invited you to join ${name} Ajo group. Here is a summary of the group`,
  });
});
