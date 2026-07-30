import React, { useEffect, useState } from 'react';
import { EVI } from './Icons';

type Step =
  | 'choose'
  | 'text'
  | 'email'
  | 'uploading'
  | 'matching'
  | 'results'
  | 'sending'
  | 'native-done';

type RosterUploadMock = {
  fileName: string;
  rowCount: number;
  onLigo: number;
  notOnLigo: number;
  alreadyMembers: number;
};

const ROSTER_UPLOAD_BY_ORG: Record<string, RosterUploadMock> = {
  program_board: {
    fileName: 'ProgramBoard_Roster.csv',
    rowCount: 28,
    onLigo: 12,
    notOnLigo: 14,
    alreadyMembers: 2,
  },
  phantoms: {
    fileName: 'Phantoms_Roster.csv',
    rowCount: 22,
    onLigo: 9,
    notOnLigo: 11,
    alreadyMembers: 2,
  },
  sigma_phi_epsilon: {
    fileName: 'MemberRoster.csv',
    rowCount: 24,
    onLigo: 10,
    notOnLigo: 12,
    alreadyMembers: 2,
  },
};

const DEFAULT_ROSTER_UPLOAD: RosterUploadMock = {
  fileName: 'MemberRoster.csv',
  rowCount: 20,
  onLigo: 8,
  notOnLigo: 10,
  alreadyMembers: 2,
};

function inviteUrlForOrg(orgId?: string) {
  const slug = orgId || 'club';
  return `https://ligo.app/join/${slug}`;
}

function inviteMessage(clubName: string, url: string) {
  return `Hey — join ${clubName} on Ligo: ${url}`;
}

function inviteEmailSubject(clubName: string) {
  return `Join ${clubName} on Ligo`;
}

function inviteEmailBody(clubName: string, url: string) {
  return `Hey,\n\nYou're invited to join ${clubName} on Ligo.\n\nIf you already have the app, open this link to join the org.\nIf not, it'll take you to download Ligo first:\n\n${url}\n\nSee you there.`;
}

