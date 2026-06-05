"use client";
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/Primitives";

const DISPLAY = "var(--font-display)";

export type Archetype = {
  id: string;
  name: string;
  descriptor: string;
  ring: [string, string, string];
  accent: string;
  eyebrow: string;
  glow: string;
  seal: string;
};

export const ARCHETYPE_TOTAL = 24;

export const ARCHETYPE_CATALOG: Archetype[] = [
  {
    id: "hypnotist",
    name: "The Hypnotist",
    descriptor: "Deep, late, rhythm-first. The one who closes the room.",
    ring: ["#fde9b8", "#f5d783", "#d9a93b"],
    accent: "#F5D783",
    eyebrow: "#F5D783",
    glow:
      "radial-gradient(420px 240px at 12% 0%, rgba(245,215,131,0.22), transparent 62%), radial-gradient(360px 280px at 100% 100%, rgba(249,115,22,0.14), transparent 60%)",
    seal: "hypnotist",
  },
  {
    id: "afterglow",
    name: "The Afterglow",
    descriptor: "House on the floor, dream-pop after midnight. Peak then melt.",
    ring: ["#e8c4f0", "#c77ddb", "#8b5cf6"],
    accent: "#EA8CE1",
    eyebrow: "#EA8CE1",
    glow:
      "radial-gradient(420px 240px at 12% 0%, rgba(234,140,225,0.22), transparent 62%), radial-gradient(360px 280px at 100% 100%, rgba(139,92,246,0.14), transparent 60%)",
    seal: "afterglow",
  },
  {
    id: "culture-keeper",
    name: "The Culture Keeper",
    descriptor: "Knows it before the blog does. Sends you the song six months early.",
    ring: ["#b8e8d4", "#71c07f", "#2a5e40"],
    accent: "#71C07F",
    eyebrow: "#71C07F",
    glow:
      "radial-gradient(400px 220px at 8% 0%, rgba(113,192,127,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(42,94,64,0.12), transparent 60%)",
    seal: "culture",
  },
  {
    id: "philosopher",
    name: "The 4AM Philosopher",
    descriptor: "Lyrics over everything. Listens to the words, not the beat.",
    ring: ["#c4d4f0", "#8ba4cf", "#4a5e8b"],
    accent: "#8BA4CF",
    eyebrow: "#8BA4CF",
    glow:
      "radial-gradient(400px 220px at 12% 0%, rgba(139,164,207,0.22), transparent 62%), radial-gradient(340px 260px at 90% 100%, rgba(74,94,139,0.14), transparent 60%)",
    seal: "philosopher",
  },
  {
    id: "main-character",
    name: "The Pop Oracle",
    descriptor: "Pop precision · R&B feelings · every bridge memorized.",
    ring: ["#ffd4e8", "#ff6b9d", "#c2410c"],
    accent: "#FF6B9D",
    eyebrow: "#FF6B9D",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(255,107,157,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(249,115,22,0.12), transparent 60%)",
    seal: "pop",
  },
  {
    id: "purist",
    name: "The Purist",
    descriptor: "One genre, all the way down. Knows the whole discography.",
    ring: ["#e8e4dc", "#c4bcb0", "#6b6358"],
    accent: "#C4BCB0",
    eyebrow: "#C4BCB0",
    glow:
      "radial-gradient(380px 200px at 15% 0%, rgba(196,188,176,0.18), transparent 60%), radial-gradient(300px 240px at 100% 100%, rgba(107,99,88,0.12), transparent 60%)",
    seal: "purist",
  },
  {
    id: "mood-curator",
    name: "The Mood Curator",
    descriptor: "A playlist for every feeling. The aux is always right.",
    ring: ["#d4c4ff", "#a78bfa", "#6d28d9"],
    accent: "#A78BFA",
    eyebrow: "#A78BFA",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(167,139,250,0.22), transparent 62%), radial-gradient(320px 260px at 100% 100%, rgba(109,40,217,0.12), transparent 60%)",
    seal: "mood",
  },
  {
    id: "throwback",
    name: "The Throwback",
    descriptor: "Born in the wrong decade. Lives in another era on purpose.",
    ring: ["#f5d4a8", "#d97706", "#92400e"],
    accent: "#D97706",
    eyebrow: "#D97706",
    glow:
      "radial-gradient(400px 220px at 12% 0%, rgba(217,119,6,0.18), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(146,64,14,0.12), transparent 60%)",
    seal: "throwback",
  },
  {
    id: "globetrotter",
    name: "The Globetrotter",
    descriptor: "No borders on the aux. Taste has a passport.",
    ring: ["#a8f0e8", "#14b8a6", "#0f766e"],
    accent: "#14B8A6",
    eyebrow: "#14B8A6",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(20,184,166,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(15,118,110,0.12), transparent 60%)",
    seal: "globe",
  },
  {
    id: "festival-head",
    name: "The Festival Head",
    descriptor: "Built for the drop. Lives for the set.",
    ring: ["#fef08a", "#facc15", "#ca8a04"],
    accent: "#FACC15",
    eyebrow: "#FACC15",
    glow:
      "radial-gradient(400px 220px at 12% 0%, rgba(250,204,21,0.22), transparent 62%), radial-gradient(320px 260px at 100% 100%, rgba(202,138,4,0.14), transparent 60%)",
    seal: "festival",
  },
  {
    id: "pregame-menace",
    name: "The Pregame Menace",
    descriptor: "Rage rap early · Atlanta trap late · house when the room turns.",
    ring: ["#fca5a5", "#ef4444", "#7f1d1d"],
    accent: "#EF4444",
    eyebrow: "#EF4444",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(239,68,68,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(127,29,29,0.12), transparent 60%)",
    seal: "menace",
  },

  {
    id: "southern-romantic",
    name: "The Southern Romantic",
    descriptor: "Country heartbreak · tailgate anthems · soft songs after midnight.",
    ring: ["#FDE68A", "#F5D783", "#D97706"],
    accent: "#F5D783",
    eyebrow: "#F5D783",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(245,215,131,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(217,119,6,0.12), transparent 60%)",
    seal: "romantic",
  },
  {
    id: "social-aux",
    name: "The Social Aux",
    descriptor: "Rap in the Uber · country at the tailgate · pop when the room knows every word.",
    ring: ["#93C5FD", "#3B82F6", "#1E40AF"],
    accent: "#3B82F6",
    eyebrow: "#3B82F6",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(59,130,246,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(30,64,175,0.12), transparent 60%)",
    seal: "aux",
  },
  {
    id: "algorithm-dodger",
    name: "The Algorithm Dodger",
    descriptor: "Alt-pop chaos · internet taste · party songs before they become party songs.",
    ring: ["#D8B4FE", "#A78BFA", "#6D28D9"],
    accent: "#A78BFA",
    eyebrow: "#A78BFA",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(167,139,250,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(109,40,217,0.12), transparent 60%)",
    seal: "dodger",
  },
  {
    id: "deep-cut",
    name: "The Deep Cut Generalist",
    descriptor: "The true mixer. Moves from Fleetwood Mac to Freddie Gibbs and makes it feel like one worldview.",
    ring: ["#10B981", "#3B82F6", "#8B5CF6"],
    accent: "#3B82F6",
    eyebrow: "#3B82F6",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(59,130,246,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(16,185,129,0.12), transparent 60%)",
    seal: "globe",
  },
];

