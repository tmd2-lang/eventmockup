'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LigoMark } from '@/components/Primitives';

// ── Shared "Reveal" experience shell ──────────────────────────────────
// Extracted from RevealScreen so Connection Night and Wrapped can reuse the
// exact same progression interface (waveform "Act N of M") and cinematic
// transitions (aurora backdrop + rise/zoom/flare/curtain/fade + veil flashes).
// The only thing that varies per section is the aurora palette + chrome text.

const FF = "'Bricolage Grotesque', sans-serif";
const EASE = 'cubic-bezier(.2,.7,.2,1)';

// ── Aurora palettes (4 curtains each) ─────────────────────────────────
export const REVEAL_COLORS     = ['#71C07F', '#EA8CE1', '#F97316', '#F5D783']; // green · pink · orange · gold
export const CONNECTION_COLORS = ['#EA8CE1', '#F97316', '#C77DFF', '#F5D783']; // pink · orange · violet · gold
export const WRAPPED_COLORS    = ['#F5D783', '#E9BF52', '#F97316', '#EA8CE1']; // gold · amber · orange · pink

const LEFT = ['-8%', '22%', '48%', '70%'];
const DUR  = [11, 14, 17, 13];
const CFG = [
  [{ o: 0.50, x: 0  }, { o: 0.16, x: 4  }, { o: 0.10, x: -3  }, { o: 0.34, x: 2  }],
  [{ o: 0.18, x: -6 }, { o: 0.14, x: 2  }, { o: 0.52, x: -8  }, { o: 0.40, x: -4 }],
  [{ o: 0.14, x: 3  }, { o: 0.55, x: -10}, { o: 0.16, x: 5   }, { o: 0.22, x: 6  }],
  [{ o: 0.42, x: -4 }, { o: 0.46, x: -6 }, { o: 0.30, x: -10 }, { o: 0.36, x: -2 }],
  [{ o: 0.36, x: 6  }, { o: 0.12, x: 8  }, { o: 0.38, x: 4   }, { o: 0.20, x: 0  }],
];

// ── Transitions ───────────────────────────────────────────────────────
const TRANS = ['rise', 'zoom', 'flare', 'curtain'] as const;
type Trans = typeof TRANS[number] | 'fade';

const ENTER: Record<Trans, string> = {
  rise:    `enterRise 700ms ${EASE} both`,
  zoom:    `enterZoom 650ms ${EASE} both`,
  flare:   `enterFlare 700ms ${EASE} both`,
  curtain: `enterCurtain 700ms ${EASE} both`,
  fade:    `enterFade 450ms ${EASE} both`,
};
const EXIT: Record<Trans, string> = {
  rise:    `exitRise 600ms ${EASE} both`,
  zoom:    `exitZoom 600ms ${EASE} both`,
  flare:   `exitFlare 550ms ${EASE} both`,
  curtain: `exitCurtain 600ms ${EASE} both`,
  fade:    `exitFade 400ms ${EASE} both`,
};

const WAVE_H = [6,11,8,15,9,17,7,12,18,10,14,8,16,11,7,13,17,9,12,15,8,11,6,14,9];
const ROMAN  = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV'];
export function roman(n: number) { return ROMAN[n] ?? String(n); }

