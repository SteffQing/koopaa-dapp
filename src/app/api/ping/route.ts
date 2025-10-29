import { prisma } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "../utils";
import { z, ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../../../prisma-client/runtime/library";
import sendExternalMessage from "@/actions/notification";

const pingSchema = z.object({
  pda: z.string({
    required_error:
      "The Solana address of the Ajo group is required to construct a ping message",
    invalid_type_error: "Address type given is invalid",
  }),
});

export async function POST(req: NextRequest) {
  try {
    const params = await req.json();
    const { pda } = pingSchema.parse(params);
    const session = getServerSession(req);

    const select = { username: true, email: true, externalId: true } as const;
    const [pong, ajo] = await Promise.all([
      prisma.user.findUnique({
        where: { address: session },
        select,
      }),
      prisma.group.findUniqueOrThrow({
        where: { pda },
        select: { name: true, admin: true },
      }),
    ]);
    const ping = await prisma.user.findUnique({
      where: { address: ajo.admin },
      select,
    });

    if (!ping)
      return NextResponse.json({
        message: "We could not find the user you wished to ping",
      });
    if (!pong)
      return NextResponse.json(
        {
          error: "Your data was not found for a pong. Might be a mistake?",
        },
        { status: 400 }
      );

    await sendPingAndPong(ping, pong, ajo.name);
    return NextResponse.json({ message: "Ping Pong sent 💬" });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "The Ajo group being pinged for, no records were found" },
        { status: 404 }
      );
    } else if (error instanceof ZodError) {
      const details = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return NextResponse.json(
        { error: `Invalid ping request data — ${details}` },
        { status: 400 }
      );
    } else {
      console.error("error in ping post", error);
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  }
}

type PingPong = {
  externalId: string | null;
  username: string | null;
  email: string | null;
};
async function sendPingAndPong(ping: PingPong, pong: PingPong, name: string) {
  const ping_message = `You have received a ping from ${pong.username ?? "Anon"} concerning ${name} Ajo group as it seems he is in the waiting room. Please attend to his/her request as soon as you can 🙂`;
  const pong_message = `You have successfully sent a ping to ${ping.username ?? "Anon"} regarding ${name} Ajo group. Hang tight, while you wait for a response back 🙂`;

  await Promise.all([
    ping.externalId ? sendExternalMessage(ping_message, ping.externalId) : null,
    pong.externalId ? sendExternalMessage(pong_message, pong.externalId) : null,
    // Add email too
  ]);
}
