import re

with open('components/HomeScreen.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if 'searchMaddieCatalog' not in content:
    content = content.replace(
        "import { searchBennettCatalog } from \"@/lib/bennett-catalog\";",
        "import { searchBennettCatalog } from \"@/lib/bennett-catalog\";\nimport { searchMaddieCatalog } from \"@/lib/maddie-catalog\";"
    )

# 2. Add MADDIE_NEWS
MADDIE_NEWS_BLOCK = """const MADDIE_NEWS = [
  { art: '/covers/brat-coverart.jpeg', src: 'Tour', when: '1h', head: 'Charli XCX announces Brat fall tour dates.' },
  { art: '/artists/pinkpantheress-profile.jpeg', src: 'Ligo Radar', when: '3h', head: 'PinkPantheress surprise drops new snippet on TikTok.' },
  { art: '/artists/thedare-profile.jpeg', src: 'Campus chart', when: '5h', head: 'The Dare is trending up heading into the weekend.' },
  { art: '/artists/the1975-profile.jpeg', src: 'Breaking', when: '12h', head: 'The 1975\\'s Matty Healy says something controversial again.' },
  { art: '/artists/addisonrae-profile.jpeg', src: 'Pitchfork', when: '1d', head: 'Addison Rae redefines the pop landscape. Yes, really.' },
];
"""

if 'const MADDIE_NEWS' not in content:
    content = content.replace(
        "const BENNETT_NEWS = [",
        MADDIE_NEWS_BLOCK + "\nconst BENNETT_NEWS = ["
    )

# 3. Update newsItems
if "? MADDIE_NEWS :" not in content:
    content = content.replace(
        "activeUserId === 'bennett' ? BENNETT_NEWS : NEWS;",
        "activeUserId === 'bennett' ? BENNETT_NEWS : activeUserId === 'maddie' ? MADDIE_NEWS : NEWS;"
    )

# 4. Add MADDIE_SHOWS
MADDIE_SHOWS_BLOCK = """const MADDIE_SHOWS = [
  { name: 'The Dare DJ Set', venue: 'Flash DC', when: 'Fri 11:00', tag: '$25', tagCls: 'orange', art: '/artists/thedare-profile.jpeg' },
  { name: 'Charli XCX Sweat Tour', venue: 'The Anthem', when: 'Sat 8:00', tag: '$80', tagCls: 'orange', art: '/covers/brat-coverart.jpeg' },
];
"""

if 'const MADDIE_SHOWS' not in content:
    content = content.replace(
        "const BENNETT_SHOWS = [",
        MADDIE_SHOWS_BLOCK + "\nconst BENNETT_SHOWS = ["
    )

# 5. Update showsItems
if "? MADDIE_SHOWS :" not in content:
    content = content.replace(
        "activeUserId === 'bennett' ? BENNETT_SHOWS : SHOWS;",
        "activeUserId === 'bennett' ? BENNETT_SHOWS : activeUserId === 'maddie' ? MADDIE_SHOWS : SHOWS;"
    )

# 6. Update DailyPick search
if "? searchMaddieCatalog(" not in content:
    content = content.replace(
        "activeUserId === 'bennett'\n    ? searchBennettCatalog(draft, 8)\n    : searchJordanCatalog(draft, 8);",
        "activeUserId === 'bennett'\n    ? searchBennettCatalog(draft, 8)\n    : activeUserId === 'maddie'\n    ? searchMaddieCatalog(draft, 8)\n    : searchJordanCatalog(draft, 8);"
    )

# 7. Add .cyan-purple-mesh
CSS_BLOCK = """        .cyan-purple-mesh {
          position: absolute; inset: -20%; pointer-events: none;
          background: 
            radial-gradient(circle at 20% 30%, rgba(20,184,166,0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(167,139,250,0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%);
          animation: mesh-drift 20s ease-in-out infinite;
          mix-blend-mode: screen;
        }"""
if '.cyan-purple-mesh {' not in content:
    content = content.replace(
        ".deep-purple-mesh {",
        CSS_BLOCK + "\n        .deep-purple-mesh {"
    )

# 8. Add Maddie WRAPPED_DATA
WRAPPED_MADDIE = """  maddie: {
    meshClass: "cyan-purple-mesh",
    starsColor: "#14B8A6",
    sealedText: "Six answers, three shows, twelve twins and one sign — no listening required.",
    theme: {
      horoscopeIconColor: "#14B8A6",
      slide2Glow: "radial-gradient(460px 460px at 18% 14%, rgba(20,184,166,0.15), transparent 62%)",
      slide2Eyebrow: "#A78BFA",
      slide3Glow: "radial-gradient(460px 460px at 82% 16%, rgba(167,139,250,0.20), transparent 62%)",
      slide3Eyebrow: "#A78BFA",
      slide3Borders: ['#14B8A6', '#A78BFA', '#2DD4BF'],
      slide4Glow: "radial-gradient(460px 460px at 20% 18%, rgba(20,184,166,0.15), transparent 62%)",
      slide4Eyebrow: "#14B8A6",
      slide5Glow: "radial-gradient(460px 460px at 50% 18%, rgba(167,139,250,0.15), transparent 62%)",
    },
    slide1: {
      title: "The Alt\\nSocialite",
      subtitle: "Season of the pregame",
      text: "You make weird taste feel playable. Your week jumped from Charli to The 1975, proving you can be early without making it your entire personality. The people who matched you aren't a coincidence. Reach out before the week resets."
    },
    slide2: {
      big: "6", unit: "answers",
      sub: "A perfect week — 5-day streak, no skips.",
      cover: "/covers/brat-coverart.jpeg",
      song: "\\"360\\"", artist: "Charli XCX",
      blurb: "The ultimate alt-social anthem. 12 Hoyas matched the vibe."
    },
    slide3: {
      big: "3", unit: "shows",
      sub: "You showed up for the scene.",
      events: ['The Dare DJ Set', 'Charli XCX at The Anthem', 'Off-campus Basement']
    },
    slide4: {
      big: "12", unit: "answer twins",
      sub: "Your most-matched week yet.",
      twins: [
        { i: 'M', g: 'linear-gradient(140deg,#3F3F46,#18181B)' },
        { i: 'C', g: 'linear-gradient(140deg,#FFB6C1,#FF69B4)' },
        { i: 'S', g: 'linear-gradient(140deg,#71C07F,#2F7D3F)' }
      ],
      twinsPlus: "+9",
    },
    slide5: {
      title: "That's your week,\\nThe Alt Socialite.",
      sub: "6 answers · 3 shows · 12 twins. Post it and see who answered like you."
    }
  },"""

if 'maddie: {' not in content.split('const WRAPPED_DATA = {')[1]:
    content = content.replace(
        "const WRAPPED_DATA = {\n  jordan: {",
        "const WRAPPED_DATA = {\n" + WRAPPED_MADDIE + "\n  jordan: {"
    )

with open('components/HomeScreen.tsx', 'w') as f:
    f.write(content)

print("done")