// ── Aurora background (3-layer strips + stars + bottom fade) ──────────
export function AuroraBg({ act, colors }: { act: number; colors: string[] }) {
  const cfg = CFG[act % CFG.length] ?? CFG[0];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Stars layer 1 */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'radial-gradient(1.3px 1.3px at 23px 31px, rgba(255,255,255,0.8), transparent 60%)',
          'radial-gradient(1px 1px at 131px 109px, rgba(255,255,255,0.55), transparent 60%)',
          'radial-gradient(1.5px 1.5px at 81px 187px, rgba(255,255,255,0.65), transparent 60%)',
          'radial-gradient(0.9px 0.9px at 177px 53px, rgba(255,255,255,0.5), transparent 60%)',
        ].join(', '),
        backgroundSize: '210px 230px',
        animation: 'twinkleReveal 3.4s ease-in-out infinite alternate',
      }} />
      {/* Stars layer 2 */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'radial-gradient(1px 1px at 57px 143px, rgba(255,255,255,0.6), transparent 60%)',
          'radial-gradient(1.2px 1.2px at 167px 23px, rgba(255,255,255,0.7), transparent 60%)',
          'radial-gradient(0.8px 0.8px at 107px 79px, rgba(255,255,255,0.45), transparent 60%)',
        ].join(', '),
        backgroundSize: '260px 300px',
        animation: 'twinkleReveal 4.7s ease-in-out -2s infinite alternate',
      }} />
      {/* 4 aurora curtains, each with 3 sub-layers */}
      {colors.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: '-22%', bottom: '-8%', left: LEFT[i], width: '52%',
          opacity: cfg[i].o,
          transform: `translateX(${cfg[i].x}%)`,
          transition: `opacity 1400ms ${EASE}, transform 1400ms ${EASE}`,
        }}>
          {/* main curtain */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(185deg, transparent 6%, ${c} 36%, transparent 76%)`,
            filter: 'blur(38px)',
            animation: `auroraSway ${DUR[i]}s ease-in-out ${i % 2 ? '-6s' : ''} infinite alternate, auroraShimmer ${5.5 + i * 1.7}s ease-in-out ${i * -2.3}s infinite alternate`,
            transformOrigin: '50% 0%',
          }} />
          {/* soft counter-drifting underlayer */}
          <div style={{
            position: 'absolute', inset: '-6% -10%',
            background: `linear-gradient(190deg, transparent 12%, ${c} 44%, transparent 80%)`,
            filter: 'blur(52px)',
            opacity: 0.55,
            animation: `auroraSway ${DUR[i] + 7}s ease-in-out ${i * -4 - 3}s infinite alternate-reverse, auroraBreathe ${8 + i * 2.5}s ease-in-out ${i * -1.9}s infinite alternate`,
            transformOrigin: '50% 0%',
          }} />
          {/* bright ray */}
          <div style={{
            position: 'absolute', top: '4%', bottom: '22%', left: '38%', width: '17%',
            background: `linear-gradient(183deg, transparent 2%, ${c} 34%, transparent 72%)`,
            filter: 'blur(16px)',
            animation: `auroraRay ${16 + i * 5}s ease-in-out ${i * -5.5}s infinite`,
          }} />
        </div>
      ))}
      {/* bottom fade */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '26%',
        background: 'linear-gradient(180deg, transparent, rgba(10,9,7,0.85))',
      }} />
    </div>
  );
}

// ── Transition veil flash ─────────────────────────────────────────────
function TransitionVeil({ type, accent }: { type: Trans | null; accent: string }) {
  if (!type) return null;
  if (type === 'flare') return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
      background: `radial-gradient(80% 60% at 50% 40%, ${hexA(accent, 0.85)}, ${hexA(accent, 0)} 70%)`,
      animation: `veilFlash 700ms ${EASE} both`,
    }} />
  );
  if (type === 'curtain') return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
      background: 'linear-gradient(180deg, transparent 10%, rgba(113,192,127,0.5) 45%, rgba(234,140,225,0.35) 60%, transparent 90%)',
      filter: 'blur(20px)',
      animation: `veilSweep 700ms ${EASE} both`,
    }} />
  );
  if (type === 'rise') return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
      background: `linear-gradient(0deg, ${hexA(accent, 0.30)}, transparent 55%)`,
      animation: `veilFlash 750ms ${EASE} both`,
    }} />
  );
  return null;
}

// hex (#RRGGBB) → rgba string
function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Step render context handed to each step ───────────────────────────
export type StepCtx = { anim: string; go: (d: number) => void; cur: number; index: number };
export type ShellController = { go: (d: number) => void; cur: number; total: number };

type Props = {
  steps: Array<(ctx: StepCtx) => React.ReactNode>;
  colors?: string[];
  /** waveform head + lit bar colors */
  waveColors?: { head: string; lit: string };
  /** top-chrome title + eyebrow */
  title: string;
  subtitle: string;
  /** waveform eyebrow, e.g. "Act II of V" */
  stepLabel?: (cur: number, total: number) => string;
  onBack?: () => void;
  /** rendered above the tap overlay (e.g. a Share button) */
  bottom?: (ctx: { go: (d: number) => void; cur: number }) => React.ReactNode;
  /** disable tap/swipe nav (e.g. while a sheet is open) */
  tapDisabled?: boolean;
  initial?: number;
  /** receives { go, cur, total } for programmatic navigation */
  controllerRef?: React.MutableRefObject<ShellController | null>;
  /** base background gradient */
  bg?: string;
};

export function RevealShell({
  steps,
  colors = REVEAL_COLORS,
  waveColors = { head: '#F97316', lit: '#F5D783' },
  title,
  subtitle,
  stepLabel,
  onBack,
  bottom,
  tapDisabled = false,
  initial = 0,
  controllerRef,
  bg = 'linear-gradient(180deg, #07090C 0%, #0A0907 55%, #0D0B08 100%)',
}: Props) {
  const TOTAL = steps.length;

  const [cur,  setCur]  = useState(initial);
  const [prev, setPrev] = useState<number | null>(null);
  const [type, setType] = useState<Trans>('fade');
  const [veilKey, setVeilKey] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const pxRef   = useRef<number | null>(null);
  const pyRef   = useRef<number | null>(null);

  const go = useCallback((d: number) => {
    const n = Math.max(0, Math.min(TOTAL - 1, cur + d));
    if (n === cur) return;
    const seam = Math.min(cur, n);
    const t: Trans = d > 0 ? (TRANS[seam % TRANS.length] ?? 'fade') : 'fade';
    setPrev(cur);
    setCur(n);
    setType(t);
    setVeilKey(k => k + 1);
  }, [cur, TOTAL]);

  // expose programmatic nav
  useEffect(() => {
    if (controllerRef) controllerRef.current = { go, cur, total: TOTAL };
  }, [controllerRef, go, cur, TOTAL]);

  // pointer-based tap + swipe — listens on the root so buttons (Vibe/Spark/
  // Pass, Share, back) still receive their own clicks and scrollable content
  // still scrolls. Taps on non-interactive areas advance/rewind.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => { pxRef.current = e.clientX; pyRef.current = e.clientY; };
    const onUp = (e: PointerEvent) => {
      if (tapDisabled) return;
      const target = e.target as Element;
      if (target && target.closest && target.closest('button, a, input, textarea, [data-no-advance]')) return;
      const dx = e.clientX - (pxRef.current ?? e.clientX);
      const dy = e.clientY - (pyRef.current ?? e.clientY);
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? 1 : -1); return; }
      if (Math.abs(dy) > 40) return; // a vertical scroll, not a tap
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      go(relX < rect.width / 3 ? -1 : 1);
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', onUp);
    return () => { el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointerup', onUp); };
  }, [go, tapDisabled]);

  // clear prev after exit anim completes
  useEffect(() => {
    if (prev === null) return;
    const id = setTimeout(() => setPrev(null), 700);
    return () => clearTimeout(id);
  }, [prev]);

  const entering = (i: number) => cur  === i;
  const exiting  = (i: number) => prev === i;
  const anim     = (i: number) => {
    if (exiting(i))  return EXIT[type];
    if (entering(i) && prev !== null) return ENTER[type];
    return 'none';
  };
  const zOf = (i: number) => entering(i) ? 2 : 1;

  const litN = Math.round(((cur + 1) / TOTAL) * WAVE_H.length);
  const label = stepLabel ? stepLabel(cur, TOTAL) : `Act ${roman(cur + 1)} of ${roman(TOTAL)}`;

  return (
    <div ref={rootRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: '#fff', touchAction: 'pan-y' }}>
      {/* Aurora background */}
      <AuroraBg act={cur} colors={colors} />

      {/* Transition veil */}
      <TransitionVeil key={veilKey} type={prev !== null ? type : null} accent={waveColors.lit} />

      {/* Step layers — both cur and prev rendered for the exit anim */}
      {steps.map((render, i) => {
        if (!entering(i) && !exiting(i)) return null;
        return (
          <div key={i} style={{ position: 'absolute', inset: 0, zIndex: zOf(i) }}>
            {render({ anim: anim(i), go, cur, index: i })}
          </div>
        );
      })}

      {/* ── TOP CHROME ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: 9,
        padding: '64px 22px 0',
      }}>
        <LigoMark size={24} reversed />
        <div>
          <div style={{ fontFamily: FF, fontWeight: 600, fontSize: 13, letterSpacing: '-0.01em', color: '#FFFFFF', lineHeight: 1 }}>{title}</div>
          <div style={{ fontFamily: FF, fontWeight: 600, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 3 } as React.CSSProperties}>
            {subtitle}
          </div>
        </div>
      </div>

      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: 46, left: 16, zIndex: 40,
            width: 36, height: 36, borderRadius: 99,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          } as React.CSSProperties}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      )}

      {/* ── WAVEFORM PROGRESS (top-right) ── */}
      <div style={{
        position: 'absolute', top: 70, right: 22, zIndex: 20,
        pointerEvents: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 20 }}>
          {WAVE_H.map((hh, i) => {
            const lit  = i < litN;
            const head = i === litN - 1;
            return (
              <span key={i} style={{
                width: 2.5, height: hh, borderRadius: 2, display: 'inline-block',
                background: head ? waveColors.head : lit ? waveColors.lit : 'rgba(255,255,255,0.16)',
                boxShadow: head ? `0 0 8px ${hexA(waveColors.head, 0.9)}` : lit ? `0 0 6px ${hexA(waveColors.lit, 0.45)}` : 'none',
                transition: `background 500ms ${EASE}, box-shadow 500ms ${EASE}`,
                animation: head ? 'wf 1.1s ease-in-out infinite' : 'none',
                transformOrigin: '50% 50%',
              }} />
            );
          })}
        </div>
        <span style={{
          fontFamily: FF, fontWeight: 700, fontSize: 8.5, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
        } as React.CSSProperties}>
          {label}
        </span>
      </div>

      {/* ── BOTTOM CHROME ── */}
      {bottom && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30,
          display: 'flex', justifyContent: 'center', paddingBottom: 38, pointerEvents: 'none',
        }}>
          {bottom({ go, cur })}
        </div>
      )}

    </div>
  );
}
