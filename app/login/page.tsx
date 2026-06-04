/* ============================================================
   /login — the password prompt.
   Matches LIGO styling (Bricolage display font, brand tokens, the
   dark stage background from globals.css). One field, one button,
   a subtle error state. Posts to /api/auth, which sets the cookie;
   on success we hard-navigate so middleware re-runs and lets us in.
   ============================================================ */
"use client";

import { useState, type FormEvent } from "react";
import { LigoMark, Wordmark } from "@/components/Primitives";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const params = new URLSearchParams(window.location.search);
        const from = params.get("from");
        const dest =
          from && from.startsWith("/") && !from.startsWith("//") ? from : "/";
        window.location.assign(dest);
        return; // keep the spinner until navigation
      }
    } catch {
      /* fall through to error */
    }
    setError(true);
    setLoading(false);
    setPassword("");
  }

  const borderColor = error
    ? "rgba(194,65,12,0.55)"
    : focused
    ? "#F97316"
    : "rgba(20,17,13,0.12)";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fff",
          borderRadius: 22,
          border: "1px solid rgba(20,17,13,0.05)",
          boxShadow:
            "0 1px 0 rgba(20,17,13,0.04), 0 24px 60px -20px rgba(0,0,0,0.45)",
          padding: 28,
        }}
      >
        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <LigoMark size={34} />
          <Wordmark size={22} />
        </div>

        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F97316",
            marginBottom: 8,
          }}
        >
          Private preview
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 26,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#14110D",
            marginBottom: 8,
          }}
        >
          Enter the password
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "rgba(20,17,13,0.55)",
            marginBottom: 22,
          }}
        >
          This LIGO preview is password-protected. Enter the shared password to
          take a look.
        </p>

        <form onSubmit={onSubmit}>
          <input
            type="password"
            value={password}
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            style={{
              width: "100%",
              height: 52,
              padding: "0 16px",
              borderRadius: 14,
              border: `1.5px solid ${borderColor}`,
              background: "#FAFAF8",
              fontFamily: "var(--font-body)",
              fontSize: 16, // 16px avoids iOS zoom-on-focus
              color: "#14110D",
              outline: "none",
              transition: "border-color 150ms cubic-bezier(.2,.7,.2,1)",
            }}
          />

          <div
            style={{
              height: 18,
              marginTop: 8,
              fontFamily: "var(--font-body)",
              fontSize: 12.5,
              color: "#C2410C",
              opacity: error ? 1 : 0,
              transition: "opacity 150ms ease",
            }}
          >
            That password isn&apos;t right. Try again.
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: 52,
              marginTop: 6,
              border: 0,
              borderRadius: 16,
              background: "#F97316",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: "-0.005em",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow:
                "0 12px 28px -8px rgba(249,115,22,0.55), 0 0 0 1px rgba(249,115,22,0.20)",
              transition: "opacity 150ms ease",
            }}
          >
            {loading ? "Unlocking…" : "Unlock"}
          </button>
        </form>
      </div>
    </main>
  );
}
