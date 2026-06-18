export type ConnectionActionType = 'vibe' | 'spark' | 'pass' | 'meetup_invite';

export interface ConnectionAction {
  id: string;
  fromId: string;
  toId: string;
  type: ConnectionActionType;
  payload?: any;
  timestamp: number;
}

const STORAGE_KEY = 'ligo:global:connections';

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
  // Dispatch an event so other components can react instantly
  window.dispatchEvent(new Event('ligo:global:connections:update'));
}

export const MockBackend = {
  // Record a new action (vibe, spark, pass, meetup_invite)
  recordAction(fromId: string, toId: string, type: ConnectionActionType, payload?: any) {
    const connections = getStoredConnections();
    const newAction: ConnectionAction = {
      id: Math.random().toString(36).substring(2, 9),
      fromId,
      toId,
      type,
      payload,
      timestamp: Date.now(),
    };
    connections.push(newAction);
    saveConnections(connections);
  },

  // Get all connections where the active user is the TARGET
  getIncomingConnections(userId: string): ConnectionAction[] {
    const connections = getStoredConnections();
    // Filter to latest action from each unique sender to this user
    // e.g. if Cole sent a Vibe, then later sent a Meetup Invite, we only care about the latest status
    const incoming = connections.filter(c => c.toId === userId && c.type !== 'pass');
    
    // Deduplicate by fromId (keeping the most recent)
    const latestMap = new Map<string, ConnectionAction>();
    incoming.forEach(c => {
      const existing = latestMap.get(c.fromId);
      if (!existing || existing.timestamp < c.timestamp) {
        latestMap.set(c.fromId, c);
      }
    });

    return Array.from(latestMap.values()).sort((a, b) => b.timestamp - a.timestamp);
  },

  // Check if there is a mutual spark between A and B
  isMutualSpark(userA: string, userB: string): boolean {
    const connections = getStoredConnections();
    const aToB = connections.find(c => c.fromId === userA && c.toId === userB && c.type === 'spark');
    const bToA = connections.find(c => c.fromId === userB && c.toId === userA && c.type === 'spark');
    return !!(aToB && bToA);
  },
  
  // Clear all connections (for resetting the demo)
  clearAll() {
    saveConnections([]);
  }
};
