/* ============================================================
   Bottom tab bar — Events (left) · Home (center) · Profile (right).
   Glass blur + tint per the brand kit; supports a `dark` variant
   for the full-screen Connection / Wrapped takeovers. Only Home
   and Events navigate; Profile is a parked placeholder.
   ============================================================ */
import { Icon } from "./Primitives";

export type NavId = "events" | "home" | "profile";

const DEFAULT_TABS: { id: NavId; label: string; icon: (p: any) => JSX.Element }[] = [
  { id: "events", label: "Events", icon: Icon.Calendar },
  { id: "home", label: "Home", icon: Icon.Home },
  { id: "profile", label: "Profile", icon: Icon.User },
];

export function BottomNav({
  active,
  onChange,
  dark = false,
  items = DEFAULT_TABS,
}: {
  active: NavId | string;
  onChange?: (id: NavId) => void;
  dark?: boolean;
  items?: { id: NavId; label: string; icon: (p: any) => JSX.Element }[];
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "10px 14px 22px",
        paddingBottom: "max(22px, env(safe-area-inset-bottom))",
        background: dark ? "rgba(10,9,7,0.88)" : "rgba(250,250,248,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(20,17,13,0.06)"}`,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 30,
      }}
    >
      {items.map((t) => {
        const isActive = t.id === active;
        const color = isActive
          ? "#F97316"
          : dark
          ? "rgba(255,255,255,0.45)"
          : "rgba(20,17,13,0.45)";
        const I = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => onChange?.(t.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: 0,
              cursor: "pointer",
              color,
              fontFamily: "var(--font-display)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "-0.005em",
              minWidth: 72,
              padding: "4px 4px 0",
            }}
          >
            <I width={24} height={24} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
