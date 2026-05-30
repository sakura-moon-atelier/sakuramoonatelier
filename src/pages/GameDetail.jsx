import { useTranslation } from 'react-i18next'
import SEOHead from '../components/ui/SEOHead.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx'
import { LoadingState, ErrorState } from '../components/ui/States.jsx'
import { useGame } from '../hooks/useGames.js'
import { useNews } from '../hooks/useNews.js'
import { useSocialFeed } from '../hooks/useSocialFeed.js'
import { CELL_STYLES } from '../data/games.js'
import { SOCIAL_PLATFORMS } from '../data/socialFeed.js'

const STORE_META = {
  steam:       { label:'Steam',       icon:'🎯', bg:'#1B2838', color:'#fff' },
  itchio:      { label:'itch.io',     icon:'🕹', bg:'#FA5C5C', color:'#fff' },
  xbox:        { label:'Xbox',        icon:'🎮', bg:'#107C10', color:'#fff' },
  playstation: { label:'PlayStation', icon:'🎵', bg:'#003087', color:'#fff' },
  nintendo:    { label:'Switch',      icon:'🎴', bg:'#E4000F', color:'#fff' },
}

function StoreButton({ storeKey, url, status }) {
  const meta = STORE_META[storeKey]
  if (!meta) return null
  const isAvailable = !!url
  return (
    <a
      href={isAvailable ? url : undefined}
      target={isAvailable ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={isAvailable ? `Buy on ${meta.label}` : `${meta.label} — coming soon`}
      aria-disabled={!isAvailable}
      style={{
        display:'flex', alignItems:'center', gap:'var(--space-2)',
        padding:'.55rem 1.1rem',
        background: isAvailable ? meta.bg : 'var(--color-bg-surface-3)',
        color: isAvailable ? meta.color : 'var(--color-text-muted)',
        border:`1px solid ${isAvailable ? 'transparent' : 'var(--color-border-default)'}`,
        borderRadius:'var(--radius-full)',
        fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.06em',
        textDecoration:'none', cursor: isAvailable ? 'pointer' : 'default',
        opacity: isAvailable ? 1 : 0.55,
        transition:'all var(--ease-normal)',
      }}
      onMouseEnter={e => isAvailable && (e.currentTarget.style.transform='translateY(-2px)',e.currentTarget.style.boxShadow='var(--shadow-md)')}
      onMouseLeave={e => (e.currentTarget.style.transform='none',e.currentTarget.style.boxShadow='none')}
    >
      <span aria-hidden="true">{meta.icon}</span>
      {isAvailable ? meta.label : `${meta.label} — Soon`}
    </a>
  )
}

function TrailerBlock({ trailer }) {
  if (trailer.youtubeId) {
    return (
      <div style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', background:'#000', aspectRatio:'16/9' }}>
        {/* Privacy-preserving: load iframe only when user clicks */}
        <YoutubeFacade youtubeId={trailer.youtubeId} title={trailer.title} />
      </div>
    )
  }
  return (
    <PlaceholderImage emoji="🎬" label={`${trailer.title} — coming soon`}
      aspectRatio="16/9"
      gradient="linear-gradient(135deg,#0C0820,#200830)" />
  )
}

function YoutubeFacade({ youtubeId, title }) {
  const [clicked, setClicked] = React.useState(false)
  if (clicked) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width:'100%', height:'100%', border:'none' }}
      />
    )
  }
  return (
    <button onClick={() => setClicked(true)}
      style={{ width:'100%', height:'100%', background:`#000 url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg) center/cover no-repeat`, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}
      aria-label={`Play ${title}`}>
      <div style={{ width:'68px', height:'48px', background:'rgba(255,0,0,.85)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </button>
  )
}

import React from 'react'

export default function GameDetail({ gameSlug, setPage, setNewsId }) {
  const { t } = useTranslation()
  const { data: game, loading, error } = useGame(gameSlug)

  const newsFilter  = { tags: game ? [game.relatedNewsTag]   : [], limit: 3 }
  const socialFilter= { gameId: game?.relatedSocialTag, limit: 3 }
  const { data: relatedNews }   = useNews(newsFilter)
  const { data: relatedSocial } = useSocialFeed(socialFilter)

  if (loading) return <LoadingState message="Loading game…" />
  if (error || !game) return <ErrorState message={error ?? 'Game not found'} onRetry={() => setPage('games')} />

  const badge = game.status === 'released' ? 'Released' : game.status === 'development' ? 'In Development' : 'Announced'

  return (
    <>
      <SEOHead
        title={`${game.title} — Sakura Moon Atelier`}
        description={`${game.subtitle} by Sakura Moon Atelier. ${badge}.`}
      />
      <main style={{ paddingTop:'58px' }}>

        {/* Back */}
        <div style={{ padding:'var(--space-4) var(--space-8)', background:'var(--color-bg-page)', transition:'background var(--ease-theme)' }}>
          <button onClick={() => setPage('games')} className="btn btn-ghost" style={{ paddingLeft:0 }}>
            ← All Games
          </button>
        </div>

        {/* Hero */}
        <section style={{ background:'var(--game-hero-bg)', padding:'var(--space-12) var(--space-8)', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:'880px', margin:'0 auto' }}>
            <div className="grid-2col" style={{ alignItems:'center' }}>
              <div>
                <div style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:'var(--space-3)' }}>
                  ✦ {badge}
                </div>
                <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-4xl)', fontWeight:700, color:'var(--game-hero-text)', letterSpacing:'.04em', marginBottom:'.25rem', lineHeight:1.1 }}>
                  {game.title}
                </h1>
                <p style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--game-hero-text-sub)', marginBottom:'var(--space-6)' }}>
                  {game.subtitle}
                </p>

                {/* Store buttons */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'var(--space-2)', marginBottom:'var(--space-6)' }}>
                  {Object.entries(game.storeLinks ?? {}).map(([key, url]) => (
                    <StoreButton key={key} storeKey={key} url={url} />
                  ))}
                </div>

                {/* Press kit link */}
                {game.pressKit ? (
                  <a href={game.pressKit} target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize:'var(--text-xs)', borderColor:'rgba(200,180,220,.3)', color:'rgba(200,180,220,.7)' }}>
                    📋 Press Kit
                  </a>
                ) : (
                  <button onClick={() => setPage('press-kit')} className="btn btn-ghost"
                    style={{ fontSize:'var(--text-xs)', color:'rgba(200,180,220,.5)' }}>
                    📋 Press Kit →
                  </button>
                )}
              </div>

              {/* Mini grid */}
              {game.grid?.length > 0 && (
                <div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'4px', maxWidth:'180px', margin:'0 auto var(--space-4)' }}>
                    {game.grid.map(([emoji, type], i) => (
                      <div key={i} style={{ aspectRatio:'1', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', ...CELL_STYLES[type] }}>
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontStyle:'italic', fontSize:'.65rem', color:'var(--game-hero-text-sub)', textAlign:'center' }}>
                    Sudoku rules · No numbers, only crops
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Seasons */}
        {game.seasons?.length > 0 && (
          <section style={{ background:'var(--color-bg-surface-2)', padding:'var(--space-8)', borderBottom:'1px solid var(--color-border-subtle)', transition:'background var(--ease-theme)' }}>
            <div style={{ maxWidth:'880px', margin:'0 auto', display:'flex', gap:'var(--space-3)', flexWrap:'wrap' }}>
              {game.seasons.map(s => (
                <div key={s.key} className="season-pill" style={{ background:s.bg, color:s.color || 'var(--color-text-tertiary)' }}>
                  <span>{s.emoji}</span>
                  <span>{t('games.farmed.seasons.'+s.key)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features */}
        <section style={{ background:'var(--color-bg-page)', padding:'var(--space-16) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'880px', margin:'0 auto' }}>
            <Reveal>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-8)', transition:'color var(--ease-theme)' }}>
                How it works
              </h2>
            </Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'var(--space-4)' }}>
              {t('games.farmed.features', { returnObjects:true }).map((f, i) => (
                <Reveal key={f.title} delay={i * 70}>
                  <div className="card" style={{ padding:'var(--space-6)' }}>
                    <div style={{ fontSize:'1.6rem', marginBottom:'var(--space-3)' }}>{f.icon}</div>
                    <h3 style={{ fontFamily:'var(--font-label)', fontSize:'var(--text-base)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-2)', transition:'color var(--ease-theme)' }}>{f.title}</h3>
                    <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-tertiary)', lineHeight:1.85, transition:'color var(--ease-theme)' }}>{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section style={{ background:'var(--color-bg-surface-2)', padding:'var(--space-16) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'880px', margin:'0 auto' }}>
            <Reveal style={{ marginBottom:'var(--space-8)' }}>
              <div className="badge badge-brand" style={{ marginBottom:'var(--space-3)' }}>📸 Screenshots</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
                In-Game Images
              </h2>
            </Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'var(--space-4)' }}>
              {game.screenshots?.map((shot, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="card" style={{ overflow:'hidden' }}>
                    {shot.src
                      ? <img src={shot.src} alt={shot.alt} loading="lazy" style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover' }} />
                      : <PlaceholderImage emoji={shot.emoji ?? '📸'} label={shot.caption} aspectRatio="16/9" />
                    }
                    {shot.caption && (
                      <p style={{ padding:'var(--space-3) var(--space-4)', fontSize:'var(--text-xs)', color:'var(--color-text-muted)', fontStyle:'italic', transition:'color var(--ease-theme)' }}>
                        {shot.caption}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trailers */}
        <section style={{ background:'var(--color-bg-page)', padding:'var(--space-16) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'880px', margin:'0 auto' }}>
            <Reveal style={{ marginBottom:'var(--space-8)' }}>
              <div className="badge badge-brand" style={{ marginBottom:'var(--space-3)' }}>🎬 Trailers</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
                Videos
              </h2>
            </Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(380px,1fr))', gap:'var(--space-6)' }}>
              {game.trailers?.map((trailer, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div>
                    <TrailerBlock trailer={trailer} />
                    <p style={{ fontSize:'var(--text-xs)', fontWeight:700, color:'var(--color-text-secondary)', marginTop:'var(--space-2)', transition:'color var(--ease-theme)' }}>
                      {trailer.title}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related news */}
        {relatedNews.items.length > 0 && (
          <section style={{ background:'var(--color-bg-surface-2)', padding:'var(--space-12) var(--space-8)', transition:'background var(--ease-theme)' }}>
            <div style={{ maxWidth:'880px', margin:'0 auto' }}>
              <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'var(--space-6)' }}>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
                  📰 Latest News
                </h2>
                <button className="btn btn-ghost" style={{ fontSize:'var(--text-xs)' }} onClick={() => { setPage('news'); window.scrollTo({top:0}) }}>
                  All news →
                </button>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'var(--space-4)' }}>
                {relatedNews.items.map((post, i) => (
                  <Reveal key={post.id} delay={i * 70}>
                    <div className="card card-hover news-card" style={{ cursor:'pointer' }}
                      onClick={() => { setNewsId(post.id); setPage('news-detail'); window.scrollTo({top:0}) }}
                      tabIndex={0} onKeyDown={e => e.key==='Enter' && (setNewsId(post.id), setPage('news-detail'))}>
                      <PlaceholderImage emoji={post.emoji} aspectRatio="16/9" />
                      <div className="news-card-body">
                        <span className="badge badge-brand" style={{ fontSize:'.56rem', marginBottom:'var(--space-2)' }}>{post.category}</span>
                        <h3 className="news-card-title">{post.title}</h3>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related social */}
        {relatedSocial.items.length > 0 && (
          <section style={{ background:'var(--color-bg-page)', padding:'var(--space-12) var(--space-8)', transition:'background var(--ease-theme)' }}>
            <div style={{ maxWidth:'880px', margin:'0 auto' }}>
              <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'var(--space-6)' }}>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
                  📱 From Social Media
                </h2>
                <button className="btn btn-ghost" style={{ fontSize:'var(--text-xs)' }} onClick={() => { setPage('social'); window.scrollTo({top:0}) }}>
                  All posts →
                </button>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'var(--space-4)' }}>
                {relatedSocial.items.map((post, i) => {
                  const plat = SOCIAL_PLATFORMS.find(p => p.key === post.platform)
                  return (
                    <Reveal key={post.id} delay={i * 70}>
                      <div className="card" style={{ overflow:'hidden' }}>
                        {post.imageGradient
                          ? <div style={{ width:'100%', aspectRatio:'1.5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', background:post.imageGradient }}>{post.imageEmoji}</div>
                          : <PlaceholderImage emoji={plat?.icon ?? '📱'} aspectRatio="1.5/1" />
                        }
                        <div style={{ padding:'var(--space-4)' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'var(--space-2)', marginBottom:'var(--space-2)' }}>
                            <span>{plat?.icon}</span>
                            <span style={{ fontSize:'.60rem', fontWeight:700, color:'var(--color-text-muted)' }}>{plat?.label}</span>
                          </div>
                          <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-secondary)', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                            {post.text}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
