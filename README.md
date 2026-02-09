# Gerson's Web3 Portfolio

Single-page portfolio showcasing Web3 development, open source contributions, fellowships, and speaking engagements. Deployed to GitHub Pages at [gersonloaiza.com](https://gersonloaiza.com).

## Tech Stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **Tailwind CSS 4**
- **GSAP + Framer Motion** (scroll animations, hover interactions)
- **Lenis** (smooth scrolling)

## Getting Started

```bash
pnpm install
pnpm run dev       # http://localhost:3000
```

## Scripts

```bash
pnpm run dev       # Dev server
pnpm run build     # Static export to /out
pnpm run lint      # ESLint
pnpm run deploy    # Build + .nojekyll for GitHub Pages
```

## Updating Content

Edit JSON files in `data/`:

| File | Content |
|------|---------|
| `experience.json` | Work history |
| `projects.json` | Projects (set `"featured": true` to highlight) |
| `oss.json` | Open source contributions |
| `fellowships.json` | Fellowship programs |
| `talks.json` | Speaking engagements |

Social links and contact info are in `lib/utils.ts`.

## Deployment

Pushes to `main` auto-deploy via GitHub Actions. The site is statically exported and served on GitHub Pages.

## License

MIT
