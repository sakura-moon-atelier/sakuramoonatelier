import { useEffect } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import { getNewsById, NEWS } from '../data/news.js'

export default function NewsDetail({ newsId, setPage }) {
  const post = getNewsById(newsId)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top:0 }) }, [newsId])

  if (!post) {
    return (
      <div className="special-page">
        <p style={{color:'var(--color-text-tertiary)',marginBottom:'var(--space-6)'}}>Post not found 🌾</p>
        <button className="btn btn-primary" onClick={() => setPage('news')}>Back to News</button>
      </div>
    )
  }

  const date = new Date(post.date).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' })
  const related = NEWS.filter(n => n.id !== post.id && n.category === post.category).slice(0, 3)

  // Minimal markdown renderer for the body
  const renderBody = (text) => {
    return text.trim().split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**') && !para.slice(2).includes('**')) {
        return <h3 key={i} style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,color:'var(--color-text-primary)',margin:'var(--space-8) 0 var(--space-3)',transition:'color var(--ease-theme)'}}>{para.slice(2,-2)}</h3>
      }
      // Inline bold
      const parts = para.split(/(\*\*[^*]+\*\*)/)
      return (
        <p key={i} style={{fontSize:'var(--text-base)',lineHeight:2,color:'var(--color-text-secondary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} style={{fontWeight:700,color:'var(--color-text-primary)'}}>{part.slice(2,-2)}</strong>
              : part
          )}
        </p>
      )
    })
  }

  return (
    <main>
      {/* Back nav */}
      <div style={{paddingTop:'78px',paddingBottom:'var(--space-4)',paddingLeft:'var(--space-8)',background:'var(--color-bg-page)',transition:'background var(--ease-theme)'}}>
        <button onClick={() => setPage('news')} className="btn btn-ghost" style={{paddingLeft:0}}>
          ← Back to News
        </button>
      </div>

      {/* Article */}
      <article style={{background:'var(--color-bg-page)',transition:'background var(--ease-theme)'}}>
        <header style={{maxWidth:'700px',margin:'0 auto',padding:'var(--space-8) var(--space-8) 0',textAlign:'center'}}>
          <Reveal>
            <div style={{fontSize:'3.5rem',marginBottom:'var(--space-4)',display:'inline-block',animation:'float 6s ease-in-out infinite'}} aria-hidden="true">
              {post.emoji}
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'var(--space-3)',marginBottom:'var(--space-4)'}}>
              <span className="badge badge-brand">{post.category}</span>
              <span style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',transition:'color var(--ease-theme)'}}>
                {date}
              </span>
            </div>
            <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3.5vw,2.2rem)',fontWeight:700,color:'var(--color-text-primary)',lineHeight:1.3,marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
              {post.title}
            </h1>
          </Reveal>
        </header>

        <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 var(--space-8) var(--space-16)'}}>
          <Reveal delay={100}>
            <p style={{fontSize:'var(--text-base)',lineHeight:2,color:'var(--color-text-secondary)',fontStyle:'italic',borderLeft:'3px solid var(--color-brand)',paddingLeft:'var(--space-4)',marginBottom:'var(--space-8)',transition:'color var(--ease-theme),border-color var(--ease-theme)'}}>
              {post.excerpt}
            </p>
          </Reveal>
          <Reveal delay={150}>
            {renderBody(post.body)}
          </Reveal>

          {/* Tags */}
          <Reveal delay={200}>
            <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginTop:'var(--space-8)',paddingTop:'var(--space-6)',borderTop:'1px solid var(--color-border-subtle)',transition:'border-color var(--ease-theme)'}}>
              {post.tags.map(tag => (
                <span key={tag} style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',background:'var(--color-bg-surface-2)',border:'1px solid var(--color-border-subtle)',borderRadius:'var(--radius-sm)',padding:'.18rem .55rem',transition:'all var(--ease-theme)'}}>
                  #{tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section style={{background:'var(--color-bg-surface-2)',padding:'var(--space-12) var(--space-8)',borderTop:'1px solid var(--color-border-subtle)',transition:'background var(--ease-theme)'}}>
          <div style={{maxWidth:'700px',margin:'0 auto'}}>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
              More from the devlog
            </h2>
            <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
              {related.map(r => (
                <button key={r.id} onClick={() => { setPage('news-detail'); window.scrollTo({top:0}) }}
                  style={{display:'flex',alignItems:'center',gap:'var(--space-4)',padding:'var(--space-4)',background:'var(--color-bg-surface)',border:'1px solid var(--color-border-default)',borderRadius:'var(--radius-lg)',cursor:'pointer',textAlign:'left',transition:'all var(--ease-normal)'}}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--color-brand)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--color-border-default)'}>
                  <span style={{fontSize:'1.8rem',flexShrink:0}}>{r.emoji}</span>
                  <div>
                    <p style={{fontSize:'var(--text-sm)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'.2rem',transition:'color var(--ease-theme)'}}>
                      {r.title}
                    </p>
                    <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',transition:'color var(--ease-theme)'}}>
                      {new Date(r.date).toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric'})}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
