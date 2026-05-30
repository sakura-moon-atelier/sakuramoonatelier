import { useState } from 'react'
import SEOHead from '../components/ui/SEOHead.jsx'
import JsonLd, { SCHEMA } from '../components/ui/JsonLd.jsx'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/ThemeContext.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Petals from '../components/decorative/Petals.jsx'
import Stars from '../components/decorative/Stars.jsx'
import { GAMES, CELL_STYLES } from '../data/games.js'
import { VALUES } from '../data/studio.js'
import { NEWS } from '../data/news.js'
import { getLatestPosts, SOCIAL_PLATFORMS } from '../data/socialFeed.js'
import { asset } from '../utils/assets.js'
import { INTEGRATIONS } from '../config/integrations.js'

const game = GAMES[0]

export default function Home({ setPage, setNewsId }) {
  const { t } = useTranslation()
  const { dark } = useTheme()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const go = (key) => { setPage(key); window.scrollTo({ top:0 }) }

  const latestNews = NEWS.slice(0, 3)
  const latestPosts = getLatestPosts(3)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    if (INTEGRATIONS.mailchimp) {
      try {
        await fetch(INTEGRATIONS.mailchimp, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ EMAIL: email }),
          mode:'no-cors',
        })
      } catch {/* mailchimp no-cors always "fails" but works */}
    }
    setSubscribed(true)
    setEmail('')
  }

  return (
    <>
      <SEOHead
        title="Sakura Moon Atelier — Cosy Indie Games"
        description="A small indie studio crafting warm, strategic, beautifully illustrated games. Home of FARMED.COM — a Sudoku farm roguelike."
        ogImage="/hero-light.png"
      />
      <JsonLd data={SCHEMA.organization} />
      <JsonLd data={SCHEMA.website} />
    <main>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero" aria-label="Studio hero">
        <div className="hero-bg" style={{ backgroundImage: `url('${asset(dark ? 'hero-dark.png' : 'hero-light.png')}')` }} aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <Stars />
        <Petals />
        <span className="hero-kuro" aria-hidden="true">🐈‍⬛</span>

        <div className="hero-content">
          <span style={{fontFamily:'var(--font-label)',fontSize:'.66rem',fontWeight:500,color:'var(--color-text-tertiary)',letterSpacing:'.28em',display:'block',marginBottom:'.8rem',transition:'color var(--ease-theme)'}}>
            {t('hero.jp')}
          </span>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:700,lineHeight:1.16,color:'var(--color-text-primary)',marginBottom:'.6rem',transition:'color var(--ease-theme)'}}>
            {t('hero.title')}<br/>
            <em style={{color:'var(--color-brand)',fontStyle:'normal'}}>{t('hero.titleAccent')}</em>
          </h1>
          <p style={{fontStyle:'italic',fontWeight:300,fontSize:'.9rem',color:'var(--color-text-secondary)',letterSpacing:'.06em',marginBottom:'1.1rem',transition:'color var(--ease-theme)'}}>
            "{dark ? t('hero.taglineDark') : t('hero.taglineLight')}"
          </p>
          <p style={{fontSize:'.82rem',color:'var(--color-text-secondary)',lineHeight:2,maxWidth:'440px',margin:'0 auto 2rem',transition:'color var(--ease-theme)'}}>
            {t('hero.description')}
          </p>
          <div className="hero-btn-group" style={{display:'flex',gap:'.75rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={() => go('games')}>{t('hero.ctaGames')} 🌸</button>
            <button className="btn btn-outline" onClick={() => go('about')}>{t('hero.ctaAbout')}</button>
          </div>
        </div>

        <div style={{position:'absolute',bottom:'1.3rem',left:'50%',transform:'translateX(-50%)',display:'flex',alignItems:'center',gap:'.4rem',fontSize:'.60rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--color-text-muted)',opacity:.65,whiteSpace:'nowrap'}} aria-live="polite">
          <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--color-brand)',animation:'pulse 2s ease-in-out infinite'}}/>
          {dark ? t('hero.themeDark') : t('hero.themeLight')}
          <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--color-brand)',animation:'pulse 2s ease-in-out infinite'}}/>
        </div>
      </section>

      {/* ── FEATURED GAME ────────────────────────────── */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <Reveal>
          <div className="divider" style={{marginTop:0,marginBottom:'var(--space-12)'}}>
            <div className="divider-line"/>
            <span className="divider-text">🌸 &nbsp;{t('home.devBadge')}&nbsp; 🌸</span>
            <div className="divider-line"/>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{maxWidth:'880px',margin:'0 auto',background:'var(--color-bg-surface)',border:'1px solid var(--color-border-default)',borderRadius:'var(--radius-2xl)',padding:'var(--space-8)',transition:'background var(--ease-theme),border-color var(--ease-theme)'}}>
            <div className="grid-2col">
              <div>
                <div className="badge badge-accent" style={{marginBottom:'var(--space-4)'}}>✦ {t('games.farmed.status')}</div>
                <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',fontWeight:700,color:'var(--color-text-primary)',letterSpacing:'.04em',marginBottom:'.2rem',transition:'color var(--ease-theme)'}}>
                  {t('games.farmed.title')}
                </h2>
                <p style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--color-text-tertiary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
                  {t('games.farmed.subtitle')}
                </p>
                <p style={{fontSize:'var(--text-sm)',lineHeight:1.9,color:'var(--color-text-secondary)',marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
                  {t('games.farmed.description')}
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'.3rem',marginBottom:'var(--space-6)'}}>
                  {game.platforms.map(p => <span key={p} className="platform-badge">{p}</span>)}
                </div>
                <button className="btn btn-primary" style={{fontSize:'.70rem',padding:'.55rem 1.2rem'}} onClick={() => go('games')}>
                  {t('games.farmed.cta')} →
                </button>
              </div>
              <div style={{borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
                <div style={{padding:'var(--space-6)',background:'linear-gradient(155deg,#0C1E16,#0E1A2E,#16103A)'}}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'3px',maxWidth:'150px',marginBottom:'.6rem'}}>
                    {game.grid.map(([emoji,type],i) => (
                      <div key={i} style={{aspectRatio:'1',borderRadius:'3px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',...CELL_STYLES[type]}}>
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <p style={{fontStyle:'italic',fontSize:'.65rem',color:'rgba(255,255,255,.32)',fontWeight:300}}>
                    {t('games.farmed.gridCaption')}
                  </p>
                </div>
                <div style={{padding:'var(--space-4)',background:'var(--color-bg-surface-2)',display:'flex',flexDirection:'column',gap:'.3rem',transition:'background var(--ease-theme)'}}>
                  {game.seasons.map(s => (
                    <div key={s.key} className="season-pill" style={{background:s.bg,color:s.color||'var(--color-text-tertiary)'}}>
                      <span>{s.emoji}</span><span>{t('games.farmed.seasons.'+s.key)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section style={{background:'var(--color-bg-surface-2)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <Reveal style={{textAlign:'center',marginBottom:'var(--space-8)'}}>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>✦ Studio</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',transition:'color var(--ease-theme)'}}>
            {t('home.valuesTitle')}
          </h2>
        </Reveal>
        <div style={{maxWidth:'820px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--space-4)'}}>
          {VALUES.map((v,i) => (
            <Reveal key={v.key} delay={i*100}>
              <div className="card card-hover" style={{padding:'var(--space-8) var(--space-6)',textAlign:'center',height:'100%'}}>
                <div style={{width:'46px',height:'46px',margin:'0 auto var(--space-4)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',background:v.colorVar.startsWith('--')?`var(${v.colorVar})`:v.colorVar,transition:'background var(--ease-theme)'}}>
                  {v.icon}
                </div>
                <h3 style={{fontFamily:'var(--font-label)',fontSize:'var(--text-base)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>{t('home.values.'+v.key+'.title')}</h3>
                <p style={{fontSize:'var(--text-sm)',color:'var(--color-text-tertiary)',lineHeight:1.85,transition:'color var(--ease-theme)'}}>{t('home.values.'+v.key+'.body')}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── KURO TEASER ──────────────────────────────── */}
      <Reveal>
        <section style={{background:'var(--color-bg-surface-3)',borderTop:'1px solid var(--color-border-subtle)',borderBottom:'1px solid var(--color-border-subtle)',padding:'var(--space-12) var(--space-8)',textAlign:'center',transition:'all var(--ease-theme)'}}>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>{t('home.kuro.badge')}</div>
          <div style={{fontSize:'2.8rem',marginBottom:'var(--space-4)',display:'inline-block',animation:'float 5s ease-in-out infinite'}} aria-hidden="true">🐈‍⬛</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>{t('home.kuro.title')}</h2>
          <p style={{fontStyle:'italic',fontSize:'var(--text-sm)',color:'var(--color-text-tertiary)',maxWidth:'360px',margin:'0 auto var(--space-3)',lineHeight:1.85,transition:'color var(--ease-theme)'}}>{t('home.kuro.body')}</p>
          <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',fontStyle:'italic',transition:'color var(--ease-theme)'}}>{t('home.kuro.note')}</p>
          <button className="btn btn-outline" style={{marginTop:'var(--space-6)',fontSize:'.70rem'}} onClick={() => go('about')}>Meet the team →</button>
        </section>
      </Reveal>

      {/* ── LATEST NEWS ──────────────────────────────── */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'920px',margin:'0 auto'}}>
          <Reveal style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'var(--space-8)',flexWrap:'wrap',gap:'var(--space-4)'}}>
            <div>
              <div className="badge badge-brand" style={{marginBottom:'var(--space-3)'}}>📰 Devlog</div>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',transition:'color var(--ease-theme)'}}>
                Latest News
              </h2>
            </div>
            <button onClick={() => go('news')} className="btn btn-ghost" style={{fontSize:'var(--text-xs)'}}>
              See all news →
            </button>
          </Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'var(--space-6)'}}>
            {latestNews.map((post,i) => (
              <Reveal key={post.id} delay={i*80}>
                <div className="card card-hover news-card" onClick={() => { setNewsId(post.id); go('news-detail') }}
                  tabIndex={0} role="article"
                  onKeyDown={e => e.key==='Enter' && (setNewsId(post.id), go('news-detail'))}>
                  <div className="news-card-img-placeholder"><span style={{fontSize:'2.5rem'}}>{post.emoji}</span></div>
                  <div className="news-card-body">
                    <div style={{display:'flex',alignItems:'center',gap:'var(--space-2)',marginBottom:'var(--space-2)'}}>
                      <span className="badge badge-brand" style={{fontSize:'.56rem'}}>{post.category}</span>
                      <span style={{fontSize:'.62rem',color:'var(--color-text-muted)',transition:'color var(--ease-theme)'}}>
                        {new Date(post.date).toLocaleDateString('en-GB',{month:'short',year:'numeric'})}
                      </span>
                    </div>
                    <h3 className="news-card-title">{post.title}</h3>
                    <p className="news-card-excerpt" style={{display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{post.excerpt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PREVIEW ───────────────────────────── */}
      <section style={{background:'var(--color-bg-surface-2)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'920px',margin:'0 auto'}}>
          <Reveal style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'var(--space-8)',flexWrap:'wrap',gap:'var(--space-4)'}}>
            <div>
              <div className="badge badge-brand" style={{marginBottom:'var(--space-3)'}}>📱 Follow Along</div>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',transition:'color var(--ease-theme)'}}>
                From the Studio
              </h2>
            </div>
            <button onClick={() => go('social')} className="btn btn-ghost" style={{fontSize:'var(--text-xs)'}}>
              See all posts →
            </button>
          </Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'var(--space-5)'}}>
            {latestPosts.map((post,i) => {
              const plat = SOCIAL_PLATFORMS.find(p => p.key === post.platform)
              return (
                <Reveal key={post.id} delay={i*80}>
                  <div className="card social-post" style={{overflow:'hidden'}}>
                    {post.imageGradient && (
                      <div style={{width:'100%',aspectRatio:'1.5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.5rem',background:post.imageGradient}}>
                        {post.imageEmoji}
                      </div>
                    )}
                    <div style={{padding:'var(--space-4)'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'var(--space-2)',marginBottom:'var(--space-3)'}}>
                        <span style={{fontSize:'.9rem'}}>{plat?.icon}</span>
                        <span style={{fontSize:'.62rem',fontWeight:700,color:'var(--color-text-muted)',transition:'color var(--ease-theme)'}}>{plat?.label}</span>
                      </div>
                      <p style={{fontSize:'var(--text-sm)',lineHeight:1.75,color:'var(--color-text-secondary)',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden',transition:'color var(--ease-theme)'}}>
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

      {/* ── NEWSLETTER ───────────────────────────────── */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <Reveal style={{maxWidth:'480px',margin:'0 auto',textAlign:'center'}}>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>📬 {t('home.newsletter.badge')}</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>
            {t('home.newsletter.title')}
          </h2>
          <p style={{fontSize:'var(--text-sm)',color:'var(--color-text-secondary)',lineHeight:1.9,marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
            {t('home.newsletter.body')}
          </p>
          {subscribed ? (
            <p style={{color:'var(--color-brand)',fontWeight:700,fontSize:'var(--text-base)'}}>{t('home.newsletter.success')}</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{display:'flex',gap:'var(--space-2)'}} noValidate>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder={t('home.newsletter.placeholder')} required aria-label="Email address"
                style={{flex:1,fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',background:'var(--color-bg-surface)',color:'var(--color-text-primary)',border:'1.5px solid var(--color-border-default)',borderRadius:'var(--radius-full)',padding:'.6rem 1rem',outline:'none',transition:'border-color var(--ease-normal),background var(--ease-theme)'}}
                onFocus={e=>e.target.style.borderColor='var(--color-brand)'}
                onBlur={e=>e.target.style.borderColor='var(--color-border-default)'}
              />
              <button type="submit" className="btn btn-primary">{t('home.newsletter.cta')}</button>
            </form>
          )}
          <p style={{fontSize:'.60rem',color:'var(--color-text-muted)',marginTop:'var(--space-3)',transition:'color var(--ease-theme)'}}>
            {t('home.newsletter.disclaimer')}
          </p>
        </Reveal>
      </section>
    </main>
    </>
  )
}
