import re

with open("lib/users.tsx", "r") as f:
    content = f.read()

marcus_data = """  marcus: {
    id: 'marcus',
    name: 'Marcus T.',
    firstName: 'Marcus',
    avatar: '/assets/Marcus-profile.png',
    archetype: 'The Culture Keeper',
    archetypeIcon: 'culture-keeper',
    gradient: 'linear-gradient(140deg, #EA8CE1, #A13D99)',
    yearLevel: 'Senior',
    pronouns: 'He/Him',
    school: 'Georgetown',
    profile: {
      earnedArchetypeId: 'culture-keeper',
      heldWeeks: '5 weeks',
      earnedBlurb: "One of 24 archetypes. Earned by listeners who find the record before the room does. You've held it 5 weeks running.",
      traits: [
        { n: '9', l: <><b>genres spanned</b> — hyperpop, jersey club, leftfield rap, deconstructed club, ambient</> },
        { n: '412', l: <><b>unique artists</b> in your last 6 months</> },
        { n: '4%', l: <><b>top niche listener</b> at Georgetown</> }
      ],
      artists: [
        { name: 'underscores', photo: '/assets/artists/underscoresspotify.jpeg', pos: 'center 20%', rank: 1 },
        { name: '100 gecs', photo: '/assets/artists/100gecsspotify.jpeg', pos: 'center 20%', rank: 2 },
        { name: 'Alice Gas', photo: '/assets/artists/alicegasspotify.jpeg', pos: 'center 20%', rank: 3 },
        { name: 'Injury Reserve', photo: '/assets/artists/injuryreservespotify.jpeg', pos: 'center 20%', rank: 4 },
        { name: 'Dorian Electra', photo: '/assets/artists/dorianelectraspotify.jpeg', pos: 'center 20%', rank: 5 },
        { name: 'Food House', photo: '/assets/artists/foodhousespotify.jpeg', pos: 'center 20%', rank: 6 }
      ],
      afterHoursCover: [
        '/assets/artists/underscoresspotify.jpeg',
        '/assets/artists/100gecsspotify.jpeg',
        '/assets/artists/foodhousespotify.jpeg',
        '/assets/artists/carseatheadrestspotify.jpeg'
      ],
      playlistTrackCount: 37,
      answerTrail: [
        { day: 'Today', song: 'Locals (Girls Like Us)', artist: 'underscores', today: true },
        { day: 'Sun', song: 'money machine', artist: '100 gecs' },
        { day: 'Sat', song: 'Baby My Phone', artist: 'Food House' },
        { day: 'Fri', song: 'Wildflower', artist: 'Injury Reserve' },
        { day: 'Thu', song: 'Deli', artist: 'Ice Spice' },
        { day: 'Wed', song: 'Vroom Vroom', artist: 'Charli XCX' },
        { day: 'Tue', song: 'Silly Girl', artist: 'Alice Gas' }
      ],
      playlistTracks: [
        { title: 'Locals (Girls Like Us)', artist: 'underscores', dur: '3:12', photo: '/assets/artists/underscoresspotify.jpeg' },
        { title: 'money machine', artist: '100 gecs', dur: '2:02', photo: '/assets/artists/100gecsspotify.jpeg' },
        { title: 'Baby My Phone', artist: 'Food House', dur: '2:48', photo: '/assets/artists/foodhousespotify.jpeg' },
        { title: 'Western Kids', artist: 'Car Seat Headrest', dur: '4:16', photo: '/assets/artists/carseatheadrestspotify.jpeg' }
      ],
      pastReads: [
        { type: 'honest', date: 'Yesterday', head: 'Cold, digital, ahead of the room.', body: 'You opened with underscores and closed on jersey club. Your week runs leftfield loud — the chart catches up in a quarter.' },
        { type: 'time-machine', date: 'Sun · May 31', head: 'Deep cuts only, no apologies.', body: 'Hyperpop into deconstructed club. Even early adopters need a song everyone knows at 1am — you just won\\'t admit it on the feed.' }
      ],
      currentStreak: 5,
      longestStreak: 12,
      tasteEvolution: [
        { month: 'March', archetype: 'The Globetrotter' },
        { month: 'April', archetype: 'The Purist' },
        { month: 'May', archetype: 'The Culture Keeper', note: 'held 5 weeks' }
      ],
      rarestPicks: [
        { stat: 'Top 4%', label: 'most niche at Georgetown' },
        { stat: 'Deep Cuts', label: '100 gecs, Underscores, Alice Gas — followed by fewer than 4 other Georgetown students.' },
        { stat: '1 of 3', label: 'Food House — you stood alone on campus' }
      ],
      connectedSongs: [
        { song: 'Drive', artist: 'Black Coffee', people: 4 },
        { song: 'ten', artist: 'Fred again..', people: 3 },
        { song: 'Free', artist: 'underscores', people: 2 }
      ],
      firstToPick: [
        { text: 'You picked Alice Gas before 200 other Georgetown students' },
        { text: 'First at Georgetown to pick Food House this semester' }
      ],
      hotTake: "If you found it on an editorial playlist, you're already two years late.",
      nowListening: { title: 'Locals (Girls Like Us)', artist: 'underscores', photo: '/assets/artists/underscoresspotify.jpeg' },
      onRepeat: [
        { title: 'Locals (Girls Like Us)', artist: 'underscores', photo: '/assets/artists/underscoresspotify.jpeg', coverArt: '/assets/artists/underscoresspotify.jpeg' },
        { title: 'money machine', artist: '100 gecs', photo: '/assets/artists/100gecsspotify.jpeg', coverArt: '/assets/artists/100gecsspotify.jpeg' },
        { title: 'Baby My Phone', artist: 'Food House', photo: '/assets/artists/foodhousespotify.jpeg', coverArt: '/assets/artists/foodhousespotify.jpeg' }
      ],
      archetypeSubline: (
        <>
          <b style={{ color: '#fff' }}>9 genres</b> spanned · <b style={{ color: '#fff' }}>412</b> unique artists · <span style={{ color: '#71C07F', fontWeight: 600 }}>finds it first</span>
        </>
      ),
      mainstreamScoreAccent: 'Top 4%',
      mainstreamScoreRest: 'most niche at Georgetown',
      mainstreamMeterPct: 96,
      mainstreamFootnote: (
        <>
          <b>100 gecs, underscores, Alice Gas</b> — followed by fewer than 4 other Georgetown students.
        </>
      ),
      horoscope: {
        headline: "Deep cuts only, no apologies.",
        body: "Hyperpop into deconstructed club. Even early adopters need a song everyone knows at 1am — you just won't admit it on the feed.",
        chips: [
          { label: 'Leftfield loud', tone: 'orange' },
          { label: 'Deep cuts only', tone: 'yellow' },
          { label: 'Ahead of the room', tone: 'pink' }
        ],
      },
      playlistName: 'before the algorithm',
      secretTrack: {
        label: 'Guilty Pleasure',
        title: 'Western Kids',
        artist: 'Car Seat Headrest',
        cover: '/assets/artists/carseatheadrestspotify.jpeg',
        accentColor: '#71C07F'
      },
      receiptsFooter: 'Built from your daily answers · underscores, 100 gecs, Alice Gas, Food House, and 412+ tracks across the semester.',
      notifications: [
        { ic: 'T', bg: 'linear-gradient(145deg,#71C07F,#2A5E40)', text: <><b>Theo</b> bumped you — you&apos;re an <b>87% match</b> on late-night house.</>, time: '12 min ago', unread: true },
        { ic: '◉', bg: '#0A0907', text: <>Your archetype held steady — <b>The Culture Keeper</b> for 5 weeks running.</>, time: '2 hr ago', unread: true },
        { ic: '🔥', bg: 'linear-gradient(145deg,#3B82F6,#C2410C)', text: <>Day <b>5</b> streak — answer today&apos;s question to keep it alive.</>, time: 'Today, 9:02' },
        { ic: '♬', bg: 'linear-gradient(145deg,#EA8CE1,#A13D99)', text: <><b>3 people</b> saved <b>before the algorithm</b> this week.</>, time: 'Yesterday' }
      ]
    }
  },
"""

idx_charlotte = content.find("  charlotte: {")

if idx_charlotte != -1:
    new_content = content[:idx_charlotte] + marcus_data + content[idx_charlotte:]
    with open("lib/users.tsx", "w") as f:
        f.write(new_content)
    print("Marcus added successfully!")
else:
    print("Could not find charlotte block")
