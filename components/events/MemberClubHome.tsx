"use client";
import React, { useState, useEffect } from 'react';
import { Organization, EventItem, OrganizationMember, SIGEP_ROSTER } from '../../lib/mockEventsData';
import { GPB_MEMBER_GROUPS, GPB_ROSTER } from '../../lib/gpbRoster';
import { USERS } from '../../lib/users';
import { EVI } from './Icons';

type ClubScreen = 'home' | 'chat' | 'events' | 'people';

type ClubChatMessage = {
  id: number;
  sender: string;
  userId: string | null;
  text: string;
  isMe: boolean;
  time: string;
};

function welcomeLabel(org: Organization) {
  if (org.id === 'program_board') return 'GPB';
  if (org.id === 'sigma_phi_epsilon') return 'SigEp';
  if (org.id === 'phantoms') return 'Phantoms';
  return org.initials || org.name;
}

function seedClubChat(orgId: string, currentUserId?: string): ClubChatMessage[] {
  const markMine = (msg: Omit<ClubChatMessage, 'isMe'>): ClubChatMessage => ({
    ...msg,
    isMe: !!(currentUserId && msg.userId === currentUserId),
    sender: currentUserId && msg.userId === currentUserId ? 'You' : msg.sender,
  });

  if (orgId === 'program_board') {
    return [
      {
        id: 1,
        sender: 'Cole Brennan',
        userId: 'cole',
        text: 'Quick reminder: weekly chair sync is still Mondays at 6 in Leavey. Bring updates even if short.',
        time: 'Yesterday',
      },
      {
        id: 2,
        sender: 'Priya Shah',
        userId: null,
        text: 'Can Marketing get photo access for the shared drive? We’re drowning in old folders.',
        time: 'Yesterday',
      },
      {
        id: 3,
        sender: 'Maya Thompson',
        userId: null,
        text: 'Yes — I’ll add Programming + Marketing tonight. Ping me if you’re locked out.',
        time: 'Yesterday',
      },
      {
        id: 4,
        sender: 'Jordan Davis',
        userId: 'jordan',
        text: 'Anyone free Thursday afternoon to help inventory production bins?',
        time: '10:42 AM',
      },
      {
        id: 5,
        sender: 'Elena Rossi',
        userId: null,
        text: 'I can do 3–4. Also — office hours sign-up sheet is pinned in #ops if you haven’t grabbed a slot.',
        time: '11:05 AM',
      },
    ].map(markMine);
  }

  if (orgId === 'sigma_phi_epsilon') {
    return [
      {
        id: 1,
        sender: 'Marcus T.',
        userId: 'marcus',
        text: 'Brotherhood dinner moved to Thursday — house at 7.',
        time: '2:30 PM',
      },
      {
        id: 2,
        sender: 'Bennett R.',
        userId: 'bennett',
        text: 'Exec is covering food. Just show up on time.',
        time: '2:35 PM',
      },
      {
        id: 3,
        sender: 'Jordan D.',
        userId: 'jordan',
        text: 'Anyone need a ride from campus?',
        time: '2:36 PM',
      },
      {
        id: 4,
        sender: 'Cole B.',
        userId: 'cole',
        text: "I'll grab a couple people from Leavey after class.",
        time: '2:40 PM',
      },
    ].map(markMine);
  }

  return [
    {
      id: 1,
      sender: 'Host',
      userId: null,
      text: 'Club chat is live — keep it to org stuff.',
      time: 'Just now',
      isMe: false,
    },
  ];
}

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
  currentUserId,
  onBack,
  onOpenEvent,
  onOpenManage,
}: {
  org: Organization;
  events: EventItem[];
  currentUserRole?: string;
  currentUserId?: string;
  onBack: () => void;
  onOpenEvent?: (id: string) => void;
  onOpenManage?: () => void;
}) {
  const [welcome, setWelcome] = useState(true);
  const [welcomeOut, setWelcomeOut] = useState(false);
  const [screen, setScreen] = useState<ClubScreen>('home');
  const [draft, setDraft] = useState('');
  const [history, setHistory] = useState<ClubChatMessage[]>(() => seedClubChat(org.id, currentUserId));
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [rsvps, setRsvps] = useState<Record<string, 'going' | 'maybe' | null>>({});

  useEffect(() => {
    setHistory(seedClubChat(org.id, currentUserId));
    setDraft('');
    setScreen('home');
    setWelcome(true);
    setWelcomeOut(false);
  }, [org.id, currentUserId]);

  useEffect(() => {
    if (!welcome) return;
    const fade = window.setTimeout(() => setWelcomeOut(true), 1100);
    const done = window.setTimeout(() => setWelcome(false), 1500);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, [welcome, org.id]);

  const isOrganizer = ['admin', 'officer', 'social_chair'].includes(currentUserRole);
  const roleLabel = currentUserRole.replace('_', ' ');
  const shortName = welcomeLabel(org);

  const roleArticle = /^[aeiou]/i.test(roleLabel) ? 'an' : 'a';

  const orgEvents = events.filter(e => e.hostOrganizationId === org.id);
  const membersOnly = orgEvents.filter(e => e.visibility === 'members_only');
  const publicHosted = orgEvents.filter(e =>
    e.visibility !== 'members_only'
    && e.publishStatus !== 'draft'
    && e.publishStatus !== 'planning'
  );

  const lastChat = history[history.length - 1];
  const lastChatPreview = lastChat
    ? `${lastChat.isMe ? 'You' : lastChat.sender.split(' ')[0]}: ${lastChat.text}`
    : 'No messages yet';

  const send = () => {
    if (!draft.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setHistory(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        userId: currentUserId || null,
        text: draft.trim(),
        isMe: true,
        time,
      },
    ]);
    setDraft('');
  };

  const goHomeOrBack = () => {
    if (screen === 'home') onBack();
    else setScreen('home');
  };

  const menuItems: Array<{
    id: Exclude<ClubScreen, 'home'>;
    label: string;
    hint: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'chat',
      label: 'Chat',
      hint: lastChatPreview,
      icon: <EVI.Group />,
    },
    {
      id: 'events',
      label: 'Events',
      hint: membersOnly.length
        ? `${membersOnly.length} for members${publicHosted.length ? ` · ${publicHosted.length} on campus` : ''}`
        : publicHosted.length
          ? `${publicHosted.length} on campus`
          : 'Nothing scheduled',
      icon: <EVI.Calendar />,
    },
    {
      id: 'people',
      label: 'People',
      hint: `${org.memberCount} members`,
      icon: <EVI.Group />,
    },
  ];

  const sectionTitle =
    screen === 'chat' ? 'Chat'
      : screen === 'events' ? 'Events'
        : screen === 'people' ? 'People'
          : org.name;

  return (
    <div className="screen-fade" style={{ background: 'var(--ligo-paper)', minHeight: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {welcome && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 60,
            background: 'var(--ink)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            opacity: welcomeOut ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: welcomeOut ? 'none' : 'auto',
          }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}>
            {org.initials}
          </div>
          <div style={{ textAlign: 'center', padding: '0 32px' }}>
            <div style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
              Welcome to
            </div>
            <div style={{ fontSize: 42, fontWeight: 500, fontFamily: 'var(--font-display)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {shortName}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: 'max(env(safe-area-inset-top, 72px), 72px) 20px 24px', borderBottom: '1px solid rgba(20,17,13,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: screen === 'home' ? 20 : 0 }}>
          <button
            onClick={goHomeOrBack}
            aria-label="Back"
            style={{ background: 'rgba(20,17,13,0.06)', color: 'var(--ink)', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <EVI.Back />
          </button>
          {screen === 'home' ? (
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', flexShrink: 0 }}>
              {org.initials}
            </div>
          ) : (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orange)', marginBottom: 4 }}>
                {shortName}
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
                {sectionTitle}
              </h1>
            </div>
          )}
        </div>

        {screen === 'home' && (
          <>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orange)', marginBottom: 8 }}>
              Members only
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
              {shortName}
            </h1>
            <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.55)', marginTop: 8, fontWeight: 500, lineHeight: 1.35 }}>
              {org.name}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.45)', marginTop: 6, fontWeight: 500 }}>
              {org.memberCount} members · You&apos;re {roleArticle} {roleLabel}
            </div>

            {isOrganizer && onOpenManage && (
              <button
                onClick={onOpenManage}
                style={{
                  marginTop: 20,
                  width: '100%',
                  padding: '14px 16px',
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
          </>
        )}
      </div>

      {/* Home menu */}
      {screen === 'home' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 120px' }}>
          <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', fontWeight: 500, marginBottom: 8, lineHeight: 1.4 }}>
            Your club home — pick a section.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {menuItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  width: '100%',
                  padding: '22px 0',
                  border: 'none',
                  borderBottom: i < menuItems.length - 1 ? '1px solid rgba(20,17,13,0.08)' : 'none',
                  background: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(20,17,13,0.05)',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 500, fontFamily: 'var(--font-display)', textTransform: 'uppercase', color: 'var(--ink)', lineHeight: 1.1, marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.hint}
                  </div>
                </div>
                <EVI.Chevron style={{ color: 'rgba(20,17,13,0.35)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat screen */}
      {screen === 'chat' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
            <div style={{ alignSelf: 'center', fontSize: 12, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginBottom: 8 }}>
              Club chat · {org.name}
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
                placeholder={org.id === 'program_board' ? 'Message Program Board...' : 'Message the club...'}
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

      {/* Events screen */}
      {screen === 'events' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 120px' }}>
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

      {/* People screen */}
      {screen === 'people' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 120px' }}>
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
