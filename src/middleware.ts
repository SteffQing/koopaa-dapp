import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/login", "/api/auth", "/api/waitlist", "/whatsapp"];
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  if (isPublicPath) return NextResponse.next();

  const headerAuth = request.headers.get("authorization");
  const cookieAuth = request.cookies.get("koopaa_token")?.value;

  let token: string | undefined;
  const [type, headerToken] = headerAuth?.split(" ") || [];

  if (type === "Basic") {
    const valid = headerToken === process.env.BOT_TOKEN;
    if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.next();
  }

  if (type === "Bearer") token = headerToken;
  else if (cookieAuth) token = cookieAuth;

  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  try {
    const { payload } = await jwtVerify<{ address: string }>(token, JWT_SECRET);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.delete("x-user-address");
    requestHeaders.set("x-user-address", payload.address);

    if (pathname === "/login") {
      const url = request.nextUrl.clone();
      const intended = request.nextUrl.searchParams.get("redirect") || "/";
      url.pathname = intended;
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    return NextResponse.json(
      {
        error: "Invalid or expired token, please login again",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
