"use client";

import React, { useEffect, useState } from 'react';
import { MockBackend, OrbitConnection, CONNECTIONS_UPDATE_EVENT } from '@/lib/mockBackend';
import { USERS } from '@/lib/users';
import { OrbitSheet } from '@/components/OrbitSheet';
import { isConnectionNightPreview } from '@/lib/revealConstants';

const FF = "'Bricolage Grotesque', sans-serif";

const SparkGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.5 4 1.5 5 5.5 5.5C13.5 9 12.5 10 12 14c-.5-4-1.5-5-5.5-5.5C10.5 8 11.5 7 12 3z" />
    <path d="M18.5 14.5c.3 2 .8 2.5 2.5 2.8-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.8z" />
  </svg>
);

function orbitSubtitle(connections: OrbitConnection[]) {
  if (connections.some((c) => c.action.type === 'meetup_invite' && c.direction === 'in')) {
    return 'You have pending invites';
  }
  if (connections.some((c) => c.action.type === 'spark')) {
    return 'Sparks and vibes from tonight';
  }
  return 'Your connections live here';
}

export function HomeOrbit({ activeUserId }: { activeUserId: string }) {
  const [connections, setConnections] = useState<OrbitConnection[]>([]);
  const [open, setOpen] = useState(false);
  const cnMode = isConnectionNightPreview();

  useEffect(() => {
    function update() {
      setConnections(MockBackend.getOrbitConnections(activeUserId));
    }
    update();
    window.addEventListener(CONNECTIONS_UPDATE_EVENT, update);
    return () => window.removeEventListener(CONNECTIONS_UPDATE_EVENT, update);
  }, [activeUserId]);

  if (!cnMode && connections.length === 0) return null;

  const recentAvatars = connections.slice(0, 3).map((c) => {
    const isSpark = c.action.type === 'spark';
    const isMutual = isSpark ? MockBackend.isMutualSpark(activeUserId, c.otherId) : true;
    const showMystery = isSpark && c.direction === 'in' && !isMutual;
    if (showMystery) return null;
    return USERS[c.otherId]?.avatar;
  }).filter(Boolean);

  return (
    <>
      <div style={{ padding: '0 22px', marginBottom: 8, marginTop: 4 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            width: '100%',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(160deg, rgba(7,9,12,0.96), rgba(22,19,15,0.92))',
            border: '1px solid rgba(234,140,225,0.22)',
            borderRadius: 20,
            cursor: 'pointer',
            textAlign: 'left',
            boxShadow: '0 12px 32px -14px rgba(234,140,225,0.28)',
          }}
        >
          <div>
            <div style={{
              fontFamily: FF, fontWeight: 700, fontSize: 15, color: '#FFF', marginBottom: 4,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Your Orbit
              {connections.length > 0 && (
                <span style={{
                  background: '#EA8CE1', color: '#0A0907', fontSize: 11, padding: '2px 8px',
                  borderRadius: 99, fontWeight: 700,
                }}>
                  {connections.length}
                </span>
              )}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.52)', fontFamily: FF, fontWeight: 600 }}>
              {connections.length > 0 ? orbitSubtitle(connections) : 'Opens after you vibe or spark tonight'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {recentAvatars.length > 0 ? recentAvatars.map((url, i) => (
              <img
                key={i}
                src={url as string}
                alt=""
                style={{
                  width: 34, height: 34, borderRadius: 99, border: '2px solid #14110D',
                  marginLeft: i > 0 ? -10 : 0, objectFit: 'cover',
                }}
              />
            )) : (
              <div style={{
                width: 34, height: 34, borderRadius: 99,
                background: 'rgba(234,140,225,0.14)', border: '1px solid rgba(234,140,225,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA8CE1',
              }}>
                <SparkGlyph />
              </div>
            )}
            <div style={{ marginLeft: 10, color: 'rgba(255,255,255,0.38)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {open && <OrbitSheet activeUserId={activeUserId} onClose={() => setOpen(false)} />}
    </>
  );
}
