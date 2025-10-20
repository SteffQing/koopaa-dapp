import { NextRequest, NextResponse } from "next/server";
import { prisma, redis } from "@/lib/db";
import { revalidateSchema, JWT_SECRET, revalidateOtpSchema } from "../schema";
import { SignJWT } from "jose";
import { withErrorHandler } from "../../utils";
import { encryptKey } from "@/lib/grid/security";
import gridClient from "@/lib/grid/index";
import type { GridClientUserContext } from "@sqds/grid";

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const headerAuth = req.headers.get("authorization");
  const [, token] = headerAuth?.split(" ") ?? [];
  if (token !== process.env.BOT_TOKEN) {
    return NextResponse.json(
      {
        error: "You are not authorized to access",
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { id } = revalidateSchema.parse(body);

  const existingUser = await prisma.user.findUnique({
    where: { externalId: id },
    select: { email: true },
  });
  if (!existingUser) {
    return NextResponse.json(
      {
        error: "You are not signed up. Please sign up instead",
      },
      { status: 404 }
    );
  }

  const email = existingUser.email;
  if (!email) throw new Error("Email not set");

  const { data, success, error } = await gridClient.initAuth({
    email,
  });

  if (success) {
    await redis.setex("grid-revalidate:" + id, 60 * 10, data);

    return NextResponse.json({
      message:
        "OTP has been sent to your email. Please pass it in the next prompt",
    });
  } else {
    return NextResponse.json({
      error: error,
    });
  }
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const headerAuth = req.headers.get("authorization");
  const [, token] = headerAuth?.split(" ") ?? [];
  if (token !== process.env.BOT_TOKEN) {
    return NextResponse.json(
      {
        error: "You are not authorized to access",
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { otp, id } = revalidateOtpSchema.parse(body);

  const signupData = await redis.get<GridClientUserContext>(
    "grid-revalidate:" + id
  );
  if (!signupData) {
    return NextResponse.json(
      {
        error:
          "Revalidation data is missing or has expired! Please reintiate the revalidation process again",
      },
      { status: 410 }
    );
  }

  const sessionSecrets = await gridClient.generateSessionSecrets();

  const { data, error } = await gridClient.completeAuth({
    user: signupData,
    otpCode: otp,
    sessionSecrets,
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "You provided an invalid OTP code! Please check and try again",
        message: error,
      },
      { status: 401 }
    );
  }
  console.log(
    data.authentication,
    "auth to save",
    JSON.stringify(data.authentication, null, 2)
  );

  const secrets = sessionSecrets.map(({ privateKey, ...rest }) => ({
    ...rest,
    privateKey: encryptKey(privateKey),
  }));
  const authentication = JSON.stringify(data.authentication, null, 2);

  const { username } = await prisma.user.update({
    where: {
      externalId: id,
    },
    data: {
      gridAccount: {
        update: {
          authentication,
          sessions: {
            deleteMany: {},
            createMany: { data: secrets },
          },
        },
      },
    },
    select: { username: true },
  });

  const jwt = await new SignJWT({ address: data.address })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(JWT_SECRET);

  return NextResponse.json({
    data: { token: jwt },
    message: `Welcome back to KooPaa ${username}`,
  });
});
