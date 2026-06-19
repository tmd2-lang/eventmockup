'use client';

import { useEffect, useState } from 'react';
import { CONNECTIONS_UPDATE_EVENT } from '@/lib/mockBackend';

/** Bump a revision counter whenever the global connection graph changes. */
export function useConnectionRevision(): number {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const bump = () => setRevision((r) => r + 1);
    window.addEventListener(CONNECTIONS_UPDATE_EVENT, bump);
    return () => window.removeEventListener(CONNECTIONS_UPDATE_EVENT, bump);
  }, []);

  return revision;
}
