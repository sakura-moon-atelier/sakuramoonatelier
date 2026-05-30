import { useState, useMemo } from 'react'
import SEOHead from '../components/ui/SEOHead.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ViewToggle from '../components/ui/ViewToggle.jsx'
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx'
import { LoadingState, ErrorState, EmptyState } from '../components/ui/States.jsx'
import { useSocialFeed } from '../hooks/useSocialFeed.js'
import { SOCIAL_PLATFORMS } from '../data/socialFeed.js'
import { STUDIO } from '../data/studio.js'

const ALL = 'all'
const SORT_OPTIONS = [
  { value:'date-desc',  label:'Newest first' },
  { value:'date-asc',   label:'Oldest first' },
  { value:'likes-desc', label:'Most liked' },
]

/**
 * Every card has the SAME structure:
 *   [image slot — always rendered, always same aspect ratio]
 *   [platform header]
 *   [text body]
 *
 * Posts without images get a PlaceholderImage. No exceptions.
 * This ensures all cards are the same height in grid view.
 */
function SocialCard({ post, view }) {
  const plat = SOCIAL_PLATFORMS.find(p => p.key === post.platform)
  const date = new Date(post.date).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' })
  const isList = view === 'list'

  const imageSlot = (
    <div className="social-post-image-slot" style={isList ? { width:'90px', aspectRatio:'1/1', flexShrink:0 } : {}}>
      {post.imageGradient
        ? <div style={{ width:'100%', height:'100%', background:post.imageGradient, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.2rem' }} aria-hidden="true">
            {post.imageEmoji}
          </div>
        : <PlaceholderImage
            emoji={plat?.icon ?? '📱'}
            label={plat?.label}
            aspectRatio="1/1"
            style={{ width:'100%', height:'100%', borderRadius:0 }}
          />
      }
    </div>
  )

  const header = (
    <div className="social-post-header" style={{ padding:'var(--space-3) var(--space-4) 0' }}>
      <div style={{ width:'30px', height:'30px', borderRadius:'50%', background:'var(--color-bg-surface-2)', border:'1px solid var(--color-border-subtle)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.88rem', flexShrink:0, transition:'all var(--ease-theme)' }}>
        {plat?.icon ?? '📱'}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:'var(--text-xs)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>Sakura Moon Atelier</div>
        <div style={{ fontSize:'.68rem', color:'var(--color-text-muted)', transition:'color var(--ease-theme)' }}>{plat?.label} · {date}</div>
      </div>
      {post.url && post.url !== '#' && (
        <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label="View original post"
          style={{ fontSize:'.8rem', color:'var(--color-text-muted)', transition:'color var(--ease-normal)', textDecoration:'none' }}
          onMouseEnter={e=>e.target.style.color='var(--color-brand)'}
          onMouseLeave={e=>e.target.style.color='var(--color-text-muted)'}>↗</a>
      )}
    </div>
  )

  const textBody = (
    <div className="social-post-body" style={{ padding:'var(--space-3) var(--space-4) var(--space-4)', flex:1 }}>
      <p style={{ fontSize:'var(--text-sm)', lineHeight:1.75, color:'var(--color-text-secondary)', transition:'color var(--ease-theme)', ...(isList ? {} : { display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }) }}>
        {post.text}
      </p>
      {post.likes > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:'var(--space-2)', marginTop:'var(--space-3)', fontSize:'.70rem', color:'var(--color-text-muted)', transition:'color var(--ease-theme)' }}>
          <span>🩷</span><span>{post.likes.toLocaleString()}</span>
        </div>
      )}
    </div>
  )

  if (isList) {
    return (
      <div className="card social-post" style={{ display:'flex', flexDirection:'row', overflow:'hidden', alignItems:'stretch' }}>
        {imageSlot}
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          {header}{textBody}
        </div>
      </div>
    )
  }

  return (
    <div className="card social-post-card" style={{ overflow:'hidden' }}>
      {imageSlot}
      {header}
      {textBody}
    </div>
  )
}

