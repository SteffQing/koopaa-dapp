import { serialize, parse } from "cookie";
import { NextResponse, NextRequest } from "next/server";

const SESSION_COOKIE = process.env.NEXT_PUBLIC_SESSION_TOKEN!;

export function createSession(res: NextResponse, address: string) {
  const sessionCookie = serialize(SESSION_COOKIE, address, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  res.headers.append("Set-Cookie", sessionCookie);
}

export function getSession(req: NextRequest) {
  const cookies = req.headers.get("cookie");
  if (!cookies) return null;

  const parsed = parse(cookies);
  return parsed[SESSION_COOKIE] || null;
}

// export function clearSession(res: NextResponse) {
//   res.headers.append(
//     "Set-Cookie",
//     serialize(SESSION_COOKIE, "", { maxAge: 0, path: "/" })
//   );
// }
export function clearSession(res: NextResponse) {
  res.headers.set(
    "Set-Cookie",
    serialize(SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
      expires: new Date(0), // Explicitly set expiration in the past
    })
  );
}
