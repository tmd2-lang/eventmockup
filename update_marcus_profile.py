# Update users.tsx
with open("lib/users.tsx", "r") as f:
    users_content = f.read()

marcus_profile = """  marcus: {
    id: 'marcus',
    name: 'Marcus T.',
    firstName: 'Marcus',
    avatar: '/assets/Marcus-profile.png',
    archetype: 'The Deep Cut Generalist',
    archetypeIcon: 'deep-cut',
    gradient: 'linear-gradient(145deg, #10B981, #3B82F6)',
    yearLevel: 'Senior',
    pronouns: 'He/Him',
    school: 'Georgetown',
    profile: {
      earnedArchetypeId: 'deep-cut',
      heldWeeks: '1 week',
      earnedBlurb: "The true mixer. Marcus is no longer niche for niche sake. He can move from Fleetwood Mac to Freddie Gibbs, MK to Tame Impala, Disclosure to The Strokes, and make it feel like one worldview.",
      traits: [
        { n: '38%', l: <><b>more niche</b> at Georgetown</> },
        { n: '12', l: <><b>core artists</b> carried your week</> },
        { n: '1', l: <><b>perfect transition</b> made the room stop and ask for the song</> }
      ],
      artists: [
        { name: 'Tame Impala', photo: `/assets/artists/tameimpala-profile.jpeg`, pos: 'center 20%', rank: 1 },
        { name: 'MGMT', photo: `/assets/artists/MGMT-profile.jpeg`, pos: 'center 20%', rank: 2 },
        { name: 'Fleetwood Mac', photo: `/assets/artists/fleetwoodmac-profile.jpeg`, pos: 'center 20%', rank: 3 },
        { name: 'MK', photo: `/assets/artists/mk-profile.jpeg`, pos: 'center 20%', rank: 4 },
        { name: 'Freddie Gibbs', photo: `/assets/artists/freddiegibbs-profile.jpeg`, pos: 'center 20%', rank: 5 },
        { name: 'KAYTRANADA', photo: `/assets/artists/kaytranada-profile.jpeg`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `/assets/artists/tameimpala-profile.jpeg`,
        `/assets/artists/MGMT-profile.jpeg`,
        `/assets/artists/fleetwoodmac-profile.jpeg`,
        `/assets/artists/mk-profile.jpeg`,
      ],
      playlistTrackCount: 100,
      answerTrail: [
        { day: 'Today', song: 'Electric Feel', artist: 'MGMT', today: true },
        { day: 'Sun', song: 'Let It Happen', artist: 'Tame Impala' },
        { day: 'Sat', song: '17', artist: 'MK' },
        { day: 'Fri', song: 'Crime Pays', artist: 'Freddie Gibbs, Madlib' },
        { day: 'Thu', song: 'Dreams', artist: 'Fleetwood Mac' },
        { day: 'Wed', song: '10%', artist: 'KAYTRANADA, Kali Uchis' },
        { day: 'Tue', song: 'Reptilia', artist: 'The Strokes' },
      ],
      playlistTracks: [
        { title: 'Electric Feel', artist: 'MGMT', dur: '3:49', photo: `/assets/artists/MGMT-profile.jpeg`, coverArt: `/covers/mgmtoracularspectacular-coverart.jpeg` },
        { title: 'Let It Happen', artist: 'Tame Impala', dur: '7:47', photo: `/assets/artists/tameimpala-profile.jpeg`, coverArt: `/covers/currents-coverart.jpeg` },
        { title: '17', artist: 'MK', dur: '3:16', photo: `/assets/artists/mk-profile.jpeg`, coverArt: `/covers/mk17-coverart.jpeg` },
        { title: 'Crime Pays', artist: 'Freddie Gibbs, Madlib', dur: '3:02', photo: `/assets/artists/freddiegibbs-profile.jpeg`, coverArt: `/covers/bandana-coverart.jpeg` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re the compatibility wild card today.", body: 'Your last five check-ins jump from MGMT and Tame Impala into MK and Freddie Gibbs, which means your night starts chill, hits the dancefloor, and somehow ends with everyone agreeing on your taste.' },
        { type: 'honest', date: 'Hot Take', head: '“The best aux is one your dad would respect and your friends would still dance to.”', body: 'Tame Impala, MGMT, Fleetwood Mac, MK — you share a different lane with almost everyone.' },
      ],
      currentStreak: 4,
      longestStreak: 11,
      tasteEvolution: [
        { month: 'March', archetype: 'The Mood Curator' },
        { month: 'April', archetype: 'The Deep Cut Generalist' },
        { month: 'May', archetype: 'The Deep Cut Generalist', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 38%', label: 'more niche at Georgetown' },
      ],
      connectedSongs: [
        { song: 'Let It Happen', artist: 'Tame Impala', people: 5 },
        { song: '17', artist: 'MK', people: 2 },
        { song: 'Reptilia', artist: 'The Strokes', people: 4 },
      ],
      firstToPick: [
        { text: 'Tame Impala energy' },
        { text: 'Mixes everything' },
        { text: 'Unites the room' }
      ],
      hotTake: 'The best aux is one your dad would respect and your friends would still dance to.',
      nowListening: { title: 'Electric Feel', artist: 'MGMT', photo: `/assets/artists/MGMT-profile.jpeg`, coverArt: `/covers/mgmtoracularspectacular-coverart.jpeg` },
      onRepeat: [
        { title: 'Electric Feel', artist: 'MGMT', photo: `/assets/artists/MGMT-profile.jpeg`, coverArt: `/covers/mgmtoracularspectacular-coverart.jpeg` },
        { title: 'Let It Happen', artist: 'Tame Impala', photo: `/assets/artists/tameimpala-profile.jpeg`, coverArt: `/covers/currents-coverart.jpeg` },
        { title: '17', artist: 'MK', photo: `/assets/artists/mk-profile.jpeg`, coverArt: `/covers/mk17-coverart.jpeg` },
      ],
      archetypeSubline: (
        <>
          <b style={{ color: '#fff' }}>38%</b> more niche · <b style={{ color: '#fff' }}>Tame, MGMT, Fleetwood</b> core · <span style={{ color: '#3B82F6', fontWeight: 600 }}>the true mixer</span>
        </>
      ),
      mainstreamScoreAccent: 'Top 38%',
      mainstreamScoreRest: 'more niche at Georgetown',
      mainstreamMeterPct: 62,
      mainstreamFootnote: (
        <>
          <b>Tame Impala, MGMT, Fleetwood Mac, MK</b> — you share a different lane with almost everyone.
        </>
      ),
      horoscope: {
        headline: "You’re the compatibility wild card today.",
        body: 'Your last five check-ins jump from MGMT and Tame Impala into MK and Freddie Gibbs, which means your night starts chill, hits the dancefloor, and somehow ends with everyone agreeing on your taste.',
        chips: [
          { label: 'Tame Impala energy', tone: 'orange' },
          { label: 'Mixes everything', tone: 'yellow' },
          { label: 'Unites the room', tone: 'pink' },
        ],
      },
      playlistName: 'the true mixer',
      secretTrack: {
        label: 'Guilty Pleasure',
        title: 'Dreams',
        artist: 'Fleetwood Mac',
        cover: `/covers/rumours-coverart.jpeg`,
        accentColor: '#3B82F6',
      },
      receiptsFooter: 'Built from your daily answers · Tame Impala, MGMT, Fleetwood Mac, MK, Freddie Gibbs, The Rolling Stones, and 100 tracks across the semester.',
      notifications: [
        { ic: 'M', bg: 'linear-gradient(145deg,#14B8A6,#A78BFA)', text: <><b>Maddie</b> bumped you — you&apos;re a <b>85% match</b> on Tame Impala and The Strokes.</>, time: '11 min ago', unread: true },
        { ic: 'C', bg: 'linear-gradient(145deg,#3B82F6,#14B8A6)', text: <><b>Cole</b> bumped you — you&apos;re a <b>75% match</b> on MK and Disclosure.</>, time: '15 min ago', unread: true },
        { ic: '◉', bg: '#0A0907', text: <>Your archetype held steady — <b>The Deep Cut Generalist</b> for 2 weeks running.</>, time: '4 hr ago', unread: true },
      ],
    }
  },
"""

idx_charlotte = users_content.find("  charlotte: {")
if idx_charlotte != -1 and "marcus: {" not in users_content:
    new_users_content = users_content[:idx_charlotte] + marcus_profile + users_content[idx_charlotte:]
    with open("lib/users.tsx", "w") as f:
        f.write(new_users_content)
    print("Inserted Marcus into users.tsx")

# Now update archetypes.tsx
with open("components/profile/archetypes.tsx", "r") as f:
    arch_content = f.read()

new_arch = """  {
    id: "deep-cut",
    name: "The Deep Cut Generalist",
    descriptor: "The true mixer. Moves from Fleetwood Mac to Freddie Gibbs and makes it feel like one worldview.",
    ring: ["#10B981", "#3B82F6", "#8B5CF6"],
    accent: "#3B82F6",
    eyebrow: "#3B82F6",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(59,130,246,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(16,185,129,0.12), transparent 60%)",
    seal: "globe",
  },
"""

if "deep-cut" not in arch_content:
    arch_content = arch_content.replace('];\n\nexport function getArchetypeById', new_arch + '];\n\nexport function getArchetypeById')
    with open("components/profile/archetypes.tsx", "w") as f:
        f.write(arch_content)
    print("Added archetype to archetypes.tsx")
