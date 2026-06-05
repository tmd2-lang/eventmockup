"use client";
/* eslint-disable */

import { useState, useEffect } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { HomeScreen } from "@/components/HomeScreen";
import { PlanAHang } from "./PlanAHang";
import { DemoMatchCard, PushNotification, MatchOverlay } from "./Storyboard";

export default function InvestorDemo() {
  const [scene, setScene] = useState(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setScene((s) => Math.min(s + 1, 6));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setScene((s) => Math.max(s - 1, 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextScene = () => setScene((s) => Math.min(s + 1, 6));

  const titles = [
    "Scene 1: The Spark",
    "Scene 2: The Notification",
    "Scene 3: The Mutual Match",
    "Scene 4: Automated Planning",
    "Scene 5: The Reveal",
    "Scene 6: The Confirmation",
  ];

  const subtitles = [
    "Cole checks out Caroline's profile in Connection Night.",
    "Cole sends a Vibe. Caroline gets instantly notified.",
    "Caroline opens the app and Vibes back.",
    "Ligo automatically finds their overlap in availability.",
    "Ligo locks in a venue based on their vibe and location.",
    "The plan is set. No awkward texting phase.",
  ];

  // Hardcoded match profiles for our narrative
  const carolineProfile = {
    name: "Caroline M.",
    initials: "CM",
    photo: "/assets/caroline-profile.png",
    matchType: "Vibe Match",
    score: "95%",
    meta: "Georgetown · Junior",
    archetype: "Social Aux",
    horoscope: "Caroline is the aux cord hero of every pregame. You both picked Morgan Wallen today, which means you both understand that a good night out starts with Last Night.",
  };

  const coleProfile = {
    name: "Cole B.",
    initials: "CB",
    photo: "/assets/Cole-profile.png",
    matchType: "Vibe Match",
    score: "95%",
    meta: "Georgetown · Senior",
    archetype: "Pregame Menace",
    horoscope: "Cole is the one rallying the group chat at 11 PM. You both picked Morgan Wallen tonight, proving great minds think alike when it's time to go out.",
  };

  const sharedSong = { name: "Last Night", artist: "Morgan Wallen", art: "/covers/morganwallenonethingatatime-coverart.jpeg" };

  return (
    <main
      className="demo-stage"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A0907",
        fontFamily: "var(--font-display, sans-serif)",
      }}
      onClick={nextScene}
    >
      <div className="demo-header" style={{ marginBottom: 40, textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: 36, marginBottom: 8, fontWeight: 700 }}>{titles[scene - 1]}</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{subtitles[scene - 1]}</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>
          Click anywhere or press Right Arrow to advance
        </p>
      </div>

      <div style={{ display: "flex", gap: 64, position: "relative" }}>
        
        {/* Profile A: Cole */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2 }}>
            Cole's Screen
          </div>
          <IOSDevice width={375} height={812} dark={true}>
            <div style={{ width: "100%", height: "100%", position: "relative", background: "#0A0907", color: "#fff", overflow: "hidden" }}>
              {/* Cole is always in Connection Night for Scene 1-3 */}
              {(scene <= 3) && (
                <DemoMatchCard p={carolineProfile} song={sharedSong} action={scene >= 2 ? "vibe" : undefined} />
              )}
              {scene === 3 && <MatchOverlay />}
              
              {/* Scene 4-6: PlanAHang */}
              {scene >= 4 && (
                <PlanAHang 
                  currentUser={{ name: "Cole", photo: "/assets/Cole-profile.png" }} 
                  profile={{ name: "Caroline", photo: "/assets/caroline-profile.png" }} 
                  demoScene={scene}
                  onClose={() => {}} 
                />
              )}
            </div>
          </IOSDevice>
        </div>

        {/* Profile B: Caroline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2 }}>
            Caroline's Screen
          </div>
          <IOSDevice width={375} height={812} dark={scene >= 3}>
            <div style={{ width: "100%", height: "100%", position: "relative", background: scene < 3 ? "#FAFAF8" : "#0A0907", color: scene < 3 ? "#14110D" : "#fff", overflow: "hidden" }}>
              
              {/* Scene 1 & 2: Caroline is on HomeScreen */}
              {scene <= 2 && <HomeScreen state="normal" setState={() => {}} onNav={() => {}} />}
              
              {/* Scene 2: Push Notification */}
              {scene === 2 && <PushNotification title="Ligo" message="Cole B. just vibed with you on Morgan Wallen." icon="/assets/logo-mark.svg" />}

              {/* Scene 3: Connection Night with Match Overlay */}
              {scene === 3 && (
                <>
                  <DemoMatchCard p={coleProfile} song={sharedSong} action="vibe" />
                  <MatchOverlay />
                </>
              )}

              {/* Scene 4-6: PlanAHang */}
              {scene >= 4 && (
                <PlanAHang 
                  currentUser={{ name: "Caroline", photo: "/assets/caroline-profile.png" }} 
                  profile={{ name: "Cole", photo: "/assets/Cole-profile.png" }} 
                  demoScene={scene}
                  onClose={() => {}} 
                />
              )}
            </div>
          </IOSDevice>
        </div>

      </div>
    </main>
  );
}
