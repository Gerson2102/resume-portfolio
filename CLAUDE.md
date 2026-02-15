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

Next.js 16, React 19, Tailwind CSS 4.1.18 (CSS-first, no tailwind.config.js), GSAP 3.13, Framer Motion 11.3, Lenis 1.3, SplitType 0.3, TypeScript 5.5, lucide-react 0.408, next-themes 0.3. PostCSS with @tailwindcss/postcss (no autoprefixer). ESLint extends next/core-web-vitals. Playwright 1.58 for testing. CI: Node 20, pnpm 9.

## Structure

```
app/
  layout.tsx           # Root layout: html(dark) > ThemeProvider > SmoothScroll > CustomCursor > Header/main/Footer
  page.tsx             # Single page: Hero > Fellowships > Experience > OpenSource > Speaking > Projects > Contact
  not-found.tsx        # 404 page
  globals.css          # Tailwind @theme (colors, fonts, keyframes) + 35 @utility definitions

components/layout/
  header.tsx           # Client — Fixed nav, scroll detection (>20px → glass bg), mobile menu, smooth scroll links
  footer.tsx           # Server — 3-col grid (brand, quick links, achievements) + social bar with custom XIcon

components/sections/   # 7 client components — each imports own JSON data directly
  hero.tsx             # Typing effect (name→subtitle→description state machine), bg image, 4 metrics cards, social links
  fellowships.tsx      # Vertical timeline, scrubbed line draw (scrub:0.5), node animations, expandable accordion cards
  experience.tsx       # Single entry tabbed UI (Overview|Responsibilities|Achievements|Tech), spring tab indicator
  open-source.tsx      # 3-card desktop / 1-card mobile carousel, swipe/keyboard nav, CountUp metrics component
  speaking.tsx         # Talk card (2-col), Gallery lightbox, testimonials, key takeaways
  projects.tsx         # Featured (2-col) + Additional (3-col) grids with cover images and tech badges
  contact.tsx          # 3 hardcoded opportunity cards (green/blue/purple), contact details, social links

components/ui/
  smooth-scroll.tsx    # Lenis (duration:1.2, touchMultiplier:2), exposes window.lenis, respects reduced-motion
  scroll-progress.tsx  # Pure JS scroll %, gradient bar (blue→purple→pink), z-[60]
  custom-cursor.tsx    # RAF dot(8px,0.35)+ring(32px,0.15), 1.5x hover scale, mix-blend-difference, desktop only (>1024px)
  image.tsx            # OptimizedImage (Next/Image + skeleton + error fallback), ImagePlaceholder
  lightbox.tsx         # Portal modal (Esc/Arrows) + Gallery grid (1-4 cols), keyboard accessible
  theme-provider.tsx   # Thin next-themes wrapper, forcedTheme="dark"
  scroll-reveal.tsx    # 6 GSAP presets — UNUSED

data/*.json            # stats, fellowships(4), experience(1), oss(6), projects(4), talks(1), hackathons(4 UNUSED)
lib/utils.ts           # cn(), formatDate(), formatDateRange(), slugify(), truncate(), sortByDate(), groupByYear()
                       # SOCIAL_LINKS {github,twitter,linkedin,telegram}, CONTACT_INFO {telegram,email,location}, RESUME_URL
```

## Content Updates

Edit JSON in `data/`. Use `"featured": true` to control visibility. Social links and contact info in `lib/utils.ts`. SEO metadata in `app/layout.tsx`.

### JSON Schemas

- **fellowships**: `{ id, organization, program, cohort, duration, stipend?, description, achievements[]?, focus[]?, logo, images[]?, links{}, status, featured, significance? }`
- **experience**: `{ id, company, role, team?, duration, period, type, location, description, responsibilities[], achievements[], technologies[], images[], links{}, featured }`
- **oss**: `{ id, repository, title, type, impact, description, tech[], links{pr,onlydust}, reward, status, date(YYYY-MM), maintainerFeedback?, featured }`
- **projects**: `{ id, title, summary, description, outcomes[], stack[], links{github?,demo?}, coverImage, gallery[], featured, year }`
- **talks**: `{ id, event, title, subtitle?, date(YYYY-MM), location, type, duration, abstract, keyTakeaways[]?, topics[]?, images[]?, links{}, testimonials[]?, featured }`

