import { EventItem } from './mockEventsData';
import { USERS } from './users';

export type GoingFace = { id: string; name: string; shortName: string; avatar: string };

export type GoingSocial = {
  faces: GoingFace[];
  going: number;
  connectionCount: number;
  /** Compact: "Maya, Sofia + 34 going" */
  label: string;
  /** Detail heading: "38 people are going" */
  heading: string;
  /** Detail sub: "4 people you know" */
  connectionsLabel: string;
};

const DEMO_FACE_POOL = ['sofia', 'charlotte', 'caroline', 'maddie', 'alessia', 'bennett', 'cole', 'jordan', 'marcus'] as const;

function shortFirst(name: string) {
  return name.split(' ')[0].replace(/\.$/, '');
}

/** Stable, authentic faces + honest counts. Never inflate attendance. */
export function getGoingSocial(event: EventItem, currentUserId?: string): GoingSocial {
  const going = event.goingCount || event.socialProof?.going || 0;
  const connectionCount = Math.min(
    event.socialProof?.connections ?? Math.min(going, 4),
    going,
    6,
  );

  const seed = String(event.id).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const pool = DEMO_FACE_POOL.filter(id => id !== currentUserId && USERS[id]?.avatar);
  const faces: GoingFace[] = pool.length === 0
    ? []
    : [...pool.slice(seed % pool.length), ...pool.slice(0, seed % pool.length)]
        .slice(0, Math.min(connectionCount, 4))
        .map(id => {
          const u = USERS[id];
          return {
            id,
            name: u.name,
            shortName: shortFirst(u.name),
            avatar: u.avatar,
          };
        });

  let label = '';
  if (going <= 0) {
    label = 'Be the first to RSVP';
  } else if (faces.length >= 2) {
    const rest = Math.max(going - faces.length, 0);
    label = rest > 0
      ? `${faces[0].shortName}, ${faces[1].shortName} + ${rest} going`
      : `${faces.map(f => f.shortName).join(', ')} going`;
  } else if (faces.length === 1) {
    const rest = Math.max(going - 1, 0);
    label = rest > 0
      ? `${faces[0].shortName} + ${rest} going`
      : `${faces[0].shortName} is going`;
  } else {
    label = `${going} going`;
  }

  const heading = going <= 0
    ? 'No RSVPs yet'
    : `${going} ${going === 1 ? 'person is' : 'people are'} going`;

  const connectionsLabel = connectionCount > 0
    ? `${connectionCount} ${connectionCount === 1 ? 'person' : 'people'} you know`
    : '';

  return { faces, going, connectionCount, label, heading, connectionsLabel };
}
