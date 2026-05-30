import { useTranslation } from 'react-i18next'
import SEOHead from '../components/ui/SEOHead.jsx'
import { asset } from '../utils/assets.js'
import Reveal from '../components/ui/Reveal.jsx'
import Picture from '../components/ui/Picture.jsx'
import Petals from '../components/decorative/Petals.jsx'
import { FOUNDER, KURO, VALUES } from '../data/studio.js'

export default function About({ setPage }) {
  const { t } = useTranslation()
  const go = (key) => { setPage(key); window.scrollTo({ top: 0 }) }

  return (
    <>
      <SEOHead
        title="About — Sakura Moon Atelier"
        description="Meet Ana, founder of Sakura Moon Atelier, and Kuro the studio mascot. Building cosy, strategic games with care from Lisbon, Portugal."
        ogImage="/founder.png"
      />
    <main>
      {/* PAGE HERO */}
      <section style={{background:'var(--color-bg-surface-2)',padding:'5rem var(--space-8) var(--space-12)',textAlign:'center',position:'relative',overflow:'hidden',borderBottom:'1px solid var(--color-border-subtle)',transition:'background var(--ease-theme)'}}>
        <Petals/>
        <Reveal style={{position:'relative',zIndex:1}}>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>{t('about.badge')}</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'0.5rem',transition:'color var(--ease-theme)'}}>
            {t('about.title')}
          </h1>
          <p style={{fontStyle:'italic',fontSize:'var(--text-base)',color:'var(--color-text-tertiary)',maxWidth:'500px',margin:'0 auto',fontWeight:300,transition:'color var(--ease-theme)'}}>
            {t('about.subtitle')}
          </p>
        </Reveal>
      </section>

      {/* STUDIO STORY */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'700px',margin:'0 auto'}}>
          <Reveal>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
              {t('about.studio.title')}
            </h2>
          </Reveal>
          {['body1','body2','body3'].map((key,i) => (
            <Reveal key={key} delay={i*100}>
              <p style={{fontSize:'var(--text-base)',color:'var(--color-text-secondary)',lineHeight:2,marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
                {t('about.studio.'+key)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section style={{background:'var(--color-bg-surface-2)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'880px',margin:'0 auto'}}>
          <Reveal style={{marginBottom:'var(--space-8)'}}>
            <div className="badge badge-brand" style={{marginBottom:'var(--space-3)'}}>{t('about.founder.badge')}</div>
          </Reveal>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-12)',alignItems:'center'}}>
            {/* Founder photo */}
            <Reveal>
              <div style={{position:'relative'}}>
                <Picture
                  src={FOUNDER.photo}
                  alt={`${FOUNDER.name} — ${t('about.founder.badge')}`}
                  width={320} height={320}
                  style={{width:'100%',maxWidth:'320px',borderRadius:'var(--radius-2xl)',boxShadow:'var(--shadow-lg)',display:'block',margin:'0 auto'}}
                  loading="eager"
                />
                {/* Trait pills overlay */}
                <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',justifyContent:'center',marginTop:'var(--space-4)'}}>
                  {FOUNDER.traits.map(trait => (
                    <span key={trait} className="badge badge-brand" style={{fontSize:'0.58rem'}}>{trait}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* Founder bio */}
            <Reveal delay={100}>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'0.3rem',transition:'color var(--ease-theme)'}}>
                {t('about.founder.name')}
              </h2>
              <p style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--color-brand)',marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
                {t('about.founder.role')}
              </p>
              <p style={{fontSize:'var(--text-sm)',lineHeight:2,color:'var(--color-text-secondary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
                {t('about.founder.bio1')}
              </p>
              <p style={{fontSize:'var(--text-sm)',lineHeight:2,color:'var(--color-text-secondary)',marginBottom:'var(--space-8)',transition:'color var(--ease-theme)'}}>
                {t('about.founder.bio2')}
              </p>
              {/* Essentials */}
              <p style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--color-text-tertiary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>
                ✨ {t('about.founder.essentials')}
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
                {FOUNDER.essentials.map(item => (
                  <div key={item.label} style={{display:'flex',alignItems:'center',gap:'0.3rem',background:'var(--color-bg-surface)',border:'1px solid var(--color-border-subtle)',borderRadius:'var(--radius-full)',padding:'0.25rem 0.7rem',fontSize:'0.65rem',fontWeight:600,color:'var(--color-text-tertiary)',transition:'all var(--ease-theme)'}}>
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KURO */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'880px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-12)',alignItems:'center'}}>
          <Reveal>
            <div className="badge badge-brand" style={{marginBottom:'var(--space-3)'}}>{t('about.kuro.badge')}</div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'0.3rem',transition:'color var(--ease-theme)'}}>
              {t('about.kuro.title')} {KURO.emoji}
            </h2>
            <p style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--color-brand)',marginBottom:'var(--space-6)',transition:'color var(--ease-theme)'}}>
              {t('about.kuro.role')}
            </p>
            <p style={{fontSize:'var(--text-sm)',lineHeight:2,color:'var(--color-text-secondary)',transition:'color var(--ease-theme)'}}>
              {t('about.kuro.bio')}
            </p>
          </Reveal>
          <Reveal delay={150} style={{textAlign:'center'}}>
            <div style={{fontSize:'6rem',animation:'floatSlow 7s ease-in-out infinite',display:'inline-block'}} aria-hidden="true">🐈‍⬛</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',justifyContent:'center',marginTop:'var(--space-4)'}}>
              {KURO.traits.map(t2 => (
                <span key={t2} className="badge badge-brand" style={{fontSize:'0.58rem'}}>{t2}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER SHEET — character reference */}
      <section style={{background:'var(--color-bg-surface-2)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <Reveal style={{maxWidth:'600px',margin:'0 auto',textAlign:'center'}}>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>🎨 Character Reference</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
            The World of Sakura Moon
          </h2>
          <img
            src="/founder-sheet.png"
            alt="Sakura Moon Atelier character reference sheet featuring the founder and Kuro"
            style={{width:'100%',maxWidth:'560px',borderRadius:'var(--radius-xl)',boxShadow:'var(--shadow-lg)',margin:'0 auto var(--space-6)',display:'block'}}
          />
          <p style={{fontSize:'var(--text-sm)',color:'var(--color-text-tertiary)',fontStyle:'italic',lineHeight:1.85,transition:'color var(--ease-theme)'}}>
            Engineer by day. Game developer by night. Always with coffee, Kuro nearby, and a magic tablet in hand.
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal>
        <section style={{background:'var(--color-bg-invert)',padding:'var(--space-12) var(--space-8)',textAlign:'center',transition:'background var(--ease-theme)'}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,color:'rgba(255,255,255,0.9)',marginBottom:'var(--space-3)'}}>
            Want to follow the journey?
          </h2>
          <p style={{fontSize:'var(--text-sm)',color:'rgba(255,255,255,0.5)',marginBottom:'var(--space-6)',maxWidth:'360px',margin:'0 auto var(--space-6)',lineHeight:1.85}}>
            FARMED.COM is being built in the open. Follow for dev updates, art reveals, and news.
          </p>
          <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={() => go('games')}>See the Game 🌸</button>
            <button className="btn btn-outline" onClick={() => go('contact')} style={{borderColor:'rgba(255,255,255,0.25)',color:'rgba(255,255,255,0.65)'}}>Get in Touch</button>
          </div>
        </section>
      </Reveal>
    </main>
    </>
  )
}
