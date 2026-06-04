/* Shared auth constants used by both the middleware (Edge) and the
   /api/auth route (Node). Keep this free of runtime-specific imports. */
export const AUTH_COOKIE = "ligo_auth";
export const AUTH_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds
