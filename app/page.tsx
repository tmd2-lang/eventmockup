/* LIGO v2 — Events · Home · Profile + single reveal night */
"use client";

import { useState } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { BottomNav, type NavId } from "@/components/BottomNav";
import { HomeScreen } from "@/components/HomeScreen";
import { EventsScreen } from "@/components/EventsScreen";
import { ProfileV2Provider, ProfileV2Shell } from "@/components/profile/ProfileScreen";
import { ProfileGateProvider } from "@/lib/profileGate";

type HomeState = "normal" | "reveal";

export default function Home() {
  const [nav, setNav] = useState<NavId>("home");
  const [homeState, setHomeState] = useState<HomeState>("normal");

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
  const dark = !isEvents && !isProfile && homeState === "reveal";

  return (
    <main
      className="app-stage"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        v2 · music-first · college
      </div>

      <IOSDevice width={402} height={874} dark={dark}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: isEvents || isProfile ? "#FAFAF8" : dark ? "#07090C" : "#FAFAF8",
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
        {isEvents ? (
          <>
            The <b style={{ color: "rgba(255,255,255,0.6)" }}>Events</b> tab — tap{" "}
            <b style={{ color: "rgba(255,255,255,0.6)" }}>Home</b> to go back.
          </>
        ) : isProfile ? (
          <>
            Switch profiles in the avatar menu — tap{" "}
            <b style={{ color: "rgba(255,255,255,0.6)" }}>Home</b> to lock in and open tonight&apos;s reveal.
          </>
        ) : homeState === "reveal" ? (
          <>
            Tap <b style={{ color: "rgba(255,255,255,0.6)" }}>Home</b> in the bar to return to your daily home.
          </>
        ) : (
          <>
            Lock in an answer, wait <b style={{ color: "rgba(255,255,255,0.6)" }}>5 seconds</b>, then swipe through
            five reveal acts. Replay anytime from home.
          </>
        )}
      </div>
    </main>
  );
}
