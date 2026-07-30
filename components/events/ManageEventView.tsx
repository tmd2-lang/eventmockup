import React, { useState } from 'react';
import { EventItem } from '../../lib/mockEventsData';
import { EVI } from './Icons';
import { EventGroupChat, seedEventThread } from './EventGroupChat';

function blastAutofill(event: EventItem) {
  if (event.name?.toLowerCase().includes('kickoff')) {
    return "Reminder: GPB Fall Programming Kickoff is Thursday at 7pm in Leavey Center, Program Room. Dinner provided — come ready to pick a Sept/Oct event to support.";
  }
  if (event.name?.toLowerCase().includes('midnight breakfast')) {
    return "Reminder: Midnight Breakfast is Thursday Dec 10, 10pm–12:30am in the HFSC Great Room. Free for Georgetown students while food lasts — pancakes, sandwiches, coffee, games & giveaways.";
  }
  return `Quick update on ${event.name}: ${event.day || 'see the event page'} · ${event.time || ''}${event.venue ? ` at ${event.venue}` : ''}. See you there.`.replace(/\s+/g, ' ').trim();
}

function eventDescription(event: EventItem): string {
  const raw = event.description ?? event.summary;
  if (Array.isArray(raw)) return raw.join('\n\n');
  if (typeof raw === 'string' && raw.trim()) {
    return raw.includes('\\n\\n')
      ? raw.split('\\n\\n').join('\n\n')
      : raw;
  }
  return '';
}

