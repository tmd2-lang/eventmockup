import { DEMO_PROFILE_IDS } from '@/lib/connectionNightDemo';
import { MockBackend } from '@/lib/mockBackend';

export const CN_RESET_EVENT = 'ligo:cn:reset';

/** Wipe global connection graph + per-profile CN slide actions for a clean demo retest. */
export function resetConnectionNightDemo() {
  MockBackend.clearAll();
  if (typeof window === 'undefined') return;
  for (const id of DEMO_PROFILE_IDS) {
    window.localStorage.removeItem(`ligo:cn:actions:${id}`);
  }
  window.dispatchEvent(new Event(CN_RESET_EVENT));
}
