# Sakura Moon Atelier — Studio Website

> "Cosy games made with care"

Studio website for **Sakura Moon Atelier**, built with React + Vite + Tailwind CSS.
Deployed automatically to GitHub Pages on every push to `main`.

---

## Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI components |
| Vite | 5 | Build tool and dev server |
| Tailwind CSS | 3 | Utility-first styling |
| GitHub Actions | — | Automatic deployment |
| GitHub Pages | — | Hosting |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Opens at `http://localhost:5173`

### 3. Build for production

```bash
npm run build
```

Output goes to `dist/` folder.

---

## Deploying to GitHub Pages

### First-time setup

1. **Create a GitHub repository** named `sakura-moon-atelier`
   (or whatever name you prefer — just update `vite.config.js` to match)

2. **Update `vite.config.js`** — change the `base` to your repo name:
   ```js
   base: '/your-repo-name/',
   ```
   If deploying to `username.github.io` (user/org site), set:
   ```js
   base: '/',
   ```

3. **Push your code** to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sakura-moon-atelier.git
   git push -u origin main
   ```

4. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Source: **GitHub Actions**
   - Save

5. **GitHub Actions** will automatically build and deploy on every push to `main`.
   Your site will be live at:
   `https://YOUR_USERNAME.github.io/sakura-moon-atelier/`

### After first deploy — every future update

```bash
git add .
git commit -m "your update message"
git push
```

That is it. GitHub Actions handles the rest. Usually live within 2 minutes.

---

## Project Structure

```
sakura-moon-atelier/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── src/
│   ├── components/
│   │   ├── Nav.jsx             # Sticky navigation (all pages)
│   │   ├── Footer.jsx          # Footer (all pages)
│   │   ├── Hero.jsx            # Reusable page hero
│   │   └── Reveal.jsx          # Scroll reveal wrapper
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Games.jsx           # Games page
│   │   ├── About.jsx           # About page
│   │   └── Contact.jsx         # Contact page
│   ├── App.jsx                 # Main app + routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # HTML shell
├── package.json
├── vite.config.js              # ← UPDATE base path here
├── tailwind.config.js          # Custom Sakura Moon palette
└── postcss.config.js
```

---

## Customisation

### Colours
All custom colours are defined in `tailwind.config.js` under `theme.extend.colors`.
The palette is named after the studio identity:
- `cream`, `blush` — backgrounds
- `petal`, `petal-dark` — sakura pink accents
- `gold`, `gold-dark` — moon gold
- `navy` — deep navy (headings, footer)
- `ink`, `muted` — body and secondary text

### Adding a new page
1. Create `src/pages/YourPage.jsx`
2. Import and add it to the `PAGES` object in `src/App.jsx`
3. Add the link to `LINKS` in `src/components/Nav.jsx` and `Footer.jsx`

### Contact form
The contact form currently shows a thank-you state without sending an email.
To enable real email delivery:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — you will get an endpoint like `https://formspree.io/f/xxxxxxxx`
3. In `Contact.jsx`, update the form element:
   ```jsx
   <form action="https://formspree.io/f/xxxxxxxx" method="POST">
   ```
4. Remove the `onSubmit` handler — Formspree handles everything

### Logo / favicon
The favicon is currently a cat emoji. To use your actual logo:
1. Export your logo as a 32×32 PNG
2. Save as `public/favicon.png`
3. Update `index.html`:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

---

## Adding FARMED.COM Game Assets

Once you have game screenshots or artwork:
1. Add images to `public/images/`
2. Reference them in components as `/images/your-image.png`
3. Vite copies the `public/` folder to `dist/` automatically

---

## Colour Reference

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FAF7F2` | Page background |
| `blush` | `#FFF0F5` | Section alt background |
| `petal` | `#F4A7B9` | Sakura pink — buttons, accents |
| `gold` | `#E8B86D` | Moon gold — badges, highlights |
| `navy` | `#1A1F4B` | Headings, footer, dark sections |
| `ink` | `#3D3450` | Body text |
| `muted` | `#8A7A9B` | Secondary text, labels |

---

*Sakura Moon Atelier · Made with 🌸*
