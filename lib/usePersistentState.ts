"use client";
import { useEffect, useState } from "react";

/**
 * useState that persists to localStorage — the app's client-side "memory".
 *
 * SSR/hydration-safe: renders `initial` on the server and on the first client
 * paint (so markup matches), then rehydrates from localStorage on mount and
 * writes back on every change. The `ready` guard prevents the first write from
 * clobbering a stored value with `initial` before the read lands.
 *
 * No backend — this is per-device/browser memory, which is exactly right for a
 * demo: a cofounder's answers and reveal choices survive refreshes and revisits.
 */
export function usePersistentState<T>(
  key: string,
  initial: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  // read once on mount and listen for updates
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setReady(true);

    const handleCustomStorage = (e: any) => {
      if (e.detail && e.detail.key === key) {
        setValue(e.detail.newValue);
      }
    };

    window.addEventListener("ligo:storage", handleCustomStorage);
    return () => window.removeEventListener("ligo:storage", handleCustomStorage);
  }, [key]);

  // write on change
  useEffect(() => {
    if (!ready) return;
    try {
      const raw = window.localStorage.getItem(key);
      const stringified = JSON.stringify(value);
      if (raw !== stringified) {
        window.localStorage.setItem(key, stringified);
        window.dispatchEvent(
          new CustomEvent("ligo:storage", { detail: { key, newValue: value } })
        );
      }
    } catch {
      /* ignore */
    }
  }, [key, value, ready]);

  return [value, setValue];
}
