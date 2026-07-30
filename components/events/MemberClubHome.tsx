"use client";
import React, { useState } from 'react';
import { Organization, EventItem, OrganizationMember, SIGEP_ROSTER } from '../../lib/mockEventsData';
import { GPB_MEMBER_GROUPS, GPB_ROSTER } from '../../lib/gpbRoster';
import { USERS } from '../../lib/users';
import { EVI } from './Icons';

const MOCK_CHAT = [
  { id: 1, sender: 'Cole B.', userId: 'cole', text: 'Are we doing a pregame for the neon party?', isMe: false, time: '2:30 PM' },
  { id: 2, sender: 'Bennett R.', userId: 'bennett', text: 'Yeah I think exec is hosting at the townhouse', isMe: false, time: '2:35 PM' },
  { id: 3, sender: 'Me', userId: null, text: 'Should we bring anything?', isMe: true, time: '2:36 PM' },
  { id: 4, sender: 'Jordan D.', userId: 'jordan', text: 'Just bring yourselves, we have plenty of drinks left from last week', isMe: false, time: '2:40 PM' },
];

function matchRosterUser(m: OrganizationMember | { email: string; name?: string }) {
  if (m.name === 'Cole Brennan' || m.email === 'cole.brennan@georgetown.edu') return USERS.cole;
  if (m.name === 'Jordan Davis' || m.email === 'jordand@georgetown.edu') return USERS.jordan;
  if (m.email === 'marcust@georgetown.edu') return USERS.marcus;
  if (m.email === 'coleb@georgetown.edu') return USERS.cole;
  if (m.email === 'bennettr@georgetown.edu') return USERS.bennett;
  return undefined;
}

