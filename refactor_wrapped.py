import re
import sys

with open('components/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Define WRAPPED_DATA block
WRAPPED_DATA_BLOCK = """
const WRAPPED_DATA = {
  jordan: {
    meshClass: "deep-purple-mesh",
    starsColor: "#F5D783",
    sealedText: "Six answers, three shows, twelve twins and one sign — no listening required.",
    theme: {
      horoscopeIconColor: "#EA8CE1",
      slide2Glow: "radial-gradient(460px 460px at 18% 14%, rgba(138,43,226,0.15), transparent 62%)",
      slide2Eyebrow: "#D8B4E2",
      slide3Glow: "radial-gradient(460px 460px at 82% 16%, rgba(75,0,130,0.20), transparent 62%)",
      slide3Eyebrow: "#9D4EDD",
      slide3Borders: ['#C77DFF', '#9D4EDD', '#7B2CBF'],
      slide4Glow: "radial-gradient(460px 460px at 20% 18%, rgba(138,43,226,0.15), transparent 62%)",
      slide4Eyebrow: "#C77DFF",
      slide5Glow: "radial-gradient(460px 460px at 50% 18%, rgba(138,43,226,0.15), transparent 62%)",
    },
    slide1: {
      title: "The\\nHypnotist",
      subtitle: "Season of the deep cut",
      text: "You answered early and stayed locked in. Your taste ran deep this week, blending hypnotic house and heavy-hitting rap. The people who matched you aren't a coincidence. Reach out before the week resets."
    },
    slide2: {
      big: "6", unit: "answers",
      sub: "A perfect week — 5-day streak, no skips.",
      cover: "/covers/drake-iceman-coverart.jpeg",
      song: "\\"Make Them Pay\\"", artist: "Drake",
      blurb: "A sharp departure from your usual deep house rotation. 12 Hoyas matched the vibe."
    },
    slide3: {
      big: "3", unit: "shows",
      sub: "You became a regular in the scene.",
      events: ['Drake Listening Party', 'Echostage VIP', 'Off-campus Basement']
    },
    slide4: {
      big: "12", unit: "answer twins",
      sub: "Your most-matched week yet.",
      twins: [
        { i: 'A', g: 'linear-gradient(140deg,#F5D783,#F97316)' },
        { i: 'M', g: 'linear-gradient(140deg,#3F3F46,#18181B)' },
        { i: 'S', g: 'linear-gradient(140deg,#9CA3AF,#4B5563)' }
      ],
      twinsPlus: "+9",
    },
    slide5: {
      title: "That's your week,\\nThe Hypnotist.",
      sub: "6 answers · 3 shows · 12 twins. Post it and see who answered like you."
    }
  },
  charlotte: {
    meshClass: "pink-silver-mesh",
    starsColor: "#FFB6C1",
    sealedText: "Six answers, two shows, twenty-four twins and one sign — no listening required.",
    theme: {
      horoscopeIconColor: "#FF69B4",
      slide2Glow: "radial-gradient(460px 460px at 18% 14%, rgba(255,105,180,0.15), transparent 62%)",
      slide2Eyebrow: "#FFB6C1",
      slide3Glow: "radial-gradient(460px 460px at 82% 16%, rgba(219,112,147,0.20), transparent 62%)",
      slide3Eyebrow: "#DB7093",
      slide3Borders: ['#FF69B4', '#DB7093', '#FFB6C1'],
      slide4Glow: "radial-gradient(460px 460px at 20% 18%, rgba(255,105,180,0.15), transparent 62%)",
      slide4Eyebrow: "#FF69B4",
      slide5Glow: "radial-gradient(460px 460px at 50% 18%, rgba(255,105,180,0.15), transparent 62%)",
    },
    slide1: {
      title: "The Main\\nPop Girl",
      subtitle: "Season of the bridge",
      text: "You know all the lyrics and aren't afraid to scream them. Your taste this week was heavy on the pop anthems and heartbreak ballads. Reach out to your matches before the week resets."
    },
    slide2: {
      big: "6", unit: "answers",
      sub: "A perfect week — 5-day streak, no skips.",
      cover: "/covers/taylorswift-lover-coverart.jpeg",
      song: "\\"Cruel Summer\\"", artist: "Taylor Swift",
      blurb: "The ultimate summer anthem. 24 Hoyas matched the vibe."
    },
    slide3: {
      big: "2", unit: "shows",
      sub: "You showed up for the main events.",
      events: ['Eras Tour Watch Party', 'Sabrina Carpenter pre-game']
    },
    slide4: {
      big: "24", unit: "answer twins",
      sub: "Your most-matched week yet.",
      twins: [
        { i: 'E', g: 'linear-gradient(140deg,#FFB6C1,#FF69B4)' },
        { i: 'L', g: 'linear-gradient(140deg,#FFDAB9,#FFA07A)' },
        { i: 'K', g: 'linear-gradient(140deg,#E6E6FA,#D8BFD8)' }
      ],
      twinsPlus: "+21",
    },
    slide5: {
      title: "That's your week,\\nThe Main Pop Girl.",
      sub: "6 answers · 2 shows · 24 twins. Post it and see who answered like you."
    }
  }
};

// one star field per slide
function Stars({ color = '#F5D783' }) {
"""

content = content.replace("// one star field per slide\nfunction Stars() {", WRAPPED_DATA_BLOCK)
content = content.replace("background: '#F5D783'", "background: color")

# Update StatSlide
content = content.replace("function StatSlide({ idx, cur, glow, eyebrow, eyebrowColor, big, unit, sub, children }) {", "function StatSlide({ idx, cur, glow, eyebrow, eyebrowColor, big, unit, sub, meshClass = 'deep-purple-mesh', children }) {")
content = content.replace('className="deep-purple-mesh"', 'className={meshClass}')

# Add pink-silver-mesh to the CSS block
css_to_add = """        .pink-silver-mesh {
          position: absolute; inset: -20%; pointer-events: none;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,105,180,0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(192,192,192,0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%);
          animation: mesh-drift 20s ease-in-out infinite;
          mix-blend-mode: screen;
        }"""
content = content.replace('.deep-purple-mesh {', css_to_add + '\n        .deep-purple-mesh {')

# Hook up WrappedExperience
WE_REPLACE = """function WrappedExperience({ onNav }) {
  const [activeUserId] = usePersistentState('ligo:active_user', 'jordan');
  const d = WRAPPED_DATA[activeUserId] || WRAPPED_DATA.jordan;

  const [phase, setPhase] = useStateW('sealed');
  const [cur, setCur] = useStateW(0);
  const TOTAL = 5;
  const next = () => setCur(c => Math.min(c + 1, TOTAL - 1));
  const prev = () => setCur(c => Math.max(c - 1, 0));
  const replay = () => { setCur(0); setPhase('sealed'); };"""
content = content.replace("""function WrappedExperience({ onNav }) {
  const [phase, setPhase] = useStateW('sealed');
  const [cur, setCur] = useStateW(0);
  const TOTAL = 5;
  const next = () => setCur(c => Math.min(c + 1, TOTAL - 1));
  const prev = () => setCur(c => Math.max(c - 1, 0));
  const replay = () => { setCur(0); setPhase('sealed'); };""", WE_REPLACE)

# Replace Stars() with Stars({color: d.starsColor})
content = content.replace('<Stars />', '<Stars color={d.starsColor} />')

# Replace Sealed text
content = content.replace('Six answers, three shows, twelve twins and one sign — no listening required.', '{d.sealedText}')

# Slide 1 (Horoscope)
content = content.replace("style={{ color: '#EA8CE1' }}", "style={{ color: d.theme.horoscopeIconColor }}")
content = content.replace("color: '#EA8CE1' }}>Your music horoscope", "color: d.theme.horoscopeIconColor }}>Your music horoscope")
content = content.replace("The<br />Hypnotist", "{d.slide1.title.split('\\n').map((l,i)=><React.Fragment key={i}>{l}{i===0&&<br/>}</React.Fragment>)}")
content = content.replace("Season of the deep cut", "{d.slide1.subtitle}")
content = content.replace("You answered early and stayed locked in. Your taste ran deep this week, blending hypnotic house and heavy-hitting rap. The people who matched you aren't a coincidence. Reach out before the week resets.", "{d.slide1.text}")

# Replace StatSlide usage with dynamic
content = content.replace("""          {/* 2 — answers */}
          <StatSlide idx={1} cur={cur}
            glow="radial-gradient(460px 460px at 18% 14%, rgba(138,43,226,0.15), transparent 62%)"
            eyebrow="Your week in answers" eyebrowColor="#D8B4E2" big="6" unit="answers" sub="A perfect week — 5-day streak, no skips.">""",
"""          {/* 2 — answers */}
          <StatSlide idx={1} cur={cur} meshClass={d.meshClass}
            glow={d.theme.slide2Glow}
            eyebrow="Your week in answers" eyebrowColor={d.theme.slide2Eyebrow} big={d.slide2.big} unit={d.slide2.unit} sub={d.slide2.sub}>""")

content = content.replace("""<div style={{ width: 64, height: 64, borderRadius: 12, backgroundImage: 'url(/covers/drake-iceman-coverart.jpeg)', backgroundSize: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />""",
"""<div style={{ width: 64, height: 64, borderRadius: 12, backgroundImage: `url(${d.slide2.cover})`, backgroundSize: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />""")

content = content.replace("""<div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em', lineHeight: 1.2 }}>"Make Them Pay"</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Drake</div>""",
"""<div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{d.slide2.song}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{d.slide2.artist}</div>""")

content = content.replace("""A sharp departure from your usual deep house rotation. 12 Hoyas matched the vibe.""", "{d.slide2.blurb}")

content = content.replace("""          {/* 3 — events */}
          <StatSlide idx={2} cur={cur}
            glow="radial-gradient(460px 460px at 82% 16%, rgba(75,0,130,0.20), transparent 62%)"
            eyebrow="Where you showed up" eyebrowColor="#9D4EDD" big="3" unit="shows" sub="You became a regular in the scene.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Drake Listening Party', 'Echostage VIP', 'Off-campus Basement'].map((v, i) => (
                <div key={v} className={cur === 2 ? `glass-card anim-slide-up delay-${i + 1}` : "glass-card"} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `4px solid ${i === 0 ? '#C77DFF' : i === 1 ? '#9D4EDD' : '#7B2CBF'}` }}>""",
"""          {/* 3 — events */}
          <StatSlide idx={2} cur={cur} meshClass={d.meshClass}
            glow={d.theme.slide3Glow}
            eyebrow="Where you showed up" eyebrowColor={d.theme.slide3Eyebrow} big={d.slide3.big} unit={d.slide3.unit} sub={d.slide3.sub}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {d.slide3.events.map((v, i) => (
                <div key={v} className={cur === 2 ? `glass-card anim-slide-up delay-${i + 1}` : "glass-card"} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `4px solid ${d.theme.slide3Borders[i] || d.theme.slide3Borders[0]}` }}>""")

content = content.replace("""          {/* 4 — twins */}
          <StatSlide idx={3} cur={cur}
            glow="radial-gradient(460px 460px at 20% 18%, rgba(138,43,226,0.15), transparent 62%)"
            eyebrow="Your people" eyebrowColor="#C77DFF" big="12" unit="answer twins" sub="Your most-matched week yet.">
            <div style={{ display: 'flex', marginTop: 10, paddingLeft: 10 }}>
              {[{ i: 'A', g: 'linear-gradient(140deg,#F5D783,#F97316)' }, { i: 'M', g: 'linear-gradient(140deg,#3F3F46,#18181B)' }, { i: 'S', g: 'linear-gradient(140deg,#9CA3AF,#4B5563)' }].map((a, k) => (""",
"""          {/* 4 — twins */}
          <StatSlide idx={3} cur={cur} meshClass={d.meshClass}
            glow={d.theme.slide4Glow}
            eyebrow="Your people" eyebrowColor={d.theme.slide4Eyebrow} big={d.slide4.big} unit={d.slide4.unit} sub={d.slide4.sub}>
            <div style={{ display: 'flex', marginTop: 10, paddingLeft: 10 }}>
              {d.slide4.twins.map((a, k) => (""")

content = content.replace("""<span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>+9</span>""",
"""<span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>{d.slide4.twinsPlus}</span>""")

content = content.replace("""          {/* 5 — share */}
          <div style={wSlide(4, cur)}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '90px 28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div className="deep-purple-mesh" style={{ opacity: 0.5 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(460px 460px at 50% 18%, rgba(138,43,226,0.15), transparent 62%)', pointerEvents: 'none' }} />""",
"""          {/* 5 — share */}
          <div style={wSlide(4, cur)}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '90px 28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div className={d.meshClass} style={{ opacity: 0.5 }} />
              <div style={{ position: 'absolute', inset: 0, background: d.theme.slide5Glow, pointerEvents: 'none' }} />""")

content = content.replace("""<h2 className={cur === 4 ? "anim-pop delay-1" : ""} style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 34, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 10 }}>That's your week,<br />The Hypnotist.</h2>
                <p className={cur === 4 ? "anim-slide-up delay-2" : ""} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 260, marginBottom: 26 }}>6 answers · 3 shows · 12 twins. Post it and see who answered like you.</p>""",
"""<h2 className={cur === 4 ? "anim-pop delay-1" : ""} style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 34, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 10 }}>{d.slide5.title.split('\\n').map((l,i)=><React.Fragment key={i}>{l}{i===0&&<br/>}</React.Fragment>)}</h2>
                <p className={cur === 4 ? "anim-slide-up delay-2" : ""} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 260, marginBottom: 26 }}>{d.slide5.sub}</p>""")

with open('components/HomeScreen.tsx', 'w') as f:
    f.write(content)
print("done")
