'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { toBlob } from 'html-to-image';
import { ACTIVE_REVEAL_NIGHT, CN_PROFILES } from '@/lib/revealData';
import { searchCharlotteCatalog } from "@/lib/charlotte-catalog";
import { searchColeCatalog } from "@/lib/cole-catalog";
import { searchCarolineCatalog } from "@/lib/caroline-catalog";
import { searchBennettCatalog } from "@/lib/bennett-catalog";
import { searchAlessiaCatalog } from "@/lib/alessia-catalog";
import { searchMaddieCatalog } from "@/lib/maddie-catalog";
import { searchMarcusCatalog } from "@/lib/marcus-catalog";
import { searchSofiaCatalog } from "@/lib/sofia-catalog";
import { searchJordanCatalog } from "@/lib/jordan-catalog";
import { searchLigoCatalog } from "@/lib/ligo-catalog";
import { FastAverageColor } from 'fast-average-color';
import { getCommentary } from '@/lib/ai-commentary';

function searchCatalogLocal(activeUserId: string, draft: string, limit = 8) {
  switch (activeUserId) {
    case "charlotte": return searchCharlotteCatalog(draft, limit);
    case "cole": return searchColeCatalog(draft, limit);
    case "caroline": return searchCarolineCatalog(draft, limit);
    case "bennett": return searchBennettCatalog(draft, limit);
    case "alessia": return searchAlessiaCatalog(draft, limit);
    case "maddie": return searchMaddieCatalog(draft, limit);
    case "marcus": return searchMarcusCatalog(draft, limit);
    case "sofia": return searchSofiaCatalog(draft, limit);
    case "ligo": return searchLigoCatalog(draft, limit);
    default: return searchJordanCatalog(draft, limit);
  }
}

import { usePersistentState } from '@/lib/usePersistentState';
import { RevealShell, REVEAL_COLORS, roman, type ShellController } from '@/components/RevealShell';
import { RevealOpeningIntro } from '@/components/reveal/RevealOpeningIntro';
import { ActConnectionIntro, ActConnectionSealed } from './RevealConnectionIntro';
import { RevealConnectionPerson } from './RevealConnectionPerson';
import { ActConnectionDone } from './RevealConnectionDone';

const FF = "'Bricolage Grotesque', sans-serif";
const EASE = 'cubic-bezier(.2,.7,.2,1)';

/* ───── Mock data for multi-day themes ────────────────────────────────────────── */
const MOCK_DAYS = [
  // Day 1: The Chaos
  {
    percentile: 7,
    peerCount: 47,
    archetype: { label: 'Crate Digger', emoji: '⛏️', color: '#F5D783', glow: 'rgba(245,215,131,0.35)', desc: 'Unique on campus · Obscure globally', detail: 'Your taste is genuinely built different.' },
    rarity: { rank: 191, total: 2734, trend: 'climbed' as const, trendAmount: 3 },
    drift: { label: 'energetic', tonight: 82, average: 61 },
    campusMood: { 
      word: 'electric', color: '#FF3300', desc: '2,734 answers painted a picture of pure, high-voltage energy.',
      driverSongs: [
        { title: "FE!N", artist: "Travis Scott", pct: "14%", art: "/covers/travisscott-utopia.jpeg" },
        { title: "Stop Breathing", artist: "Playboi Carti", pct: "9%", art: "/covers/wholelottared-coverart.jpeg" },
        { title: "Hot", artist: "Young Thug", pct: "7%", art: "/covers/somuchfun-coverart.jpeg" }
      ]
    },
    userPick: { song: "FE!N", artist: "Travis Scott", art: "/covers/travisscott-utopia.jpeg" },
    campusPick: { song: 'Shabang', artist: 'Drake', art: '/covers/drake-iceman-coverart.jpeg', pct: 38 },
    hasRSVP: true,
  },
  // Day 2: The Main Character
  {
    percentile: 1,
    peerCount: 842,
    archetype: { label: 'Trendsetter', emoji: '💅', color: '#EA8CE1', glow: 'rgba(234,140,225,0.35)', desc: 'Top 1% consensus', detail: 'You are literally the blueprint.' },
    rarity: { rank: 1, total: 2734, trend: 'climbed' as const, trendAmount: 12 },
    drift: { label: 'upbeat', tonight: 95, average: 61 },
    campusMood: { 
      word: 'euphoric', color: '#FF3366', desc: 'Campus is literally ascending right now. Pure pop perfection.',
      driverSongs: [
        { title: "Espresso", artist: "Sabrina Carpenter", pct: "18%", art: "/covers/sabrinashortnsweet-coverart.jpeg" },
        { title: "I Feel It Coming", artist: "The Weeknd", pct: "12%", art: "/covers/weekndstarboy-coverart.jpeg" },
        { title: "Blank Space", artist: "Taylor Swift", pct: "8%", art: "/covers/tswift1989taylorversion-coverart.jpeg" }
      ]
    },
    userPick: { song: "Good Luck, Babe!", artist: "Chappell Roan", art: "/covers/chappellroan-goodluckbabe-coverart.jpeg" },
    campusPick: { song: 'Espresso', artist: 'Sabrina Carpenter', art: '/covers/sabrinashortnsweet-coverart.jpeg', pct: 45 },
    hasRSVP: true,
  },
  // Day 3: The Late Night Drive
  {
    percentile: 14,
    peerCount: 201,
    archetype: { label: 'Local Legend', emoji: '🏆', color: '#A271FF', glow: 'rgba(162,113,255,0.35)', desc: 'Heavy rotation in a specific circle', detail: 'You actually know music.' },
    rarity: { rank: 384, total: 2734, trend: 'dropped' as const, trendAmount: 42 },
    drift: { label: 'chill', tonight: 22, average: 61 },
    campusMood: { 
      word: 'in our feels', color: '#3B82F6', desc: 'Everyone is collectively staring at the ceiling tonight.',
      driverSongs: [
        { title: "Snooze", artist: "SZA", pct: "11%", art: "/covers/szasos-coverart.jpeg" },
        { title: "Choosing Texas", artist: "Ella Langley", pct: "9%", art: "/covers/kaceygoldenhour-coverart.jpeg" },
        { title: "Hold On We're Going Home", artist: "Drake", pct: "6%", art: "/covers/drakenothingwasthesame-coverart.jpeg" }
      ]
    },
    userPick: { song: "Pink + White", artist: "Frank Ocean", art: "/covers/frankocean-blonde.jpeg" },
    campusPick: { song: 'Nights', artist: "Frank Ocean", art: '/covers/frankocean-blonde.jpeg', pct: 28 },
    hasRSVP: true,
  }
];

