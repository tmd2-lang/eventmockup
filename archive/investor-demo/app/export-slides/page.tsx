"use client";
/* eslint-disable */

import React, { useRef } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { HomeScreen } from "@/components/HomeScreen";
import { DemoMatchCard } from "../investor-demo/Storyboard";
import { PlanAHang } from "../investor-demo/PlanAHang";
import { Icon as BaseIcon } from "@/components/Primitives";
import { EventsMemberView, EventDetailView, CreateEventSheet, EVENTS, MY_CLUB } from "@/components/EventsScreen";
import * as htmlToImage from 'html-to-image';

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
Icon.EyeOff = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7c1.6 0 3 .3 4.2.9M22 12s-3.5 7-10 7c-1.6 0-3-.3-4.2-.9" />
    <path d="M9.5 9.6A3 3 0 0014.4 14.5M3 3l18 18" />
  </svg>
);
Icon.Eye = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
Icon.Download = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
Icon.Check = (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>;
Icon.Music = (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
Icon.Users = (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>;
Icon.Sparkles = (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11"/></svg>;

// --- STATIC COMPONENTS ---
function AvatarStack() {
  const people = [
    { i: 'A', bg: '#E0584B' }, { i: 'J', bg: '#6C5CE0' }, { i: 'S', bg: '#3FA76B' }, { i: 'K', bg: '#E0A53F' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {people.map((p, idx) => (
        <span key={idx} style={{
          width: 30, height: 30, borderRadius: 99, background: p.bg, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 12,
          border: '2px solid #FBEFDC', marginLeft: idx === 0 ? 0 : -10, position: 'relative', zIndex: idx,
        }}>{p.i}</span>
      ))}
      <span style={{
        width: 30, height: 30, borderRadius: 99, background: '#14110D', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11,
        border: '2px solid #FBEFDC', marginLeft: -10, position: 'relative', zIndex: 5,
      }}>+38</span>
    </div>
  );
}

function StaticTimeline({ answered }: { answered: boolean }) {
  const node = (label: string, time: string, state: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, flexShrink: 0, width: 64 }}>
      <span style={{
        width: 16, height: 16, borderRadius: 99,
        background: state === 'done' ? '#F97316' : '#fff',
        border: state === 'done' ? '0' : '2px solid ' + (state === 'next' ? '#F97316' : 'rgba(20,17,13,0.2)'),
        boxShadow: state === 'done' ? '0 0 0 4px rgba(249,115,22,0.16)' : 'none',
      }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#14110D', letterSpacing: '-0.01em' }}>{time}</div>
        <div style={{ fontSize: 11, color: 'rgba(20,17,13,0.45)', marginTop: 1 }}>{label}</div>
      </div>
    </div>
  );
  const seg = (fill: boolean) => (
    <div style={{ flex: 1, height: 3, borderRadius: 99, background: 'rgba(20,17,13,0.1)', margin: '8px -6px 0', overflow: 'hidden' }}>
      <i style={{ display: 'block', height: '100%', width: fill ? '100%' : '0%', background: '#F97316', borderRadius: 99 }} />
    </div>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '22px 26px 0' }}>
      {node('Opens', '8:00a', 'done')}
      {seg(true)}
      {node('Answered', 'You', answered ? 'done' : 'next')}
      {seg(false)}
      {node('Reveal', '8:00p', 'pending')}
    </div>
  );
}

function StaticDailyPick({ answered, draft }: { answered: boolean, draft: string }) {
  const t = answered
    ? { card: 'cd-breathe-g', dot: 'cd-dot-g', dotBg: '#71C07F', bg: 'linear-gradient(160deg, rgba(113,192,127,0.18), rgba(245,215,131,0.10))', border: 'rgba(113,192,127,0.30)', accent: '#2F7D3F', big: '#1E6B33', eyebrow: "You're in · everyone reveals in", sub: '41 friends already locked in' }
    : { card: 'cd-breathe-o', dot: 'cd-dot-o', dotBg: '#F97316', bg: 'linear-gradient(160deg, rgba(249,115,22,0.16), rgba(245,215,131,0.12))', border: 'rgba(249,115,22,0.28)', accent: '#C2410C', big: '#9A3412', eyebrow: 'Everyone reveals in', sub: '847 answered · lock yours before 3pm' };
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FAFAF8' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24, paddingTop: 64 }}>
        {/* Header mock */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#F97316' }} />
            <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 24, letterSpacing: '-0.04em' }}>Ligo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(20,17,13,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Bell width="18" height="18" />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 99, backgroundImage: 'url(/assets/Cole-profile.png)', backgroundSize: 'cover' }} />
          </div>
        </div>

        {/* CountdownBar */}
        <div style={{ margin: '0 22px 0' }}>
          <div className={t.card} style={{ borderRadius: 22, padding: '18px 20px', background: t.bg, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accent }}>
                <span className={t.dot} style={{ width: 8, height: 8, borderRadius: 99, background: t.dotBg }} />
                {t.eyebrow}
              </span>
              {answered && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2F7D3F' }}>
                  <Icon.Check width="13" height="13" /> Locked
                </span>
              )}
            </div>
            <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 42, letterSpacing: '-0.03em', color: t.big, lineHeight: 1, margin: '10px 0 12px', fontVariantNumeric: 'tabular-nums' }}>21h 32m 42s</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <AvatarStack />
              <span style={{ fontSize: 12.5, color: t.accent, fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600 }}>{t.sub}</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div style={{ margin: '14px 22px 0' }}>
          <div style={{
            background: '#fff', borderRadius: 22, padding: '20px 20px 22px',
            border: '1px solid rgba(20,17,13,0.05)',
            boxShadow: '0 1px 0 rgba(20,17,13,0.02), 0 8px 24px -12px rgba(20,17,13,0.10)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ background: '#14110D', color: '#fff', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 8 }}>Today</span>
              <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(20,17,13,0.4)' }}>Everyone answers</span>
            </div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 500, fontSize: 29, lineHeight: 1.12, letterSpacing: '-0.025em', color: '#14110D', textWrap: 'balance' }}>
              What artist did you grow up on that <b style={{ fontWeight: 700 }}>still hits different</b>?
            </h2>

            {!answered && (
              <div style={{ marginTop: 18, position: 'relative', zIndex: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: 'rgba(20,17,13,0.04)', border: '1px solid rgba(20,17,13,0.06)' }}>
                  <Icon.Music width="18" height="18" style={{ color: 'rgba(20,17,13,0.35)', flexShrink: 0 }} />
                  <div style={{ flex: 1, fontFamily: '-apple-system, sans-serif', fontSize: 15, color: '#14110D' }}>{draft || "Name the artist or song..."}</div>
                  {draft && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0, padding: '4px 8px', borderRadius: 99, background: 'rgba(113,192,127,0.14)', color: '#2F7D3F', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      <span style={{ width: 5, height: 5, borderRadius: 99, background: '#44A96A' }} /> Synced
                    </span>
                  )}
                </div>
                <button style={{
                  marginTop: 16, width: '100%', height: 50, border: 0, borderRadius: 14,
                  background: '#F97316', color: '#fff', opacity: draft ? 1 : 0.4,
                  fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.005em',
                }}>Lock in your answer</button>
              </div>
            )}
          </div>
        </div>

        {answered && (
          <div>
            <StaticTimeline answered={true} />
            <div style={{ margin: '12px 22px 0' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 18,
                background: '#fff', border: '1px solid rgba(20,17,13,0.05)',
                boxShadow: '0 1px 0 rgba(20,17,13,0.02), 0 6px 18px -12px rgba(20,17,13,0.08)',
              }}>
                <span style={{ width: 40, height: 40, borderRadius: 99, flexShrink: 0, background: 'rgba(113,192,127,0.16)', color: '#2F7D3F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.Check width="18" height="18" />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(20,17,13,0.4)' }}>Your answer is locked in</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 17, letterSpacing: '-0.015em', color: '#14110D', marginTop: 3 }}>"{draft}"</div>
                </div>
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 12.5, color: '#F97316' }}>Edit</span>
              </div>
            </div>
            <div style={{ margin: '12px 22px 0' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '20px 18px',
                borderRadius: 18, border: '1.5px dashed rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.03)',
                color: '#C2410C', textAlign: 'center',
              }}>
                <Icon.EyeOff width="18" height="18" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em', textWrap: 'balance' }}>Come back at 8pm to see everyone</span>
              </div>
            </div>
          </div>
        )}

        {/* THIS WEEK */}
        <div style={{ margin: '38px 22px 24px' }}>
          <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 18, color: '#14110D', marginBottom: 16 }}>This week on Ligo</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{
              background: '#fff', border: '1px solid rgba(234,140,225,0.4)', borderRadius: 20, padding: 18,
              boxShadow: '0 8px 24px -12px rgba(234,140,225,0.2)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(180deg, rgba(234,140,225,0.15) 0%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, position: 'relative', zIndex: 2 }}>
                <Icon.Users width="13" height="13" style={{ color: '#D946EF' }} />
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A21CAF' }}>Connections</span>
              </div>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#14110D', position: 'relative', zIndex: 2, marginBottom: 24 }}>
                View this week's connections
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#E879F9' }} />
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 10, color: '#A21CAF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next drops in 21h</span>
              </div>
            </div>

            <div style={{
              background: '#fff', border: '1px solid rgba(245,215,131,0.6)', borderRadius: 20, padding: 18,
              boxShadow: '0 8px 24px -12px rgba(245,215,131,0.3)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(180deg, rgba(245,215,131,0.25) 0%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, position: 'relative', zIndex: 2 }}>
                <Icon.Sparkles width="13" height="13" style={{ color: '#D97706' }} />
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B45309' }}>Wrapped</span>
              </div>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#14110D', position: 'relative', zIndex: 2, marginBottom: 24 }}>
                View last week's wrapped
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#FCD34D' }} />
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 10, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next drops in 2d 13h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BottomNav Mock */}
      <div style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        padding: '12px 24px 34px', background: 'rgba(255,255,255,0.85)', 
        backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(20,17,13,0.06)' 
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'rgba(20,17,13,0.4)' }}>
          <Icon.Calendar width="24" height="24" />
          <span style={{ fontSize: 10, fontWeight: 600 }}>Events</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#F97316' }}>
          <Icon.Home width="24" height="24" />
          <span style={{ fontSize: 10, fontWeight: 600 }}>Home</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'rgba(20,17,13,0.4)' }}>
          <Icon.User width="24" height="24" />
          <span style={{ fontSize: 10, fontWeight: 600 }}>Profile</span>
        </div>
      </div>
    </div>
  );
}

