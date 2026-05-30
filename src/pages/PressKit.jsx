import { useTranslation } from 'react-i18next'
import SEOHead from '../components/ui/SEOHead.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { asset } from '../utils/assets.js'
import { STUDIO, FOUNDER, PRESS_KIT_ASSETS } from '../data/studio.js'

const FACTS = [
  { label:'Studio',    value:'Sakura Moon Atelier' },
  { label:'Location',  value:'Lisbon, Portugal 🇵🇹' },
  { label:'Founded',   value:'2024' },
  { label:'Team Size', value:'1 person + 1 cat' },
  { label:'First Game', value:'FARMED.COM (In Development)' },
  { label:'Engine',    value:'TBD' },
  { label:'Platforms', value:'Steam · itch.io · Xbox · PlayStation · Switch' },
  { label:'Website',   value:'sakuramoonatelier.com' },
]

export default function PressKit({ setPage }) {
  const { t } = useTranslation()

  const handleDownload = () => {
    if (STUDIO.pressKit) {
      window.open(STUDIO.pressKit, '_blank', 'noopener,noreferrer')
    } else {
      alert('Press kit download will be available soon! In the meantime, contact us at hello@sakuramoonatelier.com')
    }
  }

  return (
    <>
      <SEOHead
        title="Press Kit — Sakura Moon Atelier"
        description="Press kit for Sakura Moon Atelier. Studio facts, logos, key art, founder profile, and press contact."
        noindex={false}
      />
    <main>
      {/* PAGE HERO */}
      <section className="page-hero">
        <Reveal>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>📋 Press &amp; Media</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'.5rem',transition:'color var(--ease-theme)'}}>
            Press Kit
          </h1>
          <p style={{fontStyle:'italic',fontSize:'var(--text-base)',color:'var(--color-text-tertiary)',maxWidth:'460px',margin:'0 auto var(--space-6)',fontWeight:300,transition:'color var(--ease-theme)'}}>
            Everything you need to write about Sakura Moon Atelier and FARMED.COM.
          </p>
          <button className="btn btn-primary" onClick={handleDownload} style={{fontSize:'.75rem',padding:'.7rem 1.8rem'}}>
            ⬇ Download Full Press Kit
          </button>
          {!STUDIO.pressKit && (
            <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',marginTop:'var(--space-3)',transition:'color var(--ease-theme)'}}>
              Coming soon · Contact us directly in the meantime
            </p>
          )}
        </Reveal>
      </section>

      {/* ABOUT THE STUDIO */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'880px',margin:'0 auto'}}>
          <div className="grid-2col" style={{gap:'var(--space-12)'}}>
            <Reveal>
              <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>Studio</div>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
                About the Studio
              </h2>
              <p style={{fontSize:'var(--text-sm)',lineHeight:2,color:'var(--color-text-secondary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
                Sakura Moon Atelier is a micro indie game studio based in Lisbon, Portugal. Founded in 2024 by a software engineer with a strong background in iOS framework architecture and a long-standing love of games that are beautiful, strategic, and worth returning to.
              </p>
              <p style={{fontSize:'var(--text-sm)',lineHeight:2,color:'var(--color-text-secondary)',transition:'color var(--ease-theme)'}}>
                The studio's first game, FARMED.COM, is a Sudoku farm roguelike where crops replace numbers and an elderly farming couple navigate a modern delivery app with the help of their grandson — and a drone named Blue.
              </p>
            </Reveal>
            {/* Studio facts */}
            <Reveal delay={100}>
              <div className="card" style={{padding:'var(--space-6)'}}>
                <h3 style={{fontFamily:'var(--font-label)',fontSize:'var(--text-base)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
                  📊 Studio Facts
                </h3>
                <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
                  {FACTS.map(f => (
                    <div key={f.label} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'var(--space-4)',borderBottom:'1px solid var(--color-border-subtle)',paddingBottom:'var(--space-3)',transition:'border-color var(--ease-theme)'}}>
                      <span style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--color-text-muted)',flexShrink:0,transition:'color var(--ease-theme)'}}>
                        {f.label}
                      </span>
                      <span style={{fontSize:'var(--text-xs)',color:'var(--color-text-secondary)',textAlign:'right',transition:'color var(--ease-theme)'}}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ASSETS */}
      <section style={{background:'var(--color-bg-surface-2)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'880px',margin:'0 auto'}}>
          <Reveal style={{marginBottom:'var(--space-8)'}}>
            <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>🖼 Visual Assets</div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-2xl)',fontWeight:700,color:'var(--color-text-primary)',transition:'color var(--ease-theme)'}}>
              Logos &amp; Key Art
            </h2>
          </Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'var(--space-6)'}}>
            {/* Logo */}
            <Reveal>
              <div className="card" style={{padding:'var(--space-6)',textAlign:'center'}}>
                <div style={{background:'var(--color-bg-surface-2)',borderRadius:'var(--radius-md)',padding:'var(--space-6)',marginBottom:'var(--space-4)',display:'flex',alignItems:'center',justifyContent:'center',transition:'background var(--ease-theme)'}}>
                  <img src={asset('logo.png')} alt="Sakura Moon Atelier Logo" loading="lazy"
                    style={{width:'120px',height:'120px',objectFit:'contain'}} />
                </div>
                <p style={{fontSize:'var(--text-sm)',fontWeight:600,color:'var(--color-text-primary)',marginBottom:'var(--space-1)',transition:'color var(--ease-theme)'}}>Studio Logo</p>
                <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>PNG · ~120KB</p>
                <a href={asset('logo.png')} download="sakura-moon-atelier-logo.png" className="btn btn-outline" style={{width:'100%',fontSize:'.65rem'}}>
                  ⬇ Download
                </a>
              </div>
            </Reveal>
            {/* Founder */}
            <Reveal delay={100}>
              <div className="card" style={{padding:'var(--space-6)',textAlign:'center'}}>
                <div style={{background:'var(--color-bg-surface-2)',borderRadius:'var(--radius-md)',overflow:'hidden',marginBottom:'var(--space-4)',height:'160px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <img src={asset('founder.png')} alt="Founder profile" loading="lazy"
                    style={{width:'100%',height:'100%',objectFit:'cover'}} />
                </div>
                <p style={{fontSize:'var(--text-sm)',fontWeight:600,color:'var(--color-text-primary)',marginBottom:'var(--space-1)',transition:'color var(--ease-theme)'}}>Founder Profile</p>
                <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>PNG · ~200KB</p>
                <a href={asset('founder.png')} download="sakura-moon-founder.png" className="btn btn-outline" style={{width:'100%',fontSize:'.65rem'}}>
                  ⬇ Download
                </a>
              </div>
            </Reveal>
            {/* Character Sheet */}
            <Reveal delay={200}>
              <div className="card" style={{padding:'var(--space-6)',textAlign:'center'}}>
                <div style={{background:'var(--color-bg-surface-2)',borderRadius:'var(--radius-md)',overflow:'hidden',marginBottom:'var(--space-4)',height:'160px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <img src={asset('founder-sheet.png')} alt="Character reference sheet" loading="lazy"
                    style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
                </div>
                <p style={{fontSize:'var(--text-sm)',fontWeight:600,color:'var(--color-text-primary)',marginBottom:'var(--space-1)',transition:'color var(--ease-theme)'}}>Character Sheet</p>
                <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>PNG · ~450KB</p>
                <a href={asset('founder-sheet.png')} download="sakura-moon-character-sheet.png" className="btn btn-outline" style={{width:'100%',fontSize:'.65rem'}}>
                  ⬇ Download
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT + USAGE */}
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-16) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'880px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-8)'}}>
          <Reveal>
            <div className="card" style={{padding:'var(--space-6)'}}>
              <h3 style={{fontFamily:'var(--font-label)',fontSize:'var(--text-base)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>
                📬 Press Contact
              </h3>
              <p style={{fontSize:'var(--text-sm)',color:'var(--color-text-secondary)',lineHeight:1.9,marginBottom:'var(--space-4)',transition:'color var(--ease-theme)'}}>
                For press inquiries, review copies, interviews, or any media-related requests, please reach out directly.
              </p>
              <p style={{fontSize:'var(--text-sm)',fontWeight:700,color:'var(--color-brand)',transition:'color var(--ease-theme)'}}>
                hello@sakuramoonatelier.com
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card" style={{padding:'var(--space-6)'}}>
              <h3 style={{fontFamily:'var(--font-label)',fontSize:'var(--text-base)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>
                ✅ Usage Guidelines
              </h3>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
                {[
                  'All assets may be used in editorial coverage of the studio and games.',
                  'Do not alter logos or remove studio branding.',
                  'Please credit Sakura Moon Atelier in your coverage.',
                  'Do not use assets in commercial projects without permission.',
                ].map((item,i) => (
                  <li key={i} style={{display:'flex',gap:'var(--space-2)',fontSize:'var(--text-xs)',color:'var(--color-text-tertiary)',lineHeight:1.75,transition:'color var(--ease-theme)'}}>
                    <span style={{color:'var(--color-brand)',flexShrink:0}}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    </>
  )
}
