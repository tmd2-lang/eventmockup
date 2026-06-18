"use client";

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/Primitives';
import { MockBackend, ConnectionAction } from '@/lib/mockBackend';
import { USERS } from '@/lib/users';
import { MeetupSupportSheet } from '@/components/reveal/MeetupSupportSheet';

const FF = "'Bricolage Grotesque', sans-serif";

export function OrbitSheet({ activeUserId, onClose }: { activeUserId: string; onClose: () => void }) {
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

  const handleReset = () => {
    MockBackend.clearAll();
    onClose();
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 90, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
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
        height: '85%', 
        display: 'flex', 
        flexDirection: 'column',
        animation: 'sheetUp 360ms cubic-bezier(.2,.7,.2,1) both',
      }}>
        {/* Grabber */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 44, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.25)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px' }}>
          <h2 style={{ fontFamily: FF, fontWeight: 600, fontSize: 24, color: '#FFF', letterSpacing: '-0.02em', margin: 0 }}>Your Orbit</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 99, border: 0, cursor: 'pointer', background: 'rgba(255,255,255,0.1)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.Close width="16" height="16" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {connections.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60, color: 'rgba(255,255,255,0.4)', fontFamily: FF, fontSize: 15 }}>
              Your orbit is empty.<br/>Go check out tonight&apos;s reveal!
            </div>
          ) : (
            connections.map(c => {
              const user = USERS[c.fromId];
              if (!user) return null;

              const isSpark = c.type === 'spark';
              const isMeetup = c.type === 'meetup_invite';
              const isConfirmed = c.type === 'meetup_confirmed';
              const isMutual = isSpark ? MockBackend.isMutualSpark(activeUserId, c.fromId) : true;
              const showMystery = isSpark && !isMutual;

              const ringColor = isConfirmed ? '#FACC15' : (isMeetup ? '#22C55E' : (isSpark ? '#EA8CE1' : '#F97316'));

              return (
                <button 
                  key={c.id}
                  onClick={() => {
                    // Only open sheet if it's not a pending sent spark (where we just wait for them)
                    if (!showMystery) {
                      setSelectedMatch({
                        id: c.fromId, name: user.name, 
                        avatar: user.avatar, isMystery: showMystery, mode: isSpark ? 'spark' : c.type,
                        payload: c.payload
                      });
                    }
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24, cursor: showMystery ? 'default' : 'pointer', textAlign: 'left',
                    transition: 'transform 0.1s',
                  }}
                  onMouseDown={e => { if(!showMystery) e.currentTarget.style.transform = 'scale(0.98)' }}
                  onMouseUp={e => { if(!showMystery) e.currentTarget.style.transform = 'scale(1)' }}
                  onMouseLeave={e => { if(!showMystery) e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: 99, flexShrink: 0,
                    border: `2px solid ${ringColor}`,
                    background: `url(${user.avatar}) center/cover`,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {showMystery && (
                      <div style={{
                        position: 'absolute', inset: -4, backdropFilter: 'blur(8px)',
                        background: 'linear-gradient(135deg, rgba(234,140,225,0.4), rgba(0,0,0,0.8))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <svg width="24" height="24" color="#FFF" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3c.5 4 1.5 5 5.5 5.5C13.5 9 12.5 10 12 14c-.5-4-1.5-5-5.5-5.5C10.5 8 11.5 7 12 3z" />
                          <path d="M18.5 14.5c.3 2 .8 2.5 2.5 2.8-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 16, color: '#FFF', marginBottom: 4 }}>
                      {showMystery ? 'Mystery Spark' : user.name}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                      {isConfirmed ? 'Meetup confirmed! 🎉' : 
                       isMeetup ? 'Invited you to hang' :
                       isSpark ? (showMystery ? 'Waiting for your spark...' : 'Mutual Spark ✨') : 
                       'Sent you a vibe'}
                    </div>
                  </div>

                  {(!isConfirmed && !isSpark && !showMystery) && (
                    <div style={{
                      padding: '8px 16px', background: ringColor, color: '#000',
                      borderRadius: 99, fontFamily: FF, fontWeight: 700, fontSize: 12
                    }}>
                      View
                    </div>
                  )}
                  {(isConfirmed) && (
                    <div style={{
                      padding: '8px 16px', background: ringColor, color: '#000',
                      borderRadius: 99, fontFamily: FF, fontWeight: 700, fontSize: 12
                    }}>
                      Details
                    </div>
                  )}
                  {isSpark && !showMystery && (
                     <div style={{
                        padding: '8px 16px', background: ringColor, color: '#000',
                        borderRadius: 99, fontFamily: FF, fontWeight: 700, fontSize: 12
                      }}>
                        Plan
                      </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleReset} style={{
            padding: '12px 24px', background: 'rgba(239,68,68,0.1)', color: '#EF4444',
            border: '1px solid rgba(239,68,68,0.3)', borderRadius: 99,
            fontFamily: FF, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}>
            Reset Universe
          </button>
        </div>
      </div>

      {selectedMatch && (
        <MeetupSupportSheet 
          match={selectedMatch}
          mode={selectedMatch.mode}
          incomingPayload={selectedMatch.mode === 'meetup_invite' ? selectedMatch.payload : undefined}
          onClose={() => setSelectedMatch(null)}
          onSend={(payload) => {
            if (selectedMatch.mode === 'meetup_invite') {
              const statusPayload = payload as { status: 'confirmed' | 'declined' };
              if (statusPayload.status === 'confirmed') {
                MockBackend.recordAction(activeUserId, selectedMatch.id, 'meetup_confirmed');
                setToastMsg(`Meetup confirmed with ${selectedMatch.name}!`);
              } else {
                setToastMsg(`You declined the invite.`);
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
          background: toastMsg.includes('confirmed') ? '#FACC15' : '#22C55E', color: toastMsg.includes('confirmed') ? '#000' : '#fff', padding: '12px 20px', borderRadius: 99,
          fontFamily: FF, fontWeight: 600, fontSize: 14, boxShadow: toastMsg.includes('confirmed') ? '0 8px 24px rgba(250,204,21,0.4)' : '0 8px 24px rgba(34,197,94,0.4)',
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
