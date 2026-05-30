import { createContext, useContext, useState, useEffect } from 'react'
import { cssUrl } from '../utils/assets.js'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('sma-theme') === 'dark' } catch { return false }
  })

  const toggleTheme = () =>
    setDark(prev => {
      const next = !prev
      try { localStorage.setItem('sma-theme', next ? 'dark' : 'light') } catch {}
      return next
    })

  useEffect(() => {
    const root = document.documentElement
    // Set data-theme for CSS semantic token overrides
    root.setAttribute('data-theme', dark ? 'dark' : 'light')
    // Set hero CSS vars from JS so BASE_URL is applied correctly (fixes local + GitHub Pages)
    root.style.setProperty('--hero-bg-image', cssUrl(dark ? 'hero-dark.png' : 'hero-light.png'))
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
