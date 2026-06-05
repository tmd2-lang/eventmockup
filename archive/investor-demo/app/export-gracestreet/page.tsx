/* eslint-disable */
"use client";

import React, { useRef, useState } from "react";
import { IOSDevice } from "@/components/IOSDevice";
import { PlanAHang } from "@/app/investor-demo/PlanAHang";
import * as htmlToImage from 'html-to-image';
import { Icon as BaseIcon } from "@/components/Primitives";

const Icon: any = { ...BaseIcon };
Icon.Download = (p: any) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export default function ExportGraceStreet() {
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    try {
      await htmlToImage.toPng(printRef.current, { cacheBust: true, pixelRatio: 2 });
      await new Promise(r => setTimeout(r, 150));
      const dataUrl = await htmlToImage.toPng(printRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Ligo-Grace-Street.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#0A0907", fontFamily: "var(--font-display, sans-serif)", overflow: "hidden" }}>
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <h1 style={{ color: "#white", fontSize: 16, fontWeight: 600 }}>Export: Grace Street Venue</h1>
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
            <div style={{ width: "100%", height: "100%", background: "#0A0907", overflow: "hidden", position: "relative" }}>
              <PlanAHang currentUser={{ name: "Cole", photo: "/assets/Cole-profile.png" }} profile={{ name: "Caroline", photo: "/assets/caroline-profile.png" }} demoScene={7} />
            </div>
          </IOSDevice>
        </div>
      </div>
    </div>
  );
}
