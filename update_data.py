import re

def update_users():
    with open('lib/users.tsx', 'r') as f:
        content = f.read()

    # The current content has Jordan, Sofia, Alessia, Cole, Marcus, Charlotte, Bennett
    # The new lineup based on the prompt should be:
    # Jordan, Charlotte, Caroline, Cole, Bennett, Maddie
    # We can just replace the whole USERS object because we have all the data.
    # Actually, to be safe, I'll just write the entire USERS object out.

    new_users = """
export const USERS: Record<string, UserProfile> = {
  jordan: {
    id: 'jordan',
    name: 'Jordan D.',
    firstName: 'Jordan',
    avatar: '/assets/Jordan-profile.png',
    archetype: 'The Hypnotist',
    archetypeIcon: 'hypnotist',
    gradient: 'linear-gradient(145deg, #F97316, #EA8CE1)',
    profile: {
      earnedArchetypeId: 'hypnotist',
      heldWeeks: '3 weeks',
      earnedBlurb: "Earned by listeners who go deep, late, and rhythm-first. You've held it 3 weeks running.",
      traits: [
        { n: '7', l: <><b>genres spanned</b> — house, Afro house, dancehall, R&amp;B, ambient, dub</> },
        { n: '340', l: <><b>unique artists</b> in your last 6 months</> },
        { n: '0.1%', l: <><b>top Keinemusik listener</b> at Georgetown</> },
      ],
      artists: [
        { name: 'Keinemusik',   photo: `${ARTIST_IMG}keinemusik.png`, pos: 'center 28%', rank: 1 },
        { name: 'Black Coffee', photo: `${ARTIST_IMG}black-coffee.png`, pos: 'center 22%', rank: 2 },
        { name: 'Drake',        photo: `${ARTIST_IMG}drake.png`, pos: 'center 18%', rank: 3 },
        { name: 'Chris Lake',   photo: `${ARTIST_IMG}chris-lake.png`, pos: 'center 20%', rank: 4 },
        { name: 'Popcaan',      photo: `${ARTIST_IMG}popcaan.png`, pos: 'center 30%', rank: 5 },
        { name: 'Prospa',       photo: `${ARTIST_IMG}prospa.png`, pos: 'center 22%', rank: 6 },
      ],
      afterHoursCover: [
        `${ARTIST_IMG}keinemusik.png`,
        `${ARTIST_IMG}black-coffee.png`,
        `${ARTIST_IMG}chris-lake.png`,
        `${ARTIST_IMG}prospa.png`,
      ],
      playlistTrackCount: 37,
      answerTrail: [
        { day: 'Today', song: 'Move L8r', artist: 'Keinemusik', today: true },
        { day: 'Sun', song: 'Drive', artist: 'Black Coffee' },
        { day: 'Sat', song: 'Ascension', artist: 'Prospa' },
        { day: 'Fri', song: 'Turn On The Lights', artist: 'Chris Lake' },
        { day: 'Thu', song: 'Family', artist: 'Keinemusik' },
        { day: 'Wed', song: 'Ole', artist: 'Popcaan' },
        { day: 'Tue', song: 'Wish You Were Here', artist: 'Black Coffee' },
      ],
      playlistTracks: [
        { title: 'Reflections', artist: 'Black Coffee, Tellaman', dur: '6:58', photo: `${ARTIST_IMG}black-coffee.png` },
        { title: 'Free', artist: 'Keinemusik', dur: '7:24', photo: `${ARTIST_IMG}keinemusik.png` },
        { title: 'The Smile', artist: 'Prospa', dur: '5:11', photo: `${ARTIST_IMG}prospa.png` },
        { title: 'Turn On The Lights', artist: 'Chris Lake, Aatig', dur: '6:02', photo: `${ARTIST_IMG}chris-lake.png` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Exactly 1 year ago', head: 'The Time Machine', body: '365 days ago, you played Frank Ocean 14 times in a row. You good?' },
        { type: 'honest', date: 'Brutally Honest Stat', head: 'Fastest Skip', body: 'You skipped "Water" by Tyla exactly 2.4 seconds into the track.' },
        { date: 'Yesterday', head: 'A slow build, then all percussion.', body: 'You opened on ambient and closed on Black Coffee. Your week is trending toward longer, wordless tracks — the radio edit isn\\'t for you anymore.' },
      ],
      currentStreak: 5,
      longestStreak: 12,
      tasteEvolution: [
        { month: 'March', archetype: 'The Drifter' },
        { month: 'April', archetype: 'The Hypnotist' },
        { month: 'May', archetype: 'The Hypnotist', note: 'held 3 weeks' },
      ],
      rarestPicks: [
        { stat: 'Prospa', label: 'only 3 of 612 picked it' },
        { stat: '0.4%', label: 'Anyma — top at Georgetown' },
        { stat: '1 of 7', label: 'Fela Kuti — you stood alone on campus' },
      ],
      connectedSongs: [
        { song: 'Drive', artist: 'Black Coffee', people: 4 },
        { song: 'ten', artist: 'Fred again..', people: 3 },
        { song: 'Free', artist: 'Keinemusik', people: 2 },
      ],
      firstToPick: [
        { text: 'You picked Prospa before 200 other Georgetown students' },
        { text: 'First at Georgetown to pick Anyma this semester' },
      ]
    }
  },
  charlotte: {
    id: 'charlotte',
    name: 'Charlotte W.',
    firstName: 'Charlotte',
    avatar: '/assets/charlotte-profile.png',
    archetype: 'The Main Character',
    archetypeIcon: 'main-character',
    gradient: 'linear-gradient(145deg, #FF6B9D, #C2410C)', // Pop gradient
    profile: {
      earnedArchetypeId: 'main-character',
      heldWeeks: '1 week',
      earnedBlurb: "pop precision · R&B feelings · every bridge memorized",
      traits: [
        { n: '93%', l: <><b>more mainstream</b> than most at Georgetown</> },
        { n: '3', l: <><b>core artists</b> carried your week</> },
        { n: '1', l: <><b>bridge</b> sung perfectly in the car</> }
      ],
      artists: [
        { name: 'Taylor Swift', photo: `${ARTIST_IMG}taylor.png`, pos: 'center 20%', rank: 1 },
        { name: 'SZA', photo: `${ARTIST_IMG}sza-saturn.png`, pos: 'center 20%', rank: 2 },
        { name: 'Drake', photo: `${ARTIST_IMG}drake.png`, pos: 'center 20%', rank: 3 },
        { name: 'Beyoncé', photo: `${ARTIST_IMG}beyonce.png`, pos: 'center 20%', rank: 4 },
        { name: 'Frank Ocean', photo: `${ARTIST_IMG}frank-blond.png`, pos: 'center 20%', rank: 5 },
        { name: 'Tyler, The Creator', photo: `${ARTIST_IMG}tyler.png`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `${ARTIST_IMG}taylor.png`,
        `${ARTIST_IMG}sza-saturn.png`,
        `${ARTIST_IMG}drake.png`,
        `${ARTIST_IMG}beyonce.png`,
      ],
      playlistTrackCount: 68,
      answerTrail: [
        { day: 'Today', song: 'Style', artist: 'Taylor Swift', today: true },
        { day: 'Sun', song: 'Snooze', artist: 'SZA' },
        { day: 'Sat', song: 'CUFF IT', artist: 'Beyoncé' },
        { day: 'Fri', song: 'Passionfruit', artist: 'Drake' },
        { day: 'Thu', song: 'Pink + White', artist: 'Frank Ocean' },
        { day: 'Wed', song: 'See You Again', artist: 'Tyler, The Creator' },
        { day: 'Tue', song: 'Espresso', artist: 'Sabrina Carpenter' },
      ],
      playlistTracks: [
        { title: 'Style', artist: 'Taylor Swift', dur: '3:51', photo: `${ARTIST_IMG}taylor.png` },
        { title: 'Snooze', artist: 'SZA', dur: '3:21', photo: `${ARTIST_IMG}sza-saturn.png` },
        { title: 'CUFF IT', artist: 'Beyoncé', dur: '3:45', photo: `${ARTIST_IMG}beyonce.png` },
        { title: 'Passionfruit', artist: 'Drake', dur: '4:58', photo: `${ARTIST_IMG}drake.png` },
        { title: 'Pink + White', artist: 'Frank Ocean', dur: '3:04', photo: `${ARTIST_IMG}frank-blond.png` },
        { title: 'See You Again', artist: 'Tyler, The Creator', dur: '3:00', photo: `${ARTIST_IMG}tyler.png` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You're in full main-character rotation today.", body: 'Your last five check-ins move from Taylor and Sabrina before class to SZA and Frank after midnight, with Drake and Beyoncé carrying the pregame. Today reads like a perfect outfit, a full group chat breakdown, and one song you swear is not about him.' },
        { type: 'honest', date: 'Hot Take', head: '“Mainstream music is only basic when you have no emotional range.”', body: 'Taylor Swift, Beyoncé, Drake — your taste crosses campus faster than most at Georgetown.' },
      ],
      currentStreak: 6,
      longestStreak: 14,
      tasteEvolution: [
        { month: 'March', archetype: 'The Mood Curator' },
        { month: 'April', archetype: 'The Main Character' },
        { month: 'May', archetype: 'The Main Character', note: 'held 4 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 93%', label: 'more mainstream at Georgetown' },
      ],
      connectedSongs: [
        { song: 'Style', artist: 'Taylor Swift', people: 12 },
        { song: 'Snooze', artist: 'SZA', people: 8 },
        { song: 'Passionfruit', artist: 'Drake', people: 15 },
      ],
      firstToPick: [
        { text: 'Taylor Swift energy' },
        { text: 'SZA after midnight' },
        { text: 'Perfect bridge timing' }
      ]
    }
  },
  caroline: {
    id: 'caroline',
    name: 'Caroline M.',
    firstName: 'Caroline',
    avatar: '/assets/caroline-profile.png',
    archetype: 'The Southern Romantic',
    archetypeIcon: 'southern-romantic',
    gradient: 'linear-gradient(145deg, #F5D783, #D97706)',
    profile: {
      earnedArchetypeId: 'southern-romantic',
      heldWeeks: '1 week',
      earnedBlurb: "country heartbreak · tailgate anthems · soft songs after midnight",
      traits: [
        { n: '72%', l: <><b>more mainstream</b> than most at Georgetown</> },
        { n: '4', l: <><b>tailgate artists</b> carried your week</> },
        { n: '1', l: <><b>singalong</b> started at midnight</> }
      ],
      artists: [
        { name: 'Zach Bryan', photo: `${ARTIST_IMG}zach-bryan.png`, pos: 'center 20%', rank: 1 },
        { name: 'Megan Moroney', photo: `${ARTIST_IMG}megan.png`, pos: 'center 20%', rank: 2 },
        { name: 'Morgan Wallen', photo: `${ARTIST_IMG}morgan-wallen.png`, pos: 'center 20%', rank: 3 },
        { name: 'Kacey Musgraves', photo: `${ARTIST_IMG}kacey.png`, pos: 'center 20%', rank: 4 },
        { name: 'Taylor Swift', photo: `${ARTIST_IMG}taylor.png`, pos: 'center 20%', rank: 5 },
        { name: 'Noah Kahan', photo: `${ARTIST_IMG}noah-kahan.png`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `${ARTIST_IMG}zach-bryan.png`,
        `${ARTIST_IMG}megan.png`,
        `${ARTIST_IMG}morgan-wallen.png`,
        `${ARTIST_IMG}kacey.png`,
      ],
      playlistTrackCount: 44,
      answerTrail: [
        { day: 'Today', song: 'Tennessee Orange', artist: 'Megan Moroney', today: true },
        { day: 'Sun', song: 'Something in the Orange', artist: 'Zach Bryan' },
        { day: 'Sat', song: 'Last Night', artist: 'Morgan Wallen' },
        { day: 'Fri', song: 'Slow Burn', artist: 'Kacey Musgraves' },
        { day: 'Thu', song: 'Stick Season', artist: 'Noah Kahan' },
        { day: 'Wed', song: 'Cruel Summer', artist: 'Taylor Swift' },
        { day: 'Tue', song: 'I Remember Everything', artist: 'Zach Bryan, Kacey Musgraves' },
      ],
      playlistTracks: [
        { title: 'Tennessee Orange', artist: 'Megan Moroney', dur: '3:43', photo: `${ARTIST_IMG}megan.png` },
        { title: 'Something in the Orange', artist: 'Zach Bryan', dur: '3:48', photo: `${ARTIST_IMG}zach-bryan.png` },
        { title: 'Last Night', artist: 'Morgan Wallen', dur: '2:43', photo: `${ARTIST_IMG}morgan-wallen.png` },
        { title: 'Slow Burn', artist: 'Kacey Musgraves', dur: '4:06', photo: `${ARTIST_IMG}kacey.png` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re in your soft-country era today.", body: 'Your last five check-ins move from Megan Moroney and Zach Bryan into Taylor and Noah Kahan, which means the night starts cute, gets loud, and somehow ends with everyone pretending they’re not emotional.' },
        { type: 'honest', date: 'Hot Take', head: '“Country music is only corny if you’ve never screamed it with your friends at midnight.”', body: 'Zach Bryan, Megan Moroney, Morgan Wallen — your taste hits the tailgate faster than most at Georgetown.' },
      ],
      currentStreak: 5,
      longestStreak: 12,
      tasteEvolution: [
        { month: 'March', archetype: 'The Throwback' },
        { month: 'April', archetype: 'The Southern Romantic' },
        { month: 'May', archetype: 'The Southern Romantic', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 72%', label: 'more mainstream at Georgetown' },
      ],
      connectedSongs: [
        { song: 'Tennessee Orange', artist: 'Megan Moroney', people: 11 },
        { song: 'Something in the Orange', artist: 'Zach Bryan', people: 16 },
        { song: 'Last Night', artist: 'Morgan Wallen', people: 18 },
      ],
      firstToPick: [
        { text: 'Country girl energy' },
        { text: 'Tailgate tears' },
        { text: 'Midnight singalong' }
      ]
    }
  },
  cole: {
    id: 'cole',
    name: 'Cole B.',
    firstName: 'Cole',
    avatar: '/assets/cole-profile.png',
    archetype: 'The Social Aux',
    archetypeIcon: 'social-aux',
    gradient: 'linear-gradient(145deg, #3B82F6, #14B8A6)',
    profile: {
      earnedArchetypeId: 'social-aux',
      heldWeeks: '1 week',
      earnedBlurb: "rap in the Uber · country at the tailgate · pop when the room knows every word",
      traits: [
        { n: '88%', l: <><b>more mainstream</b> than most at Georgetown</> },
        { n: '5', l: <><b>genres</b> played perfectly to the room</> },
        { n: '1', l: <><b>aux cord</b> strictly guarded</> }
      ],
      artists: [
        { name: 'Drake', photo: `${ARTIST_IMG}drake.png`, pos: 'center 20%', rank: 1 },
        { name: 'Travis Scott', photo: `${ARTIST_IMG}travis.png`, pos: 'center 20%', rank: 2 },
        { name: 'Morgan Wallen', photo: `${ARTIST_IMG}morgan-wallen.png`, pos: 'center 20%', rank: 3 },
        { name: 'Future', photo: `${ARTIST_IMG}future.png`, pos: 'center 20%', rank: 4 },
        { name: 'Gunna', photo: `${ARTIST_IMG}gunna.png`, pos: 'center 20%', rank: 5 },
        { name: 'SZA', photo: `${ARTIST_IMG}sza-saturn.png`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `${ARTIST_IMG}drake.png`,
        `${ARTIST_IMG}travis.png`,
        `${ARTIST_IMG}morgan-wallen.png`,
        `${ARTIST_IMG}future.png`,
      ],
      playlistTrackCount: 58,
      answerTrail: [
        { day: 'Today', song: 'Passionfruit', artist: 'Drake', today: true },
        { day: 'Sun', song: 'FE!N', artist: 'Travis Scott' },
        { day: 'Sat', song: 'fukumean', artist: 'Gunna' },
        { day: 'Fri', song: 'Last Night', artist: 'Morgan Wallen' },
        { day: 'Thu', song: 'Snooze', artist: 'SZA' },
        { day: 'Wed', song: 'WAIT FOR U', artist: 'Future, Drake, Tems' },
        { day: 'Tue', song: 'One Dance', artist: 'Drake, Wizkid, Kyla' },
      ],
      playlistTracks: [
        { title: 'Passionfruit', artist: 'Drake', dur: '4:58', photo: `${ARTIST_IMG}drake.png` },
        { title: 'FE!N', artist: 'Travis Scott', dur: '3:11', photo: `${ARTIST_IMG}travis.png` },
        { title: 'fukumean', artist: 'Gunna', dur: '2:05', photo: `${ARTIST_IMG}gunna.png` },
        { title: 'Last Night', artist: 'Morgan Wallen', dur: '2:43', photo: `${ARTIST_IMG}morgan-wallen.png` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re playing the room perfectly today.", body: 'Your last five check-ins run Drake into Travis, then Morgan Wallen and SZA when the night gets social. Today reads like a pregame where everyone thinks they should get the aux, but somehow you still have it.' },
        { type: 'honest', date: 'Hot Take', head: '“The best aux is knowing when to stop proving your taste.”', body: 'Drake, Travis Scott, Morgan Wallen — your taste moves through campus faster than most at Georgetown.' },
      ],
      currentStreak: 6,
      longestStreak: 16,
      tasteEvolution: [
        { month: 'March', archetype: 'The Main Character' },
        { month: 'April', archetype: 'The Social Aux' },
        { month: 'May', archetype: 'The Social Aux', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 88%', label: 'more mainstream at Georgetown' },
      ],
      connectedSongs: [
        { song: 'Passionfruit', artist: 'Drake', people: 21 },
        { song: 'FE!N', artist: 'Travis Scott', people: 17 },
        { song: 'Last Night', artist: 'Morgan Wallen', people: 19 },
      ],
      firstToPick: [
        { text: 'Drake energy' },
        { text: 'Pregame fluent' },
        { text: 'Knows the room' }
      ]
    }
  },
  bennett: {
    id: 'bennett',
    name: 'Bennett R.',
    firstName: 'Bennett',
    avatar: '/assets/bennett-profile.png',
    archetype: 'The Pregame Menace',
    archetypeIcon: 'pregame-menace',
    gradient: 'linear-gradient(145deg, #14110D, #ef4444)',
    profile: {
      earnedArchetypeId: 'pregame-menace',
      heldWeeks: '1 week',
      earnedBlurb: "rage rap early · Atlanta trap late · house when the room turns",
      traits: [
        { n: '61%', l: <><b>more mainstream</b> than most at Georgetown</> },
        { n: '14', l: <><b>students</b> follow your top niche artists</> },
        { n: '1', l: <><b>noise complaint</b> imminent</> }
      ],
      artists: [
        { name: 'Playboi Carti', photo: `${ARTIST_IMG}carti.png`, pos: 'center 20%', rank: 1 },
        { name: 'Ken Carson', photo: `${ARTIST_IMG}ken-carson.png`, pos: 'center 20%', rank: 2 },
        { name: 'Gunna', photo: `${ARTIST_IMG}gunna.png`, pos: 'center 20%', rank: 3 },
        { name: 'Young Thug', photo: `${ARTIST_IMG}young-thug.png`, pos: 'center 20%', rank: 4 },
        { name: 'Destroy Lonely', photo: `${ARTIST_IMG}destroy-lonely.png`, pos: 'center 20%', rank: 5 },
        { name: 'Lil Baby', photo: `${ARTIST_IMG}lil-baby.png`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `${ARTIST_IMG}carti.png`,
        `${ARTIST_IMG}ken-carson.png`,
        `${ARTIST_IMG}gunna.png`,
        `${ARTIST_IMG}young-thug.png`,
      ],
      playlistTrackCount: 46,
      answerTrail: [
        { day: 'Today', song: 'Yale', artist: 'Ken Carson', today: true },
        { day: 'Sun', song: 'Sky', artist: 'Playboi Carti' },
        { day: 'Sat', song: 'NOSTYLIST', artist: 'Destroy Lonely' },
        { day: 'Fri', song: 'fukumean', artist: 'Gunna' },
        { day: 'Thu', song: 'Drip Too Hard', artist: 'Lil Baby, Gunna' },
        { day: 'Wed', song: 'My Love', artist: 'Route 94, Jess Glynne' },
        { day: 'Tue', song: 'Latch', artist: 'Disclosure, Sam Smith' },
      ],
      playlistTracks: [
        { title: 'Yale', artist: 'Ken Carson', dur: '1:46', photo: `${ARTIST_IMG}ken-carson.png` },
        { title: 'Sky', artist: 'Playboi Carti', dur: '3:13', photo: `${ARTIST_IMG}carti.png` },
        { title: 'NOSTYLIST', artist: 'Destroy Lonely', dur: '3:00', photo: `${ARTIST_IMG}destroy-lonely.png` },
        { title: 'My Love', artist: 'Route 94, Jess Glynne', dur: '4:19', photo: `${ARTIST_IMG}route94.png` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re bringing reckless aux energy today.", body: 'Your last five check-ins move from Ken and Carti before the night starts to Gunna and Lil Baby in the Uber, then Disclosure once the room gets warmer. Tonight reads like a townhouse pregame that was supposed to be chill and somehow became everybody’s plans.' },
        { type: 'honest', date: 'Hot Take', head: '“Pregames only die when someone gets scared of playing Carti.”', body: 'Playboi Carti, Ken Carson, Destroy Lonely — followed by fewer than 14 other Georgetown students.' },
      ],
      currentStreak: 5,
      longestStreak: 8,
      tasteEvolution: [
        { month: 'March', archetype: 'The Festival Head' },
        { month: 'April', archetype: 'The Pregame Menace' },
        { month: 'May', archetype: 'The Pregame Menace', note: 'held 2 weeks' },
      ],
      rarestPicks: [
        { stat: 'Top 61%', label: 'more mainstream at Georgetown' },
      ],
      connectedSongs: [
        { song: 'Yale', artist: 'Ken Carson', people: 11 },
        { song: 'fukumean', artist: 'Gunna', people: 14 },
        { song: 'Sky', artist: 'Playboi Carti', people: 9 },
      ],
      firstToPick: [
        { text: 'Carti energy' },
        { text: 'Lacrosse house chaos' },
        { text: 'House at 1:47am' }
      ]
    }
  },
  maddie: {
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
        { name: 'Charli XCX', photo: `${ARTIST_IMG}charli.png`, pos: 'center 20%', rank: 1 },
        { name: 'PinkPantheress', photo: `${ARTIST_IMG}pink.png`, pos: 'center 20%', rank: 2 },
        { name: 'The Dare', photo: `${ARTIST_IMG}thedare.png`, pos: 'center 20%', rank: 3 },
        { name: 'underscores', photo: `${ARTIST_IMG}underscores.png`, pos: 'center 20%', rank: 4 },
        { name: '100 gecs', photo: `${ARTIST_IMG}100gecs.png`, pos: 'center 20%', rank: 5 },
        { name: 'Addison Rae', photo: `${ARTIST_IMG}addison.png`, pos: 'center 20%', rank: 6 },
      ],
      afterHoursCover: [
        `${ARTIST_IMG}charli.png`,
        `${ARTIST_IMG}pink.png`,
        `${ARTIST_IMG}thedare.png`,
        `${ARTIST_IMG}underscores.png`,
      ],
      playlistTrackCount: 39,
      answerTrail: [
        { day: 'Today', song: '360', artist: 'Charli XCX', today: true },
        { day: 'Sun', song: 'Boy’s a liar Pt. 2', artist: 'PinkPantheress, Ice Spice' },
        { day: 'Sat', song: 'Girls', artist: 'The Dare' },
        { day: 'Fri', song: 'money machine', artist: '100 gecs' },
        { day: 'Thu', song: 'Locals (Girls like us)', artist: 'underscores' },
        { day: 'Wed', song: 'Diet Pepsi', artist: 'Addison Rae' },
        { day: 'Tue', song: 'Be Nice 2 Me', artist: 'Bladee' },
      ],
      playlistTracks: [
        { title: '360', artist: 'Charli XCX', dur: '2:13', photo: `${ARTIST_IMG}charli.png` },
        { title: 'Boy’s a liar Pt. 2', artist: 'PinkPantheress, Ice Spice', dur: '2:11', photo: `${ARTIST_IMG}pink.png` },
        { title: 'Girls', artist: 'The Dare', dur: '2:25', photo: `${ARTIST_IMG}thedare.png` },
        { title: 'Locals (Girls like us)', artist: 'underscores', dur: '3:04', photo: `${ARTIST_IMG}underscores.png` },
      ],
      pastReads: [
        { type: 'time-machine', date: 'Your Music Horoscope', head: "You’re slightly ahead of the group chat today.", body: 'Your last five check-ins jump from Charli and PinkPantheress into 100 gecs and The Dare, which means your night starts ironic, gets loud, and somehow becomes everyone else’s new taste next month.' },
        { type: 'honest', date: 'Hot Take', head: '“Being early only counts if you don’t make it your whole personality.”', body: 'Charli XCX, PinkPantheress, underscores — followed by fewer than 9 other Georgetown students.' },
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
        { song: 'Locals', artist: 'underscores', people: 1 },
      ],
      firstToPick: [
        { text: 'Charli energy' },
        { text: 'Alt girl aux' },
        { text: 'Too early again' }
      ]
    }
  }
};
"""

    start_idx = content.find("export const USERS:")
    if start_idx != -1:
        content = content[:start_idx] + new_users
    else:
        content += new_users

    with open('lib/users.tsx', 'w') as f:
        f.write(content)

    print("Updated users.tsx")

    # Now update archetypes.tsx
    with open('components/profile/archetypes.tsx', 'r') as f:
        arch_content = f.read()

    new_archetypes = """
  {
    id: "southern-romantic",
    name: "The Southern Romantic",
    descriptor: "Country heartbreak · tailgate anthems · soft songs after midnight.",
    ring: ["#FDE68A", "#F5D783", "#D97706"],
    accent: "#F5D783",
    eyebrow: "#F5D783",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(245,215,131,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(217,119,6,0.12), transparent 60%)",
    seal: "romantic",
  },
  {
    id: "social-aux",
    name: "The Social Aux",
    descriptor: "Rap in the Uber · country at the tailgate · pop when the room knows every word.",
    ring: ["#93C5FD", "#3B82F6", "#1E40AF"],
    accent: "#3B82F6",
    eyebrow: "#3B82F6",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(59,130,246,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(30,64,175,0.12), transparent 60%)",
    seal: "aux",
  },
  {
    id: "algorithm-dodger",
    name: "The Algorithm Dodger",
    descriptor: "Alt-pop chaos · internet taste · party songs before they become party songs.",
    ring: ["#D8B4FE", "#A78BFA", "#6D28D9"],
    accent: "#A78BFA",
    eyebrow: "#A78BFA",
    glow:
      "radial-gradient(400px 220px at 10% 0%, rgba(167,139,250,0.2), transparent 60%), radial-gradient(320px 260px at 100% 100%, rgba(109,40,217,0.12), transparent 60%)",
    seal: "dodger",
  },
"""

    # Insert into ARCHETYPE_CATALOG
    if "southern-romantic" not in arch_content:
        arch_content = arch_content.replace('];\n\nexport function getArchetypeById', new_archetypes + '];\n\nexport function getArchetypeById')

    # Add seals to ArchetypeSealInner
    seals = """
    case "romantic":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "aux":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18V5l12-2v13" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="6" cy="18" r="3" stroke={c} strokeWidth="1.6"/>
          <circle cx="18" cy="16" r="3" stroke={c} strokeWidth="1.6"/>
        </svg>
      );
    case "dodger":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
"""

    if "case \"romantic\":" not in arch_content:
        arch_content = arch_content.replace('    default:\n      return <circle', seals + '    default:\n      return <circle')

    with open('components/profile/archetypes.tsx', 'w') as f:
        f.write(arch_content)

    print("Updated archetypes.tsx")

update_users()