/* ═══════════════════════════════════════════════════════════════════════
   Typewriter Effect Component
   ═══════════════════════════════════════════════════════════════════════ */
function TypewriterText({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const [displayedText, setDisplayedText] = React.useState('');
  
  React.useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30); // typing speed
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <p style={style}>
      {displayedText}
      <span style={{ 
        display: 'inline-block',
        width: 6, height: 18, backgroundColor: 'rgba(255,255,255,0.8)',
        marginLeft: 4, verticalAlign: 'middle',
        animation: displayedText.length === text.length ? 'blink 1s step-end infinite' : 'none',
        opacity: displayedText.length === text.length ? 1 : 0
      }} />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 1 — Your Pick
   Hero album art, large and proud. The grounding moment.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatYourPick({ userPick, anim, dayIndex, campusMood }: { userPick: { song: string; artist: string; art: string }; anim: string; dayIndex: number; campusMood: string }) {
  const commentary = getCommentary(dayIndex, userPick.artist, userPick.song, campusMood, 'user');
  
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', gap: 16,
      padding: '40px 24px 100px', animation: anim,
    }}>
      <div style={{
        fontFamily: FF, fontWeight: 600, fontSize: 12, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
      }}>
        Tonight you picked
      </div>

      {/* Hero album art with warm glow */}
      <div style={{ position: 'relative', margin: '8px 0', animation: 'float 4s ease-in-out infinite' }}>
        <div style={{
          position: 'absolute', inset: -44,
          background: 'radial-gradient(circle, rgba(245,215,131,0.3) 0%, transparent 70%)',
          filter: 'blur(30px)', zIndex: 0,
        }} />
        <img src={userPick.art} alt="Your pick" style={{
          width: 200, height: 200, borderRadius: 28, objectFit: 'cover',
          boxShadow: '0 24px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)',
          zIndex: 1, position: 'relative',
        }} />
      </div>

      <div style={{
        fontFamily: FF, fontWeight: 700, fontSize: 42, letterSpacing: '-0.03em',
        lineHeight: 1.05, color: '#FFFFFF', textShadow: '0 4px 24px rgba(0,0,0,0.4)',
        animation: 'pop-in 0.6s cubic-bezier(0.2,0.8,0.2,1) both',
      }}>
        {userPick.song}
      </div>
      <div style={{ fontFamily: FF, fontSize: 20, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
        {userPick.artist}
      </div>
      
      {/* AI Commentary */}
      <TypewriterText 
        text={commentary} 
        delay={800} // start typing after hero elements pop in
        style={{
          fontFamily: FF, fontSize: 18, fontWeight: 600, color: '#FFFFFF',
          marginTop: 16, maxWidth: 300, lineHeight: 1.3,
          minHeight: 50 // prevent layout jump while typing
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 2 — Campus Pulse
   The campus top pick. The contrast moment.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatCampusPulse({ night, anim, dayIndex }: { night: any; anim: string; dayIndex: number }) {
  const commentary = getCommentary(dayIndex, night.topArtist, night.topSong, MOCK_DAYS[dayIndex].campusMood.word, 'campus');
  
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', gap: 14,
      padding: '40px 24px 100px', animation: anim,
    }}>
      <div style={{
        background: 'rgba(245,215,131,0.15)', border: '1px solid rgba(245,215,131,0.3)',
        borderRadius: 999, padding: '5px 14px',
        fontFamily: FF, fontSize: 11, fontWeight: 700, color: '#F5D783',
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        #1 Tonight
      </div>

      <h3 style={{
        fontFamily: FF, fontSize: 15, color: 'rgba(255,255,255,0.45)',
        fontStyle: 'italic', maxWidth: 280, lineHeight: 1.4, margin: 0,
      }}>
        &ldquo;{night.question}&rdquo;
      </h3>

      <div style={{ position: 'relative', margin: '6px 0' }}>
        <div style={{
          position: 'absolute', inset: -28,
          background: 'radial-gradient(circle, rgba(245,215,131,0.25) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />
        <img src={night.topArt} alt="Top pick" style={{
          width: 140, height: 140, borderRadius: 22, objectFit: 'cover',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
          position: 'relative',
        }} />
      </div>

      <div style={{
        fontFamily: FF, fontWeight: 700, fontSize: 34, letterSpacing: '-0.03em',
        color: '#FFFFFF', animation: 'pop-in 0.5s both',
      }}>
        {night.topSong}
      </div>
      <div style={{ fontFamily: FF, fontSize: 17, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
        {night.topArtist}
      </div>

      {/* AI Commentary for Campus Pick */}
      <p style={{
        fontFamily: FF, fontSize: 14, color: 'rgba(255,255,255,0.85)',
        maxWidth: 280, lineHeight: 1.4, margin: '4px 0 12px',
        animation: 'pop-in 0.7s both',
      }}>
        {commentary}
      </p>

      <div style={{ marginTop: 4, display: 'flex', gap: 10 }}>
        <div style={{
          background: 'rgba(245,215,131,0.15)', border: '1px solid rgba(245,215,131,0.3)',
          borderRadius: 99, padding: '7px 14px', backdropFilter: 'blur(10px)',
          fontFamily: FF, fontSize: 13, color: '#F5D783', fontWeight: 600,
        }}>
          {night.consensusPct}% Consensus
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 99, padding: '7px 14px', backdropFilter: 'blur(10px)',
          fontFamily: FF, fontSize: 13, color: '#FFFFFF', fontWeight: 600,
        }}>
          2,734 Votes
        </div>
      </div>
      
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 3 — Mega Rarity
   Consolidated Archetype, Spectrum, and Rarity Rank.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatRarityMega({ anim, dayIndex }: { anim: string; dayIndex: number }) {
  const MOCK = MOCK_DAYS[dayIndex];
  const a = MOCK.archetype;
  const pct = MOCK.percentile;
  const isConsensus = a.label === 'Trendsetter';
  const pos = isConsensus ? pct : 100 - pct; // Trendsetter is consensus, others are rare (niche)
  const label = isConsensus ? 'consensus' : 'niche';
  const r = MOCK.rarity;
  const trendIcon = r.trend === 'climbed' ? '↑' : r.trend === 'dropped' ? '↓' : '→';
  const trendColor = r.trend === 'climbed' ? '#6EE7B7' : r.trend === 'dropped' ? '#FCA5A5' : 'rgba(255,255,255,0.5)';
  
  const [animatedPos, setAnimatedPos] = React.useState(isConsensus ? 100 : 0); // start from opposite end for sweep effect
  React.useEffect(() => {
    const t = setTimeout(() => setAnimatedPos(pos), 400);
    return () => clearTimeout(t);
  }, [pos, isConsensus]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 100px', animation: anim,
    }}>
      <style>{`
        @media (max-width: 380px) {
          .hide-on-tight { display: none !important; }
        }
      `}</style>
      
      {/* Hero section */}
      <div style={{ fontSize: 52, marginBottom: 16, animation: 'pop-in 0.4s both', textAlign: 'center' }}>{a.emoji}</div>
      <div style={{ fontFamily: FF, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, animation: 'pop-in 0.4s 0.1s both' }}>
        Your Sonic Archetype
      </div>
      <div style={{
        fontFamily: FF, fontWeight: 800, fontSize: 48, letterSpacing: '-0.04em',
        lineHeight: 1, color: a.color, textAlign: 'center',
        textShadow: `0 8px 32px ${a.glow}`,
        animation: 'pop-in 0.5s 0.15s both',
      }}>
        {a.label}
      </div>
      <div style={{
        fontFamily: FF, fontSize: 16, color: 'rgba(255,255,255,0.6)', fontWeight: 500,
        marginTop: 16, letterSpacing: '0.01em', maxWidth: 280, textAlign: 'center',
        animation: 'pop-in 0.5s 0.2s both'
      }}>
        {a.desc}
      </div>
      <div style={{
        fontFamily: FF, fontSize: 15, color: '#fff', fontWeight: 600,
        marginTop: 12, maxWidth: 280, textAlign: 'center',
        animation: 'pop-in 0.5s 0.3s both'
      }}>
        "{a.detail}"
      </div>

      {/* Stacked Large Cards */}
      <div style={{
        width: '100%', maxWidth: 320, marginTop: 40,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Top Card: Rank */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 28, padding: '28px 24px', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          animation: 'pop-in 0.6s 0.3s both'
        }}>
          <div style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Campus Rank</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 40, color: '#A271FF' }}>#{r.rank}</span>
            <span className="hide-on-tight" style={{ fontFamily: FF, fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              of {r.total}
            </span>
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: 12 }}>
            <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: trendColor }}>{trendIcon}</span>
            <span style={{ fontFamily: FF, fontSize: 11, color: trendColor, fontWeight: 600 }}>{r.trendAmount} spots from yesterday</span>
          </div>
        </div>

        {/* Bottom Card: Rarity Spectrum */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 28, padding: '28px 24px', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          animation: 'pop-in 0.6s 0.4s both'
        }}>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 32, color: '#EA8CE1', textShadow: '0 4px 16px rgba(234,140,225,0.3)', marginBottom: 24, textAlign: 'center', lineHeight: 1.1 }}>
            You're top {pct}%<br />{label}
          </div>
          
          {/* Full Spectrum */}
          <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Consensus</span>
              <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Rare</span>
            </div>
            <div style={{ position: 'relative', width: '100%', height: 6 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'linear-gradient(90deg, #F5D783, #EA8CE1, #A271FF)', opacity: 0.5 }} />
              <div style={{
                position: 'absolute', left: `${animatedPos}%`, top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 16, height: 16, borderRadius: 99,
                background: '#EA8CE1', border: '2px solid #fff',
                boxShadow: '0 0 12px rgba(234,140,225,0.8)',
                transition: 'left 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 6 — Your Drift
   Self-comparison to your own average. Personal trajectory.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatYourDrift({ anim, dayIndex }: { anim: string; dayIndex: number }) {
  const d = MOCK_DAYS[dayIndex].drift;
  const [animatedTonight, setAnimatedTonight] = React.useState(0); // Start at 0 to see full fill animation
  
  React.useEffect(() => {
    const t = setTimeout(() => setAnimatedTonight(d.tonight), 400);
    return () => clearTimeout(t);
  }, [d.tonight]);

  const headlines = [
    <>More {d.label}<br />than your usual.</>,
    <>You skewed {d.label}<br />tonight.</>,
    <>Your energy shifted<br />towards {d.label}.</>,
    <>A decidedly {d.label}<br />pivot for you.</>
  ];
  const headline = headlines[dayIndex % headlines.length];

  const subline = d.tonight > d.average 
    ? "Tonight's pick had more energy than what you normally go for."
    : "Tonight's pick was way more chill than what you normally go for.";

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '40px 24px 100px', animation: anim,
    }}>
      <h2 style={{
        fontFamily: FF, fontWeight: 700, fontSize: 34, lineHeight: 1.1,
        letterSpacing: '-0.03em', color: '#FFFFFF', margin: '0 0 12px',
        animation: 'pop-in 0.6s both',
      }}>
        {headline}
      </h2>

      <p style={{ fontFamily: FF, fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 60, maxWidth: 260, lineHeight: 1.4 }}>
        {subline}
      </p>

      {/* Drift axis - Thick Dynamic Track */}
      <div style={{ width: '100%', maxWidth: 300, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: FF, fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Chill</span>
          <span style={{ 
            fontFamily: FF, fontSize: 12, color: '#A271FF', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700,
            animation: 'pulse-glow 2s infinite alternate',
            textShadow: '0 0 12px rgba(162,113,255,0.6)'
          }}>
            Energetic
          </span>
        </div>

        {/* Thick Track Container */}
        <div style={{ 
          width: '100%', height: 32, borderRadius: 99, 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative', overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
        }}>
          {/* Fill Bar */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: `${animatedTonight}%`,
            background: 'linear-gradient(90deg, rgba(162,113,255,0.2) 0%, rgba(162,113,255,0.8) 100%)',
            transition: 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            borderRadius: 99,
          }} />

          {/* Average marker (Vertical Tick) */}
          <div style={{
            position: 'absolute', left: `${d.average}%`, top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 16, height: 16, borderRadius: 99,
            background: 'transparent', border: '2px solid rgba(255,255,255,0.4)',
            zIndex: 1
          }} />

          {/* Tonight marker (Bright solid dot inside the track) */}
          <div style={{
            position: 'absolute', left: `${animatedTonight}%`, top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 20, height: 20, borderRadius: 99,
            background: '#FFFFFF',
            boxShadow: '0 0 16px rgba(162,113,255,1)',
            transition: 'left 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 2
          }} />
        </div>
        
        {/* Legends below track */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, border: '1.5px solid rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Your Avg ({d.average}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: '#FFFFFF', boxShadow: '0 0 8px #A271FF' }} />
            <span style={{ fontFamily: FF, fontSize: 11, color: '#FFFFFF', fontWeight: 700 }}>Tonight ({d.tonight}%)</span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse-glow {
          0% { text-shadow: 0 0 8px rgba(162,113,255,0.4); }
          100% { text-shadow: 0 0 16px rgba(162,113,255,0.9); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 7 — Campus Mood
   Full atmospheric. One word dominates. The communal vibe.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatCampusMood({ night, anim, dayIndex }: { night: any; anim: string; dayIndex: number }) {
  const mood = MOCK_DAYS[dayIndex].campusMood;
  
  const headlines = [
    <>Georgetown<br />is feeling<br /><span style={{ color: mood.color }}>{mood.word}.</span></>,
    <>The campus is<br />decidedly<br /><span style={{ color: mood.color }}>{mood.word}.</span></>,
    <>Tonight's vibe is<br />unquestionably<br /><span style={{ color: mood.color }}>{mood.word}.</span></>,
    <>Georgetown leans<br />heavily<br /><span style={{ color: mood.color }}>{mood.word}.</span></>
  ];
  const headline = headlines[dayIndex % headlines.length];

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '40px 30px', animation: anim, overflow: 'hidden',
    }}>
      {/* Immersive aura */}
      <div style={{
        position: 'absolute', width: '150%', height: '150%',
        background: 'conic-gradient(from 90deg, #A271FF, #EA8CE1, #F5D783, #A271FF)',
        filter: 'blur(100px)', opacity: 0.45,
        animation: 'aura-spin 15s linear infinite', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 0 }} />

      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h2 style={{
          fontFamily: FF, fontWeight: 700, fontSize: 42, lineHeight: 1.05,
          letterSpacing: '-0.04em', color: '#FFFFFF', margin: '0 0 0',
          textShadow: '0 10px 40px rgba(0,0,0,0.5)',
          animation: 'pop-in 0.8s cubic-bezier(0.2,0.8,0.2,1) both',
        }}>
          {headline}
        </h2>

        <div style={{
          fontFamily: FF, fontSize: 18, color: 'rgba(255,255,255,0.9)', 
          fontWeight: 500, marginTop: 12,
          animation: 'pop-in 0.9s 0.15s both',
        }}>
          {mood.desc}
        </div>

        {/* Data Pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 32, animation: 'pop-in 0.9s 0.25s both' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 99, padding: '6px 12px', backdropFilter: 'blur(10px)',
            fontFamily: FF, fontSize: 11, color: '#FFFFFF', fontWeight: 600,
          }}>
            2,734 Samples
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 99, padding: '6px 12px', backdropFilter: 'blur(10px)',
            fontFamily: FF, fontSize: 11, color: '#FFFFFF', fontWeight: 600,
          }}>
            Peak at 11:30 PM
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 99, padding: '6px 12px', backdropFilter: 'blur(10px)',
            fontFamily: FF, fontSize: 11, color: '#FCA5A5', fontWeight: 600,
          }}>
            ↓ 22% from yesterday
          </div>
        </div>

        {/* Driver Songs */}
        <div style={{
          marginTop: 40, width: '100%', maxWidth: 280,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          borderRadius: 20, padding: '20px', border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)', animation: 'pop-in 0.9s 0.35s both',
          textAlign: 'left'
        }}>
          <div style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 12 }}>
            What set the tone
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mood.driverSongs.map((song: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={song.art} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} alt={song.title} />
                  <div>
                    <div style={{ fontFamily: FF, fontSize: 14, color: '#fff', fontWeight: 600 }}>{song.title}</div>
                    <div style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{song.artist}</div>
                  </div>
                </div>
                <div style={{ fontFamily: FF, fontSize: 12, color: mood.color, fontWeight: 700 }}>
                  {song.pct}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 8 — Forward Hook
   Countdown + streak + tomorrow teaser. Retention mechanic.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatForwardHook({ night, anim, dayIndex }: { night: any; anim: string; dayIndex: number }) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextReveal = (() => {
    const d = new Date(now);
    d.setHours(20, 0, 0, 0);
    if (d.getTime() <= now) d.setDate(d.getDate() + 1);
    return d.getTime();
  })();
  const ms = Math.max(0, nextReveal - now);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const countdown = `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  const streakCount = Math.min(dayIndex + 1, 7);

  const [displayStreak, setDisplayStreak] = React.useState(1);

  React.useEffect(() => {
    let current = 1;
    const target = 14;
    const interval = setInterval(() => {
      if (current < target) {
        current += 1;
        setDisplayStreak(current);
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '40px 24px', animation: anim,
    }}>
      <div style={{ margin: '40px 0', animation: 'soft-pulse 3s infinite' }}>
        <div style={{
          fontFamily: FF, fontWeight: 800, fontSize: 56, letterSpacing: '-0.04em',
          lineHeight: 1, color: '#F5D783', textShadow: '0 10px 40px rgba(245,215,131,0.35)',
        }}>
          {countdown}
        </div>
        <div style={{
          fontFamily: FF, fontSize: 14, fontWeight: 600,
          color: 'rgba(255,255,255,0.5)', marginTop: 12,
          textTransform: 'uppercase', letterSpacing: '0.12em',
        }}>
          Until the next daily question
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
        border: '1px solid rgba(255,255,255,0.15)', padding: '14px 22px',
        borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 10,
        marginBottom: 36, backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}>
        <span style={{ fontSize: 26, filter: 'drop-shadow(0 0 8px rgba(255,100,0,0.7))' }}>🔥</span>
        <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 18, color: '#fff', minWidth: 120 }}>{displayStreak} Day Streak</span>
      </div>

      <h2 style={{
        fontFamily: FF, fontWeight: 700, fontSize: 26, lineHeight: 1.2,
        letterSpacing: '-0.02em', color: '#FFFFFF', maxWidth: 280,
      }}>
        Keep the streak going.
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Beat 9 — Your Ligo Reveal (Share Card)
   Wrapped-style summary card with sponsor integration. The closer.
   ═══════════════════════════════════════════════════════════════════════ */
function BeatShareCard({ night, anim, dayIndex, userPick, onShare }: {
  night: any; anim: string; dayIndex: number;
  userPick: { song: string; artist: string; art: string };
  onShare?: () => void;
}) {
  const streakCount = Math.min(dayIndex + 1, 7);
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 100px', animation: anim, overflow: 'hidden',
      background: 'linear-gradient(135deg, #FF3366, #FF9933, #71C07F)',
    }}>
      <div style={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, background: '#A271FF', borderRadius: 999, filter: 'blur(40px)', opacity: 0.6, animation: 'float 6s infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -50, width: 250, height: 250, background: '#EA8CE1', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', filter: 'blur(50px)', opacity: 0.7, animation: 'aura-spin 15s linear infinite' }} />

      <div style={{ zIndex: 1, width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h1 style={{
          fontFamily: FF, fontWeight: 800, fontSize: 48, lineHeight: 0.9,
          letterSpacing: '-0.05em', color: '#FFFFFF',
          textShadow: '0 8px 28px rgba(0,0,0,0.3)', marginBottom: 8,
        }}>
          Your<br />Ligo<br />Reveal.
        </h1>

        <div style={{
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)', borderRadius: 24,
          padding: 22, display: 'flex', flexDirection: 'column', gap: 14,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}>
          {/* Your Pick */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
            <div>
              <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 3 }}>Your Pick</span>
              <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 19, color: '#FFFFFF' }}>{userPick.song}</span>
            </div>
            <img src={userPick.art} style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover' }} />
          </div>
          {/* Archetype */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
            <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Archetype</span>
            <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 19, color: '#F5D783' }}>{MOCK_DAYS[dayIndex].archetype.label}</span>
          </div>
          {/* Campus Mood */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
            <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Campus Mood</span>
            <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 19, color: '#D8B4FE', textTransform: 'capitalize' }}>{MOCK_DAYS[dayIndex].campusMood.word}</span>
          </div>
          {/* Rarity */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
            <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rarity</span>
            <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 19, color: '#FFFFFF' }}>Top {MOCK_DAYS[dayIndex].percentile}%</span>
          </div>
          {/* Streak */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Streak</span>
            <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 19, color: '#FFFFFF' }}>{streakCount} Days 🔥</span>
          </div>
        </div>

        {/* Sponsor integration — subtle branding, not a CTA */}
        <div style={{
          marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: 'rgba(0,0,0,0.25)', padding: '10px 18px', borderRadius: 99, backdropFilter: 'blur(10px)',
        }}>
          <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Presented by</span>
          <img src="/assets/starbucks-logo.webp" style={{ height: 18 }} onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>
      </div>

      <button onClick={onShare} style={{
        position: 'absolute', bottom: 120, width: 'calc(100% - 48px)', height: 56,
        background: '#FFFFFF', color: '#000', border: 0, borderRadius: 999,
        fontFamily: FF, fontWeight: 800, fontSize: 16, cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)', zIndex: 1,
      }}>
        Share to IG Story
      </button>
    </div>
  );
}




/* ═══════════════════════════════════════════════════════════════════════
   Share Sheet
   ═══════════════════════════════════════════════════════════════════════ */
function ShareSheet({ night, userPick, dayIndex, onClose }: {
  night: any;
  userPick: { song: string; artist: string; art: string };
  dayIndex: number;
  onClose: () => void;
}) {
  const [sharing, setSharing] = useState(false);

  async function handleShare() {
    const node = document.getElementById('share-card');
    if (!node) return;
    setSharing(true);
    try {
      const blob = await toBlob(node, { quality: 0.95 });
      if (!blob) throw new Error('Failed to generate image');
      const file = new File([blob], 'ligo-reveal.png', { type: 'image/png' });
      if (navigator.share) {
        await navigator.share({ title: 'My Ligo Reveal', files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ligo-reveal.png';
        a.click();
        URL.revokeObjectURL(url);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Oops! Sharing failed.');
    } finally {
      setSharing(false);
    }
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 220ms ease both', backdropFilter: 'blur(15px)' }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 61,
        background: '#FAF9F6', borderRadius: '32px 32px 0 0',
        padding: '12px 24px 36px',
        animation: `sheetUp 400ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.1)', margin: '0 auto 24px' }} />

        <div id="share-card" style={{ background: 'linear-gradient(135deg, #111316, #0A0806)', borderRadius: 24, padding: '28px 22px', marginBottom: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 32, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>Ligo Reveal</div>
            <div style={{ fontFamily: FF, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>Georgetown University</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600 }}>Your Pick</span>
                <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 17, color: '#F5D783' }}>{userPick.song}</span>
              </div>
              <img src={userPick.art} style={{ width: 36, height: 36, borderRadius: 8 }} />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600 }}>Archetype</span>
                <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 17, color: '#F5D783' }}>{MOCK_DAYS[dayIndex].archetype.label} {MOCK_DAYS[dayIndex].archetype.emoji}</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600 }}>Campus Mood</span>
                <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 17, color: '#A271FF', textTransform: 'capitalize' }}>{MOCK_DAYS[dayIndex].campusMood.word}</span>
              </div>
              <span style={{ fontSize: 22 }}>💭</span>
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: FF, fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em' }}>Presented by</span>
              <img src="/assets/starbucks-logo.webp" alt="Starbucks" style={{ height: 16, filter: 'grayscale(1) brightness(1.5)' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })}</span>
          </div>
        </div>

        <button onClick={handleShare} disabled={sharing} style={{
          width: '100%', height: 56, border: 0, borderRadius: 16,
          background: '#000', color: '#fff', fontFamily: FF, fontWeight: 800, fontSize: 16,
          cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', opacity: sharing ? 0.7 : 1,
        }}>
          {sharing ? 'Preparing...' : 'Share to Instagram Story'}
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Main RevealScreen
   ═══════════════════════════════════════════════════════════════════════ */
