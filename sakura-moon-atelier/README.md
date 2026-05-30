# 🌸 Sakura Moon Atelier — Studio Website

React + Vite website for Sakura Moon Atelier indie game studio.
Built with a two-layer design token system, i18n (EN/PT), hash routing, and a repository pattern for data that works with both local static files and a remote API.

---

## Table of Contents

1. [Quick Start (local dev)](#1-quick-start)
2. [Deploy to GitHub Pages](#2-deploy-to-github-pages)
3. [Custom Domain with Cloudflare](#3-custom-domain-with-cloudflare)
4. [Environment Variables](#4-environment-variables)
5. [GitHub Secrets & Variables](#5-github-secrets--variables)
6. [Updating Content](#6-updating-content)
   - [News & Devlog](#news--devlog)
   - [Social Feed](#social-feed)
   - [Games](#games)
   - [Studio Info & Social Links](#studio-info--social-links)
7. [Design Tokens — Changing Colours](#7-design-tokens--changing-colours)
8. [Typography — Changing Fonts & Sizes](#8-typography--changing-fonts--sizes)
9. [Adding a New Language](#9-adding-a-new-language)
10. [Replacing Images](#10-replacing-images)
11. [Site Mode — Maintenance & Construction](#11-site-mode--maintenance--construction)
12. [Architecture Overview](#12-architecture-overview)
13. [Production Checklist](#13-production-checklist)

---

## 1. Quick Start

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/sakura-moon-atelier.git
cd sakura-moon-atelier

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Edit .env.local with your values (see Section 4)

# Start local dev server
npm run dev
# → http://localhost:5173

# Access the debug navigator (all pages)
# → http://localhost:5173/#debug

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 2. Deploy to GitHub Pages

### Step 1 — Create your GitHub repository

Create a new repo at github.com. Name it anything you like (e.g. `sakura-moon-atelier`).

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2 — Enable GitHub Pages with GitHub Actions

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Click Save

That's it. The workflow at `.github/workflows/deploy.yml` handles everything.

### Step 3 — Trigger your first deploy

```bash
git push origin main
```

Go to **Actions** tab on GitHub to watch the build. It takes about 60–90 seconds. When it finishes, your site is live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

> **Note:** If you set a custom domain (Section 3), the site will be at your domain instead.

### What the workflow does

Every push to `main`:
1. Installs Node 20 + npm dependencies
2. Runs `npm run build` with your environment secrets injected
3. Deploys the `dist/` folder to GitHub Pages using the official Actions

---

## 3. Custom Domain with Cloudflare

You have a domain registered on Cloudflare. Here is the exact setup.

### Step 1 — Update the CNAME file

Open `public/CNAME` and replace the contents with your actual domain:

```
sakuramoonatelier.com
```

> This file tells GitHub Pages which domain to serve on. **Without it, GitHub resets your custom domain on every deploy.** It lives in `public/` so it's copied to `dist/` automatically.

Commit and push this change.

### Step 2 — Add DNS records in Cloudflare

Log in to Cloudflare → your domain → **DNS → Records**.

**For the apex domain (`yourdomain.com` without www):**

Add these 4 A records:

| Type | Name | Content          | Proxy |
|------|------|------------------|-------|
| A    | @    | 185.199.108.153  | DNS only (grey) |
| A    | @    | 185.199.109.153  | DNS only (grey) |
| A    | @    | 185.199.110.153  | DNS only (grey) |
| A    | @    | 185.199.111.153  | DNS only (grey) |

**For `www`:**

| Type  | Name | Content                        | Proxy |
|-------|------|--------------------------------|-------|
| CNAME | www  | YOUR_USERNAME.github.io        | DNS only (grey) |

> **Important:** Set proxy status to **DNS only (grey cloud)** initially. The orange cloud (Cloudflare proxy) can prevent GitHub Pages from issuing its HTTPS certificate. Once HTTPS is confirmed working (24–48 hours), you can switch to orange if you want Cloudflare's CDN/protection.

> **If you use orange cloud:** Set SSL/TLS to **Full** (not Flexible, not Full Strict) in Cloudflare → SSL/TLS → Overview.

### Step 3 — Add the custom domain in GitHub

1. Go to your repo → **Settings → Pages**
2. Under **Custom domain**, enter: `sakuramoonatelier.com`
3. Click **Save**
4. Wait for the DNS check (green checkmark) — can take a few minutes to 48 hours
5. Once DNS resolves, tick **Enforce HTTPS**

### Step 4 — Update your site URL env var

In GitHub repo → **Settings → Secrets and variables → Actions → Variables**:

```
VITE_SITE_URL = https://sakuramoonatelier.com
```

Trigger a new deploy:
```bash
git commit --allow-empty -m "chore: trigger deploy with custom domain"
git push origin main
```

### Verify it works

```
https://sakuramoonatelier.com        → loads the site
https://www.sakuramoonatelier.com    → redirects to apex (GitHub handles this)
http://sakuramoonatelier.com         → redirects to https (once Enforce HTTPS is on)
```

---

## 4. Environment Variables

Copy `.env.example` to `.env.local`. This file is **gitignored** — never commit it.

```bash
cp .env.example .env.local
```

Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SITE_URL` | Yes | Your full domain, e.g. `https://sakuramoonatelier.com` |
| `VITE_FORMSPREE_ID` | For contact form | 8-char ID from formspree.io |
| `VITE_MAILCHIMP_URL` | For newsletter | Action URL from Mailchimp embed form |
| `VITE_SENTRY_DSN` | For error monitoring | DSN from sentry.io |
| `VITE_SOCIAL_*` | No | Social media URLs |
| `VITE_PRESS_KIT_URL` | No | URL to your press kit zip |
| `VITE_STEAM_WISHLIST` | No | Steam wishlist page URL |

All variables have working defaults. The site runs without any `.env.local` — you just won't have the contact form, newsletter, or error tracking wired up.

---

## 5. GitHub Secrets & Variables

For production deploys, store sensitive values as **Secrets** and public values as **Variables**.

**Go to:** GitHub repo → Settings → Secrets and variables → Actions

### Variables (public, visible in logs)
```
VITE_SITE_URL
VITE_GA_ID
VITE_SOCIAL_INSTAGRAM
VITE_SOCIAL_TWITTER
VITE_SOCIAL_BLUESKY
VITE_SOCIAL_TIKTOK
VITE_SOCIAL_DISCORD
VITE_SOCIAL_TWITCH
VITE_SOCIAL_ITCHIO
VITE_SOCIAL_STEAM
VITE_PRESS_KIT_URL
VITE_STEAM_WISHLIST
```

### Secrets (private, never shown in logs)
```
VITE_FORMSPREE_ID
VITE_MAILCHIMP_URL
VITE_SENTRY_DSN
```

---

## 6. Updating Content

### News & Devlog

**File:** `src/data/news.js`

Add a new object to the **top** of the `NEWS` array (newest first):

```js
export const NEWS = [
  {
    id:       'my-new-post',           // unique slug, used in URLs
    date:     '2025-06-15',            // YYYY-MM-DD
    category: 'devlog',               // 'devlog' | 'update' | 'announcement' | 'art'
    emoji:    '🌾',                    // shown as placeholder image
    title:    'My Post Title',
    excerpt:  'One or two sentences for the card preview.',
    body: `
Full post content here. Supports **bold text** and paragraph breaks.

**Section Heading**

More content here.
    `,
    tags: ['FARMED.COM', 'devlog'],    // used for filtering and related content
  },
  // ... existing posts below
]
```

That's it. The News page, News Detail page, Home page preview, and Game Detail related news all pick it up automatically.

---

### Social Feed

**File:** `src/data/socialFeed.js`

Add a new object to the **top** of the `SOCIAL_POSTS` array:

```js
export const SOCIAL_POSTS = [
  {
    id:             'post-007',
    platform:       'instagram',        // see SOCIAL_PLATFORMS for valid keys
    date:           '2025-06-15',
    emoji:          '🌸',
    text:           'Your post text here. Hashtags work.',
    imageEmoji:     '🌾',              // shown if no real image
    imageGradient:  'linear-gradient(135deg,#0C1E16,#0E1A2E)',  // null = placeholder
    likes:          0,
    url:            'https://instagram.com/p/YOUR_POST_ID',  // '#' = no link
    relatedGame:    'farmed-com',       // optional — links to game detail
  },
  // ... existing posts below
]
```

---

### Games

**File:** `src/data/games.js`

Add a new object to the `GAMES` array. The minimum required fields are:

```js
export const GAMES = [
  // existing FARMED.COM entry...

  {
    id:       'my-next-game',
    slug:     'my-next-game',          // used in URLs — no spaces, lowercase
    title:    'My Next Game',
    subtitle: 'A cosy puzzle adventure',
    status:   'announced',             // 'announced' | 'development' | 'released'
    releaseYear: null,                 // or a year: 2026
    platforms: ['Steam', 'itch.io'],
    storeLinks: { steam: null, itchio: null },  // null = announced, not live
    pressKit:  null,
    relatedNewsTag:   'My Next Game',  // must match a tag in news.js
    relatedSocialTag: 'mynextgame',
    grid:        [],                   // empty = no preview grid shown
    seasons:     [],
    screenshots: [],                   // add when you have art
    trailers:    [],
    features:    [],
  },
]
```

The Games list page and all related sections update automatically.

---

### Studio Info & Social Links

**File:** `src/config/site.js`

This is the single source of truth for everything about the studio:

```js
export const SITE = {
  name:    'Sakura Moon Atelier',
  tagline: 'Cosy games made with care',
  // ...
  social: {
    instagram: 'https://instagram.com/YOUR_HANDLE',
    twitter:   'https://twitter.com/YOUR_HANDLE',
    // etc.
  },
  pressKit:      'https://drive.google.com/...',  // your press kit URL
  steamWishlist: 'https://store.steampowered.com/app/...',
}
```

Or set these via environment variables (see Section 4) — env vars take priority over the defaults in site.js.

---

## 7. Design Tokens — Changing Colours

**File:** `src/styles/tokens.css`

The system has two layers. **Never change primitive tokens** directly in components — only update semantic tokens.

### Changing the brand colour

```css
:root {
  /* Change just this one token to update the brand colour everywhere */
  --color-brand:       #C8456A;   /* light theme */
  --color-brand-hover: #A83058;
}

[data-theme='dark'] {
  --color-brand:       #F07898;   /* dark theme override */
  --color-brand-hover: #D05878;
}
```

### Changing the background colour

```css
:root {
  --color-bg-page:      #FEF6F9;   /* main page background */
  --color-bg-surface:   #FFFCFE;   /* card/panel background */
  --color-bg-surface-2: #FFF0F5;   /* slightly tinted sections */
  --color-bg-surface-3: #FFE4EE;   /* deeper tinted sections */
}
```

### Adding a new theme

Add a new data-theme block:

```css
[data-theme='autumn'] {
  --color-bg-page:    #FEF8EC;
  --color-brand:      #C86020;
  /* override only the tokens that change */
}
```

Then in `src/contexts/ThemeContext.jsx`, add `'autumn'` to the cycle logic.

---

## 8. Typography — Changing Fonts & Sizes

### Changing fonts

**Step 1:** Update the Google Fonts import in `src/styles/global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR+FONT&display=swap');
```

**Step 2:** Update the font tokens in `src/styles/tokens.css`:
```css
:root {
  --font-display: 'Your Display Font', serif;
  --font-body:    'Your Body Font', sans-serif;
  --font-label:   'Your Label Font', sans-serif;
}
```

### Changing font sizes

All sizes are in `src/styles/tokens.css`:

```css
:root {
  --text-xs:   0.75rem;   /* tags, labels, tiny UI — 12px */
  --text-sm:   0.875rem;  /* secondary body — 14px */
  --text-base: 1rem;      /* main body — 16px */
  --text-lg:   1.125rem;  /* large body — 18px */
  --text-xl:   1.375rem;  /* subheadings */
  --text-2xl:  1.75rem;   /* section headings */
  --text-3xl:  2.25rem;   /* page titles */
  --text-4xl:  3rem;      /* hero titles */
}
```

---

## 9. Adding a New Language

**Step 1:** Create a new translation file in `src/i18n/`:

```bash
cp src/i18n/en.json src/i18n/fr.json
# Edit fr.json with French translations
```

**Step 2:** Register it in `src/i18n/config.js`:

```js
import fr from './fr.json'

i18n.init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    fr: { translation: fr },   // ← add this
  },
  supportedLngs: ['en', 'pt', 'fr'],  // ← add here too
})
```

**Step 3:** Add the button to `src/i18n/config.js`:

```js
export const SUPPORTED_LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'fr', label: 'FR', name: 'Français' },  // ← add this
]
```

The language switcher in the nav updates automatically.

---

## 10. Replacing Images

All images live in `public/`. The site serves both `.png` and `.webp` versions — the browser picks `.webp` automatically if supported.

**When you add a new image:**

1. Put the `.png` in `public/`
2. Convert to WebP: `cwebp -q 82 yourimage.png -o yourimage.webp`
3. Reference it in code with the `asset()` utility: `asset('yourimage.png')`

**Replacing the hero images:**
```
public/hero-light.png + hero-light.webp   ← light theme hero
public/hero-dark.png  + hero-dark.webp    ← dark theme hero
```

**Replacing the logo:**
```
public/logo.png + logo.webp
```

**Replacing founder/character images:**
```
public/founder.png + founder.webp
public/founder-sheet.png + founder-sheet.webp
```

After replacing, run `npm run build` locally to verify everything renders correctly.

---

## 11. Site Mode — Maintenance & Construction

**File:** `src/config/siteMode.js`

### Put the whole site in maintenance

```js
export const SITE_MODE = 'maintenance'  // 'live' | 'maintenance' | 'construction'
```

Push this change and the entire site shows the Maintenance page. Users can still reach `#privacy` and `#debug`.

### Put a single page under construction

```js
export const SITE_MODE = 'live'   // rest of site works normally

export const ROUTE_OVERRIDES = {
  'games':   'construction',   // only games page is under construction
  'contact': 'maintenance',    // only contact shows maintenance
}
```

Revert by removing the entries or commenting them out.

---

## 12. Architecture Overview

```
src/
  config/
    site.js          ← all website constants (name, URL, social, email)
    integrations.js  ← all third-party IDs (Formspree, Mailchimp, Sentry)
    repositories.js  ← DATA_SOURCE: 'static' | 'remote'
    siteMode.js      ← SITE_MODE: 'live' | 'maintenance' | 'construction'

  repositories/
    interfaces/      ← base classes (throw NotImplementedError)
    static/          ← read from src/data/ files (current)
    remote/          ← call your API (fill in when ready)
    RepositoryFactory.js  ← picks implementation based on config

  contexts/
    ThemeContext.jsx      ← dark/light, persisted to localStorage
    RepositoryContext.jsx ← injects repositories into component tree

  hooks/
    useNews.js       ← debounced, AbortController, works with both repos
    useSocialFeed.js
    useGames.js / useGame.js

  data/              ← static content (edit these to update the site)
    news.js
    socialFeed.js
    games.js
    studio.js        ← imports from config/site.js, re-exports STUDIO

  styles/
    tokens.css       ← design token system (primitive + semantic layers)
    global.css       ← all component CSS classes

  i18n/
    en.json          ← English strings
    pt.json          ← Portuguese strings
```

### Switching to a remote API

1. Set `DATA_SOURCE = 'remote'` in `src/config/repositories.js`
   — or set `VITE_DATA_SOURCE=remote` in your `.env.local`
2. Implement the `TODO` methods in `src/repositories/remote/`
   (templates with comments are already there)
3. Set `VITE_API_URL=https://your-api.com` in your env

You can migrate one resource at a time using `RESOURCE_SOURCE`:
```js
export const RESOURCE_SOURCE = {
  news: 'remote',   // news from API
  // games and social still read from local files
}
```

---

## 13. Production Checklist

Before announcing the site publicly:

### Required
- [ ] `public/CNAME` contains your real domain
- [ ] `VITE_SITE_URL` is set in GitHub Variables
- [ ] Custom domain is configured and HTTPS is enforced (Section 3)
- [ ] `VITE_FORMSPREE_ID` is set — contact form actually sends emails
- [ ] `VITE_MAILCHIMP_URL` is set — newsletter actually works
- [ ] All `src/data/studio.js` social handles are real URLs (not placeholders)
- [ ] `SITE_MODE = 'live'` in `src/config/siteMode.js`

### Strongly recommended
- [ ] `VITE_SENTRY_DSN` is set — you'll know when something breaks
- [ ] Replace hero images with final Banana AI renders
- [ ] Add real FARMED.COM screenshots to `src/data/games.js`
- [ ] Add real YouTube trailer ID when trailer is ready
- [ ] Set `STUDIO.pressKit` URL when press kit zip is ready

### Nice to have
- [ ] `VITE_GA_ID` is set for traffic analytics
- [ ] `VITE_STEAM_WISHLIST` URL set when Steam page is live
- [ ] OpenGraph images tested — paste your URL into https://cards-dev.twitter.com/validator

---

*Made with 🌸 in Lisbon · Sakura Moon Atelier*
