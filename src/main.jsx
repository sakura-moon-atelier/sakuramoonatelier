import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/config.js'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'

const root = document.getElementById('root')
if (!root) throw new Error('[SMA] Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('[SW] Registered:', reg.scope))
      .catch(err => console.warn('[SW] Registration failed:', err))
  })
}
