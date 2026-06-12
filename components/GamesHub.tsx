'use client';
import React, { useState, useEffect } from 'react';
import { getDayIndex, getQSet } from '@/lib/gameQuestions';
import { loadDailyResults, saveGameResult, type FormatId, type DailyResults } from '@/lib/gameState';
import { GamePlayer } from './GamePlayer';

const FF = 'Bricolage Grotesque, sans-serif';

// ── Sprite icons cropped from real games page PNG ────────────────────
// Image: 704×1485. Phone screen area: x≈25–679, y≈60–1430.
// Cards start at y≈294; card dims: left x=25–346, right x=358–679, h=263px each.
// Icon centers (estimated): Trivia (185,355), Ranking (520,355), Soundmoji (352,555)
const SPRITE = '/assets/real-games-page.png';
const SPRITE_W = 704, SPRITE_H = 1485;

function SpriteIcon({ cx, cy, size = 72 }: { cx: number; cy: number; size?: number }) {
  const half = size / 2;
  return (
    <div style={{
      width: size, height: size, overflow: 'hidden', borderRadius: 12, flexShrink: 0,
      backgroundImage: `url(${SPRITE})`,
      backgroundSize: `${SPRITE_W}px ${SPRITE_H}px`,
      backgroundPosition: `${-(cx - half)}px ${-(cy - half)}px`,
      backgroundRepeat: 'no-repeat',
    }} />
  );
}

function TriviaIcon() { return <SpriteIcon cx={185} cy={355} size={72} />; }
function RankingIcon() { return <SpriteIcon cx={520} cy={355} size={72} />; }
function SoundmojiIcon() { return <SpriteIcon cx={352} cy={555} size={72} />; }

// ── Stable star field ─────────────────────────────────────────────────
function makeStars(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: (i * 137.508 % 100),
    y: (i * 97.312 % 65),
    r: i % 5 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7,
    op: 0.25 + (i * 0.137 % 0.65),
    twinkle: i % 4 === 0,
    dur: 1.8 + (i * 0.23 % 2.4),
    delay: (i * 0.41 % 3.2),
  }));
}
const STARS = makeStars(72);

const FORMATS: {
  id: FormatId; name: string; desc: string;
  icon: React.ReactNode;
  grad: string; shimmer: string; accent: string; shadow: string;
  wide?: boolean;
}[] = [
  {
    id: 'trivia',
    name: 'Music Trivia',
    desc: '3 questions · timed',
    icon: <TriviaIcon />,
    grad: 'linear-gradient(145deg, #F97316 0%, #9A3412 100%)',
    shimmer: 'rgba(249,115,22,0.55)',
    accent: '#FCD34D',
    shadow: 'rgba(249,115,22,0.35)',
  },
  {
    id: 'ranking',
    name: 'Chart Ranker',
    desc: 'Rank 4 items · timed',
    icon: <RankingIcon />,
    grad: 'linear-gradient(145deg, #8B5CF6 0%, #3B0764 100%)',
    shimmer: 'rgba(139,92,246,0.55)',
    accent: '#C4B5FD',
    shadow: 'rgba(124,58,237,0.4)',
  },
  {
    id: 'soundmoji',
    name: 'Soundmoji',
    desc: 'Decode emoji · timed',
    icon: <SoundmojiIcon />,
    grad: 'linear-gradient(145deg, #22C55E 0%, #14532D 100%)',
    shimmer: 'rgba(34,197,94,0.5)',
    accent: '#86EFAC',
    shadow: 'rgba(22,163,74,0.4)',
    wide: true,
  },
];

type Props = {
  activeUserId: string;
  onBack: () => void;
};

