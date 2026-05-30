import SEOHead from '../components/ui/SEOHead.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx'
import { LoadingState, ErrorState } from '../components/ui/States.jsx'
import JsonLd, { SCHEMA } from '../components/ui/JsonLd.jsx'
import { useGames } from '../hooks/useGames.js'

const STATUS_BADGE = {
  development: { label:'In Development', color:'var(--color-accent)' },
  released:    { label:'Released',        color:'#5CAA50' },
  announced:   { label:'Announced',       color:'var(--color-text-tertiary)' },
}

function GameCard({ game, onClick }) {
  const badge = STATUS_BADGE[game.status] ?? STATUS_BADGE.announced
  return (
    <article className="card card-hover" style={{ overflow:'hidden', cursor:'pointer' }}
      onClick={() => onClick(game.slug)}
      tabIndex={0} role="article"
      onKeyDown={e => e.key === 'Enter' && onClick(game.slug)}
      aria-label={`View details: ${game.title}`}>
      <PlaceholderImage emoji="🌾" aspectRatio="16/9" label={`${game.title} — key art coming soon`}
        gradient="linear-gradient(155deg,#0C1E16,#0E1A2E,#16103A)" />
      <div style={{ padding:'var(--space-6)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--space-3)' }}>
          <span style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:badge.color, transition:'color var(--ease-theme)' }}>
            ✦ {badge.label}
          </span>
          <div style={{ display:'flex', gap:'.25rem', flexWrap:'wrap', justifyContent:'flex-end' }}>
            {game.platforms.slice(0,3).map(p => <span key={p} className="platform-badge">{p}</span>)}
            {game.platforms.length > 3 && <span className="platform-badge">+{game.platforms.length - 3}</span>}
          </div>
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', letterSpacing:'.04em', marginBottom:'.2rem', transition:'color var(--ease-theme)' }}>
          {game.title}
        </h2>
        <p style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--color-text-tertiary)', marginBottom:'var(--space-3)', transition:'color var(--ease-theme)' }}>
          {game.subtitle}
        </p>
        <div style={{ display:'flex', gap:'var(--space-3)', flexWrap:'wrap', marginTop:'var(--space-4)' }}>
          <span style={{ fontSize:'var(--text-xs)', fontWeight:700, color:'var(--color-brand)', transition:'color var(--ease-theme)' }}>
            View details →
          </span>
        </div>
      </div>
    </article>
  )
}

export default function Games({ setPage, setGameSlug }) {
  const { data, loading, error } = useGames()

  const go = (slug) => {
    setGameSlug(slug)
    setPage('game-detail')
    window.scrollTo({ top:0 })
  }

  return (
    <>
      <SEOHead
        title="Games — Sakura Moon Atelier"
        description="FARMED.COM — a cosy Sudoku farm roguelike. Four seasons, two farmers, one drone, and The Inspector waiting at the end of Winter."
      />
      <JsonLd data={SCHEMA.farmedCom} />
      <main>
        <section className="page-hero">
          <Reveal>
            <div className="badge badge-brand" style={{ marginBottom:'var(--space-4)' }}>🎮 Our Games</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-3xl)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'.5rem', transition:'color var(--ease-theme)' }}>
              What we're making
            </h1>
            <p style={{ fontStyle:'italic', fontSize:'var(--text-base)', color:'var(--color-text-tertiary)', fontWeight:300, transition:'color var(--ease-theme)' }}>
              Small games. Made carefully. Worth your time.
            </p>
          </Reveal>
        </section>

        <section style={{ background:'var(--color-bg-page)', padding:'var(--space-16) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'920px', margin:'0 auto' }}>
            {loading ? (
              <LoadingState message="Loading games…" />
            ) : error ? (
              <ErrorState message={error} />
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'var(--space-8)' }}>
                {data.items.map((game, i) => (
                  <Reveal key={game.id} delay={i * 100}>
                    <GameCard game={game} onClick={go} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Coming soon */}
        <Reveal>
          <section style={{ background:'var(--color-bg-surface-2)', padding:'var(--space-16) var(--space-8)', textAlign:'center', borderTop:'1px solid var(--color-border-subtle)', transition:'background var(--ease-theme)' }}>
            <div style={{ fontSize:'3rem', animation:'float 6s ease-in-out infinite', display:'inline-block', marginBottom:'var(--space-4)' }} aria-hidden="true">🌙</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-4)', transition:'color var(--ease-theme)' }}>
              More games coming
            </h2>
            <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-secondary)', maxWidth:'420px', margin:'0 auto var(--space-6)', lineHeight:1.9, transition:'color var(--ease-theme)' }}>
              FARMED.COM is just the beginning. Sakura Moon Atelier will keep crafting small, cosy, strategic games with care.
            </p>
            <button className="btn btn-primary" onClick={() => { setPage('contact'); window.scrollTo({top:0}) }}>
              Follow for updates →
            </button>
          </section>
        </Reveal>
      </main>
    </>
  )
}
