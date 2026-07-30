"use client";
import React from 'react';
import { EventItem } from '../../lib/mockEventsData';

/** Fake iOS Live Activity / Dynamic Island expansion for demos. */
export function LiveActivityPill({
  event,
  onOpen,
  onDismiss,
}: {
  event: EventItem;
  onOpen?: () => void;
  onDismiss?: () => void;
}) {
  const when = event.time?.split('–')[0]?.trim() || event.time || 'Soon';
  const where = event.venue || event.host || 'Campus';

  return (
    <div
      style={{
        position: 'absolute',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 80,
        width: 'min(92%, 340px)',
        pointerEvents: 'auto',
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 12px 10px 10px',
          border: 'none',
          borderRadius: 24,
          background: '#0a0a0a',
          color: '#fff',
          boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
          cursor: onOpen ? 'pointer' : 'default',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            overflow: 'hidden',
            background: event.color || '#333',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {event.image || event.flyerUrl ? (
            <img src={event.image || event.flyerUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            event.hostAvatar || '·'
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>
            Live · Going
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2 }}>
            {event.name}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {when} · {where}
          </div>
        </div>
        {onDismiss && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onDismiss(); } }}
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              lineHeight: 1,
              color: 'rgba(255,255,255,0.7)',
              flexShrink: 0,
            }}
            aria-label="Dismiss"
          >
            ×
          </span>
        )}
      </button>
    </div>
  );
}
