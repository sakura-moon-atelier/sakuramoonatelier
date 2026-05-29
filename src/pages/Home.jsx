import { useEffect, useRef } from 'react'
import Reveal from '../components/Reveal.jsx'

// Sakura petals data
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3 + 3) % 100}%`,
  duration: `${5 + (i * 0.7) % 4}s`,
  delay: `${(i * 0.9) % 6}s`,
  size: `${14 + (i * 3) % 8}px`,
}))

// Star dots data
const STARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.1 + 1) % 100}%`,
  top: `${(i * 3.7 + 5) % 100}%`,
  size: `${2 + (i * 0.5) % 3}px`,
  duration: `${2 + (i * 0.3) % 2.5}s`,
  delay: `${(i * 0.4) % 3}s`,
}))

const VALUES = [
  { icon: '🌸', title: 'Made with Care',     body: 'Every game is small, intentional, and carefully designed. We make things the way a craftsperson makes pottery — slowly, with attention.' },
  { icon: '🌙', title: 'Cosy but Strategic', body: 'Warm aesthetics with real depth underneath. Beautiful to look at. Meaningful to play. The calm surface hides genuine challenge.' },
  { icon: '🐱', title: 'For Everyone',       body: 'Games for players who like to think, feel, and take their time. No rushing. No pressure. Just good things worth returning to.' },
]

const MASCOT_POSES = [
  { emoji: '😺', label: 'Happy' },
  { emoji: '🐈‍⬛', label: 'Watching' },
  { emoji: '😸', label: 'Proud' },
  { emoji: '🙀', label: 'The Inspector arrived' },
]

export default function Home({ setPage }) {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-gradient relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Stars */}
        {STARS.map(s => (
          <span
            key={s.id}
            className="star-dot"
            style={{
              left: s.left, top: s.top,
              width: s.size, height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Petals */}
        {PETALS.map(p => (
          <span
            key={p.id}
            className="petal-fall select-none"
            style={{
              left: p.left,
              fontSize: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          >
            🌸
          </span>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <span className="text-6xl md:text-7xl animate-float inline-block mb-4">🌙</span>
          <h1 className="font-nunito font-bold text-3xl md:text-5xl text-cream tracking-wide mb-3">
            Sakura Moon Atelier
          </h1>
          <p className="font-lato italic text-base md:text-lg text-petal/90 mb-4">
            "Cosy games made with care"
          </p>
          <p className="font-nunito text-sm text-cream/70 leading-relaxed mb-8 max-w-md mx-auto">
            A small independent studio making warm, strategic, beautifully crafted games.
            Made slowly. Made with love.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => { setPage('Games'); window.scrollTo({ top: 0 }) }}
              className="btn-primary">
              Our Games 🌸
            </button>
            <button onClick={() => { setPage('About'); window.scrollTo({ top: 0 }) }}
              className="btn-outline-light">
              About the Studio
            </button>
          </div>
        </div>

        {/* Floating cat */}
        <span className="absolute bottom-16 right-[12%] text-5xl animate-float-slow opacity-80 hidden md:block">
          🐈
        </span>
      </section>

      {/* ── FEATURED GAME ────────────────────────────── */}
      <section className="bg-cream py-16 px-6">
        <Reveal className="section-title">
          <h2>Currently in Development</h2>
          <div className="divider">🌸 ✦ 🌸</div>
        </Reveal>

        <Reveal delay={100} className="max-w-3xl mx-auto">
          <div className="card p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Left */}
            <div>
              <span className="inline-block bg-gold/20 border border-gold/40 text-gold font-nunito font-bold text-xs px-3 py-1 rounded-xl mb-3 tracking-wide">
                🌱 IN DEVELOPMENT
              </span>
              <h3 className="font-nunito font-bold text-3xl text-navy tracking-wide mb-1">
                FARMED.COM
              </h3>
              <p className="font-nunito font-bold text-xs text-muted tracking-widest uppercase mb-4">
                Sudoku Farm Roguelike
              </p>
              <p className="font-lato text-sm text-ink leading-relaxed mb-5">
                Rebuild your storm-damaged farm by solving crop rotation puzzles and selling
                your harvest online. A cosy roguelike where every map node is a customer order
                — and a small drone collects every delivery.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Steam', 'itch.io', 'Xbox', 'PlayStation', 'Switch'].map(p => (
                  <span key={p} className="platform-badge">{p}</span>
                ))}
              </div>
              <button
                onClick={() => { setPage('Games'); window.scrollTo({ top: 0 }) }}
                className="btn-primary text-xs px-5 py-2.5"
              >
                Learn More →
              </button>
            </div>

            {/* Right — mini game preview */}
            <div className="rounded-2xl p-6 text-center"
              style={{ background: 'linear-gradient(135deg,#2D6A3A,#1B4332,#1A1F4B)' }}>
              <div className="grid grid-cols-4 gap-1 max-w-[120px] mx-auto mb-3">
                {['🍓','','🧄','','','🥬','','🍅','🌿','','🥬','','','🍓','','🌻'].map((c,i) => (
                  <div key={i}
                    className={`w-7 h-7 rounded flex items-center justify-center text-xs
                      ${c ? (c === '🥬' && i === 10 ? 'bg-red-900/40' : 'bg-white/10') : 'bg-white/5 border border-dashed border-white/15'}`}>
                    {c}
                  </div>
                ))}
              </div>
              <p className="font-lato italic text-xs text-cream/50">
                Crop rotation · Sudoku logic · No numbers
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="bg-blush py-16 px-6">
        <Reveal className="section-title">
          <h2>What we believe</h2>
          <div className="divider">🌸 ✦ 🌸</div>
        </Reveal>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card p-7 text-center h-full">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h4 className="font-nunito font-bold text-base text-navy mb-3">{v.title}</h4>
                <p className="font-lato text-xs text-muted leading-7">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MASCOT ───────────────────────────────────── */}
      <section className="bg-navy py-14 px-6 text-center">
        <Reveal>
          <h2 className="font-nunito font-bold text-xl text-cream mb-2">Meet Kuro 🐱</h2>
          <p className="font-lato italic text-sm text-petal/70 max-w-xs mx-auto mb-8">
            Our studio mascot. Always watching. Usually comfortable. Occasionally helpful.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {MASCOT_POSES.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-4xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                  {p.emoji}
                </span>
                <span className="font-nunito font-semibold text-xs text-petal/60">{p.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  )
}
