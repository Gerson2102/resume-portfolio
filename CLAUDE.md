# CLAUDE.md

## Overview

Gerson's Web3 portfolio — single-page Next.js 16 static site deployed to GitHub Pages at `gersonloaiza.com`. Dark mode only, GSAP/Framer Motion animations. No forms — all contact via external links (Telegram, email, Calendly).

## Commands

```bash
pnpm run dev      # Dev server (Turbopack)
pnpm run build    # Static export to /out
pnpm run lint     # ESLint (eslint ., not next lint)
pnpm run deploy   # Build + .nojekyll for GitHub Pages
```

## Stack

Next.js 16, React 19, Tailwind CSS 4.1.18 (CSS-first, no tailwind.config.js), GSAP 3.13, Framer Motion 11.3, Lenis 1.3, SplitType 0.3, TypeScript 5.5, lucide-react 0.408, next-themes 0.3, clsx 2.1, tailwind-merge 3.0, sharp 0.32, @mdx-js/loader+react 3.0, @next/mdx 16.0. PostCSS with @tailwindcss/postcss (no autoprefixer). ESLint extends next/core-web-vitals (`react/no-unescaped-entities: off`). Playwright 1.58 for testing. CI: Node 20, pnpm 9.

## Structure

```
app/
  layout.tsx           # Root layout: html(dark) > ThemeProvider > SmoothScroll > CustomCursor > Header/main/Footer
  page.tsx             # Single page: Hero > Fellowships > Experience > OpenSource > Speaking > Projects > Contact
  not-found.tsx        # 404 page (centered "404" + "Back to Home" link with btn-primary)
  globals.css          # Tailwind @theme (colors, fonts, keyframes) + 32 @utility definitions + print styles

components/layout/
  header.tsx           # Client — Fixed nav, scroll detection (>20px -> glass bg), mobile menu (Escape closes), smooth scroll links
                       # Nav links: Projects, Open Source, Experience, Fellowships, Speaking (hash links)
                       # Desktop: Logo + nav + GitHub icon + Resume button. Mobile: hamburger toggle
  footer.tsx           # Server — 3-col grid (brand+location+telegram, quick links, achievements) + social bar with custom XIcon
                       # Achievements: OnlyDust Fellowship, 3rd Best Starknet dApp, ETH Foundation Scholar, $10k+ OSS

components/sections/   # 7 client components — each imports own JSON data directly (no props from page)
  hero.tsx             # Typing state machine (name 70ms/char -> subtitle 45ms/char -> description 18ms/char -> 3 blinks -> fade)
                       # Post-typing GSAP timeline: metrics (stagger 0.12), social (stagger 0.08), scroll indicator
                       # Background: /images/hero/1730083623644.webp with triple gradient overlay
                       # Sub-components: Cursor (blink animation), XIcon, renderWithBold (highlights EVM/Starknet)
  fellowships.tsx      # Vertical timeline with alternating left/right cards (desktop), left-aligned (mobile)
                       # Line draw: scrub:0.5, scaleY 0->1. Nodes: boxShadow glow. Cards: x +-60->0
                       # Sub-components: TimelineCard (accordion with AnimatePresence), getNodeStyles, getStatusBadgeColor
  experience.tsx       # Single entry tabbed UI (Overview|Responsibilities|Achievements|Tech Stack)
                       # Spring tab indicator (stiffness:400, damping:30), keyboard nav (Arrow/Home/End), ARIA tablist
                       # Sub-components: CompanyIdentity, TabBar, ContentPanel, OverviewPanel, ResponsibilitiesPanel, AchievementsPanel, TechStackPanel
  open-source.tsx      # Desktop: 3 visible cards (center highlighted, sides dimmed scale:0.92 blur:1.5px)
                       # Mobile: single card with swipe (threshold:50px) + keyboard arrows
                       # Impact metrics: 300+ Contributions, $10,000+ Earned, 100% Merge Rate
                       # Sub-components: ContributionCard (type icons/badges, tech tags, maintainer feedback), CountUp (IntersectionObserver, cubic ease-out)
  speaking.tsx         # Desktop (lg+): Split-scroll pinned layout (left 55vw pinned photo, right 45vw scrolling content)
                       # Pin: GSAP ScrollTrigger, start:'top 80px', pinSpacing:false. Mobile: stacked layout
                       # Content blocks: metadata, abstract, key takeaways, topics, testimonials, links
                       # Gallery with lightbox (3 cols, square aspect). CTA: "Available for Speaking" with Telegram link
                       # Sub-components: FeaturedTalk, CompactTalkCard
  projects.tsx         # Featured: 2-col grid (lg:grid-cols-2), aspect-video covers, full description
                       # Additional: 3-col grid (xl:grid-cols-3), aspect-hero covers, summary only
                       # Hover: Framer Motion y:-8, scale:1.02. Year badge + outcome badges on cover
                       # Sub-component: ProjectCard. Links: GitHub (Code), demo (Live Demo), devpost (Devpost)
  contact.tsx          # 3 opportunity cards: Full-time Web3 Dev (green), Speaking (blue), Consulting (purple)
                       # Contact: Telegram (primary CTA), email, Calendly, location. Social links row
                       # NO form — all hardcoded external links
                       # Sub-components: OpportunityCard, XIcon

components/ui/
  smooth-scroll.tsx    # Lenis (duration:1.2, easing:exponential decay, touchMultiplier:2, wheelMultiplier:1)
                       # Exposes window.lenis for GSAP ScrollTrigger. Manual RAF loop. Respects reduced-motion
  scroll-progress.tsx  # Pure JS scroll % (vanilla scrollY calculation, NOT GSAP). Gradient: blue->purple->pink. z-[60]
  custom-cursor.tsx    # Vanilla JS RAF (NOT GSAP). Dot: 8px, 0.35 interpolation. Ring: 32px, 0.15 interpolation
                       # 1.5x hover scale on 'a, button, .interactive, [role="button"]'. mix-blend-difference
                       # Desktop only: width >= 1024px && no 'ontouchstart'
  image.tsx            # OptimizedImage: Next/Image + pulse skeleton loader + error fallback (gray box with SVG icon)
                       # ImagePlaceholder: dashed border dev placeholder. Props: src, alt, width, height, aspectRatio, priority, fill, sizes, onClick
  lightbox.tsx         # Lightbox: Portal to body, bg-black/95, Esc/Arrows, body scroll lock, caption + counter
                       # Gallery: 1-4 responsive columns, Enter/Space opens lightbox. Props: images, columns, aspectRatio
  theme-provider.tsx   # Thin next-themes wrapper, forcedTheme="dark", enableSystem={false}, attribute="class"
  scroll-reveal.tsx    # 6 GSAP presets (fade, slideUp, slideLeft, slideRight, scale, rotate) — UNUSED by any component

data/*.json            # stats(1obj), fellowships(4 all featured), experience(1 featured), oss(6 all featured),
                       # projects(4, 2 featured), talks(1 featured), hackathons(4, 3 featured — UNUSED)
lib/utils.ts           # Functions: cn(), formatDate(), formatDateRange(), getImageAlt(), optimizeImagePath() [PLACEHOLDER],
                       #   slugify(), truncate(), getYearFromDate(), sortByDate(), groupByYear()
                       # Constants: SOCIAL_LINKS {github,twitter,linkedin,telegram}, CONTACT_INFO {telegram,email,location}, RESUME_URL
```