type Props = {
  onBack: () => void;
  activeUserId: string;
  playIntro?: boolean;
  isCN?: boolean;
};

export function RevealScreen({ onBack, activeUserId, playIntro = false, isCN = false }: Props) {
  const [answer] = usePersistentState(`ligo:daily:${activeUserId}:answer`, '');
  const [dayIndex, setDayIndex] = useState(0); // For testing headline variants
  const [dominantColor, setDominantColor] = useState('#A271FF');
  const [secondaryColor, setSecondaryColor] = useState('#EA8CE1');

  // Campus data stays constant except for the mocked campus picks for testing
  const night = { 
    ...ACTIVE_REVEAL_NIGHT,
    topSong: MOCK_DAYS[dayIndex].campusPick.song,
    topArtist: MOCK_DAYS[dayIndex].campusPick.artist,
    topArt: MOCK_DAYS[dayIndex].campusPick.art,
    consensusPct: MOCK_DAYS[dayIndex].campusPick.pct
  };

  // Resolve user's own pick
  let userPick = MOCK_DAYS[dayIndex].userPick;
  
  if (answer && dayIndex === 0) {
    // The autocomplete picker inserts " — " between title and artist. 
    // We need to strip dashes so the token-based search algorithm can match it against the catalog.
    const cleanAnswer = answer.replace(/[—\-]/g, ' ').replace(/\s+/g, ' ').trim();
    let matches = searchCatalogLocal(activeUserId, cleanAnswer, 1);
    
    // Fallback: if not found in active user's catalog, search all catalogs
    if (!matches || matches.length === 0) {
      const allSearchers = [
        searchCharlotteCatalog, searchColeCatalog, searchCarolineCatalog,
        searchBennettCatalog, searchAlessiaCatalog, searchMaddieCatalog,
        searchMarcusCatalog, searchSofiaCatalog, searchJordanCatalog, searchLigoCatalog
      ];
      for (const search of allSearchers) {
        matches = search(answer, 1);
        if (matches && matches.length > 0) break;
      }
    }

    if (matches && matches.length > 0) {
      userPick = { song: matches[0].title, artist: matches[0].artist, art: (matches[0] as any).cover };
    }
  }

  // Extract color
  useEffect(() => {
    if (!userPick.art) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(userPick.art)
      .then(color => {
        // Enforce a saturation floor so colors don't get muddy
        const [r, g, b] = color.value;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        if (sat < 0.4) {
          // Boost saturation manually or fallback
          setDominantColor('#A271FF');
          setSecondaryColor('#EA8CE1');
        } else {
          setDominantColor(color.hex);
          // Just shift hue slightly for secondary
          setSecondaryColor(color.hex + '99');
        }
      })
      .catch(e => {
        setDominantColor('#A271FF');
        setSecondaryColor('#EA8CE1');
      });
  }, [userPick.art]);

  const shouldPlayIntro = playIntro;
  const [introDone, setIntroDone] = useState(!shouldPlayIntro);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareAct, setShareAct] = useState(0);
  const [vibeToast, setVibeToast] = useState<string | null>(null);
  const [cnActions, setCnActions] = useState<Record<number, string>>({});
  const shell = useRef<ShellController | null>(null);

  const handleVibe = (name: string) => {
    setVibeToast(`Vibe sent to ${name}!`);
    shell.current?.go(1);
    setTimeout(() => setVibeToast(null), 2500);
  };

  const handlePass = () => {
    shell.current?.go(1);
  };

  /* ── Standard 9-beat sequence ──────────────────────────────────────── */
  const standardSteps = [
    ({ anim }: { anim: string }) => <BeatYourPick userPick={userPick} anim={anim} dayIndex={dayIndex} campusMood={MOCK_DAYS[dayIndex].campusMood.word} />,
    ({ anim }: { anim: string }) => <BeatCampusPulse night={night} anim={anim} dayIndex={dayIndex} />,
    ({ anim }: { anim: string }) => <BeatRarityMega anim={anim} dayIndex={dayIndex} />,
    ({ anim }: { anim: string }) => <BeatYourDrift anim={anim} dayIndex={dayIndex} />,
    ({ anim }: { anim: string }) => <BeatCampusMood night={night} anim={anim} dayIndex={dayIndex} />,
    ({ anim }: { anim: string }) => <BeatForwardHook night={night} dayIndex={dayIndex} anim={anim} />,
    ({ anim }: { anim: string }) => <BeatShareCard night={night} dayIndex={dayIndex} userPick={userPick} anim={anim} onShare={() => setShareOpen(true)} />,
  ];

  /* ── Connection Night sequence (unchanged) ─────────────────────────── */
  const cnSequence = [
    ({ anim }: { anim: string }) => <ActConnectionIntro matchCount={CN_PROFILES.length} userAnswer={answer} anim={anim} />,
    ({ anim }: { anim: string }) => (
      <ActConnectionSealed
        people={CN_PROFILES}
        song={{ name: CN_PROFILES[0]?.answer || "Your Pick", artist: night.topArtist, art: night.topArt }}
        anim={anim}
      />
    ),
    ...CN_PROFILES.map((profile, i) => {
      const Step = ({ anim }: { anim: string }) => (
        <RevealConnectionPerson
          p={{ ...profile, meta: `${profile.major} · ${profile.school} ${profile.year}` }}
          idx={i}
          total={CN_PROFILES.length}
          song={{ name: profile.answer, artist: night.topArtist, art: night.topArt }}
          anim={anim}
          onAct={(kind) => {
            setCnActions(prev => ({ ...prev, [i]: kind }));
            if (kind === 'vibe' || kind === 'spark') {
              handleVibe(profile.name);
            } else {
              handlePass();
            }
          }}
        />
      );
      Step.displayName = `ActCNPerson_${profile.id}`;
      return Step;
    }),
    ({ anim }: { anim: string }) => (
      <div onClick={onBack} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <ActConnectionDone
          people={CN_PROFILES}
          actions={cnActions}
          anim={anim}
          night={night}
          onRestart={() => {
            setCnActions({});
            if (shell.current) shell.current.go(-shell.current.cur);
          }}
        />
      </div>
    ),
  ];

  const steps = isCN ? cnSequence : standardSteps;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: introDone ? 1 : 0,
          transform: introDone ? 'scale(1)' : 'scale(1.05)',
          filter: introDone ? 'blur(0)' : 'blur(8px)',
          transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}, filter 900ms ${EASE}`,
        }}
      >
        <RevealShell
          steps={steps}
          bg={`radial-gradient(circle at 50% 0%, ${dominantColor} 0%, #000 85%)`}
          colors={[dominantColor, secondaryColor, '#A271FF', '#EA8CE1']}
          controllerRef={shell}
          title="The Reveal"
          subtitle="Georgetown · under the lights"
          stepLabel={(cur) => `Act ${roman(cur + 1)} of ${roman(steps.length)}`}
          onBack={onBack}
          tapDisabled={shareOpen || !introDone || !!vibeToast}
          bottom={() => isCN ? null : (
            <button
              onClick={() => { setShareAct(shell.current?.cur ?? 0); setShareOpen(true); }}
              style={{
                pointerEvents: 'auto',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 42, padding: '0 20px', borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(10,9,7,0.45)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                color: '#FFFFFF',
                fontFamily: FF, fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
              } as React.CSSProperties}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <path d="M9 11l6-4M9 13l6 4" />
              </svg>
              Share tonight&apos;s sky
            </button>
          )}
        />
      </div>

      {/* Dev Toggle for Multi-Night Testing */}
      <div style={{
        position: 'absolute', top: 16, right: 16, zIndex: 999,
        display: 'flex', gap: 4, padding: 4, background: 'rgba(0,0,0,0.4)',
        borderRadius: 8, backdropFilter: 'blur(10px)', pointerEvents: 'auto'
      }}>
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => setDayIndex(idx)}
            style={{
              background: dayIndex === idx ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: dayIndex === idx ? '#fff' : 'rgba(255,255,255,0.5)',
              border: 'none', padding: '4px 8px', borderRadius: 4,
              fontFamily: FF, fontSize: 10, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>

      {shouldPlayIntro && !introDone && (
        <RevealOpeningIntro onComplete={handleIntroComplete} />
      )}

      {shareOpen && (
        <ShareSheet night={night} userPick={userPick} dayIndex={dayIndex} onClose={() => setShareOpen(false)} />
      )}

      {vibeToast && (
        <div style={{
          position: 'absolute', top: 60, left: 24, right: 24, zIndex: 100,
          background: '#EA8CE1', borderRadius: 16, padding: '16px 20px',
          boxShadow: '0 8px 30px rgba(234,140,225,0.4)',
          fontFamily: FF, fontWeight: 700, fontSize: 15, color: '#000',
          textAlign: 'center', animation: 'fadeInDown 300ms ease both',
        }}>
          {vibeToast}
        </div>
      )}
    </div>
  );
}
