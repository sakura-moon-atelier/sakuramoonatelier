import { lazy } from 'react'

const Home        = lazy(() => import('./pages/Home.jsx'))
const Games       = lazy(() => import('./pages/Games.jsx'))
const GameDetail  = lazy(() => import('./pages/GameDetail.jsx'))
const About       = lazy(() => import('./pages/About.jsx'))
const Contact     = lazy(() => import('./pages/Contact.jsx'))
const PressKit    = lazy(() => import('./pages/PressKit.jsx'))
const News        = lazy(() => import('./pages/News.jsx'))
const NewsDetail  = lazy(() => import('./pages/NewsDetail.jsx'))
const Social      = lazy(() => import('./pages/Social.jsx'))
const Privacy     = lazy(() => import('./pages/Privacy.jsx'))
const Construction= lazy(() => import('./pages/special/Construction.jsx'))
const Maintenance = lazy(() => import('./pages/special/Maintenance.jsx'))
const Offline     = lazy(() => import('./pages/special/Offline.jsx'))
const NotFound    = lazy(() => import('./pages/special/NotFound.jsx'))
const Debug       = lazy(() => import('./pages/special/Debug.jsx'))

export const ROUTES = {
  home:          { component:Home,        title:'Sakura Moon Atelier — Cosy Indie Games',  showNav:true  },
  games:         { component:Games,       title:'Games — Sakura Moon Atelier',             showNav:true  },
  'game-detail': { component:GameDetail,  title:'Game — Sakura Moon Atelier',              showNav:true  },
  about:         { component:About,       title:'About — Sakura Moon Atelier',             showNav:true  },
  contact:       { component:Contact,     title:'Contact — Sakura Moon Atelier',           showNav:true  },
  'press-kit':   { component:PressKit,    title:'Press Kit — Sakura Moon Atelier',         showNav:true  },
  news:          { component:News,        title:'News — Sakura Moon Atelier',              showNav:true  },
  'news-detail': { component:NewsDetail,  title:'News — Sakura Moon Atelier',              showNav:true  },
  social:        { component:Social,      title:'Social — Sakura Moon Atelier',            showNav:true  },
  privacy:       { component:Privacy,     title:'Privacy Policy — Sakura Moon Atelier',   showNav:true  },
  construction:  { component:Construction,title:'Under Construction — Sakura Moon Atelier',showNav:false },
  maintenance:   { component:Maintenance, title:'Maintenance — Sakura Moon Atelier',       showNav:false },
  offline:       { component:Offline,     title:'Offline — Sakura Moon Atelier',           showNav:false },
  '404':         { component:NotFound,    title:'Page Not Found — Sakura Moon Atelier',   showNav:false },
  debug:         { component:Debug,       title:'Debug — Sakura Moon Atelier',             showNav:false },
}

export const NAV_ROUTES = ['home', 'games', 'news', 'about', 'contact']

export function getInitialPage() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return ROUTES[hash] ? hash : 'home'
}
