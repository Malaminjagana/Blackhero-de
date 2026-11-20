import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHost = request.headers.get("host")?.split(":")[0].toLowerCase();
  if (requestHost !== "blackheroes.de") {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.hostname = "www.blackheroes.de";
  canonicalUrl.protocol = "https:";
  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
