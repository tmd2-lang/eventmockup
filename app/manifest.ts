import type { MetadataRoute } from "next";

/* ============================================================
   Web app manifest. Next serves this at /manifest.webmanifest
   and auto-injects <link rel="manifest">. Colors match the app:
   night (#0A0907) launch splash, paper (#FAFAF8) theme.
   `display: standalone` → opens fullscreen, no browser bar.
   The password gate doesn't block it (dotted paths are skipped
   by the middleware matcher).
   ============================================================ */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LIGO",
    short_name: "LIGO",
    description: "Your campus, through music.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0907",
    theme_color: "#FAFAF8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
