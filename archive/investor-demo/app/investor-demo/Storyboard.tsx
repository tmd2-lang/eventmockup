/* eslint-disable */
import React from "react";
import { Icon as BaseIcon } from "@/components/Primitives";

const Icon: any = { ...BaseIcon };

Icon.Spark = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.5 4 1.5 5 5.5 5.5C13.5 9 12.5 10 12 14c-.5-4-1.5-5-5.5-5.5C10.5 8 11.5 7 12 3z" />
    <path d="M18.5 14.5c.3 2 .8 2.5 2.5 2.8-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.8z" />
  </svg>
);

Icon.Vibe = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11v2M8 8v8M12 5v14M16 8v8M20 11v2" />
  </svg>
);

Icon.Eye = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

// Use the same archetype icon mapper
function archetypeIconFor(key: string) {
  const map: any = {
    "mood-curator": Icon.Moon,
    "deep-cut": Icon.Spark,
    "social-aux": Icon.Vibe,
  };
  return map[key] ?? Icon.Music;
}

// 1:1 Clone of PersonSlide from HomeScreen.tsx, stripped of carousel logic for the presentation
export function DemoMatchCard({
  p,
  song,
  action,
  onAct,
}: {
  p: any;
  song: any;
  action?: "vibe" | "spark" | "pass";
  onAct?: (actionType: "vibe" | "spark" | "pass") => void;
}) {
  const A = archetypeIconFor(p.aIconKey || "social-aux");

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#0A0907", color: "#fff" }}>
      {/* top-left home button */}
      <button
        style={{
          position: "absolute",
          top: 52,
          left: 16,
          zIndex: 60,
          width: 38,
          height: 38,
          borderRadius: 99,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Icon.Home width="18" height="18" />
      </button>

      {/* story bars (fake) */}
      <div style={{ position: "absolute", top: 56, left: 64, right: 16, display: "flex", gap: 4, zIndex: 50 }}>
        <div style={{ flex: 1, height: 2.5, borderRadius: 2, background: "#fff" }} />
        <div style={{ flex: 1, height: 2.5, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ flex: 1, height: 2.5, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "78px 22px 12px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(460px 460px at 82% 10%, rgba(234,140,225,0.16), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 2 }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: "#F97316" }} /> 1 of 3 · {p.matchType} · {p.score}
        </div>

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 2 }}>
          <div style={{ width: 60, height: 60, borderRadius: 99, background: p.grad || "#F97316", backgroundImage: p.photo ? `url(${p.photo})` : "none", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", flexShrink: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.45)" }}>
            {!p.photo && p.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{p.name}</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontWeight: 600, marginTop: 3 }}>{p.meta}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "4px 10px", fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 7 }}>
              <A width="12" height="12" /> {p.archetype}
            </div>
          </div>
        </div>

        {/* horoscope */}
        <div style={{ position: "relative", overflow: "hidden", marginTop: 16, padding: "14px 15px", borderRadius: 16, background: "linear-gradient(160deg, rgba(234,140,225,0.16), rgba(255,255,255,0.02))", border: "1px solid rgba(234,140,225,0.24)", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <Icon.Spark width="13" height="13" style={{ color: "#EA8CE1" }} />
            <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#EA8CE1" }}>Your connection reading</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.8)", textWrap: "pretty" }}>{p.horoscope}</p>
        </div>

        {/* shared song */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 10, padding: "10px 12px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", position: "relative", zIndex: 2 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, backgroundImage: `url(${song.art})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0, boxShadow: "0 6px 16px rgba(0,0,0,0.4)" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Your pick tonight</div>
            <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 14.5, letterSpacing: "-0.01em", marginTop: 2 }}>
              {song.name} · <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{song.artist}</span>
            </div>
          </div>
        </div>
      </div>

      {/* cta sheet */}
      <div style={{ flexShrink: 0, padding: "14px 18px 34px", background: "rgba(10,9,7,0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 40 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.38)", textAlign: "center", marginBottom: 11 }}>{p.prompt}</div>
        <div style={{ display: "flex", gap: 9, marginBottom: 8 }}>
          <button
            onClick={() => onAct && onAct("vibe")}
            disabled={!!action}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: 14,
              cursor: action ? "default" : "pointer",
              border: action === "vibe" ? "1.5px solid rgba(113,192,127,0.4)" : "1.5px solid rgba(255,255,255,0.1)",
              background: action === "vibe" ? "rgba(113,192,127,0.18)" : "rgba(255,255,255,0.07)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: action && action !== "vibe" ? 0.4 : 1,
              transition: "all 0.18s ease",
            }}
          >
            {action === "vibe" ? <Icon.Check width="16" height="16" /> : <Icon.Vibe width="17" height="17" />}
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>{action === "vibe" ? "Vibed" : "Vibe"}</span>
              {action !== "vibe" && <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, marginTop: 2, lineHeight: 1 }}>Friends energy</span>}
            </span>
          </button>
          <button
            onClick={() => onAct && onAct("spark")}
            disabled={!!action}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: 14,
              cursor: action ? "default" : "pointer",
              border: 0,
              background: action === "spark" ? "rgba(234,140,225,0.5)" : "#EA8CE1",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: action && action !== "spark" ? 0.4 : 1,
            }}
          >
            {action === "spark" ? <Icon.Check width="16" height="16" /> : <Icon.Spark width="17" height="17" />}
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 14, lineHeight: 1, color: action === "spark" ? "#fff" : "#14110D" }}>{action === "spark" ? "Sparked" : "Spark"}</span>
              {action !== "spark" && <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7, color: "#14110D", marginTop: 2, lineHeight: 1 }}>More than friends</span>}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Sleek iOS Push Notification component
export function PushNotification({ title, message, icon }: { title: string; message: string; icon: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 12,
        right: 12,
        background: "rgba(30, 30, 30, 0.85)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        zIndex: 9999,
        animation: "slideDownNoti 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        color: "#fff",
      }}
    >
      <style>{`
        @keyframes slideDownNoti { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      <div style={{ width: 44, height: 44, borderRadius: 12, backgroundImage: `url(${icon})`, backgroundSize: "cover", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "-apple-system, sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{title}</div>
        <div style={{ fontFamily: "-apple-system, sans-serif", fontSize: 14, opacity: 0.8 }}>{message}</div>
      </div>
      <div style={{ opacity: 0.5, fontSize: 12, fontFamily: "-apple-system, sans-serif" }}>now</div>
    </div>
  );
}

// "It's a Match!" Overlay
export function MatchOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(10,9,7,0.7)",
        backdropFilter: "blur(12px)",
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        animation: "popMatch 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <style>{`
        @keyframes popMatch { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
      <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: 42, color: "#EA8CE1", textShadow: "0 0 30px rgba(234,140,225,0.6)", marginBottom: 12 }}>It's a Match!</div>
      <div style={{ fontFamily: "-apple-system, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)" }}>You both vibed on Morgan Wallen.</div>
    </div>
  );
}
