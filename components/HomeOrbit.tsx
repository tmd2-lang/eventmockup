"use client";

import React, { useEffect, useState } from 'react';
import { MockBackend, ConnectionAction } from '@/lib/mockBackend';
import { USERS } from '@/lib/users';
import { OrbitSheet } from '@/components/OrbitSheet';
import { Icon } from '@/components/Primitives';

const FF = "'Bricolage Grotesque', sans-serif";

export function HomeOrbit({ activeUserId }: { activeUserId: string }) {
  const [connections, setConnections] = useState<ConnectionAction[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function update() {
      setConnections(MockBackend.getIncomingConnections(activeUserId));
    }
    update();
    window.addEventListener('ligo:global:connections:update', update);
    return () => window.removeEventListener('ligo:global:connections:update', update);
  }, [activeUserId]);

  if (connections.length === 0) return null;

  // Grab the 3 most recent avatars to display
  const recentAvatars = connections.slice(0, 3).map(c => {
    const isSpark = c.type === 'spark';
    const isMutual = isSpark ? MockBackend.isMutualSpark(activeUserId, c.fromId) : true;
    const showMystery = isSpark && !isMutual;
    
    if (showMystery) return null; // We skip mysteries in the stacked avatars or handle them differently
    return USERS[c.fromId]?.avatar;
  }).filter(Boolean);

  return (
    <>
      <div style={{ padding: '0 24px', marginBottom: 24, marginTop: 12 }}>
        <button onClick={() => setOpen(true)} style={{
          width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24, cursor: 'pointer', textAlign: 'left',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(20px)',
          transition: 'transform 0.15s cubic-bezier(.2,.7,.2,1)',
        }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <div>
            <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 16, color: '#FFF', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              Your Orbit
              <span style={{
                background: '#F97316', color: '#FFF', fontSize: 11, padding: '2px 8px', borderRadius: 99,
                fontWeight: 700
              }}>
                {connections.length}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              {connections.some(c => c.type === 'meetup_invite') ? 'You have pending invites' : 'New connections await'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {recentAvatars.map((url, i) => (
              <img key={i} src={url as string} style={{
                width: 36, height: 36, borderRadius: 99, border: '2px solid #1A1A1A',
                marginLeft: i > 0 ? -12 : 0, objectFit: 'cover'
              }} alt="" />
            ))}
            {recentAvatars.length === 0 && (
              <div style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,0.1)', border: '2px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" color="#EA8CE1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c.5 4 1.5 5 5.5 5.5C13.5 9 12.5 10 12 14c-.5-4-1.5-5-5.5-5.5C10.5 8 11.5 7 12 3z" />
                  <path d="M18.5 14.5c.3 2 .8 2.5 2.5 2.8-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.8z" />
                </svg>
              </div>
            )}
            <div style={{ marginLeft: 12, color: 'rgba(255,255,255,0.4)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </button>
      </div>

      {open && <OrbitSheet activeUserId={activeUserId} onClose={() => setOpen(false)} />}
    </>
  );
}