export function ImportContactsFlow({
  orgId,
  orgName,
  onBack,
  onClose,
}: {
  orgId?: string;
  orgName?: string;
  onBack: () => void;
  onClose: () => void;
}) {
  const clubName = orgName || 'your organization';
  const rosterMock = (orgId && ROSTER_UPLOAD_BY_ORG[orgId]) || DEFAULT_ROSTER_UPLOAD;
  const inviteUrl = inviteUrlForOrg(orgId);
  const textBody = inviteMessage(clubName, inviteUrl);
  const mailSubject = inviteEmailSubject(clubName);
  const mailBody = inviteEmailBody(clubName, inviteUrl);

  const [step, setStep] = useState<Step>('choose');
  const [nativeChannel, setNativeChannel] = useState<'share' | 'text' | 'email' | 'copy'>('share');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [copyHint, setCopyHint] = useState<string | null>(null);

  const [resultOnLigo, setResultOnLigo] = useState(0);
  const [resultNotOnLigo, setResultNotOnLigo] = useState(0);
  const [resultAlreadyMembers, setResultAlreadyMembers] = useState(0);

  useEffect(() => {
    if (step === 'uploading') {
      const t = setTimeout(() => setStep('matching'), 1400);
      return () => clearTimeout(t);
    }
    if (step === 'matching') {
      const t = setTimeout(() => setStep('results'), 1800);
      return () => clearTimeout(t);
    }
    if (step === 'sending') {
      const t = setTimeout(() => onClose(), 1600);
      return () => clearTimeout(t);
    }
  }, [step, onClose]);

  const startRosterUpload = () => {
    setResultOnLigo(rosterMock.onLigo);
    setResultNotOnLigo(rosterMock.notOnLigo);
    setResultAlreadyMembers(rosterMock.alreadyMembers);
    setStep('uploading');
  };

  const leave = () => onBack();

  const goBack = () => {
    if (step === 'choose' || step === 'native-done' || step === 'results') {
      leave();
      return;
    }
    if (step === 'text' || step === 'email') {
      setStep('choose');
      return;
    }
    // uploading / matching / sending — don't strand them
    leave();
  };

  const markNativeDone = (channel: typeof nativeChannel) => {
    setNativeChannel(channel);
    setStep('native-done');
  };

  const handleShareLink = async () => {
    const payload = {
      title: `Join ${clubName} on Ligo`,
      text: textBody,
      url: inviteUrl,
    };

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share(payload);
        markNativeDone('share');
        return;
      }
    } catch (err: any) {
      // User canceled share sheet — stay on choose
      if (err?.name === 'AbortError') return;
    }

    // Desktop / unsupported: copy link
    try {
      await navigator.clipboard.writeText(`${textBody}`);
      setCopyHint('Invite message copied');
      markNativeDone('copy');
    } catch {
      setCopyHint('Copy this link: ' + inviteUrl);
      markNativeDone('copy');
    }
  };

  const handleOpenMessages = () => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    const href = cleaned
      ? `sms:${cleaned}&body=${encodeURIComponent(textBody)}`
      : `sms:&body=${encodeURIComponent(textBody)}`;
    window.location.href = href;
    markNativeDone('text');
  };

  const handleOpenMail = () => {
    const to = email.trim();
    const href = to
      ? `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
      : `mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = href;
    markNativeDone('email');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: '1px solid rgba(20,17,13,0.12)',
    background: '#fff',
    fontSize: 15,
    color: 'var(--ink)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const optionBtn: React.CSSProperties = {
    padding: 20,
    background: '#fff',
    borderRadius: 16,
    border: '1px solid rgba(20,17,13,0.08)',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    width: '100%',
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--ligo-paper)',
      zIndex: 150,
      display: 'flex',
      flexDirection: 'column',
      padding: 'max(env(safe-area-inset-top, 56px), 56px) 24px max(env(safe-area-inset-bottom, 40px), 40px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <button
          onClick={goBack}
          aria-label="Back"
          style={{
            background: 'var(--ink)',
            color: '#fff',
            border: 'none',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <EVI.Back />
        </button>
        <div style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--orange)' }}>
          Invite Members
        </div>
        <button onClick={leave} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EVI.Close />
        </button>
      </div>

      {step === 'choose' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: 36, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 12 }}>
            Invite people to<br/>{clubName}.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(20,17,13,0.6)', lineHeight: 1.4, marginBottom: 28 }}>
            Get your members on Ligo so they can find events, stay in the loop, and show up.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={handleShareLink} style={optionBtn}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(20,17,13,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', flexShrink: 0 }}>
                <EVI.Share />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>Share link</div>
                <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', marginTop: 4 }}>
                  Send your invite any way you want
                </div>
              </div>
            </button>

            <button onClick={() => setStep('text')} style={optionBtn}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(20,17,13,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', flexShrink: 0 }}>
                <EVI.Invite />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>Text invite</div>
                <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', marginTop: 4 }}>
                  Message someone directly
                </div>
              </div>
            </button>

            <button onClick={() => setStep('email')} style={optionBtn}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(20,17,13,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', flexShrink: 0 }}>
                <EVI.Mail />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>Email invite</div>
                <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', marginTop: 4 }}>
                  Send it to their inbox
                </div>
              </div>
            </button>

            <button onClick={startRosterUpload} style={optionBtn}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(20,17,13,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', flexShrink: 0 }}>
                <EVI.Group />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>Upload roster</div>
                <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.5)', marginTop: 4 }}>
                  Invite your whole membership at once
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === 'text' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => setStep('choose')}
            style={{ background: 'none', border: 'none', padding: 0, marginBottom: 16, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: 'rgba(20,17,13,0.5)', textAlign: 'left' }}
          >
            ← Back
          </button>
          <h2 style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 8 }}>
            Text invite
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(20,17,13,0.55)', lineHeight: 1.4, marginBottom: 24 }}>
            Add a number or pick who to text next.
          </p>

          <div style={{
            padding: 16,
            background: '#fff',
            borderRadius: 16,
            border: '1px solid rgba(20,17,13,0.08)',
            marginBottom: 16,
            fontSize: 14,
            lineHeight: 1.45,
            color: 'var(--ink)',
            whiteSpace: 'pre-wrap',
          }}>
            {textBody}
          </div>

          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone number"
            inputMode="tel"
            style={{ ...inputStyle, marginBottom: 16 }}
          />

          <button
            onClick={handleOpenMessages}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: 16,
              background: 'var(--ink)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              marginTop: 'auto',
            }}
          >
            Send text
          </button>
        </div>
      )}

      {step === 'email' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => setStep('choose')}
            style={{ background: 'none', border: 'none', padding: 0, marginBottom: 16, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: 'rgba(20,17,13,0.5)', textAlign: 'left' }}
          >
            ← Back
          </button>
          <h2 style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 8 }}>
            Email invite
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(20,17,13,0.55)', lineHeight: 1.4, marginBottom: 24 }}>
            Add an email or choose the recipient next.
          </p>

          <div style={{
            padding: 16,
            background: '#fff',
            borderRadius: 16,
            border: '1px solid rgba(20,17,13,0.08)',
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 6 }}>
              Subject
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 14 }}>{mailSubject}</div>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(20,17,13,0.4)', marginBottom: 6 }}>
              Message
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{mailBody}</div>
          </div>

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            inputMode="email"
            style={{ ...inputStyle, marginBottom: 16 }}
          />

          <button
            onClick={handleOpenMail}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: 16,
              background: 'var(--ink)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              marginTop: 'auto',
            }}
          >
            Send email
          </button>
        </div>
      )}

      {step === 'native-done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 64, height: 64, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 24 }}>
            <EVI.Check style={{ width: 32, height: 32 }} />
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 12 }}>
            {nativeChannel === 'copy' ? 'Link copied.' : 'Invite sent.'}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(20,17,13,0.55)', lineHeight: 1.4, marginBottom: 28 }}>
            {nativeChannel === 'copy'
              ? 'Paste it wherever your members already are.'
              : `They'll land in ${clubName} once they join on Ligo.`}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
            <button
              onClick={() => setStep('choose')}
              style={{
                width: '100%',
                padding: 18,
                borderRadius: 16,
                background: 'var(--ink)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Invite someone else
            </button>
            <button
              onClick={leave}
              style={{
                width: '100%',
                padding: 18,
                borderRadius: 16,
                background: 'transparent',
                color: 'var(--ink)',
                fontSize: 15,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {(step === 'uploading' || step === 'matching' || step === 'sending') && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="spinner" style={{ width: 48, height: 48, border: '4px solid rgba(249,115,22,0.2)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 24 }} />
          <h2 style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', textTransform: 'uppercase', marginBottom: 8 }}>
            {step === 'uploading'
              ? 'Uploading roster...'
              : step === 'matching'
                ? 'Finding members...'
                : 'Sending invites...'}
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(20,17,13,0.6)', maxWidth: 280, lineHeight: 1.4 }}>
            {step === 'uploading'
              ? `Importing ${rosterMock.rowCount} people`
              : step === 'matching'
                ? `Matching your roster to people already on Ligo`
                : `Inviting ${resultOnLigo + resultNotOnLigo} people to ${clubName}`}
          </p>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}

      {step === 'results' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 64, height: 64, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 24 }}>
            <EVI.Check style={{ width: 32, height: 32 }} />
          </div>

          <h2 style={{ fontSize: 36, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 12 }}>
            Ready to invite.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(20,17,13,0.55)', lineHeight: 1.4, marginBottom: 28 }}>
            We found {rosterMock.rowCount} people on your roster.
          </p>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(20,17,13,0.06)', overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ padding: 20, borderBottom: '1px solid rgba(20,17,13,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{resultOnLigo}</div>
                <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', fontWeight: 500 }}>Already on Ligo</div>
              </div>
              <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(249,115,22,0.1)', padding: '4px 10px', borderRadius: 20 }}>
                Join org
              </div>
            </div>
            <div style={{ padding: 20, borderBottom: resultAlreadyMembers > 0 ? '1px solid rgba(20,17,13,0.06)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{resultNotOnLigo}</div>
                <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', fontWeight: 500 }}>Need Ligo</div>
              </div>
              <div style={{ color: 'var(--ink)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(20,17,13,0.05)', padding: '4px 10px', borderRadius: 20 }}>
                Get the app
              </div>
            </div>
            {resultAlreadyMembers > 0 && (
              <div style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{resultAlreadyMembers}</div>
                  <div style={{ fontSize: 13, color: 'rgba(20,17,13,0.6)', fontWeight: 500 }}>Already members</div>
                </div>
                <div style={{ color: 'rgba(20,17,13,0.45)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(20,17,13,0.04)', padding: '4px 10px', borderRadius: 20 }}>
                  Skipped
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setStep('sending')}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: 16,
              background: 'var(--ink)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              marginTop: 'auto',
            }}
          >
            Send invites
          </button>
        </div>
      )}
    </div>
  );
}
