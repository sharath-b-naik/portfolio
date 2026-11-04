# Sharath B Naik — Portfolio

Scroll-driven portfolio built with **TypeScript + Vite**, **GSAP** (ScrollTrigger) and **Lenis**.
Every section lives on one fixed stage; scrolling drives a single master timeline, so the
screen *transforms* between scenes instead of scrolling past them.

## Develop

```bash
npm install
npm run dev
```

## Edit content

All text, apps and links live in [`src/data.ts`](src/data.ts). Static copy (hero, about,
contact) is in [`index.html`](index.html). Your photo lives in `public/img/` (portrait + nav avatar) and `public/favicon*.png`. Drop real app icons into `public/apps/` and set
`icon: 'apps/<file>.webp'` on an app to replace its monogram.

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
(Repo → Settings → Pages → Source: **GitHub Actions**). The site is served at
`https://sharath-b-naik.github.io/portfolio/`.

Users with *reduced motion* enabled get a calm, normally scrolling page.
