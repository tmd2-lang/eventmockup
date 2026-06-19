import { ACTIVE_REVEAL_NIGHT } from '@/lib/revealData';

/** Default profile when none is stored in localStorage. */
export const REVEAL_DEMO_PROFILE_ID = 'marcus';

/** Demo: seconds after lock-in before reveal auto-opens. */
export const REVEAL_COUNTDOWN_SECONDS = 5;

/** Fallback when the daily-reveal API returns empty — matches ACTIVE_REVEAL_NIGHT. */
export const DEMO_QUESTION = ACTIVE_REVEAL_NIGHT.question;