## Layout

- **Fonts**: Inter (sans), JetBrains Mono (mono via `--font-jetbrains-mono`)
- **HTML**: `<html lang="en" class="dark" suppressHydrationWarning>`
- **ThemeProvider**: `forcedTheme="dark"`, `enableSystem={false}`, `attribute="class"`
- **Head**: favicon.svg, manifest.json, JSON-LD ProfilePage schema, wallet extension conflict script
- **Metadata**: OG website + Twitter summary_large_image (@Glv_exe02), robots index+follow

## Styling

- **Tailwind v4 CSS-first**: `@theme` (colors, fonts, aspect ratios, keyframes) + `@utility` — no tailwind.config.js
- **Dark mode**: `@custom-variant dark (&:is(.dark *))`, forced via ThemeProvider
- **Colors**: primary (sky blue #0ea5e9), accent (orange), neutral (gray) — 50-950 scales
- **v4 renames**: `backdrop-blur-sm`→`xs`, `shadow-sm`→`xs`, `bg-gradient-to-*`→`bg-linear-to-*`, `outline-none`→`outline-hidden`
- **Key utilities**: `glass-card`, `glass-card-premium`, `gradient-text`, `hover-lift`, `btn-primary`, `btn-secondary`, `badge-primary`, `badge-accent`, `badge-neutral`, `section-padding` (px-6 py-16), `container-max` (max-w-7xl), `focus-ring`, `animate-fade-in`, `animate-blink-cursor`
- **Keyframes**: fadeIn, slideUp, scaleIn (in @theme); gradientShift, shimmer, float, pulse-glow, node-pulse, blink-cursor (in @layer base)

## Animation Rules

1. Never `clearProps: 'all'` — causes blinking
2. Always check `prefers-reduced-motion` before animating
3. Always cleanup: `gsap.context()` + `ctx.revert()` in useEffect return
4. Hero: character-by-character typing via React state + setTimeout, then `gsap.timeline()` for post-typing reveals (metrics stagger 0.12 back.out(1.2), social stagger 0.08)
5. All other sections: `gsap.fromTo()` + ScrollTrigger (`start: 'top 80%'`, `toggleActions: 'play none none none'`)
6. SplitType titles in all 6 non-hero sections: `types: 'chars'`, stagger 0.03, duration 0.6, ease `power2.out`
7. Framer Motion for hover states only (scale, y, boxShadow, rotate) and AnimatePresence transitions
8. Fellowships line: `scrub: 0.5`, scaleY 0→1. Experience tabs: spring (stiffness 400, damping 30). OSS carousel: directional slide variants with `AnimatePresence mode="popLayout"`

## Path Aliases

`@/*` → `./*`, plus explicit `@/components/*`, `@/app/*`, `@/data/*`, `@/content/*`, `@/lib/*`

## Deployment

Static export (`output: 'export'`), `trailingSlash: true`, images unoptimized. MDX configured via `withMDX()` but unused. CI: `.github/workflows/deploy.yml` (checkout → pnpm 9 → Node 20 → install → export → .nojekyll → deploy). CNAME at project root.

## Public Assets

```
favicon.svg (blue #0ea5e9 "G"), manifest.json, robots.txt, sitemap.xml, og-image.png
images/hero/1730083623644.webp, images/profile/1730083623644.webp
images/2024/{fellowships,oss,projects,talks}/ — 6 files
images/2025/{fellowships,experience,projects}/ — 5 files
```

## Binary Files

**Never read/write images with text-based tools** — they corrupt silently. Use `cp`/`mv`/`git checkout` only.

## Known Issues

- Several images referenced in JSON don't exist in public/ (fellowship/hackathon photos)
- `hackathons.json` and `scroll-reveal.tsx` exist but are unused
- MDX configured but no .mdx files exist
- `optimizeImagePath()` in utils.ts is a placeholder (returns original path)
- projects.json `gallery` arrays all empty
- Empty dirs: 2024/hackathons, 2025/{hackathons,oss,talks}