export function GamesHub({ activeUserId, onBack }: Props) {
  const [results, setResults] = useState<DailyResults>(() => loadDailyResults(activeUserId));
  const [playing, setPlaying] = useState<FormatId | null>(null);
  const [hovered, setHovered] = useState<FormatId | null>(null);

  useEffect(() => {
    setResults(loadDailyResults(activeUserId));
    setPlaying(null);
  }, [activeUserId]);

  const dayIndex = getDayIndex();

  if (playing) {
    return (
      <GamePlayer
        format={playing}
        qset={getQSet(playing, dayIndex)}
        onComplete={(score) => {
          const updated = saveGameResult(activeUserId, playing, score);
          setResults(updated);
          setPlaying(null);
        }}
        onBack={() => setPlaying(null)}
      />
    );
  }

  const playedCount = FORMATS.filter(f => results[f.id] !== null).length;
  const totalScore = FORMATS.reduce((sum, f) => sum + (results[f.id]?.score ?? 0), 0);
  const TOTAL = FORMATS.length;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#06040A',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>

      {/* ── Star field ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map(s => (
          <div key={s.id} style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: '50%',
            background: '#fff',
            opacity: s.op,
            // @ts-ignore css custom property
            '--so': s.op,
            animation: s.twinkle ? `star-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` : undefined,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* ── Aurora blobs ────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-25%', left: '-8%',
          width: '65%', height: '55%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.5) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'aurora-1 13s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '-18%', right: '-12%',
          width: '58%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(113,192,127,0.45) 0%, transparent 70%)',
          filter: 'blur(52px)',
          animation: 'aurora-2 17s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '2%', left: '28%',
          width: '52%', height: '38%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(234,140,225,0.35) 0%, transparent 70%)',
          filter: 'blur(44px)',
          animation: 'aurora-3 11s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '8%', left: '55%',
          width: '42%', height: '32%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(245,215,131,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'aurora-4 9s ease-in-out infinite',
        }} />
      </div>

      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        padding: '52px 22px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
        background: 'linear-gradient(to bottom, rgba(6,4,10,0.6), transparent)',
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 99,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: '#fff' }}>
            Ligo Games Hub
          </div>
          <div style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>
            {playedCount}/{TOTAL} today · resets at midnight
          </div>
        </div>
        {playedCount === TOTAL && (
          <div style={{
            background: 'rgba(113,192,127,0.2)', color: '#71C07F',
            border: '1px solid rgba(113,192,127,0.3)',
            borderRadius: 99, padding: '4px 11px',
            fontFamily: FF, fontSize: 11, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0,
          }}>
            All done!
          </div>
        )}
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 18px 90px', position: 'relative', zIndex: 10 }}>

        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${(playedCount / TOTAL) * 100}%`,
              background: 'linear-gradient(90deg, #F97316, #EA8CE1, #71C07F)',
              borderRadius: 99, transition: 'width 0.5s ease',
              boxShadow: '0 0 8px rgba(249,115,22,0.6)',
            }} />
          </div>
          <div style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 5, fontWeight: 600 }}>
            Day {dayIndex + 1} of 10 · Questions rotate every 10 days
          </div>
        </div>

        {/* Game card grid: 2-column top row + full-width bottom */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
          {FORMATS.map(fmt => {
            const result = results[fmt.id];
            const done = result !== null;
            const isHovered = hovered === fmt.id;

            return (
              <button
                key={fmt.id}
                onClick={() => !done && setPlaying(fmt.id)}
                onMouseEnter={() => !done && setHovered(fmt.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: fmt.wide ? '1 / -1' : undefined,
                  textAlign: 'left',
                  cursor: done ? 'default' : 'pointer',
                  borderRadius: 22,
                  padding: fmt.wide ? '18px 22px' : '16px 15px',
                  height: fmt.wide ? 120 : 168,
                  display: 'flex',
                  flexDirection: fmt.wide ? 'row' : 'column',
                  alignItems: fmt.wide ? 'center' : undefined,
                  gap: fmt.wide ? 18 : undefined,
                  position: 'relative',
                  overflow: 'hidden',
                  border: done
                    ? '1px solid rgba(255,255,255,0.1)'
                    : `1px solid ${fmt.shimmer.replace('0.55', '0.3')}`,
                  background: done
                    ? 'rgba(255,255,255,0.05)'
                    : fmt.grad,
                  boxShadow: done
                    ? 'none'
                    : `0 6px 28px -4px ${fmt.shadow}, 0 0 0 1px rgba(255,255,255,0.06) inset`,
                  transform: isHovered ? 'scale(1.025) translateY(-1px)' : 'scale(1)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                {/* Shine overlay */}
                {!done && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 55%)',
                    borderRadius: 22, pointerEvents: 'none',
                  }} />
                )}

                {/* Icon area */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: fmt.wide ? 'center' : 'flex-start',
                  width: fmt.wide ? 80 : 'auto',
                  flexShrink: fmt.wide ? 0 : undefined,
                  opacity: done ? 0.3 : 1,
                  transition: 'opacity 0.3s ease',
                }}>
                  {done
                    ? <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                        <path d="M12 20L17.5 25.5L28 14" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    : fmt.icon
                  }
                </div>

                {!fmt.wide && <div style={{ flex: 1 }} />}

                {/* Text */}
                <div style={{ flex: fmt.wide ? 1 : undefined }}>
                  <div style={{
                    fontFamily: FF, fontWeight: 800, fontSize: fmt.wide ? 16 : 14,
                    letterSpacing: '-0.01em', lineHeight: 1.2,
                    color: done ? 'rgba(255,255,255,0.45)' : '#fff',
                  }}>
                    {fmt.name}
                  </div>

                  {done && result ? (
                    <div style={{ marginTop: 5, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{
                        fontFamily: FF, fontWeight: 900, fontSize: fmt.wide ? 26 : 24,
                        color: result.score >= 500 ? '#71C07F' : result.score >= 250 ? '#F5D783' : 'rgba(255,255,255,0.5)',
                        lineHeight: 1,
                      }}>
                        {result.score}
                      </span>
                      <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>pts</span>
                    </div>
                  ) : (
                    <div style={{
                      marginTop: 4,
                      fontFamily: FF, fontSize: 11, fontWeight: 600,
                      color: fmt.accent,
                      opacity: 0.85,
                    }}>
                      {fmt.desc}
                    </div>
                  )}
                </div>

                {/* Play arrow */}
                {!done && (
                  <div style={{
                    position: 'absolute', top: 13, right: 13,
                    width: 28, height: 28, borderRadius: 99,
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* All done banner */}
        {playedCount === TOTAL && (
          <div style={{
            marginTop: 14,
            background: 'linear-gradient(135deg, rgba(245,215,131,0.12), rgba(113,192,127,0.08))',
            border: '1px solid rgba(245,215,131,0.2)',
            borderRadius: 20, padding: '18px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
            <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 16, color: '#F5D783', letterSpacing: '-0.01em' }}>
              You finished today&apos;s games!
            </div>
            <div style={{ fontFamily: FF, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              Total score: <span style={{ color: '#F5D783', fontWeight: 700 }}>{totalScore} pts</span> · Come back tomorrow
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
