"use client";

import React, { useEffect, useState } from 'react';
import { MockBackend, ConnectionAction } from '@/lib/mockBackend';
import { USERS } from '@/lib/users';
import { MeetupSupportSheet } from '@/components/reveal/MeetupSupportSheet';

const FF = "'Bricolage Grotesque', sans-serif";

export function HomeOrbit({ activeUserId }: { activeUserId: string }) {
  const [connections, setConnections] = useState<ConnectionAction[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setConnections(MockBackend.getIncomingConnections(activeUserId));
    }
    update();
    window.addEventListener('ligo:global:connections:update', update);
    return () => window.removeEventListener('ligo:global:connections:update', update);
  }, [activeUserId]);

  if (connections.length === 0) return null;

  return (
    <div style={{ marginTop: 12, marginBottom: 12 }}>
      <div style={{ padding: '0 24px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: FF, fontWeight: 700, fontSize: 15, color: '#FFF', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Your Orbit</h2>
        <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 99 }}>{connections.length} NEW</span>
      </div>

      <div style={{ 
        display: 'flex', gap: 16, overflowX: 'auto', padding: '0 24px 12px', 
        scrollbarWidth: 'none', msOverflowStyle: 'none' 
      }}>
        {connections.map(c => {
          const user = USERS[c.fromId];
          if (!user) return null;

          const isSpark = c.type === 'spark';
          const isMeetup = c.type === 'meetup_invite';
          const isMutual = isSpark ? MockBackend.isMutualSpark(activeUserId, c.fromId) : true;
          const showMystery = isSpark && !isMutual;

          const ringColor = isMeetup ? '#22C55E' : (isSpark ? '#EA8CE1' : '#F97316');
          
          return (
            <div key={c.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0, width: 64 }}>
              <button 
                onClick={() => setSelectedMatch({
                   id: c.fromId, name: showMystery ? 'Someone' : user.name, 
                   avatar: user.avatar, isMystery: showMystery, mode: isSpark ? 'spark' : 'vibe'
                })}
                style={{
                  width: 68, height: 68, borderRadius: 99, padding: 0, cursor: 'pointer',
                  border: `2.5px solid ${ringColor}`,
                  background: showMystery ? 'rgba(234,140,225,0.1)' : `url(${user.avatar}) center/cover`,
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {showMystery && <span style={{ fontSize: 24, filter: 'drop-shadow(0 0 10px rgba(234,140,225,0.8))' }}>✨</span>}
                {isMeetup && !showMystery && (
                  <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#22C55E', width: 22, height: 22, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0A0907' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                )}
              </button>
              <span style={{ fontFamily: FF, fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textAlign: 'center', letterSpacing: '-0.01em' }}>
                {showMystery ? 'Mystery' : user.name}
              </span>
            </div>
          );
        })}
      </div>

      {selectedMatch && (
        <MeetupSupportSheet 
          match={selectedMatch}
          mode={selectedMatch.mode}
          onClose={() => setSelectedMatch(null)}
          onSend={() => {
            MockBackend.recordAction(activeUserId, selectedMatch.id, 'meetup_invite');
            setSelectedMatch(null);
            setToastMsg(`Invite sent to ${selectedMatch.name}.`);
            setTimeout(() => setToastMsg(null), 3000);
          }}
        />
      )}

      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 200,
          background: '#22C55E', color: '#fff', padding: '12px 20px', borderRadius: 99,
          fontFamily: FF, fontWeight: 600, fontSize: 14, boxShadow: '0 8px 24px rgba(34,197,94,0.4)',
          animation: 'fadeIn 0.2s ease', pointerEvents: 'none', whiteSpace: 'nowrap'
        }}>
          {toastMsg}
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
