/* ============================================================
   LIGO — clickable prototype.
   A phone frame with the home interface (Home tab) and the Events
   tab, switched via the bottom bar (Events · Home · Profile).
   The home manages its own normal / connection / wrapped states
   internally — no top toggle. All client-side useState.
   ============================================================ */
"use client";

import { useState } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { BottomNav, type NavId } from "@/components/BottomNav";
import { HomeScreen } from "@/components/HomeScreen";
import { EventsScreen } from "@/components/EventsScreen";
import { ProfileV2Provider, ProfileV2Shell } from "@/components/profile/ProfileScreen";
import { ProfileGateProvider } from "@/lib/profileGate";

type HomeState = "normal" | "connection" | "wrapped";

export default function Home() {
  const [nav, setNav] = useState<NavId>("home");
  const [homeState, setHomeState] = useState<HomeState>("normal");

  // Bottom-bar routing. Home resets the home to its normal state;
  // Events switches tabs; Profile is a parked placeholder.
  const onNav = (id: NavId) => {
    if (id === "home") {
      setNav("home");
      setHomeState("normal");
    } else if (id === "events") {
      setNav("events");
    } else if (id === "profile") {
      setNav("profile");
    }
  };

  const isEvents = nav === "events";
  const isProfile = nav === "profile";
  // The device status bar goes light on the dark home takeovers.
  const dark = !isEvents && !isProfile && homeState !== "normal";

  return (
    <main
      className="app-stage"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "40px 24px",
      }}
    >
      {/* caption */}
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
        <span style={{ width: 4, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.25)" }} />
        Home · music-first · college
      </div>

      <IOSDevice width={402} height={874} dark={dark}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: isEvents || isProfile ? "#FAFAF8" : dark ? "#0A0907" : "#FAFAF8",
            color: dark ? "#fff" : "#14110D",
            overflow: "hidden",
          }}
        >
          {isEvents ? (
            <>
              <div className="ligo-events" style={{ position: "absolute", inset: 0 }}>
                <EventsScreen onTab={onNav} />
              </div>
              <BottomNav active="events" onChange={onNav} />
            </>
          ) : isProfile ? (
            <>
              <ProfileGateProvider>
                <ProfileV2Provider>
                  <ProfileV2Shell />
                </ProfileV2Provider>
              </ProfileGateProvider>
              <BottomNav active="profile" onChange={onNav} />
            </>
          ) : (
            <HomeScreen state={homeState} setState={setHomeState} onNav={onNav} />
          )}
        </div>
      </IOSDevice>

      {/* hint */}
      <div
        className="app-chrome"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          maxWidth: 400,
          lineHeight: 1.5,
        }}
      >
        {isEvents ? (
          <>The <b style={{ color: "rgba(255,255,255,0.6)" }}>Events</b> tab — tap <b style={{ color: "rgba(255,255,255,0.6)" }}>Home</b> to go back.</>
        ) : isProfile ? (
          <>Jordan&apos;s <b style={{ color: "rgba(255,255,255,0.6)" }}>Profile</b> — tap <b style={{ color: "rgba(255,255,255,0.6)" }}>Home</b> or <b style={{ color: "rgba(255,255,255,0.6)" }}>Events</b> to explore the rest of the mockup.</>
        ) : homeState !== "normal" ? (
          <>Tap the <b style={{ color: "rgba(255,255,255,0.6)" }}>Home</b> button to return to your daily home.</>
        ) : (
          <>Answer the daily pick, then open <b style={{ color: "rgba(255,255,255,0.6)" }}>Connections</b> or <b style={{ color: "rgba(255,255,255,0.6)" }}>Wrapped</b> from “This week on Ligo.”</>
        )}
      </div>
    </main>
  );
}
