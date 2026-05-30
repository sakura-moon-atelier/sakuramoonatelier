import { useTranslation } from 'react-i18next'
import { asset } from '../../utils/assets.js'
import Picture from '../ui/Picture.jsx'
import { STUDIO } from '../../data/studio.js'

const SOCIAL = [
  { key:'instagram', icon:'📷', label:'Instagram' },
  { key:'twitter',   icon:'𝕏',  label:'X / Twitter' },
  { key:'bluesky',   icon:'🦋', label:'Bluesky' },
  { key:'tiktok',    icon:'🎵', label:'TikTok' },
  { key:'discord',   icon:'💬', label:'Discord' },
  { key:'twitch',    icon:'🎮', label:'Twitch' },
  { key:'itchio',    icon:'🕹', label:'itch.io' },
  { key:'steam',     icon:'🎯', label:'Steam' },
]

export default function Footer({ setPage }) {
  const { t } = useTranslation()
  const go = (key) => { setPage(key); window.scrollTo({ top:0, behavior:'smooth' }) }

  return (
    <footer className="footer">
      <Picture src="logo.png" alt="Sakura Moon Atelier" width={48} height={48} loading="lazy"
        style={{ width:'48px', height:'48px', objectFit:'contain', borderRadius:'6px', opacity:.85, margin:'0 auto var(--space-3)' }} />
      <div style={{ fontFamily:'var(--font-label)', fontSize:'.9rem', fontWeight:700, color:'rgba(255,255,255,.88)', letterSpacing:'.06em', marginBottom:'.25rem' }}>
        {STUDIO.name}
      </div>
      <div style={{ fontStyle:'italic', fontSize:'.70rem', color:'rgba(228,154,170,.55)', marginBottom:'var(--space-6)' }}>
        "{t('footer.tagline')}"
      </div>

      {/* Nav */}
      <div style={{ display:'flex', justifyContent:'center', gap:'1.4rem', marginBottom:'var(--space-4)', flexWrap:'wrap' }}>
        {['home','games','about','contact'].map(k => (
          <button key={k} onClick={() => go(k)}
            style={{ fontSize:'.68rem', fontWeight:600, color:'rgba(255,255,255,.30)', background:'none', border:'none', letterSpacing:'.06em', cursor:'pointer', transition:'color .2s' }}
            onMouseEnter={e=>e.target.style.color='rgba(240,120,152,.75)'}
            onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.30)'}>
            {t(`footer.links.${k}`)}
          </button>
        ))}
        <button onClick={() => go('press-kit')}
          style={{ fontSize:'.68rem', fontWeight:600, color:'rgba(255,255,255,.30)', background:'none', border:'none', letterSpacing:'.06em', cursor:'pointer', transition:'color .2s' }}
          onMouseEnter={e=>e.target.style.color='rgba(240,120,152,.75)'}
          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.30)'}>
          {t('footer.links.press')}
        </button>
        <button onClick={() => go('privacy')}
          style={{ fontSize:'.68rem', fontWeight:600, color:'rgba(255,255,255,.30)', background:'none', border:'none', letterSpacing:'.06em', cursor:'pointer', transition:'color .2s' }}
          onMouseEnter={e=>e.target.style.color='rgba(240,120,152,.75)'}
          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.30)'}>
          {t('footer.links.privacy')}
        </button>
      </div>

      {/* Social icons */}
      <div style={{ display:'flex', justifyContent:'center', gap:'.45rem', flexWrap:'wrap', marginBottom:'var(--space-6)' }}>
        {SOCIAL.map(({ key, icon, label }) => (
          <a key={key} href={STUDIO.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ width:'32px', height:'32px', borderRadius:'50%', border:'1px solid rgba(255,255,255,.10)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.78rem', color:'rgba(255,255,255,.36)', transition:'all .2s', textDecoration:'none' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(240,120,152,.6)';e.currentTarget.style.color='rgba(240,120,152,.8)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.10)';e.currentTarget.style.color='rgba(255,255,255,.36)'}}>
            {icon}
          </a>
        ))}
      </div>

      <div style={{ fontSize:'.60rem', color:'rgba(255,255,255,.16)', borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:'.9rem', letterSpacing:'.04em' }}>
        {t('footer.copyright')}
      </div>
    </footer>
  )
}
