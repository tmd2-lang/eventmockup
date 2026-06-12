'use client';
import React, { useState, useEffect, useRef } from 'react';
import type { TriviaQ, RankingQ, TierQ, SoundmojiQ, QSet, Difficulty, TriviaOpt } from '@/lib/gameQuestions';
import { FLASH_MS, ANSWER_MS, SPEED_MS } from '@/lib/gameQuestions';

const FF = 'Bricolage Grotesque, sans-serif';
const DIFF_MULT: Record<Difficulty, number> = { easy: 1.0, medium: 1.5, hard: 2.0 };
const TIER_ARR = ['S', 'A', 'B', 'C'];
const TIER_COLORS: Record<string, string> = { S: '#F97316', A: '#A78BFA', B: '#38BDF8', C: '#4ADE80' };

// Dark-theme palette
const D = {
  bg:     '#06040A',
  card:   'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.1)',
  text:   '#fff',
  muted:  'rgba(255,255,255,0.5)',
  dim:    'rgba(255,255,255,0.25)',
  correct: { bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.45)', text: '#4ADE80' },
  wrong:   { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.4)',  text: '#F87171' },
};

type QResult = { correct: boolean; pts: number; elapsed: number };
type Phase = 'flash' | 'answer' | 'reveal' | 'summary';
type PlayerProps = {
  format: string;
  qset: QSet;
  onComplete: (totalScore: number) => void;
  onBack: () => void;
};

const FORMAT_META: Record<string, { title: string; emoji: string; accent: string }> = {
  trivia:    { title: 'Music Trivia', emoji: '🎵', accent: '#F97316' },
  ranking:   { title: 'Chart Ranker', emoji: '📊', accent: '#A78BFA' },
  soundmoji: { title: 'Soundmoji',    emoji: '🎭', accent: '#4ADE80' },
};

function calcPts(format: string, diff: Difficulty, elapsed: number, streak: number, accuracy: number): number {
  const threshold = SPEED_MS[format];
  const speedBonus = elapsed < threshold ? 0.25 * (1 - elapsed / threshold) : 0;
  const streakMult = 1 + streak * 0.25;
  return Math.round(accuracy * DIFF_MULT[diff] * (1 + speedBonus) * streakMult);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Aurora blobs (subtle, behind content) ──────────────────────────
function AuroraBg({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '45%',
        borderRadius: '50%',
        background: `radial-gradient(ellipse, ${accent}35 0%, transparent 70%)`,
        filter: 'blur(40px)',
        animation: 'aurora-1 14s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%', width: '50%', height: '40%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(113,192,127,0.25) 0%, transparent 70%)',
        filter: 'blur(44px)',
        animation: 'aurora-2 18s ease-in-out infinite',
      }} />
    </div>
  );
}

// ── Timer bar ───────────────────────────────────────────────────────
function TimerBar({ left, total, accent }: { left: number; total: number; accent: string }) {
  const pct = total > 0 ? Math.max(0, (left / total) * 100) : 0;
  const low = pct < 25;
  return (
    <div style={{ height: 2, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: low ? '#F87171' : accent,
        transition: 'width 0.05s linear',
        borderRadius: '0 2px 2px 0',
        boxShadow: low ? '0 0 6px rgba(248,113,113,0.6)' : `0 0 6px ${accent}80`,
      }} />
    </div>
  );
}

// ── Flash screen ────────────────────────────────────────────────────
function FlashScreen({ q, left, total, accent }: { q: TriviaQ | SoundmojiQ; left: number; total: number; accent: string }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TimerBar left={left} total={total} accent={accent} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', gap: 16 }}>
        <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: D.dim }}>
          Read the question
        </div>
        {q.format === 'soundmoji' ? (
          <>
            <div style={{ fontSize: 58, letterSpacing: '0.1em', lineHeight: 1.2 }}>{(q as SoundmojiQ).content.emojis}</div>
            <div style={{ fontFamily: FF, fontSize: 14, color: D.muted }}>{(q as SoundmojiQ).content.hint}</div>
          </>
        ) : (
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: D.text, margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
            {(q as TriviaQ).content.prompt}
          </p>
        )}
        <div style={{
          fontFamily: FF, fontSize: 28, fontWeight: 900, color: accent, lineHeight: 1,
          textShadow: `0 0 20px ${accent}80`,
        }}>
          {Math.ceil(left / 1000)}
        </div>
      </div>
    </div>
  );
}