function StaticSealedReveal({ song }: { song: any }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#0A0907', color: '#fff' }}>
      <button style={{ position: 'absolute', top: 52, left: 16, zIndex: 60, width: 38, height: 38, borderRadius: 99, border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Icon.Home width="18" height="18" />
      </button>

      <div style={{ position: 'absolute', width: 340, height: 340, top: -60, left: -80, background: 'radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 280, height: 280, bottom: 120, right: -60, background: 'radial-gradient(circle, rgba(234,140,225,0.14), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ padding: '102px 24px 0', position: 'relative', zIndex: 2 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.22)', color: '#F97316', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: '#F97316' }} />
          Tonight's reveal · Georgetown
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'relative', width: 180, height: 84, marginBottom: 34 }}>
          <div style={{ position: 'absolute', left: 0, top: 10, width: 64, height: 64, borderRadius: 99, background: 'linear-gradient(135deg, #FFB75E, #ED8F03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', border: '2.5px solid #0A0907' }}>CM</div>
          <div style={{ position: 'absolute', right: 0, top: 12, width: 64, height: 64, borderRadius: 99, background: 'linear-gradient(135deg, #5EE7DF, #B490CA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', border: '2.5px solid #0A0907' }}>SL</div>
          <div style={{ position: 'absolute', left: '50%', top: 0, width: 72, height: 72, transform: 'translateX(-50%)', borderRadius: 99, background: 'linear-gradient(135deg, #FF416C, #FF4B2B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 22, color: '#fff', border: '2.5px solid #0A0907', zIndex: 10 }}>BR</div>
        </div>

        <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 72, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6, color: '#fff' }}>4</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>connections surfaced tonight</div>
        <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 10, textWrap: 'balance' }}>matched to your taste.</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 250 }}>You'll never know it's coming. That's the point.</div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 14px', marginTop: 22 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, backgroundImage: `url(${song.art})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 13.5, lineHeight: 1.2 }}>{song.name}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{song.artist}</div>
          </div>
          <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 6, padding: '4px 7px' }}>Your pick</span>
        </div>
      </div>

      <div style={{ padding: '0 20px 36px', position: 'relative', zIndex: 2 }}>
        <button style={{ width: '100%', height: 56, border: 0, borderRadius: 18, background: '#F97316', color: '#fff', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Icon.Eye width="18" height="18" /> See who they are
        </button>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.25)' }}>Disappears at midnight</div>
      </div>
    </div>
  );
}

export default function ExportSlides() {
  const drakeSong = { name: "Passionfruit", artist: "Drake", art: "/artists/drake-profile.jpeg" };
  const [slide, setSlide] = React.useState(1);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  const carolineProfile = {
    name: "Caroline M.",
    initials: "CM",
    photo: "/assets/caroline-profile.png",
    matchType: "Vibe Match",
    score: "95%",
    meta: "Georgetown · Junior",
    archetype: "Social Aux",
    horoscope: "Caroline is the aux cord hero of every pregame. You both picked Drake today, which means you both know the vibes are immaculate. Time to lock in a plan.",
  };

  const next = () => setSlide(s => Math.min(9, s + 1));
  const prev = () => setSlide(s => Math.max(1, s - 1));

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    
    try {
      // First pass to force load any pending network assets into the canvas cache
      await htmlToImage.toPng(printRef.current, { cacheBust: true, pixelRatio: 2 });
      
      // Give the browser a tiny window to settle the DOM paints
      await new Promise(r => setTimeout(r, 150));
      
      // Second pass for the real, fully-rendered capture
      const dataUrl = await htmlToImage.toPng(printRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Ligo-Slide-${slide}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#0A0907", fontFamily: "var(--font-display, sans-serif)", overflow: "hidden" }}>
      {/* Navigation Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 700, margin: 0 }}>Screenshot Studio</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 4, margin: 0 }}>Slide {slide} of 9</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleDownload} disabled={isDownloading} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, background: "rgba(113, 192, 127, 0.2)", border: "1px solid rgba(113, 192, 127, 0.5)", color: "#71C07F", cursor: isDownloading ? "not-allowed" : "pointer", opacity: isDownloading ? 0.5 : 1, fontWeight: 600 }}>
            <Icon.Download width="16" height="16" />
            {isDownloading ? "Saving..." : "Save Image"}
          </button>
          <div style={{ width: 1, background: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
          <button onClick={prev} disabled={slide === 1 || isDownloading} style={{ padding: "10px 20px", borderRadius: 8, background: "rgba(255,255,255,0.1)", color: "white", border: "none", cursor: slide === 1 ? "not-allowed" : "pointer", opacity: slide === 1 ? 0.5 : 1 }}>Previous</button>
          <button onClick={next} disabled={slide === 9 || isDownloading} style={{ padding: "10px 20px", borderRadius: 8, background: "#F97316", color: "white", border: "none", cursor: slide === 9 ? "not-allowed" : "pointer", opacity: slide === 9 ? 0.5 : 1 }}>Next Frame</button>
        </div>
      </div>

{/* Main Stage */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        
        <div id="screenshot-target" ref={printRef} style={{ padding: 20 }}>
        
        {slide === 1 && (
          <IOSDevice width={375} height={812}>
            <div style={{ width: "100%", height: "100%", background: "#FAFAF8", color: "#14110D", overflow: "hidden" }}>
              <StaticDailyPick answered={false} draft="Drake" />
            </div>
          </IOSDevice>
        )}

        {slide === 2 && (
          <IOSDevice width={375} height={812}>
            <div style={{ width: "100%", height: "100%", background: "#FAFAF8", color: "#14110D", overflow: "hidden" }}>
              <StaticDailyPick answered={true} draft="Drake" />
            </div>
          </IOSDevice>
        )}

        {slide === 3 && (
          <IOSDevice width={375} height={812} dark>
            <div style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden" }}>
              <HomeScreen state="wrapped" initialWrappedSlide={1} forceUser="cole" setState={() => {}} onNav={() => {}} />
            </div>
          </IOSDevice>
        )}

        {slide === 4 && (
          <IOSDevice width={375} height={812} dark>
            <div style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden" }}>
              <StaticSealedReveal song={drakeSong} />
            </div>
          </IOSDevice>
        )}

        {slide === 5 && (
          <IOSDevice width={375} height={812} dark>
            <div style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden", position: "relative" }}>
              <DemoMatchCard p={carolineProfile} song={drakeSong} />
            </div>
          </IOSDevice>
        )}

        {slide === 6 && (
          <IOSDevice width={375} height={812} dark>
            <div style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden", position: "relative" }}>
              <PlanAHang currentUser={{ name: "Cole", photo: "/assets/Cole-profile.png" }} profile={{ name: "Caroline", photo: "/assets/caroline-profile.png" }} demoScene={7} />
            </div>
          </IOSDevice>
        )}

        {/* SLIDE 7: Events Feed */}
        {slide === 7 && (
          <IOSDevice width={375} height={812} dark={false}>
            <div className="ligo-events" style={{ width: "100%", height: "100%", background: "#FAFAF8", overflow: "hidden", position: "relative" }}>
              <div className="screen" style={{ height: "100%" }}>
                <div className="scroll" style={{ height: "100%", overflowY: "auto" }}>
                  <EventsMemberView segment={'music'} setSegment={() => {}} isOpen={() => false} rsvps={{}} onRsvp={() => {}} onOpenEvent={() => {}} />
                </div>
              </div>
            </div>
          </IOSDevice>
        )}

        {/* SLIDE 8: Event Details */}
        {slide === 8 && (
          <IOSDevice width={375} height={812} dark={false}>
            <div className="ligo-events" style={{ width: "100%", height: "100%", background: "#FAFAF8", overflow: "hidden", position: "relative" }}>
              <div className="screen" style={{ height: "100%" }}>
                <div className="scroll" style={{ height: "100%", overflowY: "auto" }}>
                  <EventDetailView e={EVENTS.find(x => x.id === 'orch')} open={false} onToggleReach={() => {}} onBack={() => {}} />
                </div>
              </div>
            </div>
          </IOSDevice>
        )}

        {/* SLIDE 9: Create Event */}
        {slide === 9 && (
          <IOSDevice width={375} height={812} dark={true}>
            <div className="ligo-events" style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden", position: "relative" }}>
              <div className="screen" style={{ height: "100%" }}>
                <CreateEventSheet club={MY_CLUB} onClose={() => {}} onPublish={() => {}} />
              </div>
            </div>
          </IOSDevice>
        )}

        </div>

      </div>
    </div>
  );
}