export function ManageEventView({
  event,
  onBack,
  onToast,
  onDelete,
  onViewEvent,
  currentUserId,
}: {
  event: EventItem;
  onBack: () => void;
  onToast: (msg: string) => void;
  onDelete?: () => void;
  onViewEvent?: () => void;
  currentUserId?: string;
}) {
  const [blastOpen, setBlastOpen] = useState(false);
  const [blastText, setBlastText] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const description = eventDescription(event);

  const pending = event.pendingCount || 0;
  const declined = event.declinedCount || 0;
  const isMembersOnly = event.visibility === 'members_only';
  const lastMsg = seedEventThread(event, currentUserId).slice(-1)[0];

  return (
    <div className="screen-fade" style={{ background: 'var(--ligo-paper)', minHeight: '100%', position: 'absolute', inset: 0, zIndex: 20, overflowY: 'auto' }}>
      <div style={{ position: 'sticky', top: 0, background: 'rgba(250,250,248,0.9)', backdropFilter: 'blur(20px)', zIndex: 10, padding: 'max(env(safe-area-inset-top, 56px), 56px) 20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16, borderBottom: '2px solid var(--ink)' }}>
        <button onClick={onBack} aria-label="Back" style={{ background: 'var(--ink)', color: '#fff', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <EVI.Back />
        </button>
        <div style={{ paddingTop: 4, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)', marginBottom: 4 }}>
            {isMembersOnly ? 'Members only · Event' : 'Dashboard'}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>{event.name}</h1>
          <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', marginTop: 8, fontWeight: 500 }}>
            {event.day}{event.time ? ` · ${event.time}` : ''}{event.venue ? ` · ${event.venue}` : ''}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ marginTop: 32, marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 40, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>{event.goingCount}</div>
              <div style={{ fontSize: 12, color: 'rgba(20,17,13,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Going</div>
            </div>
            <div>
              <div style={{ fontSize: 40, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'rgba(20,17,13,0.25)', lineHeight: 1, marginBottom: 8 }}>{pending}</div>
              <div style={{ fontSize: 12, color: 'rgba(20,17,13,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending</div>
            </div>
            <div>
              <div style={{ fontSize: 40, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'rgba(20,17,13,0.25)', lineHeight: 1, marginBottom: 8 }}>{declined}</div>
              <div style={{ fontSize: 12, color: 'rgba(20,17,13,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Declined</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 20 }}>Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button
              onClick={() => setChatOpen(true)}
              style={{ padding: 24, background: 'var(--orange)', color: '#fff', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}
            >
              <EVI.Group />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Group chat</div>
                {lastMsg && (
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6, fontWeight: 500, textTransform: 'none', letterSpacing: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lastMsg.isMe ? 'You' : lastMsg.sender.split(' ')[0]}: {lastMsg.text}
                  </div>
                )}
              </div>
              <EVI.Chevron style={{ opacity: 0.7, flexShrink: 0 }} />
            </button>

            {onViewEvent && (
              <button
                onClick={onViewEvent}
                style={{ padding: 24, background: 'var(--ink)', color: '#fff', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}
              >
                <EVI.Globe />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>View event</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
                    See flyer, description, and RSVP page
                  </div>
                </div>
                <EVI.Chevron style={{ opacity: 0.5, flexShrink: 0 }} />
              </button>
            )}

            <button
              onClick={() => setBlastOpen(true)}
              style={{ padding: 24, background: 'var(--ink)', color: '#fff', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}
            >
              <EVI.Share />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Send update</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
                  One-way push to people going
                </div>
              </div>
            </button>

            <button style={{ padding: 24, background: 'var(--ink)', color: '#fff', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}>
              <EVI.Check />
              <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start check-in</div>
            </button>

            {onDelete && (
              <button
                onClick={onDelete}
                style={{ padding: 24, background: 'rgba(255,59,48,0.1)', color: '#FF3B30', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16, marginTop: 8 }}
              >
                <EVI.X style={{ width: 16, height: 16 }} />
                <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delete event</div>
              </button>
            )}
          </div>
        </div>

        <div style={{ height: 120 }} />
      </div>

      {chatOpen && (
        <EventGroupChat
          event={event}
          currentUserId={currentUserId}
          onClose={() => setChatOpen(false)}
          onOpenDetails={() => setDetailsOpen(true)}
        />
      )}

      {detailsOpen && (
        <div className="sheet-backdrop" style={{ position: 'absolute', inset: 0, background: 'rgba(20,17,13,0.4)', zIndex: 55, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="sheet-content screen-fade" style={{ background: 'var(--ligo-paper)', maxHeight: '85%', borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(20,17,13,0.08)', flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>
                Event details
              </div>
              <button onClick={() => setDetailsOpen(false)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', cursor: 'pointer' }}>
                Close
              </button>
            </div>

            <div style={{ overflowY: 'auto', padding: '20px 20px max(28px, env(safe-area-inset-bottom, 28px))' }}>
              {event.image || event.flyerUrl ? (
                <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', marginBottom: 20, background: 'rgba(20,17,13,0.06)' }}>
                  <img src={event.image || event.flyerUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : null}
              <h2 style={{ fontSize: 26, fontWeight: 500, fontFamily: 'var(--font-display)', margin: '0 0 12px', textTransform: 'uppercase', lineHeight: 1.1 }}>
                {event.name}
              </h2>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(20,17,13,0.6)', marginBottom: 8 }}>
                {event.day}{event.time ? ` · ${event.time}` : ''}
              </div>
              {event.venue && (
                <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(20,17,13,0.6)', marginBottom: 20 }}>
                  {event.venue}
                </div>
              )}
              {description ? (
                description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink)', fontWeight: 500, margin: '0 0 14px' }}>
                    {para}
                  </p>
                ))
              ) : (
                <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(20,17,13,0.45)', fontWeight: 500, margin: 0 }}>
                  No description yet.
                </p>
              )}
              {onViewEvent && (
                <button
                  onClick={() => { setDetailsOpen(false); onViewEvent(); }}
                  style={{ width: '100%', marginTop: 12, padding: '16px 20px', background: 'var(--ink)', color: '#fff', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', borderRadius: 16, cursor: 'pointer' }}
                >
                  Open full event page
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {blastOpen && (
        <div className="sheet-backdrop" style={{ position: 'absolute', inset: 0, background: 'rgba(20,17,13,0.4)', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="sheet-content screen-fade" style={{ background: 'var(--ligo-paper)', height: '80%', borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--ink)' }}>
              <button onClick={() => { setBlastOpen(false); setBlastText(''); }} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', cursor: 'pointer' }}>Cancel</button>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>
                New update
              </div>
              <div style={{ width: 50 }} />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '40px 20px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1, textTransform: 'uppercase', margin: '0 0 8px' }}>Send update</h2>
              <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.6)', fontWeight: 500, marginBottom: 24 }}>
                Push notification to {event.goingCount} going.
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <textarea
                  placeholder="What do people need to know?"
                  value={blastText}
                  onChange={(e) => setBlastText(e.target.value)}
                  style={{ flex: 1, width: '100%', fontSize: 20, fontWeight: 500, color: 'var(--ink)', background: 'transparent', border: 'none', outline: 'none', resize: 'none', paddingTop: 16, lineHeight: 1.4 }}
                />
                <div style={{ position: 'absolute', bottom: 16, right: 0 }}>
                  <button
                    onClick={() => setBlastText(blastAutofill(event))}
                    style={{ background: 'rgba(20,17,13,0.05)', color: 'var(--ink)', border: 'none', padding: '8px 16px', borderRadius: 16, fontSize: 11, fontWeight: 500, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    Autofill
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: 20, borderTop: '2px solid rgba(20,17,13,0.1)' }}>
              <button
                disabled={!blastText.trim()}
                onClick={() => {
                  onToast(`Update sent to ${event.goingCount} people`);
                  setBlastOpen(false);
                  setBlastText('');
                }}
                style={{ width: '100%', padding: '20px', background: !blastText.trim() ? 'rgba(20,17,13,0.1)' : 'var(--orange)', color: !blastText.trim() ? 'rgba(20,17,13,0.4)' : '#fff', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: 'pointer', borderRadius: 16 }}
              >
                Send update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
