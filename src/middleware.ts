import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRoutes = [
  "/app",
  "/account",
  "/social",
  "/spotlight",
  "/locate",
];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
