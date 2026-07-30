import React, { useState, useEffect } from 'react';
import { Organization, EventItem, OrganizationMember, SIGEP_ROSTER } from '../../lib/mockEventsData';
import { GPB_MEMBER_GROUPS, GPB_ROSTER } from '../../lib/gpbRoster';
import { USERS } from '../../lib/users';
import { EVI } from './Icons';

function welcomeLabel(org: Organization) {
  if (org.id === 'program_board') return 'GPB';
  if (org.id === 'sigma_phi_epsilon') return 'SigEp';
  if (org.id === 'phantoms') return 'Phantoms';
  return org.initials || org.name;
}

function memberStatusStyle(status: string) {
  if (status === 'joined') {
    return {
      statusBg: 'rgba(20,17,13,0.05)',
      statusColor: 'var(--ink)',
      statusBorder: 'none',
      statusText: 'On Ligo',
    };
  }
  if (status === 'invited') {
    return {
      statusBg: 'transparent',
      statusColor: 'var(--ink)',
      statusBorder: '1px solid rgba(20,17,13,0.2)',
      statusText: 'Invited',
    };
  }
  if (status === 'sms-pending') {
    return {
      statusBg: 'rgba(20,17,13,0.05)',
      statusColor: 'rgba(20,17,13,0.5)',
      statusBorder: 'none',
      statusText: 'Text sent',
    };
  }
  // not_on_ligo and anything else
  return {
    statusBg: 'transparent',
    statusColor: 'rgba(20,17,13,0.45)',
    statusBorder: '1px dashed rgba(20,17,13,0.2)',
    statusText: 'Not on Ligo',
  };
}

function matchRosterUser(member: OrganizationMember) {
  // Only wire known demo profiles when the roster row is intentionally that person.
  // Cole Brennan = Cole. Jordan Davis = Jordan. Sofia Martinez / Marcus Reed stay unmatched for now.
  if (member.name === 'Cole Brennan' || member.email === 'cole.brennan@georgetown.edu') {
    return USERS.cole;
  }
  if (member.name === 'Jordan Davis' || member.email === 'jordand@georgetown.edu') {
    return USERS.jordan;
  }
  if (member.email === 'marcust@georgetown.edu') return USERS.marcus;
  if (member.email === 'coleb@georgetown.edu') return USERS.cole;
  if (member.email === 'bennettr@georgetown.edu') return USERS.bennett;
  return undefined;
}