export function getArchetypeById(id: string): Archetype | null {
  return ARCHETYPE_CATALOG.find((a) => a.id === id) ?? null;
}

export function parseArchetypeSheet(sheet: string | null) {
  if (sheet === "archetype") return { mode: "earned" as const };
  if (sheet?.startsWith("archetype:"))
    return { mode: "detail" as const, id: sheet.slice(10) };
  return null;
}

function ArchetypeSealInner({ kind, accent }: { kind: string; accent: string }) {
  const c = accent || "#F5D783";
  switch (kind) {
    case "hypnotist":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g className="pv2-seal-spin">
            <circle cx="12" cy="12" r="9.5" stroke={c} strokeWidth="1.6" strokeDasharray="3 4" />
          </g>
          <circle cx="12" cy="12" r="5.5" stroke="#F97316" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="1.8" fill={c} />
        </svg>
      );
    case "afterglow":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g className="pv2-seal-spin">
            <path
              d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3"
              stroke={c}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
          <circle cx="12" cy="12" r="4" stroke="#F5D783" strokeWidth="1.6" />
        </svg>
      );
    case "culture":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 6h8v12H8z" stroke={c} strokeWidth="1.5" />
          <path d="M10 9h4M10 12h4M10 15h3" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "philosopher":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 14a4 4 0 118 0" stroke={c} strokeWidth="1.5" />
          <circle cx="12" cy="10" r="3" stroke={c} strokeWidth="1.5" />
        </svg>
      );
    case "pop":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4l1.8 5.5H19l-4.5 3.3 1.7 5.2L12 14.5 7.8 18l1.7-5.2L5 9.5h5.2z"
            stroke={c}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "purist":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke={c} strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2" fill={c} />
        </svg>
      );
    case "mood":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 12c2-3 4-4 8-4s6 1 8 4M4 16c2 2 4 3 8 3s6-1 8-3"
            stroke={c}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "throwback":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 8H5v8h4M9 12h6l3 4V8l-3 4"
            stroke={c}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "globe":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke={c} strokeWidth="1.5" />
          <path
            d="M4 12h16M12 4c2 3 2 13 0 16M12 4c-2 3-2 13 0 16"
            stroke={c}
            strokeWidth="1.2"
          />
        </svg>
      );
    case "festival":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13 3L5 14h6l-1 7 9-13h-6l1-5z"
            stroke={c}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "menace":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v18m-6-6h12m-9-6h6"
            stroke={c}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "romantic":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "aux":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18V5l12-2v13" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="6" cy="18" r="3" stroke={c} strokeWidth="1.6"/>
          <circle cx="18" cy="16" r="3" stroke={c} strokeWidth="1.6"/>
        </svg>
      );
    case "dodger":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return <circle cx="12" cy="12" r="5" stroke={c} strokeWidth="1.6" />;
  }
}