export function MemberClubHome({
  org,
  events,
  currentUserRole = 'member',
  onBack,
  onOpenEvent,
  onOpenManage,
}: {
  org: Organization;
  events: EventItem[];
  currentUserRole?: string;
  onBack: () => void;
  onOpenEvent?: (id: string) => void;
  onOpenManage?: () => void;
}) {
  const [tab, setTab] = useState<'chat' | 'events' | 'people'>('chat');
  const [draft, setDraft] = useState('');
  const [history, setHistory] = useState(MOCK_CHAT);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [rsvps, setRsvps] = useState<Record<string, 'going' | 'maybe' | null>>({});

  const isOrganizer = ['admin', 'officer', 'social_chair'].includes(currentUserRole);
  const roleLabel = currentUserRole.replace('_', ' ');

  const orgEvents = events.filter(e => e.hostOrganizationId === org.id);
  const membersOnly = orgEvents.filter(e => e.visibility === 'members_only');
  const publicHosted = orgEvents.filter(e => e.visibility !== 'members_only');

  const send = () => {
    if (!draft.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setHistory(prev => [...prev, { id: Date.now(), sender: 'Me', userId: null, text: draft.trim(), isMe: true, time }]);
    setDraft('');
  };

  const tabBtn = (id: typeof tab, label: string) => (
    <button
      key={id}
      onClick={() => setTab(id)}
      style={{
        flex: 1,
        paddingBottom: 12,
        border: 'none',
        borderBottom: tab === id ? '2px solid var(--ink)' : '2px solid transparent',
        background: 'none',
        fontSize: 13,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: tab === id ? 'var(--ink)' : 'rgba(20,17,13,0.4)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="screen-fade" style={{ background: 'var(--ligo-paper)', minHeight: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Identity header — club home, not ops dashboard */}
      <div style={{ padding: 'max(env(safe-area-inset-top, 56px), 56px) 20px 20px', borderBottom: '1px solid rgba(20,17,13,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <button onClick={onBack} aria-label="Back" style={{ background: 'rgba(20,17,13,0.06)', color: 'var(--ink)', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <EVI.Back />
          </button>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', flexShrink: 0 }}>
            {org.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orange)', marginBottom: 4 }}>
              Members only
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
              {org.name}
            </h1>
            <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.55)', marginTop: 6, fontWeight: 500 }}>
              {org.memberCount} members · You&apos;re a {roleLabel}
            </div>
          </div>
        </div>

        {isOrganizer && onOpenManage && (
          <button
            onClick={onOpenManage}
            style={{
              marginTop: 16,
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: '1px solid rgba(20,17,13,0.12)',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Open event ops</span>
            <span style={{ color: 'rgba(20,17,13,0.4)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Organizer</span>
          </button>
        )}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', gap: 8, marginTop: 8, borderBottom: '1px solid rgba(20,17,13,0.08)' }}>
        {tabBtn('chat', 'Chat')}
        {tabBtn('events', 'Events')}
        {tabBtn('people', 'People')}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: tab === 'chat' ? '16px 20px 0' : '24px 20px 120px' }}>
        {tab === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
              <div style={{ alignSelf: 'center', fontSize: 12, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginBottom: 8 }}>
                {org.name} · members only
              </div>
              {history.map(msg => {
                const avatar = msg.userId ? Object.values(USERS).find(u => u.id === msg.userId)?.avatar : null;
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: msg.isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
                    {!msg.isMe && (
                      <img
                        src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender)}`}
                        alt={msg.sender}
                        style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isMe ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
                      {!msg.isMe && (
                        <div style={{ fontSize: 11, color: 'rgba(20,17,13,0.45)', fontWeight: 500, marginBottom: 4, marginLeft: 4 }}>
                          {msg.sender}
                        </div>
                      )}
                      <div
                        style={{
                          background: msg.isMe ? 'var(--orange)' : 'rgba(20,17,13,0.06)',
                          color: msg.isMe ? '#fff' : 'var(--ink)',
                          padding: '10px 14px',
                          borderRadius: 18,
                          borderBottomRightRadius: msg.isMe ? 4 : 18,
                          borderBottomLeftRadius: msg.isMe ? 18 : 4,
                          fontSize: 15,
                          lineHeight: 1.4,
                        }}
                      >
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(20,17,13,0.35)', marginTop: 4, fontWeight: 500 }}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ position: 'sticky', bottom: 0, padding: '12px 0 24px', background: 'linear-gradient(to top, var(--ligo-paper) 70%, transparent)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ flex: 1, background: 'rgba(20,17,13,0.05)', borderRadius: 100, padding: '12px 16px' }}>
                <input
                  type="text"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') send(); }}
                  placeholder="Message the house..."
                  style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: 15, color: 'var(--ink)' }}
                />
              </div>
              <button
                onClick={send}
                aria-label="Send"
                style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--ink)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </div>
          </div>
        )}

        {tab === 'events' && (
          <div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <EVI.Lock style={{ color: 'var(--orange)' }} />
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)' }}>
                  For members
                </div>
              </div>
              {membersOnly.length === 0 ? (
                <div style={{ fontSize: 15, color: 'rgba(20,17,13,0.45)', fontWeight: 500 }}>No private events right now.</div>
              ) : (
                membersOnly.map(e => {
                  const status = rsvps[e.id];
                  return (
                    <div key={e.id} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid rgba(20,17,13,0.08)' }}>
                      {e.image && (
                        <button
                          onClick={() => onOpenEvent?.(e.id)}
                          style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: onOpenEvent ? 'pointer' : 'default', marginBottom: 14 }}
                        >
                          <img src={e.image} alt={e.name} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: 16 }} />
                        </button>
                      )}
                      <div style={{ fontSize: 22, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 8 }}>
                        {e.name}
                      </div>
                      <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.55)', fontWeight: 500, marginBottom: 16 }}>
                        {e.day}{e.time ? ` · ${e.time}` : ''}{e.venue ? ` · ${e.venue}` : ''}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => setRsvps(prev => ({ ...prev, [e.id]: prev[e.id] === 'going' ? null : 'going' }))}
                          style={{
                            flex: 1,
                            padding: '12px 14px',
                            borderRadius: 12,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600,
                            background: status === 'going' ? 'var(--orange)' : 'rgba(20,17,13,0.06)',
                            color: status === 'going' ? '#fff' : 'var(--ink)',
                          }}
                        >
                          {status === 'going' ? "You're in" : "I'm in"}
                        </button>
                        <button
                          onClick={() => setRsvps(prev => ({ ...prev, [e.id]: prev[e.id] === 'maybe' ? null : 'maybe' }))}
                          style={{
                            flex: 1,
                            padding: '12px 14px',
                            borderRadius: 12,
                            border: '1px solid rgba(20,17,13,0.12)',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600,
                            background: status === 'maybe' ? 'rgba(20,17,13,0.08)' : 'transparent',
                            color: 'var(--ink)',
                          }}
                        >
                          Maybe
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {publicHosted.length > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 18 }}>
                  Also hosting on campus
                </div>
                {publicHosted.map(e => (
                  <button
                    key={e.id}
                    onClick={() => onOpenEvent?.(e.id)}
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      gap: 14,
                      padding: '0 0 18px',
                      marginBottom: 18,
                      border: 'none',
                      borderBottom: '1px solid rgba(20,17,13,0.08)',
                      background: 'none',
                      cursor: onOpenEvent ? 'pointer' : 'default',
                      textAlign: 'left',
                    }}
                  >
                    {e.image ? (
                      <img src={e.image} alt="" style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(20,17,13,0.06)', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{e.name}</div>
                      <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', fontWeight: 500 }}>{e.day} · {e.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'people' && (
          <div>
            <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', fontWeight: 500, marginBottom: 24 }}>
              {org.id === 'sigma_phi_epsilon'
                ? 'Brothers in the chapter — tap someone to see contact info.'
                : 'People in this organization — tap someone to see contact info.'}
            </div>
            {org.id === 'sigma_phi_epsilon' || org.id === 'program_board' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {(org.id === 'program_board'
                  ? GPB_MEMBER_GROUPS.map(g => ({ id: g.id, title: g.title }))
                  : [
                      { id: 'exec-board', title: 'Exec board' },
                      { id: 'brothers', title: 'Brothers' },
                      { id: 'new-members', title: 'New members' },
                    ]
                ).map(group => {
                  const roster = org.id === 'program_board' ? GPB_ROSTER : SIGEP_ROSTER;
                  const members = roster.filter(m => m.subgroup === group.id && m.status === 'joined');
                  if (members.length === 0) return null;
                  return (
                    <div key={group.id}>
                      <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 14 }}>
                        {group.title} · {members.length}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {members.map((m, i) => {
                          const matchedUser = matchRosterUser(m);
                          const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedMember({ ...m, matchedUser })}
                              style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                            >
                              {matchedUser ? (
                                <img src={matchedUser.avatar} alt={m.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                              ) : (
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500 }}>
                                  {initials}
                                </div>
                              )}
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>{m.name}</div>
                                {m.title && <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', fontWeight: 500 }}>{m.title}</div>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: 15, color: 'rgba(20,17,13,0.5)' }}>
                {org.memberCount} members in {org.name}.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedMember && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedMember(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 360, background: 'var(--ligo-paper)', borderRadius: 24, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, marginBottom: 28 }}>
              {selectedMember.matchedUser ? (
                <img src={selectedMember.matchedUser.avatar} alt={selectedMember.name} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 500 }}>
                  {selectedMember.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ fontSize: 24, fontWeight: 500, color: 'var(--ink)' }}>{selectedMember.name}</div>
                {selectedMember.title && <div style={{ fontSize: 16, color: 'rgba(20,17,13,0.5)', fontWeight: 500, marginTop: 4 }}>{selectedMember.title}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28, padding: 16, background: 'rgba(20,17,13,0.03)', borderRadius: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>Email</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginTop: 4 }}>{selectedMember.email}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>Phone</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginTop: 4 }}>{selectedMember.phone}</div>
              </div>
            </div>
            <button
              onClick={() => setSelectedMember(null)}
              style={{ width: '100%', padding: 16, background: 'rgba(20,17,13,0.05)', color: 'var(--ink)', borderRadius: 16, fontSize: 16, fontWeight: 500, border: 'none', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
