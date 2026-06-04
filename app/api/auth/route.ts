/* ============================================================
   POST /api/auth — verify the shared password and unlock the site.
   On success, sets an HTTP-only cookie (SHA-256 of the password,
   not the password itself) with a 7-day expiry. The correct
   password comes only from the SITE_PASSWORD env var.
   ============================================================ */
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { AUTH_COOKIE, AUTH_MAX_AGE } from "@/lib/authConfig";

export async function POST(req: Request) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "SITE_PASSWORD is not configured on the server." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    /* no/invalid body → treated as wrong password below */
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = crypto.createHash("sha256").update(expected).digest("hex");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_MAX_AGE,
  });
  return res;
}