export function ArchetypeSealGraphic({
  archetype,
  size = 52,
  showEarned = false,
  earned = false,
}: {
  archetype: Archetype;
  size?: number;
  showEarned?: boolean;
  earned?: boolean;
}) {
  const ring = archetype.ring;
  const inner = Math.round(size * 0.81);
  return (
    <div
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: 99,
        background: `linear-gradient(155deg, ${ring[0]}, ${ring[1]} 48%, ${ring[2]})`,
        boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.08), 0 8px 18px -6px ${archetype.accent}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          borderRadius: 99,
          background: "#0A0907",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArchetypeSealInner kind={archetype.seal} accent={archetype.accent} />
      </div>
      {showEarned && earned && (
        <span
          style={{
            position: "absolute",
            bottom: -6,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: size > 44 ? 7 : 6,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#14110D",
            background: archetype.accent,
            padding: "2px 6px",
            borderRadius: 99,
            whiteSpace: "nowrap",
          }}
        >
          Earned
        </span>
      )}
    </div>
  );
}

function ArchetypeTile({
  archetype,
  isYours,
  onClick,
}: {
  archetype: Archetype;
  isYours: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`archetype-tile ${isYours ? "is-yours" : ""}`}
      onClick={onClick}
      style={{
        width: "100%",
        border: 0,
        cursor: "pointer",
        textAlign: "left",
        borderRadius: 22,
        padding: "16px 18px",
        position: "relative",
        overflow: "hidden",
        background: "#0A0907",
        color: "#fff",
        boxShadow: isYours
          ? `0 12px 30px -12px rgba(20,17,13,0.35), 0 0 0 2px ${archetype.accent}55`
          : "0 8px 22px -14px rgba(20,17,13,0.28)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: archetype.glow,
        }}
      />
      <div style={{ position: "relative", display: "flex", gap: 14, alignItems: "center" }}>
        <ArchetypeSealGraphic archetype={archetype} size={48} showEarned={false} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {isYours && (
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: archetype.accent,
                marginBottom: 6,
              }}
            >
              Earned · Yours
            </div>
          )}
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {archetype.name}
          </div>
          <p
            style={{
              marginTop: 6,
              fontSize: 13,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.68)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {archetype.descriptor}
          </p>
        </div>
        <Icon.Chev width={16} height={16} color="rgba(255,255,255,0.35)" />
      </div>
    </button>
  );
}

