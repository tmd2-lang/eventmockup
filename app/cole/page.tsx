/* Cole-only demo — Events only, locked to Cole Brennan (GPB admin). */
"use client";

import { useEffect, useState } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { EventsScreen } from "@/components/EventsScreen";

const COLE_ID = "cole";

function lockColeProfile() {
  try {
    const raw = window.localStorage.getItem("ligo:active_user");
    if (raw === JSON.stringify(COLE_ID)) return;
    window.localStorage.setItem("ligo:active_user", JSON.stringify(COLE_ID));
    window.dispatchEvent(
      new CustomEvent("ligo:storage", {
        detail: { key: "ligo:active_user", newValue: COLE_ID },
      })
    );
  } catch {
    /* ignore */
  }
}

export default function ColeDemo() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    lockColeProfile();
    setReady(true);
  }, []);

  return (
    <main
      className="app-stage"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "40px 24px",
      }}
    >
      <div
        className="app-chrome"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "var(--font-display)",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <b style={{ color: "#F5D783", fontWeight: 600 }}>LIGO</b>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: 99,
            background: "rgba(255,255,255,0.25)",
          }}
        />
        Demo · Cole · GPB admin
      </div>

      <IOSDevice width={402} height={874} dark={false}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: "#FAFAF8",
            color: "#14110D",
            overflow: "hidden",
          }}
        >
          {!ready ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(20,17,13,0.4)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Loading…
            </div>
          ) : (
            <div className="ligo-events" style={{ position: "absolute", inset: 0 }}>
              <EventsScreen overrideUserId={COLE_ID} siloMode />
            </div>
          )}
        </div>
      </IOSDevice>

      <div
        className="app-chrome"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          maxWidth: 440,
          lineHeight: 1.5,
        }}
      >
        Locked to <strong style={{ color: "rgba(255,255,255,0.55)" }}>Cole Brennan</strong> — Georgetown Program Board admin.
        <br />
        Use Manage to create events, invite members, and run event ops.
      </div>
    </main>
  );
}