function RosterMembersList({
  roster,
  groups,
  onSelect,
  currentUserId,
}: {
  roster: OrganizationMember[];
  groups: { id: string; title: string }[];
  onSelect: (member: OrganizationMember & { matchedUser?: (typeof USERS)[string] }) => void;
  currentUserId?: string;
}) {
  const joined = roster.filter(m => m.status === 'joined').length;
  const invited = roster.filter(m => m.status === 'invited').length;
  const notOnLigo = roster.length - joined - invited;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.55)', fontWeight: 500, marginTop: -8 }}>
        {roster.length} members · {joined} on Ligo · {invited} invited · {notOnLigo} not yet
      </div>

      {groups.map(group => {
        const members = roster.filter(m => m.subgroup === group.id);
        if (members.length === 0) return null;

        return (
          <div key={group.id}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 16 }}>
              {group.title} · {members.length}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {members.map((m, i) => {
                const matchedUser = matchRosterUser(m);
                const isYou = !!(currentUserId && matchedUser && matchedUser.id === currentUserId);
                const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                const { statusBg, statusColor, statusBorder, statusText } = memberStatusStyle(m.status);

                return (
                  <div
                    key={`${m.email}-${i}`}
                    onClick={() => onSelect({ ...m, matchedUser })}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                  >
                    {matchedUser ? (
                      <img src={matchedUser.avatar} alt={m.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500 }}>
                        {initials}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>
                        {isYou ? 'You' : m.name}
                      </div>
                      {m.title && <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', fontWeight: 500 }}>{m.title}</div>}
                    </div>
                    <div style={{ padding: '6px 10px', borderRadius: 12, background: statusBg, border: statusBorder, fontSize: 11, fontWeight: 500, color: statusColor }}>
                      {statusText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrganizationWorkspace({ 
  org, 
  events, 
  onBack, 
  onManageEvent,
  onCreateEvent,
  onInviteMembers,
  currentUserRole = 'admin',
  currentUserId,
  skipWelcome = false,
}: { 
  org: Organization, 
  events: EventItem[],
  onBack: () => void,
  onManageEvent: (id: string) => void,
  onCreateEvent: () => void,
  onInviteMembers: () => void,
  currentUserRole?: string,
  currentUserId?: string,
  skipWelcome?: boolean,
}) {
  const [tab, setTab] = useState<'overview'|'events'|'members'>('overview');
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [welcome, setWelcome] = useState(!skipWelcome);
  const [welcomeOut, setWelcomeOut] = useState(false);

  useEffect(() => {
    if (skipWelcome) {
      setWelcome(false);
      setWelcomeOut(false);
      return;
    }
    setWelcome(true);
    setWelcomeOut(false);
  }, [org.id, skipWelcome]);

  useEffect(() => {
    if (!welcome) return;
    const fade = window.setTimeout(() => setWelcomeOut(true), 1100);
    const done = window.setTimeout(() => setWelcome(false), 1500);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, [welcome, org.id]);

  const isOrganizer = currentUserRole === 'admin' || currentUserRole === 'officer' || currentUserRole === 'social_chair';
  const roleLabel = (currentUserRole || 'member').replace('_', ' ');
  const shortName = welcomeLabel(org);

  const orgEvents = events.filter(e => e.hostOrganizationId === org.id);
  const publicEvents = orgEvents.filter(e => e.visibility !== 'members_only');
  const internalEvents = orgEvents.filter(e => e.visibility === 'members_only');
  const upcomingEvents = publicEvents.filter(e => e.publishStatus !== 'draft' && e.publishStatus !== 'planning');

  return (
    <div className="screen-fade" style={{ background: 'var(--ligo-paper)', minHeight: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 10, overflowY: 'auto', overflowX: 'hidden' }}>
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
              {org.id === 'program_board'
                ? 'Running the board'
                : org.id === 'sigma_phi_epsilon'
                  ? 'Running the chapter'
                  : 'Organizer'}
            </div>
            <div style={{ fontSize: 42, fontWeight: 500, fontFamily: 'var(--font-display)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {shortName}
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 16, letterSpacing: '0.02em' }}>
              Events · members · invites
            </div>
          </div>
        </div>
      )}

      <div style={{ position: 'sticky', top: 0, background: 'rgba(250,250,248,0.9)', backdropFilter: 'blur(20px)', zIndex: 10, padding: 'max(env(safe-area-inset-top, 72px), 72px) 20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16, borderBottom: '2px solid var(--ink)' }}>
        <button onClick={onBack} aria-label="Back" style={{ background: 'var(--ink)', color: '#fff', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <EVI.Back />
        </button>
        <div style={{ paddingTop: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)', marginBottom: 4 }}>Event ops · {org.campus}</div>
          <h1 style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1, textTransform: 'uppercase' }}>{shortName}</h1>
          <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.55)', marginTop: 8, fontWeight: 500 }}>{org.name}</div>
          <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.45)', marginTop: 6, fontWeight: 500 }}>{org.memberCount} members · You&apos;re {roleLabel === 'admin' ? 'an' : 'a'} {roleLabel}</div>
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', gap: 24, marginTop: 24, marginBottom: 40, borderBottom: '1px solid rgba(20,17,13,0.1)' }}>
        <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')} style={{ paddingBottom: 12, borderBottom: tab === 'overview' ? '2px solid var(--ink)' : '2px solid transparent', background: 'none', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: tab === 'overview' ? 'var(--ink)' : 'rgba(20,17,13,0.4)', cursor: 'pointer' }}>Overview</button>
        <button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')} style={{ paddingBottom: 12, borderBottom: tab === 'events' ? '2px solid var(--ink)' : '2px solid transparent', background: 'none', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: tab === 'events' ? 'var(--ink)' : 'rgba(20,17,13,0.4)', cursor: 'pointer' }}>Events</button>
        <button className={tab === 'members' ? 'active' : ''} onClick={() => setTab('members')} style={{ paddingBottom: 12, borderBottom: tab === 'members' ? '2px solid var(--ink)' : '2px solid transparent', background: 'none', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: tab === 'members' ? 'var(--ink)' : 'rgba(20,17,13,0.4)', cursor: 'pointer' }}>Members</button>
      </div>

      <div style={{ padding: '0 20px' }}>
        {tab === 'overview' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(20,17,13,0.5)', marginBottom: 12 }}>Next Event</div>
              {upcomingEvents[0] && (
                <div style={{ padding: 20, background: '#fff', borderRadius: 16, border: '1px solid rgba(20,17,13,0.06)' }}>
                  <div style={{ fontSize: 20, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1, marginBottom: 4 }}>{upcomingEvents[0].name}</div>
                  <div style={{ fontSize: 13, color: 'var(--orange)', fontWeight: 500, marginBottom: 16 }}>{upcomingEvents[0].day} · {upcomingEvents[0].time}</div>
                  <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: 4 }}>{upcomingEvents[0].goingCount}</div>
                      <div style={{ fontSize: 12, color: 'rgba(20,17,13,0.5)', fontWeight: 500 }}>Going</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'rgba(20,17,13,0.4)', lineHeight: 1, marginBottom: 4 }}>{upcomingEvents[0].pendingCount || 0}</div>
                      <div style={{ fontSize: 12, color: 'rgba(20,17,13,0.4)', fontWeight: 500 }}>Pending</div>
                    </div>
                  </div>
                  {isOrganizer && (
                    <button onClick={() => onManageEvent(upcomingEvents[0].id)} style={{ width: '100%', padding: '12px', background: 'var(--ink)', color: '#fff', borderRadius: 12, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>Manage event</button>
                  )}
                </div>
              )}
            </div>

            {isOrganizer && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(20,17,13,0.5)', marginBottom: 12 }}>Quick Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button onClick={onCreateEvent} style={{ padding: 16, background: '#fff', borderRadius: 16, border: '1px solid rgba(20,17,13,0.06)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ color: 'var(--ink)' }}><EVI.Plus /></div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>Create event</div>
                  </button>
                  <button onClick={onInviteMembers} style={{ padding: 16, background: '#fff', borderRadius: 16, border: '1px solid rgba(20,17,13,0.06)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ color: 'var(--ink)' }}><EVI.Invite /></div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>Invite members</div>
                  </button>
                  <button style={{ padding: 16, background: '#fff', borderRadius: 16, border: '1px solid rgba(20,17,13,0.06)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ color: 'var(--ink)' }}><EVI.Share /></div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>Message attendees</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'events' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 20 }}>Public Events</div>
              {publicEvents.length === 0 && (
                <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginBottom: 24 }}>No public events yet.</div>
              )}
              {publicEvents.map(e => (
                <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 24, borderBottom: '1px solid rgba(20,17,13,0.1)', marginBottom: 24 }}>
                  <div style={{ minWidth: 0, paddingRight: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', textTransform: 'uppercase', lineHeight: 1 }}>{e.name}</div>
                      {e.publishStatus && e.publishStatus !== 'published' && (
                        <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 8px', borderRadius: 8, background: e.publishStatus === 'draft' ? 'rgba(20,17,13,0.06)' : 'rgba(249,115,22,0.12)', color: e.publishStatus === 'draft' ? 'rgba(20,17,13,0.55)' : 'var(--orange)' }}>
                          {e.publishStatus}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.6)', fontWeight: 500 }}>{e.day} · {e.time}</div>
                    {e.venue && <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 4 }}>{e.venue}</div>}
                  </div>
                  {isOrganizer && (
                    <button onClick={() => onManageEvent(e.id)} style={{ padding: '8px 16px', background: 'var(--ink)', color: '#fff', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Manage</button>
                  )}
                </div>
              ))}
            </div>
            
            {internalEvents.length > 0 && (
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)' }}>Members Only</div>
                  <div style={{ background: 'var(--orange)', width: 6, height: 6, borderRadius: '50%' }} />
                </div>
                {internalEvents.map(e => (
                  <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 24, borderBottom: '1px solid rgba(20,17,13,0.1)', marginBottom: 24 }}>
                    <div style={{ minWidth: 0, paddingRight: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', textTransform: 'uppercase', lineHeight: 1 }}>{e.name}</div>
                        {e.publishStatus && (
                          <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 8px', borderRadius: 8, background: e.publishStatus === 'draft' ? 'rgba(20,17,13,0.06)' : 'rgba(249,115,22,0.12)', color: e.publishStatus === 'draft' ? 'rgba(20,17,13,0.55)' : 'var(--orange)' }}>
                            {e.publishStatus}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--orange)', fontWeight: 500 }}>{e.day} · {e.time || 'Internal'}</div>
                      {e.venue && <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 4 }}>{e.venue}</div>}
                    </div>
                    {isOrganizer && (
                      <button onClick={() => onManageEvent(e.id)} style={{ padding: '8px 16px', background: 'var(--orange)', color: '#fff', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Manage</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'members' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '2px solid var(--ink)', marginBottom: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>All Members</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>{org.memberCount}</div>
            </div>

            {org.id === 'sigma_phi_epsilon' ? (
              <>
                <RosterMembersList
                  roster={SIGEP_ROSTER}
                  groups={[
                    { id: 'exec-board', title: 'EXEC BOARD' },
                    { id: 'brothers', title: 'BROTHERS' },
                    { id: 'new-members', title: 'NEW MEMBERS' },
                  ]}
                  onSelect={setSelectedMember}
                  currentUserId={currentUserId}
                />
                <div style={{ marginTop: 32 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 8 }}>
                    ALUMNI · 150
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.5)', fontWeight: 500 }}>
                    Reachable for invites · not shown here.
                  </div>
                </div>
              </>
            ) : org.id === 'program_board' ? (
              <RosterMembersList
                roster={GPB_ROSTER}
                groups={[...GPB_MEMBER_GROUPS]}
                onSelect={setSelectedMember}
                currentUserId={currentUserId}
              />
            ) : (
              <div>
                {org.groups.filter(g => g.name !== 'All Members').map(g => (
                  <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(20,17,13,0.1)', marginBottom: 16 }}>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>{g.name}</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(20,17,13,0.5)' }}>{g.memberCount}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ height: 120 }} />
      </div>

      {selectedMember && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedMember(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 360, background: 'var(--ligo-paper)', borderRadius: 24, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, marginBottom: 32 }}>
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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32, padding: 16, background: 'rgba(20,17,13,0.03)', borderRadius: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>Email</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{selectedMember.email}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>Phone</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{selectedMember.phone}</div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedMember(null)}
              style={{ width: '100%', padding: '16px', background: 'rgba(20,17,13,0.05)', color: 'var(--ink)', borderRadius: 16, fontSize: 16, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
