# Toaster Magic — Documentation Website

The source for the [Toaster Magic](https://github.com/devrabiul/toaster-magic) documentation site,
live at **https://devrabiul.github.io/toaster-magic/**.

> This is the `docs` branch. It contains **only** the documentation website and is completely
> independent from the npm package (which lives on `main`). The site consumes the published
> `toaster-magic` package from npm for its live demos.

## Tech stack

- **React 18** + **TypeScript**
- **Vite 5** (build + dev server)
- **React Router 6** (client-side routing with a GitHub Pages SPA fallback)
- **prism-react-renderer** (syntax highlighting)
- **react-helmet-async** (per-page SEO)

## Features

- Responsive, mobile-friendly layout with a sticky sidebar and table of contents
- Light / dark mode that follows the OS and persists the user's choice
- Client-side search (⌘K / Ctrl+K)
- Copy-to-clipboard code blocks with syntax highlighting
- Interactive live demos powered by the real `toaster-magic` package
- SEO: per-page meta, Open Graph, Twitter cards, canonical URLs, sitemap, robots, manifest
- Accessible: semantic HTML, skip link, focus states, keyboard navigation

## Local development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Deployment

Every push to the `docs` branch triggers `.github/workflows/deploy.yml`, which builds the site and
deploys it to GitHub Pages via the official Pages actions. No manual steps required.

The Vite `base` is set to `/toaster-magic/` to match the GitHub Pages project URL. Deep links and
route refreshes work through a `404.html` SPA fallback plus a small redirect script in `index.html`.

## Project structure

```
├── public/            # static assets (404.html, favicon, manifest, .nojekyll)
├── src/
│   ├── components/    # reusable UI (Navbar, Sidebar, CodeBlock, DocPage, …)
│   ├── data/          # routes (nav/search/sitemap) + API reference tables
│   ├── hooks/         # theme, active-heading, dark-mode observers
│   ├── pages/         # one component per documentation page
│   └── styles/        # design tokens, layout, component styles
├── index.html
└── vite.config.ts
```

## License

MIT © [Muhammad Rabiul](https://github.com/devrabiul)
