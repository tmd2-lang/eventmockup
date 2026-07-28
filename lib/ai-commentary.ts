// 5 Registers: 
// 0: Dry observational
// 1: Roast (affectionate, at the picker)
// 2: Knowing nod
// 3: Context drop (flat fact)
// 4: Campus read (ties pick to night's mood)

type ContextDict = { user: [string, string, string], campus: [string, string, string] };
type CommentaryMap = Record<string, ContextDict>; 

const ARTIST_DICTIONARY: CommentaryMap = {
  "Tame Impala": {
    user: [
      "A predictable but undeniably solid choice.",
      "We get it, you own a film camera.",
      "Impeccable taste in modern psychedelia.",
    ],
    campus: [
      "A predictable but undeniably solid campus consensus.",
      "Georgetown collectively decided they own film cameras.",
      "The student body is firmly in its indie era.",
    ]
  },
  "Fleetwood Mac": {
    user: [
      "A timeless classic that refuses to age.",
      "Going through a devastating breakup, but make it aesthetic.",
      "Respect for honoring the true 70s legends.",
    ],
    campus: [
      "A timeless classic that refuses to age on campus.",
      "Georgetown is collectively going through a breakup.",
      "The campus respects true 70s legends.",
    ]
  },
  "Drake": {
    user: [
      "A safe bet when you need guaranteed energy.",
      "You drafted a text to your ex tonight, didn't you?",
      "You definitely wanted something you could rap along to.",
    ],
    campus: [
      "The campus needed guaranteed energy tonight.",
      "Georgetown's late-night default, without fail.",
      "Everyone wanted something they could rap along to.",
    ]
  },
  "Kendrick Lamar": {
    user: [
      "A deeply cerebral pick for a late night.",
      "Trying a bit too hard to prove you appreciate real hip-hop.",
      "Nothing but respect for the reigning Pulitzer winner.",
    ],
    campus: [
      "A deeply cerebral consensus for a late night.",
      "The campus is in a highly analytical mood.",
      "Nothing but respect from Georgetown for the reigning Pulitzer winner.",
    ]
  },
  "Beach House": {
    user: [
      "Leaning into the ethereal late-night atmosphere.",
      "Staring blankly at the ceiling while this plays on loop.",
      "You know exactly how to set the mood.",
    ],
    campus: [
      "The campus is leaning into the ethereal late-night atmosphere.",
      "Everyone is staring blankly at the ceiling right now.",
      "Georgetown is lost in the reverb tonight.",
    ]
  },
  "The Strokes": {
    user: [
      "A staple of early 2000s indie rock.",
      "You bought a leather jacket once and made it your personality.",
      "An absolute masterclass in garage rock revival.",
    ],
    campus: [
      "A staple of early 2000s indie rock uniting the campus.",
      "Georgetown's garage rock revival is in full swing.",
      "The student body unanimously chose the leather jacket aesthetic.",
    ]
  },
  "Frank Ocean": {
    user: [
      "A deeply introspective late-night selection.",
      "We know you're emotionally unavailable right now.",
      "Flawless pick for driving around aimlessly.",
    ],
    campus: [
      "A deeply introspective late-night selection for the campus.",
      "Georgetown is collectively emotionally unavailable right now.",
      "The entire campus is driving around aimlessly tonight.",
    ]
  },
  "Taylor Swift": {
    user: [
      "A pop anthem that everyone secretly knows.",
      "You probably already have tickets to the next tour.",
      "Never underestimate the power of a perfect pop hook.",
    ],
    campus: [
      "A pop anthem that dominated the campus votes.",
      "Georgetown is firmly in its Swiftie era.",
      "The campus could not resist a perfect pop hook.",
    ]
  },
  "PinkPantheress": {
    user: [
      "Fast-paced drum and bass for the modern era.",
      "Your attention span is exactly 90 seconds long.",
      "A perfect slice of internet-era pop music.",
    ],
    campus: [
      "Fast-paced drum and bass took over the campus.",
      "Georgetown's attention span is exactly 90 seconds long.",
      "A perfect slice of internet-era pop music for the student body.",
    ]
  },
  "MGMT": {
    user: [
      "A nostalgic trip back to the bloghaus era.",
      "You peaked in 2008 and that's okay.",
      "Still sounds just as fresh as the day it dropped.",
    ],
    campus: [
      "A nostalgic campus trip back to the bloghaus era.",
      "Georgetown wishes it was 2008 again.",
      "The campus agrees this still sounds just as fresh.",
    ]
  },
};

const GENERIC_FALLBACKS = {
  user: [
    [
      "A solid track with undeniable appeal.",
      "Main character energy, for better or worse.",
      "You definitely have good taste, we'll give you that.",
    ],
    [
      "An interesting choice that breaks from the usual mold.",
      "A solid pick, but let's be honest, you only know the chorus.",
      "A deep cut that proves you actually listen to music.",
    ],
    [
      "A track that comfortably bridges multiple genres.",
      "You picked this just to be slightly different.",
      "Always nice to see something a bit off the beaten path.",
    ]
  ],
  campus: [
    [
      "A solid track with undeniable mainstream campus appeal.",
      "Georgetown has main character energy tonight.",
      "The campus definitely has good taste, we'll give them that.",
    ],
    [
      "An interesting consensus that breaks from the usual mold.",
      "A solid pick, but the campus probably only knows the chorus.",
      "A deep cut that proves the student body actually listens to music.",
    ],
    [
      "A track that comfortably united multiple campus cliques.",
      "Georgetown picked this just to be slightly different.",
      "Always nice to see the campus drift off the beaten path.",
    ]
  ]
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getCommentary(
  dayIndex: number,
  artist: string,
  song: string,
  campusMood: string,
  context: 'user' | 'campus'
): string {
  // Deterministic register selection (0 to 4)
  // Shift by song hash to ensure it feels random per song, but stays deterministic per day/song combo
  const register = (dayIndex + hashString(song)) % 5;
  
  const artistKey = Object.keys(ARTIST_DICTIONARY).find(
    k => k.toLowerCase() === artist.toLowerCase()
  );

  // Register 3: Context Drop
  if (register === 3) {
    if (hashString(song) % 2 === 0) {
      return `Fun fact: "${song}" has seen a massive streaming resurgence this year.`;
    }
    return `"${song}" remains one of the defining tracks of its era.`;
  }

  // Register 4: Campus Read
  if (register === 4) {
    if (context === 'user') {
      return `A perfect soundtrack for your own personal main character moment.`;
    } else {
      return `No wonder campus is feeling ${campusMood}, with everyone picking "${song}".`;
    }
  }

  // Registers 0, 1, 2
  if (artistKey) {
    return ARTIST_DICTIONARY[artistKey][context][register];
  } else {
    // Fallback dictionary
    const fallbackGroup = GENERIC_FALLBACKS[context][hashString(artist) % GENERIC_FALLBACKS[context].length];
    return fallbackGroup[register];
  }
}
