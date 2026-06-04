/* ============================================================
   Site-wide password gate.
   Every request is intercepted here. If the visitor has a valid
   auth cookie they pass through; otherwise they're redirected to
   the styled /login prompt. The correct password lives only in
   the SITE_PASSWORD env var — never in source. The cookie stores
   a SHA-256 of the password (not the password itself), and the
   API route sets it HTTP-only with a 7-day expiry.
   ============================================================ */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/authConfig";

// Web Crypto (Edge runtime) — matches node:crypto sha256 hex in the API route.
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always let the prompt page and its auth endpoint through, or we'd loop.
  if (pathname === "/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE)?.value;

  if (token && token === (await sha256Hex(password))) {
    return NextResponse.next();
  }

  // Not authenticated → send to the prompt, remembering where they were headed.
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  if (pathname && pathname !== "/") url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

// Run on everything EXCEPT Next internals and static files (anything with a
// dot, e.g. /fonts/*.woff2, /artists/*.png, /logo-mark.svg, favicon.ico).
// This keeps the app's styling and the prompt page's fonts/assets working.
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