## Content Updates

Edit JSON in `data/`. Use `"featured": true` to control visibility. Social links and contact info in `lib/utils.ts`. SEO metadata in `app/layout.tsx`.

### JSON Schemas

- **stats**: `{ yearsBuilding, ossProjects, totalEarned, hackathonsWon, talksGiven, fellowships, countries[] }`
- **fellowships**: `{ id, organization, program, cohort, duration, stipend?, description, achievements[]?, focus[]?, logo, images[]?, links{}, status, featured, significance? }`
- **experience**: `{ id, company, role, team?, duration, period, type, location, description, responsibilities[], achievements[], technologies[], images[], links{}, featured }`
- **oss**: `{ id, repository, title, type, impact, description, tech[], links{pr,onlydust}, reward, status, date(YYYY-MM), maintainerFeedback?, featured }`
- **projects**: `{ id, title, summary, description, outcomes[], stack[], links{github?,demo?}, coverImage, gallery[], featured, year }`
- **talks**: `{ id, event, title, subtitle?, date(YYYY-MM), location, type, duration, abstract, keyTakeaways[]?, audience?, language?, topics[]?, images[]?, links{}, testimonials[]?, featured }`
- **hackathons** (UNUSED): `{ id, event, date(YYYY-MM), location, role, project, description, outcomes[], significance?, tech[], images[], links{}, featured }`

