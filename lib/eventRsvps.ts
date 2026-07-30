import type { EventItem, MockUser, RSVPStatus } from './mockEventsData';

/** Per-user RSVPs: userId → eventId → status */
export type UserRsvpStore = Record<string, Record<string, Exclude<RSVPStatus, null>>>;

export function userBelongsToOrg(user: MockUser | { organizations: Array<{ organizationId: string }> }, orgId?: string) {
  if (!orgId) return false;
  return user.organizations.some(o => o.organizationId === orgId);
}

/**
 * Resolve what *this* user should see for an event.
 * Explicit RSVPs win; otherwise membership / invite lists imply pending;
 * creator is hosting.
 */
export function resolveEventStatusForUser(
  event: EventItem,
  userId: string,
  user: MockUser | { organizations: Array<{ organizationId: string }> },
  rsvpStore: UserRsvpStore,
): RSVPStatus {
  if (event.creatorId && event.creatorId === userId) return 'hosting';

  const explicit = rsvpStore[userId]?.[String(event.id)];
  if (explicit) return explicit;

  const live = event.publishStatus !== 'draft' && event.publishStatus !== 'planning';

  if (event.visibility === 'members_only' && live && userBelongsToOrg(user, event.hostOrganizationId)) {
    return 'pending';
  }

  if (event.invitedUserIds?.includes(userId)) {
    return 'pending';
  }

  return null;
}

export function withResolvedStatuses(
  events: EventItem[],
  userId: string,
  user: MockUser | { organizations: Array<{ organizationId: string }> },
  rsvpStore: UserRsvpStore,
): EventItem[] {
  return events.map(e => {
    const status = resolveEventStatusForUser(e, userId, user, rsvpStore);
    if (status === e.currentUserStatus) return e;
    return { ...e, currentUserStatus: status };
  });
}

export function setUserRsvp(
  store: UserRsvpStore,
  userId: string,
  eventId: string,
  status: Exclude<RSVPStatus, null> | null,
): UserRsvpStore {
  const nextUser = { ...(store[userId] || {}) };
  if (status === null) {
    delete nextUser[eventId];
  } else {
    nextUser[eventId] = status;
  }
  return { ...store, [userId]: nextUser };
}
