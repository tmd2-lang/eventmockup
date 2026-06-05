/* eslint-disable */
"use client";

import React, { useRef } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { USERS } from "@/lib/users";
import * as htmlToImage from 'html-to-image';
import { Icon as BaseIcon } from "@/components/Primitives";

const Icon: any = { ...BaseIcon };
Icon.Spark = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.5 4 1.5 5 5.5 5.5C13.5 9 12.5 10 12 14c-.5-4-1.5-5-5.5-5.5C10.5 8 11.5 7 12 3z" />
    <path d="M18.5 14.5c.3 2 .8 2.5 2.5 2.8-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.8z" />
  </svg>
);
Icon.Download = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

function Stars({ color = '#fff' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          width: Math.random() > 0.8 ? 2 : 1, height: Math.random() > 0.8 ? 2 : 1,
          background: color, borderRadius: '50%',
          opacity: Math.random() * 0.7 + 0.1,
        }} />
      ))}
    </div>
  );
}

export default function ExportHoroscope() {
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    try {
      await htmlToImage.toPng(printRef.current, { cacheBust: true, pixelRatio: 2 });
      await new Promise(r => setTimeout(r, 150));
      const dataUrl = await htmlToImage.toPng(printRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Ligo-Social-Aux.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const d = {
    meshClass: "deep-purple-mesh",
    starsColor: "#60A5FA",
    theme: {
      horoscopeIconColor: "#3B82F6",
    },
    slide1: {
      title: "The\nSocial Aux",
      subtitle: "88% more mainstream",
      text: "You didn't overthink it. This week, your picks were crowd-pleasers built for a room full of people. You kept the aux cord tightly guarded."
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#0A0907", fontFamily: "var(--font-display, sans-serif)", overflow: "hidden" }}>
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <h1 style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Export: The Social Aux</h1>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, background: "#fff", color: "#0A0907", fontSize: 13, fontWeight: 600, border: "none", cursor: isDownloading ? "not-allowed" : "pointer", opacity: isDownloading ? 0.7 : 1 }}
        >
          <Icon.Download width="15" height="15" />
          {isDownloading ? "Saving..." : "Save Image"}
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto" }}>
        <div ref={printRef}>
          <IOSDevice width={375} height={812} dark>
            <div style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden", color: '#fff', position: 'relative' }}>
              
              {/* Fake progress bars at the top like in the wrapped experience */}
              <div style={{ display: 'flex', gap: 3, padding: '16px 22px 10px', position: 'absolute', top: 48, left: 0, right: 0, zIndex: 50 }}>
                <div style={{ flex: 1, height: 2.5, borderRadius: 99, background: 'rgba(255,255,255,0.9)' }} />
                <div style={{ flex: 1, height: 2.5, borderRadius: 99, background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ flex: 1, height: 2.5, borderRadius: 99, background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ flex: 1, height: 2.5, borderRadius: 99, background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ flex: 1, height: 2.5, borderRadius: 99, background: 'rgba(255,255,255,0.2)' }} />
              </div>

              {/* Close button fake */}
              <div style={{ position: 'absolute', top: 58, right: 22, zIndex: 50, opacity: 0.5 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>

              {/* The Slide UI */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 74 }}>
                <div style={{ opacity: 1, transform: 'none', transition: 'none', position: 'absolute', inset: 0 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '90px 28px 20px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                    <div className={d.meshClass} style={{ opacity: 0.5, position: 'absolute', inset: 0 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(460px 460px at 80% 12%, rgba(138,43,226,0.15), transparent 62%)', pointerEvents: 'none' }} />
                    <Stars color={d.starsColor} />
                    
                    <div style={{ position: 'relative', zIndex: 2, transform: 'translateY(-20px)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                        <Icon.Spark width="14" height="14" style={{ color: d.theme.horoscopeIconColor }} />
                        <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: d.theme.horoscopeIconColor }}>Your music horoscope</span>
                      </div>
                      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 52, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                        {d.slide1.title.split('\n').map((l: string, i: number) => <React.Fragment key={i}>{l}{i === 0 && <br />}</React.Fragment>)}
                      </div>
                      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F5D783', marginTop: 12 }}>
                        {d.slide1.subtitle}
                      </div>
                      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', marginTop: 16, textWrap: 'pretty' }}>
                        {d.slide1.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fake Bottom Nav */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 74, background: '#0A0907', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 20 }}>
                <BaseIcon.Calendar width="24" height="24" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <BaseIcon.Home width="24" height="24" style={{ color: '#F97316' }} />
                <BaseIcon.User width="24" height="24" style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>

            </div>
          </IOSDevice>
        </div>
      </div>
    </div>
  );
}
