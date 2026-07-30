import React, { useState } from 'react';
import { EventItem } from '../../lib/mockEventsData';
import { getGoingSocial } from '../../lib/eventSocialProof';
import { EVI } from './Icons';

function eventDayDate(e: EventItem): Date | null {
  if (e.parsedDate) {
    const d = new Date(e.parsedDate);
    if (!Number.isNaN(d.getTime())) return d;
  }
  if (e.day) {
    const d = new Date(e.day);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

function getDaysFromToday(e: EventItem): number | null {
  const d = eventDayDate(e);
  if (!d) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 3600 * 24));
}

function isLiveInvite(e: EventItem) {
  return e.publishStatus !== 'draft' && e.publishStatus !== 'planning';
}

/** Hosting is global on mock events — only count it for the actual creator. */
function isUpcomingForUser(e: EventItem, currentUserId?: string) {
  if (!isLiveInvite(e)) return false;
  const days = getDaysFromToday(e);
  // Keep undated events visible, but don't pretend they're "today"
  if (days !== null && days < -1) return false;

  if (e.currentUserStatus === 'going' || e.currentUserStatus === 'maybe') return true;
  if (e.currentUserStatus === 'hosting' && currentUserId && e.creatorId === currentUserId) return true;
  return false;
}

export function InvitesView({ 
  events, 
  onOpenEvent, 
  onAction,
  currentUserId,
}: { 
  events: EventItem[], 
  onOpenEvent: (id: string) => void,
  onAction: (id: string, action: 'going'|'maybe'|'declined'|null) => void,
  currentUserId?: string,
}) {
  const [showPast, setShowPast] = useState(false);
  const [editingResponseId, setEditingResponseId] = useState<string | null>(null);

  const getContextLine = (e: EventItem) => {
    return e.visibility === 'private' ? e.subtitle : e.host;
  };

  const pendingEvents = events
    .filter(e => e.currentUserStatus === 'pending' && isLiveInvite(e))
    .sort((a, b) => (eventDayDate(a)?.getTime() || 0) - (eventDayDate(b)?.getTime() || 0));

  const upcomingEvents = events
    .filter(e => isUpcomingForUser(e, currentUserId))
    .sort((a, b) => (eventDayDate(a)?.getTime() || 0) - (eventDayDate(b)?.getTime() || 0));

  const pastAndDeclinedEvents = events
    .filter(e => {
      const days = getDaysFromToday(e);
      if (e.currentUserStatus === 'declined') return true;
      if (
        (e.currentUserStatus === 'going' || e.currentUserStatus === 'maybe')
        && days !== null
        && days < -1
      ) return true;
      if (
        e.currentUserStatus === 'hosting'
        && currentUserId
        && e.creatorId === currentUserId
        && days !== null
        && days < -1
      ) return true;
      return false;
    })
    .sort((a, b) => (eventDayDate(b)?.getTime() || 0) - (eventDayDate(a)?.getTime() || 0));

  const renderEventRow = (e: EventItem, mode: 'pending' | 'upcoming' | 'past') => {
    const daysOut = getDaysFromToday(e);
    const showDaysOut = (mode === 'upcoming' || mode === 'pending') && daysOut !== null && daysOut >= 0;
    const social = mode === 'pending' ? getGoingSocial(e, currentUserId) : null;
    const isHosting = e.currentUserStatus === 'hosting' && e.creatorId === currentUserId;

    return (
      <div key={e.id} style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: 16, cursor: 'pointer', alignItems: 'center' }} onClick={() => onOpenEvent(e.id)}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: e.image ? `url(${e.image}) center/cover` : (e.hostAvatarColor || '#eee'), flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 500 }}>
            {!e.image && e.hostAvatar}
          </div>
          
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 4 }}>
              {e.title || e.name}
            </div>
            
            <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {getContextLine(e)}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: '#444' }}>
              {e.date || e.day}
              {e.visibility === 'private' && (
                <>
                  <span style={{ color: 'rgba(20,17,13,0.3)' }}>·</span>
                  <span style={{ color: 'rgba(20,17,13,0.5)' }}>Private</span>
                </>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            {showDaysOut && (
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ligo-orange)', whiteSpace: 'nowrap' }}>
                {daysOut === 0 ? 'Today' : `in ${daysOut} day${daysOut !== 1 ? 's' : ''}`}
              </div>
            )}
            
            {mode === 'upcoming' && editingResponseId !== e.id && (
              <button 
                onClick={(e_event) => { e_event.stopPropagation(); setEditingResponseId(e.id); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 16,
                  background: e.currentUserStatus === 'going' || isHosting ? 'rgba(249,115,22,0.1)' : 'transparent',
                  border: e.currentUserStatus === 'going' || isHosting ? '1px solid rgba(249,115,22,0.2)' : '1px solid rgba(0,0,0,0.15)',
                  color: e.currentUserStatus === 'going' || isHosting ? 'var(--ligo-orange)' : '#444',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer'
                }}
              >
                {isHosting ? 'Hosting' : e.currentUserStatus === 'going' ? 'Going ✓' : 'Maybe'}
              </button>
            )}
          </div>
        </div>

        {mode === 'pending' && social && social.going > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, paddingLeft: 80 }}>
            {social.faces.length > 0 && (
              <div style={{ display: 'flex', flexShrink: 0 }}>
                {social.faces.slice(0, 3).map((f, i) => (
                  <img
                    key={f.id}
                    src={f.avatar}
                    alt=""
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid #fff',
                      marginLeft: i === 0 ? 0 : -7,
                      position: 'relative',
                      zIndex: 3 - i,
                      background: '#eee',
                    }}
                  />
                ))}
              </div>
            )}
            <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(20,17,13,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {social.label}
            </div>
          </div>
        )}

        {/* Action Controls */}
        {mode === 'pending' || editingResponseId === e.id ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { onAction(e.id, 'declined'); setEditingResponseId(null); }} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', background: 'transparent', fontSize: 14, fontWeight: 500, color: '#444', cursor: 'pointer' }}>Decline</button>
              <button onClick={() => { onAction(e.id, 'maybe'); setEditingResponseId(null); }} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', background: 'transparent', fontSize: 14, fontWeight: 500, color: '#444', cursor: 'pointer' }}>Maybe</button>
              <button onClick={() => { onAction(e.id, 'going'); setEditingResponseId(null); }} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', background: 'var(--ligo-orange)', fontSize: 14, fontWeight: 500, color: '#fff', cursor: 'pointer' }}>Going</button>
            </div>
            {e.currentUserStatus && (
              <button onClick={() => { onAction(e.id, null); setEditingResponseId(null); }} style={{ background: 'none', border: 'none', color: '#888', fontSize: 13, fontWeight: 500, cursor: 'pointer', alignSelf: 'center', padding: '4px 8px' }}>
                Undo RSVP
              </button>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="screen-fade" style={{ paddingBottom: 120 }}>
      {/* 1. Needs Response */}
      {pendingEvents.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ padding: '24px 20px 8px', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
            Needs Response
          </div>
          {pendingEvents.map(e => renderEventRow(e, 'pending'))}
        </div>
      )}

      {/* 2. Upcoming */}
      {upcomingEvents.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ padding: '24px 20px 8px', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
            Upcoming
          </div>
          {upcomingEvents.map(e => renderEventRow(e, 'upcoming'))}
        </div>
      )}

      {/* 3. Past & Declined */}
      {pastAndDeclinedEvents.length > 0 && (
        <div>
          <div 
            onClick={() => setShowPast(!showPast)}
            style={{ padding: '16px 20px', fontSize: 14, fontWeight: 500, color: 'rgba(20,17,13,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: showPast ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
          >
            Past & declined ({pastAndDeclinedEvents.length})
            <div style={{ transform: showPast ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</div>
          </div>
          {showPast && (
            <div className="stagger-fade-in">
              {pastAndDeclinedEvents.map(e => renderEventRow(e, 'past'))}
            </div>
          )}
        </div>
      )}
      
      {pendingEvents.length === 0 && upcomingEvents.length === 0 && pastAndDeclinedEvents.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: 'rgba(20,17,13,0.4)', fontSize: 15, fontWeight: 500 }}>
          No events found.
        </div>
      )}
    </div>
  );
}
