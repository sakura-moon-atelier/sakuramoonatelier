import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

const SEASONS = [
  { emoji: '🌸', label: 'Spring — Act 1', boss: 'The Rival',          bg: '#D4EDDA', text: '#2D6A3A' },
  { emoji: '☀️', label: 'Summer — Act 2', boss: 'The Heatwave',       bg: '#C8E6C9', text: '#1B5E20' },
  { emoji: '🍂', label: 'Autumn — Act 3', boss: 'The Legendary Crop', bg: '#FFE0B2', text: '#BF360C' },
  { emoji: '❄️', label: 'Winter — Act 4', boss: 'The Great Frost',    bg: '#BBDEFB', text: '#1565C0' },
  { emoji: '📋', label: 'True Final Boss', boss: 'The Inspector',      bg: '#1A1F4B', text: '#FAF7F2' },
]

const COMING = [
  { cat: '🐱', text: 'Something cosy is brewing...' },
  { cat: '🐈', text: 'Something magical is growing...' },
  { cat: '😸', text: 'Something strategic is sleeping...' },
]

export default function Games() {
  return (
    <main>
      <Hero title="Our Games" subtitle="Small worlds made with big hearts" />

      {/* FARMED.COM */}
      <section className="bg-cream py-16 px-6">
        <Reveal className="max-w-3xl mx-auto">
          <div className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              <div>
                <span className="inline-block bg-gold/20 border border-gold/40 text-gold font-nunito font-bold text-xs px-3 py-1 rounded-xl mb-3 tracking-wide">
                  🌱 IN DEVELOPMENT
                </span>
                <h2 className="font-nunito font-bold text-3xl text-navy tracking-wide mb-1">FARMED.COM</h2>
                <p className="font-nunito font-bold text-xs text-muted tracking-widest uppercase mb-4">
                  Sudoku Farm Roguelike · PC · Consoles
                </p>
                <p className="font-lato text-sm text-ink leading-relaxed mb-3">
                  An elderly farming couple lose their farm to a storm overnight. Their grandson shows them
                  FARMED.COM — the internet's biggest marketplace for local produce.
                </p>
                <p className="font-lato text-sm text-ink leading-relaxed mb-5">
                  A cosy roguelike where every map node is a customer order, every puzzle is a plot of land,
                  and a small delivery drone collects every box. Four seasons. Escalating orders.
                  Pests, rivals, legendary crops — and at the very end, a man with a clipboard.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Steam', 'itch.io', 'Xbox', 'PlayStation', 'Switch'].map(p => (
                    <span key={p} className="platform-badge">{p}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="btn-primary text-xs px-5 py-2.5 cursor-not-allowed opacity-80">
                    ⭐ Wishlist on Steam
                  </span>
                  <span className="btn-outline text-xs px-5 py-2.5 cursor-not-allowed opacity-80">
                    Follow on itch.io
                  </span>
                </div>
                <p className="font-nunito text-xs text-muted mt-3 italic">Store links coming soon</p>
              </div>

              <div className="rounded-xl p-5" style={{ background: 'linear-gradient(160deg,#FFF4DC,#FEE9B8)' }}>
                <p className="font-nunito font-bold text-xs text-muted tracking-widest mb-3 uppercase">
                  Four Seasons
                </p>
                <div className="flex flex-col gap-2">
                  {SEASONS.map(s => (
                    <div key={s.label}
                      className="season-pill flex items-center gap-2"
                      style={{ background: s.bg, color: s.text }}>
                      <span>{s.emoji}</span>
                      <span>{s.label} · {s.boss}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COMING SOON */}
      <section className="bg-blush py-16 px-6">
        <Reveal className="section-title">
          <h2>Coming Soon</h2>
          <div className="divider">🌸 ✦ 🌸</div>
        </Reveal>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMING.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white border-2 border-dashed border-petal/40 rounded-2xl p-8 text-center text-muted">
                <span className="text-4xl block mb-3 animate-float" style={{ animationDelay: `${i}s` }}>
                  {c.cat}
                </span>
                <p className="font-lato italic text-xs">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
