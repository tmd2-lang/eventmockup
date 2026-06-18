export type ConnectionActionType = 'vibe' | 'spark' | 'pass' | 'meetup_invite' | 'meetup_confirmed';

export interface ConnectionAction {
  id: string;
  fromId: string;
  toId: string;
  type: ConnectionActionType;
  payload?: unknown;
  timestamp: number;
}

export type OrbitConnection = {
  otherId: string;
  action: ConnectionAction;
  direction: 'in' | 'out';
};

const STORAGE_KEY = 'ligo:global:connections';
export const CONNECTIONS_UPDATE_EVENT = 'ligo:global:connections:update';

function norm(id: string) {
  return id.toLowerCase().trim();
}

function getStoredConnections(): ConnectionAction[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveConnections(actions: ConnectionAction[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  window.dispatchEvent(new Event(CONNECTIONS_UPDATE_EVENT));
}

export const MockBackend = {
  recordAction(fromId: string, toId: string, type: ConnectionActionType, payload?: unknown) {
    const connections = getStoredConnections();
    const newAction: ConnectionAction = {
      id: Math.random().toString(36).substring(2, 9),
      fromId: norm(fromId),
      toId: norm(toId),
      type,
      payload,
      timestamp: Date.now(),
    };
    connections.push(newAction);
    saveConnections(connections);
  },

  /** Re-sync persisted CN slide choices into the global graph (replay / refresh). */
  ensureAction(fromId: string, toId: string, type: ConnectionActionType) {
    const from = norm(fromId);
    const to = norm(toId);
    const exists = getStoredConnections().some(
      (c) => norm(c.fromId) === from && norm(c.toId) === to && c.type === type,
    );
    if (!exists) this.recordAction(from, to, type);
  },

  getIncomingConnections(userId: string): ConnectionAction[] {
    const uid = norm(userId);
    const connections = getStoredConnections();
    const incoming = connections.filter((c) => norm(c.toId) === uid && c.type !== 'pass');

    const latestMap = new Map<string, ConnectionAction>();
    incoming.forEach((c) => {
      const from = norm(c.fromId);
      const existing = latestMap.get(from);
      if (!existing || existing.timestamp < c.timestamp) {
        latestMap.set(from, c);
      }
    });

    return Array.from(latestMap.values()).sort((a, b) => b.timestamp - a.timestamp);
  },

  /** All orbit-visible ties for a user (incoming + outgoing, latest per person). */
  getOrbitConnections(userId: string): OrbitConnection[] {
    const uid = norm(userId);
    const relevant = getStoredConnections().filter((c) => {
      if (c.type === 'pass') return false;
      return norm(c.fromId) === uid || norm(c.toId) === uid;
    });

    const byOther = new Map<string, OrbitConnection>();
    for (const c of relevant) {
      const from = norm(c.fromId);
      const to = norm(c.toId);
      const isIncoming = to === uid;
      const otherId = isIncoming ? from : to;
      const direction = isIncoming ? ('in' as const) : ('out' as const);
      const prev = byOther.get(otherId);
      if (!prev || prev.action.timestamp < c.timestamp) {
        byOther.set(otherId, { otherId, action: c, direction });
      }
    }

    return Array.from(byOther.values()).sort((a, b) => b.action.timestamp - a.action.timestamp);
  },

  isMutualSpark(userA: string, userB: string): boolean {
    const a = norm(userA);
    const b = norm(userB);
    const connections = getStoredConnections();
    const aToB = connections.some((c) => norm(c.fromId) === a && norm(c.toId) === b && c.type === 'spark');
    const bToA = connections.some((c) => norm(c.fromId) === b && norm(c.toId) === a && c.type === 'spark');
    return aToB && bToA;
  },

  clearAll() {
    saveConnections([]);
  },
};
