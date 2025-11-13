import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from 'jose'
const publicRoutes = ["/", "/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  console.log(token)
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret =new TextEncoder().encode(process.env.secret_key!);
   await jose.jwtVerify(token, secret);

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