export function ArchetypeGalleryScreen({
  earnedId,
  edge,
  onBack,
  onSelectArchetype,
}: {
  earnedId: string;
  edge: number;
  onBack: () => void;
  onSelectArchetype: (id: string) => void;
}) {
  const yoursRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      yoursRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 280);
    return () => clearTimeout(t);
  }, [earnedId]);

  return (
    <div
      className="archetype-gallery-screen"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "#FAFAF8",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: `54px ${edge}px 12px`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(20,17,13,0.06)",
          background: "#FAFAF8",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            border: "1px solid rgba(20,17,13,0.06)",
            background: "rgba(20,17,13,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon.Back width={20} height={20} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "-0.02em",
              color: "#14110D",
            }}
          >
            All Archetypes
          </div>
        </div>
        <span
          style={{
            flexShrink: 0,
            fontFamily: DISPLAY,
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(20,17,13,0.55)",
            background: "rgba(20,17,13,0.05)",
            padding: "6px 10px",
            borderRadius: 99,
          }}
        >
          1 of {ARCHETYPE_TOTAL} earned
        </span>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          padding: `16px ${edge}px 120px`,
        }}
      >
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            color: "rgba(20,17,13,0.50)",
            marginBottom: 16,
          }}
        >
          Read-only gallery — discover where yours sits. Tap any archetype for the full read.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ARCHETYPE_CATALOG.map((a) => {
            const isYours = a.id === earnedId;
            return (
              <div key={a.id} ref={isYours ? yoursRef : null}>
                <ArchetypeTile
                  archetype={a}
                  isYours={isYours}
                  onClick={() => onSelectArchetype(a.id)}
                />
              </div>
            );
          })}
        </div>
        <p
          style={{
            marginTop: 20,
            fontSize: 12,
            lineHeight: 1.45,
            color: "rgba(20,17,13,0.40)",
            textAlign: "center",
          }}
        >
          Showing {ARCHETYPE_CATALOG.length} of {ARCHETYPE_TOTAL} · more unlock as Ligo expands the
          catalog
        </p>
      </div>
    </div>
  );
}

export function ArchetypeDetailSheetBody({
  archetypeId,
  earnedId,
  traits,
  heldWeeks,
  earnedBlurb,
}: {
  archetypeId: string;
  earnedId: string;
  traits: { n: string; l: ReactNode }[];
  heldWeeks: string;
  earnedBlurb: string;
}) {
  const archetype = getArchetypeById(archetypeId);
  if (!archetype) return null;
  const isYours = archetypeId === earnedId;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 4 }}>
        <ArchetypeSealGraphic archetype={archetype} size={56} showEarned earned={isYours} />
        <div style={{ flex: 1, paddingTop: 4 }}>
          {isYours && (
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: archetype.accent,
                marginBottom: 6,
              }}
            >
              Earned · Yours
            </div>
          )}
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              fontSize: 32,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {archetype.name}
          </div>
        </div>
      </div>
      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.72)",
          marginTop: 10,
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        {archetype.descriptor}
      </p>
      <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", marginTop: 12, lineHeight: 1.55 }}>
        {isYours ? (
          earnedBlurb
        ) : (
          <>
            One of {ARCHETYPE_TOTAL} archetypes. Discoverable in the gallery — keep answering daily
            and yours updates when your taste shifts.
          </>
        )}
      </p>
      {isYours && heldWeeks && (
        <div
          style={{
            marginTop: 24,
            padding: "16px 14px",
            borderRadius: 16,
            background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: archetype.accent,
              marginBottom: 8,
            }}
          >
            Taste Forecast
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.45, margin: 0 }}>
            You&apos;ve been inching BPMs up all week. Expect a full shift into UK Garage by Thursday.
          </p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, marginTop: 16 }}>
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 12,
              }}
            >
              Taste Drift (Semester)
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", height: 40, gap: 4 }}>
              {[0.2, 0.3, 0.25, 0.4, 0.6, 0.5, 0.7, 0.8, 0.9, 1.0].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: i === 9 ? archetype.accent : "rgba(255,255,255,0.2)",
                    height: `${h * 100}%`,
                    borderRadius: "4px 4px 0 0",
                    opacity: 0.3 + i * 0.07,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                fontFamily: DISPLAY,
                fontWeight: 600,
              }}
            >
              <span>The Throwback</span>
              <span style={{ color: archetype.accent }}>{archetype.name}</span>
            </div>
          </div>
        </div>
      )}
      {isYours && traits && traits.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {traits.map((t) => (
            <div
              key={t.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "12px 14px",
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 22,
                  color: archetype.accent,
                  width: 52,
                  flexShrink: 0,
                }}
              >
                {t.n}
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.35 }}>
                {t.l}
              </span>
            </div>
          ))}
        </div>
      )}
      {!isYours && (
        <div
          style={{
            marginTop: 18,
            padding: "12px 14px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.45,
          }}
        >
          You haven&apos;t earned this archetype — it&apos;s here so you can see the full map of taste
          types on campus.
        </div>
      )}
    </div>
  );
}
