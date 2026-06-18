"use client";

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/Primitives';
import { MockBackend, OrbitConnection } from '@/lib/mockBackend';
import { USERS } from '@/lib/users';
import { MeetupSupportSheet, type MeetupPayload } from '@/components/reveal/MeetupSupportSheet';
import { resetConnectionNightDemo } from '@/lib/connectionDemoReset';
import { CONNECTIONS_UPDATE_EVENT } from '@/lib/mockBackend';

const FF = "'Bricolage Grotesque', sans-serif";

const SparkGlyph = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.5 4 1.5 5 5.5 5.5C13.5 9 12.5 10 12 14c-.5-4-1.5-5-5.5-5.5C10.5 8 11.5 7 12 3z" />
    <path d="M18.5 14.5c.3 2 .8 2.5 2.5 2.8-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.8z" />
  </svg>
);

function rowLabel(c: OrbitConnection, activeUserId: string) {
  const isSpark = c.action.type === 'spark';
  const isMeetup = c.action.type === 'meetup_invite';
  const isConfirmed = c.action.type === 'meetup_confirmed';
  const isMutual = isSpark ? MockBackend.isMutualSpark(activeUserId, c.otherId) : true;
  const showMystery = isSpark && c.direction === 'in' && !isMutual;

  if (isConfirmed) return { title: USERS[c.otherId]?.name ?? c.otherId, sub: 'Meetup confirmed', showMystery: false, isMutual: true };
  if (isMeetup) return { title: USERS[c.otherId]?.name ?? c.otherId, sub: 'Invited you to hang', showMystery: false, isMutual: true };
  if (isSpark && showMystery) return { title: 'Mystery Spark', sub: 'Someone sparked you — spark back to reveal', showMystery: true, isMutual: false };
  if (isSpark && c.direction === 'out' && !isMutual) {
    return { title: USERS[c.otherId]?.name ?? c.otherId, sub: 'Spark sent — waiting for them', showMystery: false, isMutual: false };
  }
  if (isSpark) return { title: USERS[c.otherId]?.name ?? c.otherId, sub: 'Mutual Spark', showMystery: false, isMutual: true };
  return { title: USERS[c.otherId]?.name ?? c.otherId, sub: c.direction === 'in' ? 'Sent you a vibe' : 'You vibed them', showMystery: false, isMutual: true };
}