export default function Social() {
  const [view,     setView]     = useState('grid')
  const [platform, setPlatform] = useState(ALL)
  const [sort,     setSort]     = useState('date-desc')
  const [query,    setQuery]    = useState('')

  const [sortBy, order] = useMemo(() => sort.split('-'), [sort])

  const filter = useMemo(() => ({
    query:    query.trim() || undefined,
    platform: platform === ALL ? undefined : platform,
    sortBy:   sortBy === 'likes' ? 'likes' : 'date',
    order,
    limit: 50,
  }), [query, platform, sortBy, order])

  const { data, loading, error, refetch } = useSocialFeed(filter)
  const hasFilters = platform !== ALL || !!query

  return (
    <>
      <SEOHead
        title="Social — Sakura Moon Atelier"
        description="Follow Sakura Moon Atelier on Instagram, Bluesky, TikTok, Discord, Twitch, itch.io, and Steam."
      />
      <main>
        <section className="page-hero">
          <Reveal>
            <div className="badge badge-brand" style={{ marginBottom:'var(--space-4)' }}>📱 Follow Along</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
              Social Media
            </h1>
            <p style={{ color:'var(--color-text-tertiary)', fontWeight:300, fontStyle:'italic', transition:'color var(--ease-theme)' }}>
              Follow the studio journey across the internet.
            </p>
          </Reveal>
        </section>

        {/* Platform links */}
        <section style={{ background:'var(--color-bg-surface-2)', padding:'var(--space-6) var(--space-8)', borderBottom:'1px solid var(--color-border-subtle)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'920px', margin:'0 auto', display:'flex', flexWrap:'wrap', gap:'var(--space-2)', justifyContent:'center' }}>
            {SOCIAL_PLATFORMS.map(p => (
              <a key={p.key} href={STUDIO.social[p.key] ?? '#'} target="_blank" rel="noopener noreferrer"
                aria-label={`${p.label} (opens in new tab)`}
                style={{ display:'flex', alignItems:'center', gap:'var(--space-2)', padding:'.4rem .9rem', background:'var(--color-bg-surface)', border:'1px solid var(--color-border-default)', borderRadius:'var(--radius-full)', fontSize:'var(--text-xs)', fontWeight:700, color:'var(--color-text-secondary)', textDecoration:'none', transition:'all var(--ease-normal)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--color-brand)'; e.currentTarget.style.color='var(--color-brand)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--color-border-default)'; e.currentTarget.style.color='var(--color-text-secondary)' }}>
                <span aria-hidden="true">{p.icon}</span>{p.label}
              </a>
            ))}
          </div>
        </section>

        <section style={{ background:'var(--color-bg-page)', padding:'var(--space-12) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'920px', margin:'0 auto' }}>

            {/* Toolbar */}
            <div style={{ display:'flex', gap:'var(--space-3)', alignItems:'center', flexWrap:'wrap', marginBottom:'var(--space-4)' }}>
              <div className="search-bar" style={{ flex:'1', minWidth:'200px' }}>
                <span style={{ color:'var(--color-text-muted)', fontSize:'.9rem' }}>🔍</span>
                <input type="search" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search posts…" aria-label="Search social posts" />
                {query && <button onClick={() => setQuery('')} style={{ background:'none', border:'none', color:'var(--color-text-muted)', cursor:'pointer' }}>✕</button>}
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort by"
                style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', fontWeight:700, background:'var(--color-bg-surface)', color:'var(--color-text-secondary)', border:'1.5px solid var(--color-border-default)', borderRadius:'var(--radius-full)', padding:'.4rem .9rem', cursor:'pointer', transition:'all var(--ease-theme)', outline:'none' }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ViewToggle view={view} onChange={setView} />
            </div>

            {/* Platform pills */}
            <div className="filter-pills" style={{ marginBottom:'var(--space-6)' }} role="group" aria-label="Filter by platform">
              <button className={`filter-pill ${platform===ALL?'active':''}`} onClick={() => setPlatform(ALL)}>All</button>
              {SOCIAL_PLATFORMS.filter(p => data.items.some(post => post.platform === p.key) || loading).map(p => (
                <button key={p.key} className={`filter-pill ${platform===p.key?'active':''}`} onClick={() => setPlatform(p.key)}>
                  <span aria-hidden="true">{p.icon}</span> {p.label}
                </button>
              ))}
              {hasFilters && (
                <button className="btn btn-ghost" style={{ fontSize:'var(--text-xs)', padding:'.2rem .6rem' }}
                  onClick={() => { setPlatform(ALL); setQuery('') }}>✕ Clear</button>
              )}
            </div>

            {!loading && (
              <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', marginBottom:'var(--space-6)', fontStyle:'italic', transition:'color var(--ease-theme)' }}>
                {data.total} post{data.total !== 1 ? 's' : ''}{hasFilters ? ' matching' : ' · curated highlights'}
              </p>
            )}

            {loading ? <LoadingState message="Loading posts…" />
            : error   ? <ErrorState message={error} onRetry={refetch} />
            : data.items.length === 0 ? <EmptyState emoji="📱" message="No posts found." />
            : (
              <div style={view === 'grid'
                ? { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'var(--space-6)', alignItems:'start' }
                : { display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                {data.items.map((post, i) => (
                  <Reveal key={post.id} delay={i < 6 ? i * 60 : 0}>
                    <SocialCard post={post} view={view} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
