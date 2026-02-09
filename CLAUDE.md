# CLAUDE.md

## Project Overview

Gerson's Web3 portfolio - a **single-page** Next.js 16 static site with premium GSAP/Framer Motion animations. Deployed to GitHub Pages at `gersonloaiza.com`. Dark mode only.

## Commands

```bash
pnpm run dev      # Dev server on localhost:3000
pnpm run build    # Static export to /out
pnpm run lint     # ESLint
pnpm run deploy   # Build + .nojekyll for GitHub Pages
```

## Tech Stack

- **Next.js 16** (App Router, Turbopack, static export, `output: 'export'`)
- **React 19**
- **Tailwind CSS 4** with custom `primary` (blue), `accent` (orange), `neutral` color scales (CSS-first config via `@theme` in globals.css)
- **GSAP 3.13** + ScrollTrigger - scroll-based animations
- **Framer Motion 11** - hover states and micro-interactions
- **Lenis 1.3** - smooth 60fps scrolling
- **SplitType 0.3** - character-by-character text reveals
- **Lucide React** + **React Icons** - iconography
- **next-themes** - forced dark mode (`forcedTheme="dark"`)
- **MDX** - configured but not currently used

## Project Structure

```
app/
  layout.tsx          # Root: ThemeProvider > SmoothScroll > ScrollProgress > CustomCursor > Header/Footer
  page.tsx            # Homepage only (no other pages exist)
  globals.css         # Tailwind + custom utilities + print styles
components/
  layout/
    header.tsx        # Client - fixed nav with mobile menu, scroll-based styling
    footer.tsx        # Server - static footer with social links
  sections/           # All client components, each imports own JSON data
    hero.tsx          # GSAP master timeline + SplitType (0-3.4s sequential entrance)
    fellowships.tsx   # Fellowship cards with status indicators (Active/Upcoming/Completed)
    experience.tsx    # Professional timeline with staggered cards
    open-source.tsx   # OnlyDust contributions, filters by featured
    speaking.tsx      # Talks with photo galleries (uses Gallery + Lightbox)
    projects.tsx      # Featured/additional projects grid with outcome badges
    contact.tsx       # Opportunities cards + social links
  ui/
    smooth-scroll.tsx # Lenis wrapper (duration: 1.2, custom easing)
    scroll-progress.tsx # Gradient progress bar at viewport top
    custom-cursor.tsx # Magnetic dot+ring cursor (desktop >1024px only)
    scroll-reveal.tsx # Reusable GSAP wrapper (6 presets: fade/slideUp/slideLeft/slideRight/scale/rotate)
    image.tsx         # OptimizedImage wrapper + ImagePlaceholder for dev
    lightbox.tsx      # Full-screen viewer with keyboard nav + Gallery grid component
    theme-provider.tsx # next-themes wrapper
data/                 # JSON content files (all sections import directly)
  projects.json       # 4 projects, has featured flag
  oss.json            # 20+ contributions, has featured flag
  experience.json     # 1 entry (Nethermind)
  talks.json          # 1 talk (ETH Pura Vida)
  fellowships.json    # 3 fellowships
  hackathons.json     # EXISTS but NOT used by any component
  stats.json          # Hero section metrics
lib/
  utils.ts            # cn(), date formatters, SOCIAL_LINKS, CONTACT_INFO, RESUME_URL
public/images/        # Organized by year: {2024,2025}/{hackathons,talks,fellowships,projects,oss,experience}
                      # Also: hero/, profile/
```

## Content Updates

Edit JSON files in `/data/`. Set `"featured": true` to show in main sections. Date format: `YYYY-MM`.

Social links & contact info: `lib/utils.ts` (`SOCIAL_LINKS`, `CONTACT_INFO` constants).

SEO metadata: `app/layout.tsx`.

## Animation Rules (Critical)

1. **Always `immediateRender: false`** on `gsap.from()` - prevents flash on page load
2. **Never `clearProps: 'all'`** - causes blinking by removing opacity post-animation
3. **`toggleActions: 'play none none none'`** - animations play once only
4. **Consistent values**: `y: 30`, `duration: 0.8`, `ease: 'power2.out'`, `stagger: 0.15`
5. **Scale only on hover** (Framer Motion), never in scroll animations (GSAP)
6. **Always check** `prefers-reduced-motion` before animating
7. **Always cleanup**: `gsap.context()` with `ctx.revert()` in useEffect return

### Animation Pattern

```tsx
'use client';
// Register GSAP outside component
if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

// In component useEffect:
useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = gsap.context(() => {
    gsap.from('.target', {
      scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 0, y: 30, stagger: 0.15, duration: 0.8, ease: 'power2.out', immediateRender: false,
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

## Styling

- **Custom CSS utilities** in `globals.css` via `@utility`: `glass-card`, `photo-card`, `gradient-overlay`, `hover-lift`, `hover-glow`, `gradient-text`, `btn-primary`, `btn-secondary`, `badge-primary`, `badge-accent`, `badge-neutral`, `focus-ring`, `section-padding`, `container-max`
- **No manual CSS resets** - Tailwind Preflight handles normalization
- **Tailwind v4 renames**: `backdrop-blur-sm`→`backdrop-blur-xs`, `shadow-sm`→`shadow-xs`, `bg-gradient-to-*`→`bg-linear-to-*`, `outline-none`→`outline-hidden`
- Responsive padding: `px-6 py-16 md:px-8 lg:px-12 xl:px-16`
- `body` has `overflow-x: hidden`
- Fonts loaded via Google Fonts import in globals.css: Inter + JetBrains Mono

## Deployment

- **Static export**: `output: 'export'` in `next.config.js` to `/out`
- **Images unoptimized**: Required for GitHub Pages (`images: { unoptimized: true }`)
- **GitHub Actions**: `.github/workflows/deploy.yml`
- **Custom domain**: `CNAME` file at project root with `gersonloaiza.com`
- For subdirectory deployment: uncomment `basePath`/`assetPrefix` in `next.config.js`

## Known Issues

- `robots.txt` and `sitemap.xml` have placeholder `your-domain.com` URLs
- `og-image.png` referenced in metadata but missing from `/public/images/`
- No favicon files
- `/resume` and `/photos` pages mentioned in README but don't exist (resume links to external Google Doc)
- `hackathons.json` data file exists but no component renders it
- Several image directories are empty (2024/hackathons, 2025/hackathons, 2025/oss, 2025/talks)

## Binary Files (Critical)

**Never read or write image files (JPG, PNG, WebP, etc.) with text-based tools.** Use only binary-safe operations (e.g., `cp`, `mv`, `git checkout`). Writing binary files through text tools corrupts them by replacing bytes with UTF-8 replacement characters — this silently breaks images with no build error. If an image appears broken, run `file <path>` — a valid image says "JPEG image data" / "PNG image data", a corrupted one says "data". Restore corrupted images with `git checkout HEAD -- <path>`.

## Troubleshooting

- **Broken/missing images**: Run `file <path>` — if it says "data" instead of "JPEG/PNG image data", the file is corrupted. Restore with `git checkout HEAD -- <path>`
- **Animations flash/blink**: Check `immediateRender: false` on all `gsap.from()`, remove any `clearProps`
- **CSS not loading**: `rm -rf .next node_modules/.cache` then `pnpm run dev`
- **Hover not working**: Ensure `whileHover` is on `motion.*` elements, no GSAP scale conflicts
- **Build fails**: Check for missing image references in JSON data files
