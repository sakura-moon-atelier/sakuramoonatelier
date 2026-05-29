import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

const TAGS = ['Cosy', 'Kawaii', 'Strategic', 'Japanese-inspired', 'Studio Ghibli vibes']

const PILLARS = [
  { icon: '🌸', title: 'Crafted',    body: 'Every detail is considered. No shortcuts.' },
  { icon: '🌙', title: 'Cosy',       body: 'Warm worlds you want to live in.' },
  { icon: '⚡', title: 'Strategic',  body: 'Real depth under the soft surface.' },
]

const KURO = [
  { emoji: '🐈‍⬛', label: 'Resting' },
  { emoji: '😺',   label: 'Curious' },
  { emoji: '🐱',   label: 'Helpful' },
  { emoji: '😸',   label: 'Very good' },
  { emoji: '🙀',   label: 'Surprised' },
  { emoji: '😹',   label: 'Delighted' },
]

export default function About() {
  return (
    <main>
      <Hero title="About the Studio" subtitle="A small atelier. A big love of games." />

      {/* STORY */}
      <section className="bg-cream py-16 px-6">
        <Reveal className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Atmosphere card */}
          <div className="rounded-2xl p-10 text-center flex flex-col items-center gap-4"
            style={{ background: 'linear-gradient(160deg,#1A1F4B,#3D3085,#6B4B8A)' }}>
            <span className="text-6xl animate-float">🌙</span>
            <span className="text-5xl animate-float-slow">🐈‍⬛</span>
            <span className="text-2xl tracking-wider">🌸🌸🌸</span>
            <p className="font-lato italic text-xs text-petal/60 mt-2 max-w-[180px]">
              A small workshop where games are made with care
            </p>
          </div>

          {/* Text */}
          <div>
            <h2 className="font-nunito font-bold text-2xl text-navy mb-5">Our Story</h2>
            <div className="space-y-4">
              <p className="font-lato text-sm text-ink leading-relaxed">
                Sakura Moon Atelier is a small independent game studio built on one belief:
                games can be beautiful, strategic, and deeply warm at the same time.
              </p>
              <p className="font-lato text-sm text-ink leading-relaxed">
                We make cosy games with real depth — the kind of game you want to return
                to on a quiet evening, that challenges you gently and rewards patience.
              </p>
              <p className="font-lato text-sm text-ink leading-relaxed">
                Inspired by Japanese aesthetics, Studio Ghibli's warmth, and the belief
                that small things made carefully are the best things.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {TAGS.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* PILLARS */}
      <section className="bg-blush py-14 px-6">
        <Reveal className="section-title">
          <h2>Our Values</h2>
          <div className="divider">🌸 ✦ 🌸</div>
        </Reveal>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="card p-6 text-center">
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h4 className="font-nunito font-bold text-base text-navy mb-2">{p.title}</h4>
                <p className="font-lato text-xs text-muted leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MASCOT */}
      <section className="bg-navy py-14 px-6 text-center">
        <Reveal>
          <h2 className="font-nunito font-bold text-xl text-cream mb-2">
            Kuro — The Studio Mascot 🐱
          </h2>
          <p className="font-lato italic text-sm text-petal/70 max-w-sm mx-auto mb-8">
            The black cat who watches from the moon. He appears in all our games.
            He has opinions about the Inspector.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {KURO.map((k, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-4xl animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                  {k.emoji}
                </span>
                <span className="font-nunito font-semibold text-xs text-petal/60">{k.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  )
}
