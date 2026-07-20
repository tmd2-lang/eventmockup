import React, { useState } from 'react';
import { EventItem } from '../../lib/mockEventsData';
import { EVI } from './Icons';

export function ManageEventView({ 
  event,
  onBack,
  onToast,
  onDelete
}: { 
  event: EventItem,
  onBack: () => void,
  onToast: (msg: string) => void,
  onDelete?: () => void
}) {
  const [nudged, setNudged] = useState(false);
  const [blastOpen, setBlastOpen] = useState(false);
  const [blastText, setBlastText] = useState('');

  const capacity = event.capacity || 200;
  const pct = Math.round((event.goingCount / capacity) * 100);
  const pending = event.pendingCount || 0;
  const declined = event.declinedCount || 0;

  return (
    <div className="screen-fade" style={{ background: 'var(--ligo-paper)', minHeight: '100%', position: 'absolute', inset: 0, zIndex: 20, overflowY: 'auto' }}>
      <div style={{ position: 'sticky', top: 0, background: 'rgba(250,250,248,0.9)', backdropFilter: 'blur(20px)', zIndex: 10, padding: 'max(env(safe-area-inset-top, 56px), 56px) 20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16, borderBottom: '2px solid var(--ink)' }}>
        <button onClick={onBack} aria-label="Back" style={{ background: 'var(--ink)', color: '#fff', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <EVI.Back />
        </button>
        <div style={{ paddingTop: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)', marginBottom: 4 }}>Dashboard</div>
          <h1 style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1, textTransform: 'uppercase' }}>{event.name}</h1>
          <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', marginTop: 8, fontWeight: 500 }}>{event.day} · {event.time}</div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ marginTop: 40, marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>{event.goingCount}</div>
              <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Going</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'rgba(20,17,13,0.2)', lineHeight: 1, marginBottom: 8 }}>{pending}</div>
              <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'rgba(20,17,13,0.2)', lineHeight: 1, marginBottom: 8 }}>{declined}</div>
              <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Declined</div>
            </div>
          </div>
          {event.capacity && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 500, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
                <span>Capacity</span>
                <span>{event.goingCount} / {event.capacity}</span>
              </div>
              <div style={{ height: 16, background: 'rgba(20,17,13,0.1)', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(Math.round((event.goingCount / event.capacity) * 100), 100)}%`, height: '100%', background: 'var(--ink)' }} />
              </div>
            </>
          )}
        </div>



        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 20 }}>Live Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {event.id === '30' || event.id === '31' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(249,115,22,0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EVI.Check style={{ width: 20, height: 20 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      <b>{event.goingCount > 50 ? '3' : '1'} RSVPs</b> in the past hour.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>12m ago</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ligo-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>
                    M
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      Shared by <b>Marcus T.</b> in Exec Board chat.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>1h ago</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,17,13,0.05)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EVI.Calendar style={{ width: 20, height: 20 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      <b>4 brothers</b> added it to their calendars.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>3h ago</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(249,115,22,0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EVI.Globe style={{ width: 20, height: 20 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      Event published.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>Just now</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(249,115,22,0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EVI.Check style={{ width: 20, height: 20 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      <b>14 RSVPs</b> in the past hour.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>Just now</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(90,106,190,0.1)', color: '#3a4a9e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>
                    JE
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      Shared by <b>Georgetown Jazz Ensemble</b>.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>24m ago</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(20,17,13,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,17,13,0.05)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EVI.Share style={{ width: 20, height: 20 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>
                      <b>6 people</b> invited friends.
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.4)', fontWeight: 500, marginTop: 2 }}>1h ago</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 20 }}>Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button 
              onClick={() => setBlastOpen(true)}
              style={{ padding: 24, background: 'var(--ink)', color: '#fff', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}>
              <EVI.Share />
              <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message attendees</div>
            </button>
            <button style={{ padding: 24, background: 'var(--ink)', color: '#fff', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}>
              <EVI.Check />
              <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start check-in</div>
            </button>
            {onDelete && (
              <button 
                onClick={onDelete}
                style={{ padding: 24, background: 'rgba(255,59,48,0.1)', color: '#FF3B30', textAlign: 'left', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16, marginTop: 8 }}>
                <EVI.X style={{ width: 16, height: 16 }} />
                <div style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delete event</div>
              </button>
            )}
          </div>
        </div>

        <div style={{ height: 120 }} />
      </div>

      {blastOpen && (
        <div className="sheet-backdrop" style={{ position: 'absolute', inset: 0, background: 'rgba(20,17,13,0.4)', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="sheet-content screen-fade" style={{ background: 'var(--ligo-paper)', height: '80%', borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ padding: '24px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--ink)' }}>
              <button onClick={() => { setBlastOpen(false); setBlastText(''); }} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', cursor: 'pointer' }}>Cancel</button>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)' }}>
                New Message
              </div>
              <div style={{ width: 50 }} /> {/* Spacer */}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '40px 20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1, textTransform: 'uppercase', margin: 0, marginBottom: 8 }}>Send Update</h2>
                  <div style={{ fontSize: 14, color: 'rgba(20,17,13,0.6)', fontWeight: 500 }}>
                    This will be sent as a push notification to {event.goingCount} people going.
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <textarea 
                  placeholder="What do attendees need to know?"
                  value={blastText}
                  onChange={(e) => setBlastText(e.target.value)}
                  style={{ flex: 1, width: '100%', fontSize: 20, fontWeight: 500, color: 'var(--ink)', background: 'transparent', border: 'none', outline: 'none', resize: 'none', paddingTop: 16, lineHeight: 1.4 }}
                />
                
                <div style={{ position: 'absolute', bottom: 16, right: 0 }}>
                  <button 
                    onClick={() => setBlastText("Hey thanks for RSVPing to our concert! We can't wait to present to you our new pop, rock, and R&B arrangements. Just a reminder the event is at Gaston Hall, doors open at 7:30 PM. Can't wait to see you!")}
                    style={{ background: 'rgba(20,17,13,0.05)', color: 'var(--ink)', border: 'none', padding: '8px 16px', borderRadius: 16, fontSize: 11, fontWeight: 500, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    Autofill Mock Message
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: 20, borderTop: '2px solid rgba(20,17,13,0.1)' }}>
              <button 
                disabled={!blastText.trim()}
                onClick={() => {
                  onToast(`Update sent to ${event.goingCount} people!`);
                  setBlastOpen(false);
                  setBlastText('');
                }}
                style={{ width: '100%', padding: '20px', background: !blastText.trim() ? 'rgba(20,17,13,0.1)' : 'var(--orange)', color: !blastText.trim() ? 'rgba(20,17,13,0.4)' : '#fff', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: 'pointer', borderRadius: 16 }}>
                Send Blast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
