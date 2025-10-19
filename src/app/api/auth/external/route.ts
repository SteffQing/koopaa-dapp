import { NextRequest, NextResponse } from "next/server";
import { prisma, redis } from "@/lib/db";
import {
  externalLoginSchema,
  signupSchema,
  signupOtpSchema,
  JWT_SECRET,
} from "../schema";
import { SignJWT } from "jose";
import { withErrorHandler } from "../../utils";
import { gridClient, encryptKey } from "@/lib/grid";
import type { GridClientUserContext } from "@sqds/grid";

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const headerAuth = req.headers.get("authorization");
  const [, token] = headerAuth?.split(" ") ?? [];
  if (token !== process.env.BOT_TOKEN) {
    return NextResponse.json(
      {
        error: "You are not authorized to access this endpoint",
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { email } = signupSchema.parse(body);

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { username: true },
  });
  if (existingUser) {
    return NextResponse.json(
      {
        error:
          "You are already signed up with this email. Please sign in instead",
      },
      { status: 409 }
    );
  }

  const { data, success, error } = await gridClient.createAccount({
    email,
  });

  if (success) {
    await redis.setex("grid-sign-up:" + email, 60 * 10, data);

    return NextResponse.json({
      message:
        "OTP has been sent to the provided email. Please pass it in the next prompt",
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
        error: "You are not authorized to access this endpoint",
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { id, otp, email, username } = signupOtpSchema.parse(body);

  const signupData = await redis.get<GridClientUserContext>(
    "grid-sign-up:" + email
  );
  if (!signupData) {
    return NextResponse.json(
      {
        error:
          "Sign up data for the email provided is missing or has expired! Please reintiate the sign up process again",
      },
      { status: 410 }
    );
  }

  const sessionSecrets = await gridClient.generateSessionSecrets();

  const { data, error } = await gridClient.completeAuthAndCreateAccount({
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

  const secrets = sessionSecrets.map(({ privateKey, ...rest }) => ({
    ...rest,
    privateKey: encryptKey(privateKey),
  }));

  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      externalId: id,
      address: data.address,
      username,
      gridAccount: {
        create: {
          id: data.grid_user_id,
          sessions: { createMany: { data: secrets } },
        },
      },
    },
  });

  const jwt = await new SignJWT({ address: "user.address" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(JWT_SECRET);

  return NextResponse.json({
    data: { token: jwt },
    message: `Welcome to KooPaa ${username}`,
  });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const headerAuth = req.headers.get("authorization");
  const [, token] = headerAuth?.split(" ") ?? [];
  if (token !== process.env.BOT_TOKEN) {
    return NextResponse.json(
      {
        error: "You are not authorized to access this endpoint",
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { id } = externalLoginSchema.parse(body);
  id.replace(/\D/g, "");

  const user = await prisma.user.findUnique({
    where: { externalId: id },
    select: { address: true, username: true },
  });

  if (!user) {
    return NextResponse.json(
      {
        error:
          "We could not find any matching information for you. Please sign up and retry signing in",
      },
      { status: 404 }
    );
  }

  const jwt = await new SignJWT({ address: user.address })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(JWT_SECRET);

  return NextResponse.json({
    data: { token: jwt },
    message: `Welcome back to KooPaa ${user.username}`,
  });
});