export function OrbitSheet({ activeUserId, onClose }: { activeUserId: string; onClose: () => void }) {
  const [connections, setConnections] = useState<OrbitConnection[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{
    id: string;
    name: string;
    avatar?: string;
    mode: 'vibe' | 'spark' | 'meetup_invite' | 'meetup_confirmed';
    payload?: unknown;
  } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setConnections(MockBackend.getOrbitConnections(activeUserId));
    }
    update();
    window.addEventListener(CONNECTIONS_UPDATE_EVENT, update);
    return () => window.removeEventListener(CONNECTIONS_UPDATE_EVENT, update);
  }, [activeUserId]);

  const handleReset = () => {
    resetConnectionNightDemo();
    window.location.reload();
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 90, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
          animation: 'fadeIn 220ms ease both',
        }}
      />

      <div style={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(18,16,22,0.98), rgba(10,9,12,0.99))',
        borderRadius: '28px 28px 0 0',
        borderTop: '1px solid rgba(234,140,225,0.2)',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.45)',
        height: '85%',
        display: 'flex',
        flexDirection: 'column',
        animation: 'sheetUp 360ms cubic-bezier(.2,.7,.2,1) both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 44, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.22)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px' }}>
          <h2 style={{ fontFamily: FF, fontWeight: 600, fontSize: 24, color: '#FFF', letterSpacing: '-0.02em', margin: 0 }}>Your Orbit</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 99, border: 0, cursor: 'pointer',
              background: 'rgba(255,255,255,0.1)', color: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon.Close width="16" height="16" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {connections.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60, color: 'rgba(255,255,255,0.42)', fontFamily: FF, fontSize: 15, lineHeight: 1.6 }}>
              Your orbit is empty.<br />Vibe or spark someone in tonight&apos;s reveal.
            </div>
          ) : (
            connections.map((c) => {
              const user = USERS[c.otherId];
              if (!user) return null;

              const { title, sub, showMystery, isMutual } = rowLabel(c, activeUserId);
              const isSpark = c.action.type === 'spark';
              const isMeetup = c.action.type === 'meetup_invite';
              const isConfirmed = c.action.type === 'meetup_confirmed';
              const ringColor = isConfirmed ? '#FACC15' : (isMeetup ? '#22C55E' : (isSpark ? '#EA8CE1' : '#F97316'));
              const canOpen = !showMystery;

              return (
                <button
                  key={`${c.otherId}-${c.direction}`}
                  type="button"
                  onClick={() => {
                    if (!canOpen) return;
                    setSelectedMatch({
                      id: c.otherId,
                      name: user.name,
                      avatar: user.avatar,
                      mode: (isSpark ? 'spark' : c.action.type) as 'vibe' | 'spark' | 'meetup_invite' | 'meetup_confirmed',
                      payload: c.action.payload,
                    });
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, cursor: canOpen ? 'pointer' : 'default', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 58, height: 58, borderRadius: 99, flexShrink: 0,
                    border: `2px solid ${ringColor}`,
                    background: showMystery
                      ? 'linear-gradient(145deg, #4A1F52, #120A18)'
                      : `url(${user.avatar}) center/cover`,
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {showMystery ? (
                      <div style={{ color: '#F5D0F0' }}>
                        <SparkGlyph />
                      </div>
                    ) : null}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 16, color: '#FFF', marginBottom: 3 }}>
                      {title}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', fontFamily: FF, fontWeight: 600 }}>
                      {sub}
                    </div>
                  </div>

                  {canOpen && !isConfirmed && (
                    <div style={{
                      padding: '7px 14px', background: ringColor, color: '#0A0907',
                      borderRadius: 99, fontFamily: FF, fontWeight: 700, fontSize: 11,
                    }}>
                      {isSpark && isMutual ? 'Plan' : 'View'}
                    </div>
                  )}
                  {isConfirmed && (
                    <div style={{
                      padding: '7px 14px', background: ringColor, color: '#0A0907',
                      borderRadius: 99, fontFamily: FF, fontWeight: 700, fontSize: 11,
                    }}>
                      Details
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div style={{ padding: '20px 24px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '12px 24px', background: 'rgba(239,68,68,0.1)', color: '#EF4444',
              border: '1px solid rgba(239,68,68,0.3)', borderRadius: 99,
              fontFamily: FF, fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}
          >
            Reset CN Demo
          </button>
        </div>
      </div>

      {selectedMatch && (
        <MeetupSupportSheet
          match={selectedMatch}
          mode={selectedMatch.mode}
          incomingPayload={selectedMatch.mode === 'meetup_invite' ? selectedMatch.payload as MeetupPayload | undefined : undefined}
          onClose={() => setSelectedMatch(null)}
          onSend={(payload) => {
            if (selectedMatch.mode === 'meetup_invite') {
              const statusPayload = payload as { status: 'confirmed' | 'declined' };
              if (statusPayload.status === 'confirmed') {
                MockBackend.recordAction(activeUserId, selectedMatch.id, 'meetup_confirmed');
                setToastMsg(`Meetup confirmed with ${selectedMatch.name}!`);
              } else {
                setToastMsg('You declined the invite.');
              }
            } else {
              MockBackend.recordAction(activeUserId, selectedMatch.id, 'meetup_invite', payload);
              setToastMsg(`Invite sent to ${selectedMatch.name}.`);
            }
            setSelectedMatch(null);
            setTimeout(() => setToastMsg(null), 3000);
          }}
        />
      )}

      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 200,
          background: toastMsg.includes('confirmed') ? '#FACC15' : '#22C55E',
          color: toastMsg.includes('confirmed') ? '#000' : '#fff',
          padding: '12px 20px', borderRadius: 99,
          fontFamily: FF, fontWeight: 600, fontSize: 14,
          animation: 'fadeIn 0.2s ease', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}
        >
          {toastMsg}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
