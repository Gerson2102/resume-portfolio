# CLAUDE.md

## Overview

Gerson's Web3 portfolio — single-page Next.js 16 static site deployed to GitHub Pages at `gersonloaiza.com`. Dark mode only, GSAP/Framer Motion animations.

## Commands

```bash
pnpm run dev      # Dev server (Turbopack)
pnpm run build    # Static export to /out
pnpm run lint     # ESLint (eslint ., not next lint)
pnpm run deploy   # Build + .nojekyll for GitHub Pages
```

## Stack

Next.js 16, React 19, Tailwind CSS 4.1.18 (CSS-first, no tailwind.config.js), GSAP 3.13, Framer Motion 11.3, Lenis 1.3, SplitType 0.3, TypeScript 5.5. Static export with unoptimized images for GitHub Pages.

## Structure

```
app/layout.tsx       # Root layout: ThemeProvider > SmoothScroll > CustomCursor > Header/Footer
app/page.tsx         # Single page: Hero > Fellowships > Experience > OpenSource > Speaking > Projects > Contact
app/globals.css      # Tailwind @theme (colors, fonts, keyframes) + 35 @utility definitions
components/layout/   # header.tsx (client), footer.tsx (server)
components/sections/ # 7 client components — each imports own JSON data directly
components/ui/       # smooth-scroll, scroll-progress, custom-cursor, image, lightbox, theme-provider, scroll-reveal (unused)
data/*.json          # Content: stats, fellowships(4), experience(1), oss(6), projects(4), talks(1), hackathons(4, unused)
lib/utils.ts         # cn(), formatDate(), SOCIAL_LINKS, CONTACT_INFO, RESUME_URL
```

## Content Updates

Edit JSON in `data/`. Use `"featured": true` to control visibility. Social links and contact info live in `lib/utils.ts`. SEO metadata in `app/layout.tsx`.

## Styling

- **Tailwind v4 CSS-first**: all config in `globals.css` via `@theme` and `@utility` — no `tailwind.config.js`
- **Dark mode**: `@custom-variant dark (&:is(.dark *))`, forced via `forcedTheme="dark"`
- **Colors**: primary (sky blue), accent (orange), neutral (gray) — all 50-950 scales
- **Key utilities**: `glass-card`, `glass-card-premium`, `gradient-text`, `hover-lift`, `btn-primary`, `badge-primary`, `section-padding`, `container-max`
- **v4 renames**: `backdrop-blur-sm`→`xs`, `shadow-sm`→`xs`, `bg-gradient-to-*`→`bg-linear-to-*`, `outline-none`→`outline-hidden`

## Animation Rules

1. Never `clearProps: 'all'` — causes blinking
2. Always check `prefers-reduced-motion` before animating
3. Always cleanup: `gsap.context()` + `ctx.revert()` in useEffect return
4. Hero uses `gsap.timeline()` with typing effect + sequential reveals
5. All other sections use `gsap.fromTo()` + ScrollTrigger (`start: 'top 80%'`, `toggleActions: 'play none none none'`)
6. SplitType title pattern: stagger 0.03, duration 0.6, ease `power2.out`
7. Framer Motion for hover states only (scale, y, boxShadow)

## Deployment

Static export (`output: 'export'`), images unoptimized, CI via `.github/workflows/deploy.yml` (Node 20, pnpm 9). CNAME at project root.

## Binary Files

**Never read/write images with text-based tools** — they corrupt silently. Use `cp`/`mv`/`git checkout` only. Verify with `file <path>`.

## Known Issues

- `og-image.png` and favicon files missing
- `robots.txt`/`sitemap.xml` have placeholder URLs
- `hackathons.json` and `scroll-reveal.tsx` exist but are unused
- Empty image dirs: 2024/hackathons, 2025/{hackathons,oss,talks}
