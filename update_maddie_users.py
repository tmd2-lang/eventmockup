import re

with open("lib/users.tsx", "r") as f:
    content = f.read()

maddie_block_new = """  maddie: {
    id: 'maddie',
    name: 'Maddie R.',
    firstName: 'Maddie',
    avatar: '/assets/maddie-profile.png',
    archetype: 'The Algorithm Dodger',
    archetypeIcon: 'algorithm-dodger',
    gradient: 'linear-gradient(145deg, #14B8A6, #A78BFA)',
    profile: {
      earnedArchetypeId: 'algorithm-dodger',
      heldWeeks: '1 week',
      earnedBlurb: "alt-pop chaos · internet taste · party songs before they become party songs",
      traits: [
        { n: '12%', l: <><b>most niche</b> at Georgetown</> },
        { n: '9', l: <><b>students</b> follow your top niche artists</> },
        { n: '1', l: <><b>track</b> played ironically</> }
      ],
      artists: [
        { name: 'Charli XCX', photo: `/assets/artists/charliexcx-profile.jpeg`, pos: 'center 20%', rank: 1 },
        { name: 'PinkPantheress', photo: `/assets/artists/pinkpantheress-profile.jpeg`, pos: 'center 20%', rank: 2 },
        { name: 'The Dare', photo: `/assets/artists/thedare-profile.jpeg`, pos: 'center 20%', rank: 3 },
        { name: 'The 1975', photo: `/assets/artists/the1975-profile.jpeg`, pos: 'center 20%', rank: 4 },
        { name: 'Steve Lacy', photo: `/assets/artists/stevelacy-profile.jpeg`, pos: 'center 20%', rank: 5 },
        { name: 'Addison Rae', photo: `/assets/artists/addisonrae-profile.jpeg`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `/assets/artists/charliexcx-profile.jpeg`,
        `/assets/artists/pinkpantheress-profile.jpeg`,
        `/assets/artists/thedare-profile.jpeg`,
        `/assets/artists/the1975-profile.jpeg`,
      ],
      playlistTrackCount: 108,
      answerTrail: [
        { day: 'Today', song: '360', artist: 'Charli XCX', today: true },
        { day: 'Sun', song: 'Boy’s a liar Pt. 2', artist: 'PinkPantheress, Ice Spice' },
        { day: 'Sat', song: 'Girls', artist: 'The Dare' },
        { day: 'Fri', song: 'Diet Pepsi', artist: 'Addison Rae' },
        { day: 'Thu', song: 'Bad Habit', artist: 'Steve Lacy' },
        { day: 'Wed', song: 'Electric Feel', artist: 'MGMT' },
        { day: 'Tue', song: 'Somebody Else', artist: 'The 1975' },
      ],
      playlistTracks: [
        { title: '360', artist: 'Charli XCX', dur: '2:13', photo: `/assets/covers/brat-coverart.jpeg` },
        { title: 'Girls', artist: 'The Dare', dur: '2:25', photo: `/assets/covers/whatswrongwithnewyork-coverart.jpeg` },
        { title: 'Somebody Else', artist: 'The 1975', dur: '5:47', photo: `/assets/covers/ilikeitwhenyousleep-1975-coverart.jpeg` },
        { title: 'Bad Habit', artist: 'Steve Lacy', dur: '3:52', photo: `/assets/covers/stevelacy-geminirights-coverart.jpeg` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re slightly ahead of the group chat today.", body: 'Your last five check-ins jump from Charli and PinkPantheress into The 1975 and The Dare, which means your night starts ironic, gets loud, and somehow becomes everyone else’s new taste next month.' },
        { type: 'honest', date: 'Hot Take', head: '“Being early only counts if you don’t make it your whole personality.”', body: 'Charli XCX, PinkPantheress, The Dare — followed by fewer than 9 other Georgetown students.' },
      ],
      currentStreak: 4,
      longestStreak: 11,
      tasteEvolution: [
        { month: 'March', archetype: 'The Mood Curator' },
        { month: 'April', archetype: 'The Algorithm Dodger' },
        { month: 'May', archetype: 'The Algorithm Dodger', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 12%', label: 'most niche at Georgetown' },
      ],
      connectedSongs: [
        { song: '360', artist: 'Charli XCX', people: 5 },
        { song: 'Girls', artist: 'The Dare', people: 2 },
        { song: 'Somebody Else', artist: 'The 1975', people: 4 },
      ],
      firstToPick: [
        { text: 'Charli energy' },
        { text: 'Alt girl aux' },
        { text: 'Too early again' }
      ],
      hotTake: 'Being early only counts if you don’t make it your whole personality.',
      nowListening: { title: '360', artist: 'Charli XCX', photo: `/assets/covers/brat-coverart.jpeg` },
      onRepeat: [
        { title: '360', artist: 'Charli XCX', photo: `/assets/artists/charliexcx-profile.jpeg`, coverArt: `/assets/covers/brat-coverart.jpeg` },
        { title: 'Girls', artist: 'The Dare', photo: `/assets/artists/thedare-profile.jpeg`, coverArt: `/assets/covers/whatswrongwithnewyork-coverart.jpeg` },
        { title: 'Diet Pepsi', artist: 'Addison Rae', photo: `/assets/artists/addisonrae-profile.jpeg`, coverArt: `/assets/covers/dietpepsi-coverart.jpeg` },
      ],
      archetypeSubline: (
        <>
          <b style={{ color: '#fff' }}>12%</b> more mainstream · <b style={{ color: '#fff' }}>Charli, PinkPantheress, The Dare</b> core · <span style={{ color: '#14B8A6', fontWeight: 600 }}>internet taste</span>
        </>
      ),
      mainstreamScoreAccent: 'Top 12%',
      mainstreamScoreRest: 'most niche at Georgetown',
      mainstreamMeterPct: 88,
      mainstreamFootnote: (
        <>
          <b>Charli XCX, PinkPantheress, The Dare</b> — you're picking songs weeks before they hit the parties.
        </>
      ),
      horoscope: {
        headline: "You’re slightly ahead of the group chat today.",
        body: 'Your last five check-ins jump from Charli and PinkPantheress into The 1975 and The Dare, which means your night starts ironic, gets loud, and somehow becomes everyone else’s new taste next month.',
        chips: [
          { label: 'Charli energy', tone: 'orange' },
          { label: 'Alt girl aux', tone: 'pink' },
          { label: 'Too early again', tone: 'yellow' },
        ],
      },
      playlistName: 'alt pop chaos',
      secretTrack: {
        label: 'Guilty Pleasure',
        title: 'Diet Pepsi',
        artist: 'Addison Rae',
        cover: `/assets/covers/dietpepsi-coverart.jpeg`,
        accentColor: '#14B8A6',
      },
      receiptsFooter: 'Built from your daily answers · Charli XCX, PinkPantheress, The Dare, Steve Lacy, The 1975, and 108 tracks across the semester.',
      notifications: [
        { ic: 'C', bg: 'linear-gradient(145deg,#14B8A6,#A78BFA)', text: <><b>Charlotte</b> bumped you — you&apos;re a <b>85% match</b> on pop drops.</>, time: '11 min ago', unread: true },
        { ic: '◉', bg: '#0A0907', text: <>Your archetype held steady — <b>The Algorithm Dodger</b> for 2 weeks running.</>, time: '4 hr ago', unread: true },
        { ic: '🔥', bg: 'linear-gradient(145deg,#F97316,#C2410C)', text: <>Day <b>4</b> streak — answer today&apos;s question to keep it alive.</>, time: 'Today, 8:45' },
        { ic: '♬', bg: 'linear-gradient(145deg,#EA8CE1,#A13D99)', text: <><b>4 people</b> saved <b>alt pop chaos</b> this week.</>, time: 'Yesterday' },
      ],
    }
  },"""

# Regex to match the maddie block exactly, but maybe it's simpler to just do string split
# find `maddie: {` and the next `  alessia: {`
idx_maddie = content.find("  maddie: {")
idx_alessia = content.find("  alessia: {")

if idx_maddie != -1 and idx_alessia != -1:
    new_content = content[:idx_maddie] + maddie_block_new + "\n" + content[idx_alessia:]
    with open("lib/users.tsx", "w") as f:
        f.write(new_content)
    print("Replaced successfully!")
else:
    print("Could not find blocks")