## Layout

- **Fonts**: Inter (sans), JetBrains Mono (mono via `--font-jetbrains-mono`)
- **HTML**: `<html lang="en" className="dark" suppressHydrationWarning>`
- **ThemeProvider**: `forcedTheme="dark"`, `enableSystem={false}`, `attribute="class"`, `disableTransitionOnChange`
- **Provider hierarchy**: ThemeProvider > SmoothScroll > CustomCursor > div.flex.flex-col.min-h-screen > Header + main + Footer
- **Head**: favicon.svg, manifest.json, JSON-LD ProfilePage schema (Person: Gerson, Web3 Developer, sameAs: GitHub/X/LinkedIn), wallet extension conflict script
- **Metadata**: metadataBase from `NEXT_PUBLIC_SITE_URL` or `https://gersonloaiza.com`. OG website + Twitter summary_large_image (@Glv_exe02), robots index+follow, 10 keywords

## Styling

- **Tailwind v4 CSS-first**: `@theme` (colors, fonts, aspect ratios, keyframes) + `@utility` — no tailwind.config.js
- **Dark mode**: `@custom-variant dark (&:is(.dark *))`, forced via ThemeProvider
- **Colors**: primary (sky blue #0ea5e9), accent (orange #f97316), neutral (gray) — 50-950 scales
- **v4 renames**: `backdrop-blur-sm`->`xs`, `shadow-sm`->`xs`, `bg-gradient-to-*`->`bg-linear-to-*`, `outline-none`->`outline-hidden`
- **Aspect ratios**: `--aspect-photo` (4/3), `--aspect-hero` (16/9), `--aspect-portrait` (3/4), `--aspect-square` (1/1)
- **32 @utility classes**:
  - Layout: `section-padding` (px-6 py-16 md:px-8 lg:px-12 xl:px-16), `container-max` (max-w-7xl mx-auto)
  - Glass: `glass-card`, `glass-card-premium`, `glass-effect`
  - Text: `gradient-text` (blue->purple->pink), `gradient-text-blue`, `text-balance`
  - Buttons: `btn-primary` (primary-500), `btn-secondary` (neutral bg)
  - Badges: `badge` (base), `badge-primary`, `badge-accent`, `badge-neutral`
  - Hover: `hover-lift` (-translate-y-2), `hover-glow` (blue shadow), `hover-tilt` (scale 1.05)
  - Images: `image-hover-scale`, `gradient-overlay`, `photo-card`, `image-loading` (pulse skeleton)
  - Cursor: `cursor-dot`, `cursor-ring`
  - Focus: `focus-ring` (ring-2 primary-500)
  - Animations: `animate-fade-in`, `animate-slide-up`, `animate-scale-in`, `animate-gradient`, `animate-shimmer`, `animate-float`, `animate-pulse-glow`, `animate-blink-cursor`
- **@theme keyframes**: fadeIn, slideUp, scaleIn
- **@layer base keyframes**: gradientShift, shimmer, float, pulse-glow, node-pulse, blink-cursor
- **Print styles**: `.no-print`, `.print-break-inside-avoid`, `.print-break-after`, body resets to Times New Roman 12pt
- **Base styles**: `html { scroll-padding-top: 80px }`, `body { font-feature-settings: "rlig" 1, "calt" 1; overflow-x: hidden }`
- **Reduced motion**: All animations/transitions set to 0.01ms, scroll-behavior: auto

## Animation Rules

1. Never `clearProps: 'all'` — causes blinking
2. Always check `prefers-reduced-motion` before animating (JS check + CSS media query)
3. Always cleanup: `gsap.context()` + `ctx.revert()` in useEffect return
4. **Hero**: Character-by-character typing via React state + setTimeout (name 70ms -> subtitle 45ms -> description 18ms -> 3 blinks 530ms each -> 300ms cursor fade). Then `gsap.timeline()`: metrics stagger 0.12 `back.out(1.2)`, social stagger 0.08, scroll indicator. Image fades in parallel on mount (1.2s)
5. **All other sections**: `gsap.fromTo()` + ScrollTrigger (`start: 'top 80%'`, `toggleActions: 'play none none none'`)
6. **SplitType titles** in ALL 7 sections: `types: 'chars'`, stagger 0.03, duration 0.6, ease `power2.out`, y: 20->0
7. **Framer Motion**: Hover states (scale, y, boxShadow, rotate), AnimatePresence (fellowships accordion, OSS carousel mode="popLayout", experience tabs mode="wait"), spring (experience tab indicator only)
8. **Section-specific**: Fellowships line `scrub: 0.5` scaleY 0->1, nodes with boxShadow glow, cards alternating x +-60. Experience spring tabs (stiffness:400, damping:30). OSS carousel directional slide (x +-35). Speaking desktop pin (start:'top 80px', pinSpacing:false). Projects hover y:-8 scale:1.02

## State Management

- **No global state** — no Context, Redux, or Zustand
- **No inter-component communication** — page.tsx imports sections, sections self-import data from JSON
- **No prop drilling** — sub-components receive props from parent section only
- **Hero**: 7 state vars (typing engine: displayedName, displayedSubtitle, displayedDescription, currentPhase, isTyping, cursorFading, typingComplete)
- **Fellowships**: 1 state (expandedId)
- **Experience**: 1 state (activeTab)
- **Open Source**: 4 states (activeIndex, direction, isAnimating, hasSwiped)
- **Speaking**: 1 state (reducedMotion)
- **Projects/Contact**: 0 state (GSAP refs only)

## Path Aliases

`@/*` -> `./*`, plus explicit `@/components/*`, `@/app/*`, `@/data/*`, `@/content/*`, `@/lib/*`

## Deployment

Static export (`output: 'export'`), `trailingSlash: true`, `distDir: 'out'`, `staticPageGenerationTimeout: 120`, images unoptimized. MDX configured via `withMDX()` (remarkPlugins:[], rehypePlugins:[]) but no .mdx files exist. CI: `.github/workflows/deploy.yml` (checkout -> pnpm 9 -> Node 20 -> install --frozen-lockfile -> export -> .nojekyll -> deploy pages). CNAME at project root. Concurrency group "pages".

## Public Assets

```
Root:      favicon.svg (blue #0ea5e9 "G"), favicon.png, manifest.json, robots.txt, sitemap.xml
           16e8945e-c32f-4c9f-80e3-b95824747746.html (domain verification)
Images:    og-image.png, hero/1730083623644.webp, profile/1730083623644.webp
2024:      fellowships/invisible-garden-logo.webp, oss/image.webp, projects/image.webp
           talks/me-eth.webp, talks/eth-event-2024.webp, talks/eth-event-sponsors.webp
2025:      fellowships/starknet-logo.webp, fellowships/ethereum-foundation-logo.webp
           experience/nethermind-logo.webp, projects/arkthemist.webp, projects/nine.webp, projects/alpen.webp
Empty dirs: 2024/hackathons, 2025/{hackathons,oss,talks}
```

**manifest.json**: name "Gerson - Web3 Developer", theme_color #0ea5e9, background_color #171717, display standalone
**robots.txt**: Allow all, sitemap at gersonloaiza.com/sitemap.xml
**sitemap.xml**: Single URL (gersonloaiza.com/), lastmod 2026-02-12

## Binary Files

**Never read/write images with text-based tools** — they corrupt silently. Use `cp`/`mv`/`git checkout` only.

## Responsive Design

- **Breakpoints**: `sm:` (640px, minimal), `md:` (768px, primary), `lg:` (1024px, desktop layouts), `xl:` (1280px, rare)
- **Header**: Desktop nav hidden on mobile, hamburger menu on mobile (md breakpoint)
- **Hero**: Text sizing scales md->lg, metrics grid md:grid-cols-4
- **Fellowships**: Left-aligned timeline (mobile) -> alternating left/right (lg)
- **Experience**: Content cards lg:grid-cols-2
- **Open Source**: Single swipeable card (mobile) -> 3-card carousel (lg). Touch handlers mobile only
- **Speaking**: Stacked layout (mobile) -> split-scroll pinned (lg). Pin disabled below 1024px
- **Projects**: Featured lg:grid-cols-2, Additional xl:grid-cols-3
- **Contact**: md:grid-cols-3 for contact details
- **CustomCursor**: Hidden below 1024px or touch devices
- **SmoothScroll**: touchMultiplier:2 for mobile feel

## Accessibility

**Implemented:**
- ARIA: `role="tablist/tab/button/group"`, `aria-expanded`, `aria-selected`, `aria-controls`, `aria-label` on buttons
- Keyboard: Escape (header menu, lightbox), Arrow keys (experience tabs, OSS carousel, lightbox), Home/End (tabs), Enter/Space (gallery)
- `focus-ring` utility used consistently across interactive elements
- Body scroll lock when lightbox is open
- Reduced motion: JS check + CSS media query

**Gaps:**
- No skip-to-content link
- No ARIA live regions (carousel changes not announced)
- No focus trap in lightbox modal
- No error boundaries (animation errors could crash page)
- Hero typing effect has no skip mechanism for screen readers

## Code Patterns

- **Component types**: 14 client (`"use client"`), 2 server (footer.tsx, layout.tsx)
- **Import order**: React -> Next.js -> third-party (lucide, framer-motion, gsap) -> local components -> utils -> data
- **No barrel exports** — all direct imports with path aliases
- **File naming**: kebab-case.tsx for components, kebab-case.json for data
- **Component naming**: PascalCase + `Section` suffix for sections, PascalCase for sub-components
- **Sub-components co-located** in parent file (not separate files)
- **TypeScript**: Props interfaces for sub-components, `typeof data[0]` pattern for JSON-inferred types, no `any` except `window.lenis`
- **Framer Motion import**: `motion` in most files, but `m` (tree-shakeable) in projects.tsx and contact.tsx

## Known Issues

- 6 images referenced in fellowships.json don't exist in public/ (onlydust dashboard/PR screenshots, invisible garden cohort/research photos, devconnect photos/certificate)
- `hackathons.json` has 15 missing image references (file is unused by any component)
- `scroll-reveal.tsx` exists with 6 GSAP presets but is not imported anywhere
- MDX configured via `withMDX()` but no .mdx files exist
- `optimizeImagePath()` in utils.ts is a placeholder (returns original path)
- projects.json `gallery` arrays all empty for all 4 entries
- XIcon (Twitter/X SVG) duplicated in 3 files: hero.tsx, footer.tsx, contact.tsx (should be shared)
- No `error.tsx` error boundary in app directory
- No dynamic imports / code splitting for below-fold sections
