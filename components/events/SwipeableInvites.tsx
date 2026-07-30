import React, { useState, useMemo, useEffect } from 'react';
import { EventItem } from '../../lib/mockEventsData';
import { getGoingSocial } from '../../lib/eventSocialProof';
import { EVI } from './Icons';

export function SwipeableInvites({
  invites,
  hidden,
  onComplete,
  onClose,
  onRsvp,
  onViewDetails,
  currentUserId,
}: {
  invites: EventItem[];
  hidden?: boolean;
  onComplete: () => void;
  onClose: () => void;
  onRsvp: (id: string, action: 'going' | 'declined') => void;
  onViewDetails?: (id: string) => void;
  currentUserId?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const sortedInvites = useMemo(() => {
    return [...invites].sort((a, b) => {
      const daysA = a.relativeDays ?? 999;
      const daysB = b.relativeDays ?? 999;
      return daysA - daysB;
    });
  }, [invites]);

  if (sortedInvites.length === 0 || currentIndex >= sortedInvites.length) {
    onComplete();
    return null;
  }

  const currentInvite = sortedInvites[currentIndex];

  const handleAction = (action: 'going' | 'declined') => {
    onRsvp(currentInvite.id, action);
    if (currentIndex === sortedInvites.length - 1) {
      setTimeout(onComplete, 300);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: isMounted ? 'rgba(20,17,13,0.6)' : 'rgba(20,17,13,0)',
      backdropFilter: isMounted ? 'blur(16px)' : 'blur(0px)',
      WebkitBackdropFilter: isMounted ? 'blur(16px)' : 'blur(0px)',
      opacity: isMounted ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 100,
      display: hidden ? 'none' : 'flex',
      flexDirection: 'column',
      padding: 'max(env(safe-area-inset-top, 40px), 40px) 20px max(env(safe-area-inset-bottom, 40px), 40px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexShrink: 0 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Needs Response ({currentIndex + 1} of {sortedInvites.length})
        </div>
        <button
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: 32, height: 32, borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <EVI.Close style={{ width: 14, height: 14 }} />
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative', minHeight: 0, marginBottom: 16 }}>
        {sortedInvites.slice(currentIndex).reverse().map((invite, reverseIndex) => {
          const isTop = reverseIndex === sortedInvites.length - 1 - currentIndex;
          const scale = isTop ? 1 : 0.95 - (reverseIndex * 0.05);
          const baseOffset = isTop ? 0 : 16 + (reverseIndex * 8);
          const yOffset = isMounted ? baseOffset : baseOffset + 60;

          if (!isTop && reverseIndex > 2) return null;

          const isGroupInvite = invite.type === 'group_invite';
          const social = getGoingSocial(invite, currentUserId);

          return (
            <div
              key={invite.id}
              onClick={() => {
                if (isTop && onViewDetails) onViewDetails(invite.id);
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#fff',
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                transform: `scale(${scale}) translateY(${yOffset}px)`,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isTop ? '0 24px 48px rgba(0,0,0,0.2)' : 'none',
                opacity: isTop ? 1 : 0.8,
                zIndex: isTop ? 10 : 1,
                overflow: 'hidden',
                cursor: isTop ? 'pointer' : 'default',
              }}
            >
              <div style={{ opacity: isTop ? 1 : 0, transition: 'opacity 0.2s', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
                {isGroupInvite ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
                    <div style={{ width: 120, height: 120, borderRadius: '50%', background: invite.hostAvatarColor || 'var(--orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 500, marginBottom: 24 }}>
                      {invite.hostAvatar || invite.host.substring(0, 2).toUpperCase()}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 500, color: 'var(--ink)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 12 }}>
                      {invite.host}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(20,17,13,0.6)' }}>
                      Invites you to join the organization.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Flyer — capped so meta + social proof always fit */}
                    {/* Flyer fills leftover space; meta stays compact at bottom */}
                    <div style={{
                      width: '100%',
                      flex: 1,
                      minHeight: 0,
                      background: invite.image ? '#111' : (invite.color || 'var(--orange)'),
                      position: 'relative',
                    }}>
                      {invite.image && (
                        <img src={invite.image} alt={invite.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      {invite.relativeDays !== undefined && (
                        <div style={{ position: 'absolute', top: 16, right: 16, background: '#fff', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>
                          {invite.relativeDays === 0 ? 'Today' : `In ${invite.relativeDays} days`}
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '14px 20px 16px', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <h2 style={{ fontSize: 26, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>
                        {invite.name || invite.title}
                      </h2>
                      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Invited by {invite.hostName || invite.host}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(20,17,13,0.55)' }}>
                        {invite.dateLabel || invite.day}{invite.time ? ` · ${invite.time}` : ''}
                      </div>

                      <div style={{
                        marginTop: 6,
                        paddingTop: 10,
                        borderTop: '1px solid rgba(20,17,13,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}>
                        {social.faces.length > 0 && (
                          <div style={{ display: 'flex', flexShrink: 0 }}>
                            {social.faces.map((f, i) => (
                              <img
                                key={f.id}
                                src={f.avatar}
                                alt={f.shortName}
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: '2px solid #fff',
                                  marginLeft: i === 0 ? 0 : -9,
                                  position: 'relative',
                                  zIndex: social.faces.length - i,
                                  background: '#eee',
                                }}
                              />
                            ))}
                          </div>
                        )}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.25 }}>
                            {social.label}
                          </div>
                          {social.connectionCount > 0 && social.going > 0 && (
                            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(20,17,13,0.45)', marginTop: 1 }}>
                              {social.connectionsLabel}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 16, flexShrink: 0, position: 'relative', zIndex: 20 }}>
        <button
          onClick={() => handleAction('declined')}
          style={{ flex: 1, padding: 20, borderRadius: 40, background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          Pass
        </button>
        <button
          onClick={() => handleAction('going')}
          style={{ flex: 1, padding: 20, borderRadius: 40, background: '#fff', color: 'var(--ink)', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
        >
          {currentInvite.type === 'group_invite' ? 'Join' : "I'm In"}
        </button>
      </div>
    </div>
  );
}