// ── Quick reveal ────────────────────────────────────────────────────
function QuickReveal({ result, accent }: { result: QResult; accent: string }) {
  const color = result.correct ? '#4ADE80' : '#F87171';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ fontSize: 48, lineHeight: 1, filter: result.correct ? 'drop-shadow(0 0 16px #4ADE8080)' : 'drop-shadow(0 0 16px #F8717180)' }}>
        {result.correct ? '✓' : '✗'}
      </div>
      <div style={{
        fontFamily: FF, fontWeight: 900, fontSize: 52, color, lineHeight: 1,
        textShadow: `0 0 24px ${color}60`,
      }}>
        +{result.pts}
      </div>
      <div style={{ fontFamily: FF, fontSize: 14, color: D.muted }}>
        {result.correct ? (result.elapsed < 3000 ? 'Lightning fast!' : 'Correct!') : 'Not quite'}
      </div>
    </div>
  );
}

// ── Summary ─────────────────────────────────────────────────────────
function Summary({ results, onDone }: { results: QResult[]; onDone: () => void }) {
  const total = results.reduce((s, r) => s + r.pts, 0);
  const labels = ['Easy', 'Medium', 'Hard'];
  const { label, color } = total >= 600
    ? { label: 'Perfect run!', color: '#F5D783' }
    : total >= 400
    ? { label: 'Great work',   color: '#4ADE80' }
    : total >= 200
    ? { label: 'Not bad',      color: '#F97316' }
    : { label: 'Keep going',   color: D.muted };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px 22px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 64, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, textShadow: '0 0 40px rgba(249,115,22,0.4)' }}>
            {total}
          </div>
          <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 14, color, marginTop: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {label}
          </div>
          <div style={{ fontFamily: FF, fontSize: 12, color: D.dim, marginTop: 3 }}>out of 734 possible pts</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
          {results.map((r, i) => {
            const c = r.correct ? '#4ADE80' : '#F87171';
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: r.correct ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.07)',
                borderRadius: 16, padding: '13px 16px',
                border: `1px solid ${r.correct ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.18)'}`,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, flexShrink: 0, background: `${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FF, fontWeight: 800, fontSize: 12, color: c }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 13, color: D.text }}>{labels[i]}</div>
                  <div style={{ fontFamily: FF, fontSize: 11, color: D.muted, marginTop: 1 }}>
                    {r.correct ? `${(r.elapsed / 1000).toFixed(1)}s` : 'Missed'}
                  </div>
                </div>
                <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 22, color: c, textShadow: r.correct ? '0 0 12px #4ADE8060' : undefined }}>
                  +{r.pts}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onDone} style={{
          width: '100%', padding: '15px 0',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(194,65,12,0.95))',
          color: '#fff', borderRadius: 16, border: 'none', cursor: 'pointer',
          fontFamily: FF, fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em',
          boxShadow: '0 4px 20px -4px rgba(249,115,22,0.5)',
        }}>
          Back to Games Hub
        </button>
      </div>
    </div>
  );
}

// ── Option button helper ─────────────────────────────────────────────
function Opt({ text, state, onClick }: { text: string; state: 'idle' | 'correct' | 'wrong'; onClick: () => void }) {
  const s = state === 'correct' ? D.correct : state === 'wrong' ? D.wrong : null;
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', padding: '13px 16px',
      background: s ? s.bg : D.card,
      border: `1px solid ${s ? s.border : D.border}`,
      borderRadius: 14, cursor: state === 'idle' ? 'pointer' : 'default',
      fontFamily: FF, fontWeight: 600, fontSize: 14, color: s ? s.text : D.text,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      {text}
      {state === 'correct' && <span style={{ color: '#4ADE80' }}>✓</span>}
      {state === 'wrong'   && <span style={{ color: '#F87171' }}>✗</span>}
    </button>
  );
}

// ── Trivia board ─────────────────────────────────────────────────────
function TriviaBoard({ q, onAnswer, left, total, accent }: { q: TriviaQ; onAnswer: (c: boolean, a: number) => void; left: number; total: number; accent: string }) {
  const [opts] = useState<TriviaOpt[]>(() => shuffle(q.content.options));
  const [sel, setSel] = useState<string | null>(null);

  const handle = (id: string) => {
    if (sel) return;
    setSel(id);
    const correct = id === q.content.correctOptionId;
    setTimeout(() => onAnswer(correct, correct ? 100 : 0), 320);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TimerBar left={left} total={total} accent={accent} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 8 }}>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: D.text, margin: 0, lineHeight: 1.4, flex: 1 }}>
            {q.content.prompt}
          </p>
          <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 800, color: left < 3000 ? '#F87171' : D.muted, flexShrink: 0, minWidth: 28, textAlign: 'right' }}>
            {Math.ceil(left / 1000)}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {opts.map(opt => {
            const revealed = !!sel;
            const isCorrect = opt.id === q.content.correctOptionId;
            const st = !revealed ? 'idle' : isCorrect ? 'correct' : sel === opt.id ? 'wrong' : 'idle';
            return <Opt key={opt.id} text={opt.text} state={st} onClick={() => handle(opt.id)} />;
          })}
        </div>
      </div>
    </div>
  );
}

// ── Soundmoji board ──────────────────────────────────────────────────
function SoundmojiBoard({ q, onAnswer, left, total, accent }: { q: SoundmojiQ; onAnswer: (c: boolean, a: number) => void; left: number; total: number; accent: string }) {
  const [opts] = useState<TriviaOpt[]>(() => shuffle(q.content.options));
  const [sel, setSel] = useState<string | null>(null);

  const handle = (id: string) => {
    if (sel) return;
    setSel(id);
    const correct = id === q.content.correctOptionId;
    setTimeout(() => onAnswer(correct, correct ? 100 : 0), 320);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TimerBar left={left} total={total} accent={accent} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 18, padding: '16px', textAlign: 'center', marginBottom: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 40, letterSpacing: '0.1em', marginBottom: 5 }}>{q.content.emojis}</div>
            <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: D.dim, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{q.content.hint}</div>
          </div>
          <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 800, color: left < 5000 ? '#F87171' : D.muted, flexShrink: 0, minWidth: 28 }}>
            {Math.ceil(left / 1000)}
          </span>
        </div>
        <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 14, color: D.muted, margin: '0 0 11px' }}>What song is this?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {opts.map(opt => {
            const revealed = !!sel;
            const isCorrect = opt.id === q.content.correctOptionId;
            const st = !revealed ? 'idle' : isCorrect ? 'correct' : sel === opt.id ? 'wrong' : 'idle';
            return <Opt key={opt.id} text={opt.text} state={st} onClick={() => handle(opt.id)} />;
          })}
        </div>
      </div>
    </div>
  );
}

// ── Ranking board ────────────────────────────────────────────────────
function RankingBoard({ q, onAnswer, left, total, accent }: { q: RankingQ; onAnswer: (c: boolean, a: number) => void; left: number; total: number; accent: string }) {
  const [order, setOrder] = useState<string[]>(() => shuffle(q.content.items.map(it => it.id)));

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...order];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setOrder(next);
  };

  const submit = () => {
    const correct = [...q.content.items].sort((a, b) =>
      q.content.direction === 'asc' ? a.value - b.value : b.value - a.value
    );
    let hits = 0;
    order.forEach((id, i) => { if (correct[i].id === id) hits++; });
    onAnswer(hits === q.content.items.length, (hits / q.content.items.length) * 100);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TimerBar left={left} total={total} accent={accent} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: D.text, margin: 0, lineHeight: 1.35, flex: 1 }}>
            {q.content.prompt}
          </p>
          <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 800, color: left < 12000 ? '#F87171' : D.muted, flexShrink: 0, minWidth: 28 }}>
            {Math.ceil(left / 1000)}
          </span>
        </div>
        <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, color: D.dim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 11 }}>
          Use arrows to reorder
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {order.map((id, idx) => {
            const item = q.content.items.find(it => it.id === id)!;
            return (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: D.card, borderRadius: 14, padding: '11px 13px', border: `1px solid ${D.border}` }}>
                <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 12, color: D.dim, width: 18, flexShrink: 0 }}>#{idx + 1}</span>
                <span style={{ flex: 1, fontFamily: FF, fontWeight: 600, fontSize: 13, color: D.text, lineHeight: 1.3 }}>
                  {item.label}
                  {item.sublabel && <span style={{ color: D.muted, fontWeight: 400 }}> · {item.sublabel}</span>}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                  {([[-1, '18 15l-6-6-6 6'], [1, '6 9l6 6 6-6']] as [number, string][]).map(([dir, path]) => {
                    const disabled = dir === -1 ? idx === 0 : idx === order.length - 1;
                    return (
                      <button key={dir} onClick={() => move(idx, dir as -1 | 1)} disabled={disabled} style={{
                        width: 26, height: 22, border: `1px solid ${D.border}`, borderRadius: 6,
                        background: 'rgba(255,255,255,0.04)', cursor: disabled ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.2 : 1,
                      }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={`M${path}`} />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={submit} style={{
          width: '100%', padding: '13px 0',
          background: `linear-gradient(135deg, ${accent}CC, ${accent}88)`,
          color: '#fff', borderRadius: 15, border: 'none', cursor: 'pointer',
          fontFamily: FF, fontWeight: 800, fontSize: 14, marginTop: 12,
          boxShadow: `0 4px 16px -4px ${accent}60`,
        }}>
          Submit Order
        </button>
      </div>
    </div>
  );
}

// ── Tier board (drag-and-drop, dark theme) ───────────────────────────
function TierBoard({ q, onAnswer, left, total, accent }: { q: TierQ; onAnswer: (c: boolean, a: number) => void; left: number; total: number; accent: string }) {
  const [poolItems] = useState(() => shuffle([...q.content.items]));
  const [slots, setSlots] = useState<Record<string, string | null>>({ S: null, A: null, B: null, C: null });
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const assigned = new Set(Object.values(slots).filter(Boolean) as string[]);
  const unassigned = poolItems.filter(it => !assigned.has(it.id));
  const allDone = q.content.items.every(it => assigned.has(it.id));

  const startDrag = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.effectAllowed = 'move';
    setDragging(itemId);
  };

  const dropOnTier = (e: React.DragEvent, tierId: string) => {
    e.preventDefault();
    if (!dragging) return;
    setSlots(prev => {
      const next = { ...prev };
      for (const t of Object.keys(next)) { if (next[t] === dragging) next[t] = null; }
      next[tierId] = dragging;
      return next;
    });
    setDragging(null); setDragOver(null);
  };

  const dropOnPool = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragging) return;
    setSlots(prev => {
      const next = { ...prev };
      for (const t of Object.keys(next)) { if (next[t] === dragging) next[t] = null; }
      return next;
    });
    setDragging(null); setDragOver(null);
  };

  const submit = () => {
    let correct = 0;
    for (const [tier, itemId] of Object.entries(slots)) {
      if (!itemId) continue;
      const item = q.content.items.find(it => it.id === itemId);
      if (item?.correctTier === tier) correct++;
    }
    onAnswer(correct === q.content.items.length, (correct / q.content.items.length) * 100);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TimerBar left={left} total={total} accent={accent} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em', color: D.text, margin: 0, lineHeight: 1.35, flex: 1 }}>
            {q.content.prompt}
          </p>
          <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 800, color: left < 12000 ? '#F87171' : D.muted, flexShrink: 0, minWidth: 28 }}>
            {Math.ceil(left / 1000)}
          </span>
        </div>
        <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, color: D.dim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 11 }}>
          Drag artists into tiers
        </div>

        {/* Tier slots */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {TIER_ARR.map(tierId => {
            const itemId = slots[tierId];
            const item = itemId ? q.content.items.find(it => it.id === itemId) : null;
            const color = TIER_COLORS[tierId];
            const isOver = dragOver === tierId;
            return (
              <div
                key={tierId}
                onDragOver={e => { e.preventDefault(); setDragOver(tierId); }}
                onDragLeave={() => setDragOver(null)}
                onDrop={e => dropOnTier(e, tierId)}
                style={{
                  borderRadius: 14, padding: '10px 12px', minHeight: 66,
                  border: `2px solid ${isOver ? color : dragging ? `${color}50` : `${color}28`}`,
                  background: isOver ? `${color}18` : `${color}08`,
                  transition: 'border-color 0.12s, background 0.12s',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}
              >
                <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 15, color, letterSpacing: '-0.01em', textShadow: `0 0 12px ${color}60` }}>
                  {tierId}
                </div>
                {item && (
                  <div
                    draggable
                    onDragStart={e => startDrag(e, item.id)}
                    onDragEnd={() => { setDragging(null); setDragOver(null); }}
                    style={{
                      background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 9px',
                      fontFamily: FF, fontWeight: 700, fontSize: 11, color: '#fff',
                      cursor: 'grab', userSelect: 'none', opacity: dragging === item.id ? 0.4 : 1,
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {item.label}
                  </div>
                )}
                {!item && (
                  <div style={{ fontFamily: FF, fontSize: 10, color: isOver ? color : `${color}50`, fontStyle: 'italic', fontWeight: isOver ? 700 : 400 }}>
                    {isOver ? 'Drop here' : 'empty'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pool */}
        {unassigned.length > 0 && (
          <div
            onDragOver={e => { e.preventDefault(); setDragOver('pool'); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={dropOnPool}
            style={{
              borderRadius: 14, padding: '10px 10px 8px',
              border: `1.5px dashed ${dragOver === 'pool' ? accent : 'rgba(255,255,255,0.15)'}`,
              background: dragOver === 'pool' ? `${accent}0A` : 'transparent',
              transition: 'border-color 0.12s, background 0.12s',
              marginBottom: 12,
            }}
          >
            <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: D.dim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Drag to a tier
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {unassigned.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={e => startDrag(e, item.id)}
                  onDragEnd={() => { setDragging(null); setDragOver(null); }}
                  style={{
                    padding: '8px 13px',
                    background: dragging === item.id ? `${accent}25` : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${dragging === item.id ? accent : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 10, cursor: 'grab',
                    fontFamily: FF, fontWeight: 700, fontSize: 12, color: D.text,
                    userSelect: 'none', opacity: dragging === item.id ? 0.5 : 1,
                    transition: 'opacity 0.1s',
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {allDone && (
          <button onClick={submit} style={{
            width: '100%', padding: '13px 0',
            background: `linear-gradient(135deg, ${accent}CC, ${accent}88)`,
            color: '#fff', borderRadius: 15, border: 'none', cursor: 'pointer',
            fontFamily: FF, fontWeight: 800, fontSize: 14,
            boxShadow: `0 4px 16px -4px ${accent}60`,
          }}>
            Submit Tiers
          </button>
        )}
      </div>
    </div>
  );
}

// ── Orchestrator ─────────────────────────────────────────────────────
export function GamePlayer({ format, qset, onComplete, onBack }: PlayerProps) {
  const hasFlash = FLASH_MS[format] > 0;
  const initMs = hasFlash ? FLASH_MS[format] : ANSWER_MS[format][qset[0].difficulty];

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>(hasFlash ? 'flash' : 'answer');
  const [timeLeft, setTimeLeft] = useState(initMs);
  const [totalMs, setTotalMs] = useState(initMs);
  const [results, setResults] = useState<QResult[]>([]);
  const [lastResult, setLastResult] = useState<QResult | null>(null);
  const [streak, setStreak] = useState(0);

  const answerStartRef = useRef(hasFlash ? 0 : Date.now());
  const committedRef = useRef(false);
  const stepRef = useRef(step);
  const streakRef = useRef(streak);
  stepRef.current = step;
  streakRef.current = streak;

  const q = qset[step];
  const meta = FORMAT_META[format] ?? { title: 'Game', emoji: '🎮', accent: '#F97316' };
  const accent = meta.accent;

  useEffect(() => {
    if (phase !== 'flash' && phase !== 'answer') return;
    committedRef.current = false;
    const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 50)), 50);
    return () => clearInterval(id);
  }, [phase, step]);

  useEffect(() => {
    if (timeLeft > 0) return;
    if (phase === 'flash') {
      const ms = ANSWER_MS[format][q.difficulty];
      answerStartRef.current = Date.now();
      setTotalMs(ms); setTimeLeft(ms); setPhase('answer');
    } else if (phase === 'answer' && !committedRef.current) {
      committedRef.current = true;
      const result: QResult = { correct: false, pts: 0, elapsed: ANSWER_MS[format][q.difficulty] };
      setLastResult(result); setResults(prev => [...prev, result]); setStreak(0); setPhase('reveal');
    }
  }, [timeLeft, phase, step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase !== 'reveal') return;
    const id = setTimeout(() => {
      const nextStep = stepRef.current + 1;
      if (nextStep < 3) {
        setStep(nextStep);
        if (hasFlash) {
          const ms = FLASH_MS[format];
          setTotalMs(ms); setTimeLeft(ms); setPhase('flash');
        } else {
          const ms = ANSWER_MS[format][qset[nextStep].difficulty];
          answerStartRef.current = Date.now();
          setTotalMs(ms); setTimeLeft(ms); setPhase('answer');
        }
      } else {
        setPhase('summary');
      }
    }, 1500);
    return () => clearTimeout(id);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = (correct: boolean, accuracy: number) => {
    if (committedRef.current) return;
    committedRef.current = true;
    const elapsed = Date.now() - answerStartRef.current;
    const pts = calcPts(format, q.difficulty, elapsed, streakRef.current, accuracy);
    const result: QResult = { correct, pts, elapsed };
    setLastResult(result);
    setResults(prev => [...prev, result]);
    setStreak(prev => correct ? prev + 1 : 0);
    setPhase('reveal');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: D.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AuroraBg accent={accent} />

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 10,
        padding: '52px 20px 14px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 99,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.07)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em', color: D.text }}>
            {meta.emoji} {meta.title}
          </div>
          {phase !== 'summary' && (
            <div style={{ fontFamily: FF, fontSize: 11, color: D.muted, marginTop: 1 }}>
              Question {step + 1} of 3 · {['Easy', 'Medium', 'Hard'][step]}
            </div>
          )}
        </div>
        {phase !== 'summary' && (
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: 99,
                background: i < step ? '#4ADE80' : i === step ? accent : 'rgba(255,255,255,0.15)',
                boxShadow: i === step ? `0 0 6px ${accent}` : undefined,
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {phase === 'flash'   && <FlashScreen   q={q as TriviaQ | SoundmojiQ} left={timeLeft} total={totalMs} accent={accent} />}
        {phase === 'answer'  && q.format === 'trivia'    && <TriviaBoard    key={step} q={q as TriviaQ}    onAnswer={handleAnswer} left={timeLeft} total={totalMs} accent={accent} />}
        {phase === 'answer'  && q.format === 'soundmoji' && <SoundmojiBoard key={step} q={q as SoundmojiQ} onAnswer={handleAnswer} left={timeLeft} total={totalMs} accent={accent} />}
        {phase === 'answer'  && q.format === 'ranking'   && <RankingBoard   key={step} q={q as RankingQ}   onAnswer={handleAnswer} left={timeLeft} total={totalMs} accent={accent} />}
        {phase === 'answer'  && q.format === 'tier'      && <TierBoard      key={step} q={q as TierQ}      onAnswer={handleAnswer} left={timeLeft} total={totalMs} accent={accent} />}
        {phase === 'reveal'  && lastResult && <QuickReveal result={lastResult} accent={accent} />}
        {phase === 'summary' && <Summary results={results} onDone={() => onComplete(results.reduce((s, r) => s + r.pts, 0))} />}
      </div>
    </div>
  );
}
