import re

with open("lib/users.tsx", "r") as f:
    content = f.read()

maddie_block_new = """  maddie: {
    id: 'maddie',
    name: 'Maddie R.',
    firstName: 'Maddie',
    avatar: '/assets/maddie-profile.png',
    archetype: 'The Alt Socialite',
    archetypeIcon: 'algorithm-dodger',
    gradient: 'linear-gradient(145deg, #14B8A6, #A78BFA)',
    yearLevel: 'Junior',
    pronouns: 'She/Her',
    school: 'Georgetown',
    profile: {
      earnedArchetypeId: 'algorithm-dodger',
      heldWeeks: '1 week',
      earnedBlurb: "The alt profile that still works socially. You make weird taste feel playable at a rooftop pregame.",
      traits: [
        { n: '24%', l: <><b>more niche</b> at Georgetown</> },
        { n: '12', l: <><b>core artists</b> carried your week</> },
        { n: '1', l: <><b>track</b> played ironically at the pregame</> }
      ],
      artists: [
        { name: 'Charli XCX', photo: `/assets/artists/charliexcx-profile.jpeg`, pos: 'center 20%', rank: 1 },
        { name: 'The 1975', photo: `/assets/artists/the1975-profile.jpeg`, pos: 'center 20%', rank: 2 },
        { name: 'PinkPantheress', photo: `/assets/artists/pinkpantheress-profile.jpeg`, pos: 'center 20%', rank: 3 },
        { name: 'The Dare', photo: `/assets/artists/thedare-profile.jpeg`, pos: 'center 20%', rank: 4 },
        { name: 'Lil Uzi Vert', photo: `/assets/artists/liluzivert-profile.jpeg`, pos: 'center 20%', rank: 5 },
        { name: 'Disclosure', photo: `/assets/artists/disclosurespotifynew.jpeg`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `/assets/artists/charliexcx-profile.jpeg`,
        `/assets/artists/the1975-profile.jpeg`,
        `/assets/artists/thedare-profile.jpeg`,
        `/assets/artists/disclosurespotifynew.jpeg`,
      ],
      playlistTrackCount: 108,
      answerTrail: [
        { day: 'Today', song: '360', artist: 'Charli XCX', today: true },
        { day: 'Sun', song: 'Boy’s a liar Pt. 2', artist: 'PinkPantheress, Ice Spice' },
        { day: 'Sat', song: 'Girls', artist: 'The Dare' },
        { day: 'Fri', song: 'Diet Pepsi', artist: 'Addison Rae' },
        { day: 'Thu', song: 'Bad Habit', artist: 'Steve Lacy' },
        { day: 'Wed', song: 'XO Tour Llif3', artist: 'Lil Uzi Vert' },
        { day: 'Tue', song: 'Somebody Else', artist: 'The 1975' },
      ],
      playlistTracks: [
        { title: '360', artist: 'Charli XCX', dur: '2:13', photo: `/assets/covers/brat-coverart.jpeg` },
        { title: 'Girls', artist: 'The Dare', dur: '2:25', photo: `/assets/covers/whatswrongwithnewyork-coverart.jpeg` },
        { title: 'Somebody Else', artist: 'The 1975', dur: '5:47', photo: `/assets/covers/ilikeitwhenyousleep-1975-coverart.jpeg` },
        { title: 'XO Tour Llif3', artist: 'Lil Uzi Vert', dur: '3:02', photo: `/assets/covers/luvisrage2-coverart.jpeg` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re making weird taste feel playable today.", body: 'Your last five check-ins jump from Charli and PinkPantheress into The 1975 and The Dare, which means your night starts ironic, gets loud, and somehow becomes everyone else’s new taste next month.' },
        { type: 'honest', date: 'Hot Take', head: '“The best playlists have at least one song that makes no sense until the third drink.”', body: 'Charli XCX, The Dare, The 1975 — the cool alt-social girl rotation.' },
      ],
      currentStreak: 4,
      longestStreak: 11,
      tasteEvolution: [
        { month: 'March', archetype: 'The Mood Curator' },
        { month: 'April', archetype: 'The Alt Socialite' },
        { month: 'May', archetype: 'The Alt Socialite', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 24%', label: 'more niche at Georgetown' },
      ],
      connectedSongs: [
        { song: '360', artist: 'Charli XCX', people: 5 },
        { song: 'Girls', artist: 'The Dare', people: 2 },
        { song: 'Somebody Else', artist: 'The 1975', people: 4 },
      ],
      firstToPick: [
        { text: 'Charli energy' },
        { text: 'Alt social aux' },
        { text: 'Too early again' }
      ],
      hotTake: 'The best playlists have at least one song that makes no sense until the third drink.',
      nowListening: { title: '360', artist: 'Charli XCX', photo: `/assets/covers/brat-coverart.jpeg` },
      onRepeat: [
        { title: '360', artist: 'Charli XCX', photo: `/assets/artists/charliexcx-profile.jpeg`, coverArt: `/assets/covers/brat-coverart.jpeg` },
        { title: 'Girls', artist: 'The Dare', photo: `/assets/artists/thedare-profile.jpeg`, coverArt: `/assets/covers/whatswrongwithnewyork-coverart.jpeg` },
        { title: 'Diet Pepsi', artist: 'Addison Rae', photo: `/assets/artists/addisonrae-profile.jpeg`, coverArt: `/assets/covers/dietpepsi-coverart.jpeg` },
      ],
      archetypeSubline: (
        <>
          <b style={{ color: '#fff' }}>24%</b> more niche · <b style={{ color: '#fff' }}>Charli, The 1975, The Dare</b> core · <span style={{ color: '#14B8A6', fontWeight: 600 }}>playable at a rooftop pregame</span>
        </>
      ),
      mainstreamScoreAccent: 'Top 24%',
      mainstreamScoreRest: 'more niche at Georgetown',
      mainstreamMeterPct: 76,
      mainstreamFootnote: (
        <>
          <b>Charli XCX, PinkPantheress, The 1975</b> — you're picking songs that still work socially.
        </>
      ),
      horoscope: {
        headline: "You’re making weird taste feel playable today.",
        body: 'Your last five check-ins jump from Charli and PinkPantheress into The 1975 and The Dare, which means your night starts ironic, gets loud, and somehow becomes everyone else’s new taste next month.',
        chips: [
          { label: 'Charli energy', tone: 'orange' },
          { label: 'Alt social aux', tone: 'pink' },
          { label: 'Pregame wildcards', tone: 'yellow' },
        ],
      },
      playlistName: 'alt social chaos',
      secretTrack: {
        label: 'Guilty Pleasure',
        title: 'Diet Pepsi',
        artist: 'Addison Rae',
        cover: `/assets/covers/dietpepsi-coverart.jpeg`,
        accentColor: '#14B8A6',
      },
      receiptsFooter: 'Built from your daily answers · Charli XCX, PinkPantheress, The Dare, The 1975, Lil Uzi Vert, and 108 tracks across the semester.',
      notifications: [
        { ic: 'M', bg: 'linear-gradient(145deg,#14B8A6,#A78BFA)', text: <><b>Marcus</b> bumped you — you&apos;re a <b>85% match</b> on The 1975.</>, time: '11 min ago', unread: true },
        { ic: '◉', bg: '#0A0907', text: <>Your archetype held steady — <b>The Alt Socialite</b> for 2 weeks running.</>, time: '4 hr ago', unread: true },
        { ic: '🔥', bg: 'linear-gradient(145deg,#F97316,#C2410C)', text: <>Day <b>4</b> streak — answer today&apos;s question to keep it alive.</>, time: 'Today, 8:45' },
        { ic: '♬', bg: 'linear-gradient(145deg,#EA8CE1,#A13D99)', text: <><b>4 people</b> saved <b>alt social chaos</b> this week.</>, time: 'Yesterday' },
      ],
    }
  },"""

idx_maddie = content.find("  maddie: {")
idx_alessia = content.find("  alessia: {")

if idx_maddie != -1 and idx_alessia != -1:
    new_content = content[:idx_maddie] + maddie_block_new + "\n" + content[idx_alessia:]
    with open("lib/users.tsx", "w") as f:
        f.write(new_content)
    print("Replaced successfully!")
else:
    print("Could not find blocks")
