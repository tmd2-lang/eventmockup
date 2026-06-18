"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/Primitives';
import type { ConnectionNightPerson } from '@/lib/connectionNight';

const FF = "'Bricolage Grotesque', sans-serif";

const HANGS = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'study', label: 'Study sesh' },
  { id: 'listen', label: 'Listening' },
  { id: 'show', label: 'Show' },
];

const DAYS = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

const TIMES = [
  { id: 'morning', label: 'Morning' },
  { id: 'afternoon', label: 'Afternoon' },
  { id: 'evening', label: 'Evening' },
  { id: 'late', label: 'Late Night' },
];

const COFFEE_VENUES = [
  { id: 'mug', name: 'Midnight Mug', meta: 'On campus · Leavey Center', perk: 'LIGO PAYS THE FIRST ONE', perkColor: '#F97316', perkBg: 'rgba(249,115,22,0.12)' },
  { id: 'gray', name: 'Gray Street Coffee', meta: 'Off campus · 0.4 mi', perk: '15% OFF WITH LIGO', perkColor: '#EA8CE1', perkBg: 'rgba(234,140,225,0.12)' },
  { id: 'corp', name: 'The Corp · Uncommon Grounds', meta: 'On campus · student-run' },
];

const SHOW_VENUES = [
  { id: 'orch', name: 'University Orchestra Matinee', meta: 'Gaston Hall · 3 PM' },
  { id: 'jazz', name: 'Georgetown Jazz Ensemble', meta: 'Sellinger Lounge · 9 PM' },
  { id: 'blues', name: 'Blues Alley Jazz', meta: '1073 Wisconsin Ave NW · 8 PM' },
];

function SheetLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12, marginTop: 24 }}>
      {children}
    </div>
  );
}

export type MeetupPayload = { hang: string; day: string; time: string; venue: string; };

