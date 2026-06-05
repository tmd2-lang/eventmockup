/* eslint-disable */
import React, { useState, useEffect } from 'react';

const EDGE = 22;
const DISPLAY = 'var(--font-display, "Bricolage Grotesque", sans-serif)';
const BODY = 'var(--font-body, -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif)';

const LIQUID_GLASS_DARK = {
  background: 'rgba(10, 9, 7, 0.45)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];

// Target match is Thursday Evening (Day index 3, Time index 2)
const MATCH_DAY = 3;
const MATCH_TIME = 2;

// Fake Target availability for the overlap animation
const TARGET_GRID = [
  [false, false, true],  // Mon
  [false, false, false], // Tue
  [false, true, false],  // Wed
  [false, false, true],  // Thu
  [true, false, true],   // Fri
  [false, true, true],   // Sat
  [true, true, false],   // Sun
];

export function PlanAHang({ currentUser, profile, demoScene, onClose }: { currentUser?: any, profile?: any, demoScene?: number, onClose?: () => void }) {
  const [step, setStep] = useState(1); // 1=Grid, 2=Overlap, 3=Venue, 4=Confirmed
  const [selectedGrid, setSelectedGrid] = useState(
    Array(7).fill(null).map(() => Array(3).fill(false))
  );

  const handleToggle = (dIdx: number, tIdx: number) => {
    const newGrid = [...selectedGrid];
    newGrid[dIdx] = [...newGrid[dIdx]];
    newGrid[dIdx][tIdx] = !newGrid[dIdx][tIdx];
    setSelectedGrid(newGrid);
  };

  const hasSelection = selectedGrid.some(day => day.some(t => t));

  const handleFindTime = () => {
    const nextGrid = [...selectedGrid];
    nextGrid[MATCH_DAY] = [...nextGrid[MATCH_DAY]];
    nextGrid[MATCH_DAY][MATCH_TIME] = true;
    setSelectedGrid(nextGrid);
    
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2500); // Overlay plays for 2.5s then venue reveals
  };

  useEffect(() => {
    if (demoScene === 4) setStep(1);
    if (demoScene === 5) handleFindTime();
    if (demoScene === 6) setStep(4);
    if (demoScene === 7) setStep(3); // Venue screen
  }, [demoScene]);

  return (
    <div style={{ 
      position: 'absolute', inset: 0, zIndex: 10000, background: '#0A0907', color: '#fff',
      display: 'flex', flexDirection: 'column', animation: 'fadeInOverlay 0.4s ease forwards'
    }}>
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 rgba(249,115,22,0); } 50% { box-shadow: 0 0 20px rgba(249,115,22,0.4); } 100% { box-shadow: 0 0 0 rgba(249,115,22,0); } }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      {/* HEADER */}
      <div style={{ padding: `56px ${EDGE}px 12px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 99, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: BODY, fontSize: 16
        }}>×</button>
        <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          {step <= 2 ? 'Find a time' : step === 3 ? 'Venue' : 'Confirmed'}
        </div>
        <div style={{ width: 32 }} /> {/* Spacer */}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: `0 ${EDGE}px 40px` }}>
        
        {/* BEAT 1 & 2: THE GRID & OVERLAP */}
        {(step === 1 || step === 2) && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'slideUpFade 0.6s ease' }}>
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, lineHeight: 1.1, marginTop: 12 }}>
              {step === 1 ? 'When are you around?' : "You're both free Thursday evening."}
            </h1>
            <p style={{ fontFamily: BODY, fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
              {step === 1 ? 'Pick a few — Ligo finds the overlap.' : 'No back-and-forth. Ligo just found it.'}
            </p>

            <div style={{ marginTop: 40, flex: 1 }}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12, marginBottom: 12 }}>
                <div style={{ width: 40 }} />
                {TIMES.map(t => (
                  <div key={t} style={{ flex: 1, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.3)' }}>
                    {t}
                  </div>
                ))}
              </div>
              
              {DAYS.map((day, dIdx) => (
                <div key={day} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 40, fontFamily: DISPLAY, fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    {day}
                  </div>
                  {TIMES.map((time, tIdx) => {
                    const isSelected = selectedGrid[dIdx][tIdx];
                    const isTarget = TARGET_GRID[dIdx][tIdx];
                    const isTargetMatch = (dIdx === MATCH_DAY && tIdx === MATCH_TIME);
                    
                    let bg = 'rgba(255,255,255,0.04)';
                    let border = '1px solid rgba(255,255,255,0.05)';
                    let innerOpacity = 0;
                    
                    if (step === 1) {
                      if (isSelected) {
                        bg = 'rgba(249,115,22,0.15)';
                        border = '1px solid #F97316';
                        innerOpacity = 1;
                      }
                    } else if (step === 2) {
                      if (isTargetMatch) {
                        bg = 'rgba(249,115,22,0.25)';
                        border = '1px solid #F97316';
                        innerOpacity = 1;
                      } else if (isTarget && isSelected) {
                         bg = 'rgba(255,255,255,0.15)';
                         border = '1px solid rgba(255,255,255,0.3)';
                         innerOpacity = 0.5;
                      } else {
                        bg = 'transparent';
                        border = '1px solid rgba(255,255,255,0.02)';
                      }
                    }

                    return (
                      <div key={time} style={{ flex: 1, padding: '0 4px' }}>
                        <button 
                          onClick={() => step === 1 && handleToggle(dIdx, tIdx)}
                          disabled={step !== 1}
                          style={{
                            width: '100%', height: 38, borderRadius: 8, background: bg, border,
                            cursor: step === 1 ? 'pointer' : 'default', transition: 'all 0.3s ease',
                            position: 'relative', overflow: 'hidden',
                            animation: (step === 2 && isTargetMatch) ? 'pulseGlow 2s infinite' : 'none'
                          }}
                        >
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: innerOpacity, transition: 'opacity 0.2s' }}>
                            <div style={{ width: 6, height: 6, borderRadius: 99, background: (step === 2 && isTargetMatch) ? '#F97316' : '#fff' }} />
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {step === 1 && (
              <button 
                onClick={handleFindTime}
                disabled={!hasSelection}
                style={{
                  width: '100%', padding: '18px', borderRadius: 99, border: 'none',
                  background: hasSelection ? '#F97316' : 'rgba(255,255,255,0.1)',
                  color: hasSelection ? '#fff' : 'rgba(255,255,255,0.3)',
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, cursor: hasSelection ? 'pointer' : 'default',
                  transition: 'all 0.2s ease', marginTop: 24
                }}
              >
                Find a time
              </button>
            )}
          </div>
        )}

        {/* BEAT 3: THE VENUE REVEAL HERO */}
        {step === 3 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 12, letterSpacing: '0.14em', color: '#F97316', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
                We found your spot
              </div>
              
              <div style={{ 
                ...LIQUID_GLASS_DARK, borderRadius: 28, padding: '24px 24px 32px', border: '1px solid rgba(249,115,22,0.3)',
                boxShadow: '0 24px 48px rgba(249,115,22,0.15)'
              }}>
                <div style={{ width: '100%', height: 210, borderRadius: 16, position: 'relative', marginBottom: 20, overflow: 'hidden' }}>
                  <img src="/assets/gsc+logo.webp" alt="Grace Street Coffee" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                  <div style={{ position: 'absolute', top: 10, right: 10, padding: '5px 10px', background: 'rgba(20, 17, 13, 0.6)', backdropFilter: 'blur(10px)', borderRadius: 99, color: '#71C07F', fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', zIndex: 2 }}>
                    50% OFF · ON LIGO
                  </div>
                </div>
                
                <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, lineHeight: 1.1, marginBottom: 8 }}>
                  Grace Street Coffee
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: BODY, fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>
                  <span>Thursday</span>
                  <span style={{ width: 4, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.3)' }} />
                  <span>7:00 PM</span>
                </div>
                
                <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span>✨</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>The Vibe</span>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                    "They lean into slow R&B after dark. Figured that tracks."
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(4)}
              style={{
                width: '100%', padding: '18px', borderRadius: 99, border: 'none',
                background: '#F97316', color: '#fff',
                fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, cursor: 'pointer',
                boxShadow: '0 0 20px rgba(249,115,22,0.4)', marginTop: 24
              }}
            >
              Lock it in
            </button>
          </div>
        )}

        {/* BEAT 4: THE CONFIRMATION */}
        {step === 4 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'slideUpFade 0.6s ease' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              <div style={{ ...LIQUID_GLASS_DARK, borderRadius: 28, padding: 32, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                  <div style={{ position: 'relative', width: 90, height: 64 }}>
                    <div style={{ position: 'absolute', left: 0, zIndex: 2, width: 64, height: 64, borderRadius: 99, backgroundImage: `url(${currentUser?.photo || '/assets/Jordan-profile.png'})`, backgroundSize: 'cover' }} />
                    <div style={{ position: 'absolute', right: 0, zIndex: 1, width: 64, height: 64, borderRadius: 99, backgroundImage: `url(${profile?.photo || '/artists/taylor.png'})`, backgroundSize: 'cover' }} />
                  </div>
                </div>
                
                <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, marginBottom: 12 }}>You're set.</h1>
                <p style={{ fontFamily: BODY, fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.4 }}>
                  We'll remind you both. No need to stress the details.
                </p>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: BODY, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>With</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15 }}>{profile?.name || 'Alessia'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: BODY, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>When</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15 }}>Thursday, 7:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: BODY, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Where</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15 }}>Grace Street Coffee</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: BODY, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Perk</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15, color: '#71C07F' }}>50% off · on Ligo</span>
                  </div>
                </div>
              </div>
              
              <button style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
                borderRadius: 99, padding: '14px', marginTop: 24, fontFamily: DISPLAY, fontWeight: 600, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Add to calendar
              </button>

            </div>

            <button 
              onClick={onClose}
              style={{
                width: '100%', padding: '18px', borderRadius: 99, border: 'none',
                background: '#fff', color: '#0A0907',
                fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, cursor: 'pointer',
                marginTop: 16
              }}
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