export function MeetupSupportSheet({
  match,
  mode = 'vibe',
  onClose,
  onSend,
  incomingPayload,
}: {
  match: ConnectionNightPerson | { name: string; avatar?: string };
  mode?: 'vibe' | 'spark' | 'meetup_invite' | 'meetup_confirmed';
  onClose: () => void;
  onSend: (payload?: MeetupPayload | { status: 'confirmed' | 'declined' }) => void;
  incomingPayload?: MeetupPayload;
}) {
  const [hang, setHang] = useState('coffee');
  const [day, setDay] = useState('today');
  const [time, setTime] = useState('afternoon');
  const [venue, setVenue] = useState('mug');

  const name = match?.name || 'them';
  const spark = mode === 'spark';
  
  const A = spark ? '#EA8CE1' : '#F97316';
  const Asoft = spark ? 'rgba(234,140,225,0.15)' : 'rgba(249,115,22,0.15)';
  const Aglow = spark ? '0 8px 24px rgba(234,140,225,0.25)' : '0 8px 24px rgba(249,115,22,0.25)';

  // Dynamic Venues
  const venues = (hang === 'listen' || hang === 'show') ? SHOW_VENUES : COFFEE_VENUES;
  if (!venues.find(v => v.id === venue)) {
    setVenue(venues[0].id);
  }

  // --- RECEIVED INVITE UI ---
  if (incomingPayload) {
    const h = HANGS.find(x => x.id === incomingPayload.hang);
    const d = DAYS.find(x => x.id === incomingPayload.day);
    const t = TIMES.find(x => x.id === incomingPayload.time);
    const vList = (incomingPayload.hang === 'listen' || incomingPayload.hang === 'show') ? SHOW_VENUES : COFFEE_VENUES;
    const v = vList.find(x => x.id === incomingPayload.venue);

    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
        <div onClick={onClose} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
          animation: 'fadeIn 220ms ease both',
        }} />
        <div style={{
          position: 'relative', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '32px 32px 0 0',
          backdropFilter: 'blur(50px) saturate(200%)', 
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 -20px 50px rgba(0,0,0,0.3)', 
          padding: '24px 24px 40px',
          animation: 'sheetUp 360ms cubic-bezier(.2,.7,.2,1) both',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            {'avatar' in match && match.avatar && (
              <img src={match.avatar} style={{ width: 44, height: 44, borderRadius: 99, border: '2px solid rgba(255,255,255,0.2)', objectFit: 'cover' }} alt="" />
            )}
            <div>
              <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E' }}>Meetup Invite</div>
              <div style={{ fontFamily: FF, fontWeight: 600, fontSize: 18, color: '#FFF', letterSpacing: '-0.01em' }}>{name} invited you to hang</div>
            </div>
          </div>

          {/* Plan Card */}
          <div style={{ 
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 20, padding: 20, marginBottom: 32 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 99, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Icon.Calendar width="18" height="18" />
              </div>
              <div>
                <div style={{ fontFamily: FF, fontWeight: 600, fontSize: 15, color: '#FFF' }}>{d?.label} {t?.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Time to be determined</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 99, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Icon.Music width="18" height="18" />
              </div>
              <div>
                <div style={{ fontFamily: FF, fontWeight: 600, fontSize: 15, color: '#FFF' }}>{h?.label} at {v?.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{v && 'meta' in v ? v.meta : 'Location set'}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => onSend({ status: 'confirmed' })} style={{
              width: '100%', height: 56, border: 0, borderRadius: 20, cursor: 'pointer',
              background: '#22C55E', color: '#fff',
              fontFamily: FF, fontWeight: 600, fontSize: 16,
              boxShadow: '0 8px 24px rgba(34,197,94,0.4)',
              transition: 'transform 0.15s cubic-bezier(.2,.7,.2,1)',
            }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Confirm Meetup
            </button>
            <button onClick={() => onSend({ status: 'declined' })} style={{
              width: '100%', height: 56, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, cursor: 'pointer',
              background: 'transparent', color: 'rgba(255,255,255,0.6)',
              fontFamily: FF, fontWeight: 600, fontSize: 15,
            }}>
              I can&apos;t make it
            </button>
          </div>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
      {/* Scrim */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
        animation: 'fadeIn 220ms ease both',
      }} />

      {/* Sheet */}
      <div style={{
        position: 'relative', 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: '32px 32px 0 0',
        backdropFilter: 'blur(50px) saturate(200%)', 
        WebkitBackdropFilter: 'blur(50px) saturate(200%)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.3)', 
        maxHeight: '90%', 
        display: 'flex', 
        flexDirection: 'column',
        animation: 'sheetUp 360ms cubic-bezier(.2,.7,.2,1) both',
      }}>
        {/* Grabber */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 44, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.25)' }} />
        </div>

        <div style={{ overflowY: 'auto', padding: '12px 24px 0', scrollbarWidth: 'none' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{
              fontFamily: FF, fontWeight: 700, fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: A,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: A, boxShadow: `0 0 12px ${A}` }} />
              {spark ? 'Plan a spark' : 'Plan a vibe'}
            </span>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 99, border: 0, cursor: 'pointer', background: 'rgba(255,255,255,0.1)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
              <Icon.Close width="16" height="16" />
            </button>
          </div>
          <h2 style={{ fontFamily: FF, fontWeight: 600, fontSize: 26, letterSpacing: '-0.02em', color: '#FFF', margin: '4px 0 2px' }}>
            {spark ? `Make a little spark with ${name}` : `Something low-key with ${name}`}
          </h2>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>We&apos;ll send {name} the invite — {spark ? 'a little spark, no pressure.' : 'friendly, no pressure.'} No DMs.</p>

          {/* Hang Type - Scrollable Pills */}
          <SheetLabel>What&apos;s the vibe</SheetLabel>
          <div style={{ 
            display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12, 
            scrollbarWidth: 'none', msOverflowStyle: 'none', margin: '0 -24px', padding: '0 24px 8px' 
          }}>
            {HANGS.map(h => {
              const sel = hang === h.id;
              return (
                <button key={h.id} onClick={() => setHang(h.id)} style={{
                  flexShrink: 0, padding: '10px 20px', cursor: 'pointer',
                  borderRadius: 99, 
                  background: sel ? A : 'rgba(255,255,255,0.06)',
                  border: '1px solid', borderColor: sel ? A : 'rgba(255,255,255,0.08)',
                  color: sel ? '#FFF' : 'rgba(255,255,255,0.7)', 
                  fontFamily: FF, fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em',
                  transition: 'all 0.2s cubic-bezier(.2,.7,.2,1)',
                  boxShadow: sel ? Aglow : 'none',
                }}>
                  {h.label}
                </button>
              );
            })}
          </div>

          {/* Timing - Two rows */}
          <SheetLabel>When</SheetLabel>
          
          {/* Day Row */}
          <div style={{ 
            display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, 
            scrollbarWidth: 'none', margin: '0 -24px', padding: '0 24px 10px' 
          }}>
            {DAYS.map(d => {
              const sel = day === d.id;
              return (
                <button key={d.id} onClick={() => setDay(d.id)} style={{
                  flexShrink: 0, padding: '8px 18px', cursor: 'pointer', borderRadius: 99,
                  background: sel ? '#FFF' : 'rgba(255,255,255,0.04)',
                  border: '1px solid', borderColor: sel ? '#FFF' : 'rgba(255,255,255,0.06)',
                  color: sel ? '#000' : 'rgba(255,255,255,0.7)',
                  fontFamily: FF, fontWeight: 600, fontSize: 13.5, letterSpacing: '-0.01em',
                  transition: 'all 0.2s cubic-bezier(.2,.7,.2,1)',
                }}>{d.label}</button>
              );
            })}
          </div>

          {/* Time Row */}
          <div style={{ 
            display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, 
            scrollbarWidth: 'none', margin: '0 -24px', padding: '0 24px 12px' 
          }}>
            {TIMES.map(t => {
              const sel = time === t.id;
              return (
                <button key={t.id} onClick={() => setTime(t.id)} style={{
                  flexShrink: 0, padding: '8px 16px', cursor: 'pointer', borderRadius: 12,
                  background: sel ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: '1px solid', borderColor: sel ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                  color: sel ? '#FFF' : 'rgba(255,255,255,0.5)',
                  fontFamily: FF, fontWeight: 600, fontSize: 13, letterSpacing: '-0.01em',
                  transition: 'all 0.2s cubic-bezier(.2,.7,.2,1)',
                }}>{t.label}</button>
              );
            })}
          </div>

          {/* Venues */}
          <SheetLabel>Where</SheetLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            {venues.map(v => {
              const sel = venue === v.id;
              return (
                <button key={v.id} onClick={() => setVenue(v.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                  borderRadius: 20, 
                  background: sel ? Asoft : 'rgba(255,255,255,0.04)',
                  border: '1px solid', borderColor: sel ? A : 'rgba(255,255,255,0.08)',
                  transition: 'all 0.2s cubic-bezier(.2,.7,.2,1)',
                  boxShadow: sel ? `inset 0 0 0 1px ${A}40` : 'none',
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 99, flexShrink: 0,
                    border: '1.5px solid', borderColor: sel ? A : 'rgba(255,255,255,0.2)',
                    background: sel ? A : 'transparent', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{sel && <Icon.Check width="14" height="14" />}</span>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FF, fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em', color: '#FFF' }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{v.meta}</div>
                  </div>
                  
                  {Boolean((v as any).perk) && (
                    <span style={{
                      background: (v as any).perkBg, color: (v as any).perkColor,
                      flexShrink: 0, fontFamily: FF, fontSize: 9.5, fontWeight: 700,
                      letterSpacing: '0.04em', textTransform: 'uppercase', padding: '6px 10px', borderRadius: 99, maxWidth: 100, lineHeight: 1.2, textAlign: 'center',
                      border: `1px solid ${(v as any).perkColor}30`,
                    }}>{(v as any).perk}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Send */}
        <div style={{ 
          padding: '16px 24px 28px', 
          paddingBottom: 'max(28px, env(safe-area-inset-bottom))', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)' 
        }}>
          <button onClick={() => onSend({ hang, day, time, venue })} style={{
            width: '100%', height: 58, border: 0, borderRadius: 20, cursor: 'pointer',
            background: A, color: '#fff',
            fontFamily: FF, fontWeight: 600, fontSize: 16, letterSpacing: '-0.005em',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: `0 8px 30px ${A}60`,
            transition: 'transform 0.15s cubic-bezier(.2,.7,.2,1)',
          }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            {spark ? 'Send your spark' : 'Send meetup invite'} →
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}
