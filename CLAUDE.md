# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Gerson's Web3 portfolio - a Next.js 14 static site showcasing Web3 development experience, open source contributions, hackathon achievements, and speaking engagements. The portfolio features **premium Slider Revolution-style animations** powered by GSAP, Framer Motion, and Lenis, optimized for GitHub Pages deployment with an image-first, photography-focused approach.

## Common Development Commands

```bash
# Development
npm run dev                 # Start development server on localhost:3000
npm run build              # Build for production (includes static export)
npm run lint              # Run ESLint
npm run deploy            # Build and prepare for GitHub Pages deployment

# Note: `npm run export` is aliased to `npm run build` due to Next.js 14 changes
# The `deploy` command adds the required .nojekyll file for GitHub Pages
```

## Architecture & Data Flow

### Static Data Architecture
The portfolio uses a JSON-driven content architecture where all dynamic content lives in `/data/` as structured JSON files:

- `projects.json` - Project showcase with featured/non-featured classification
- `oss.json` - Open source contributions with OnlyDust integration data
- `experience.json` - Professional work experience
- `talks.json` - Speaking engagements and presentations
- `fellowships.json` - Fellowship programs and achievements
- `hackathons.json` - Hackathon participation and wins
- `stats.json` - Key metrics for hero section display

### Component Hierarchy
The application follows a section-based homepage architecture with cinematic scroll animations:

```
app/layout.tsx (Root with animation providers)
├── SmoothScroll (Lenis wrapper for buttery scrolling)
├── ScrollProgress (gradient progress bar)
├── CustomCursor (magnetic cursor for desktop)
└── app/page.tsx (Homepage)
    ├── HeroSection (cinematic entrance with GSAP + SplitType)
    ├── FellowshipsSection (scroll-triggered card reveals)
    ├── ExperienceSection (staggered timeline animations)
    ├── OpenSourceSection (contribution card animations)
    ├── SpeakingSection (photo gallery reveals)
    ├── ProjectsSection (image clip-path reveals)
    └── ContactSection (smooth fade-ins)
```

### Animation Architecture

**Core Animation Libraries:**
- **GSAP 3.13+** with ScrollTrigger - Scroll-based animations and complex timelines
- **Framer Motion 11+** - Interactive hover states and micro-interactions
- **Lenis 1.3+** - Buttery-smooth 60fps scrolling
- **SplitType 0.3+** - Character-by-character text animations

**Global Animation Components** (`components/ui/`):
- `smooth-scroll.tsx` - Lenis smooth scrolling wrapper
- `scroll-progress.tsx` - Gradient progress bar at viewport top
- `custom-cursor.tsx` - Magnetic cursor with dot + ring (desktop only)
- `scroll-reveal.tsx` - Reusable GSAP scroll-triggered animation wrapper

**Animation Pattern for Sections:**
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { motion } from 'framer-motion';

// 1. Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 2. Create refs for animated elements
const sectionRef = useRef<HTMLElement>(null);
const titleRef = useRef<HTMLHeadingElement>(null);

// 3. Setup GSAP animations in useEffect
useEffect(() => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = gsap.context(() => {
    // Title character animation
    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
      gsap.from(splitTitle.chars, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // Card stagger animations
    gsap.from('.card-class', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      immediateRender: false,
      // IMPORTANT: Never use clearProps - it causes blinking/flashing
    });
  }, sectionRef);

  return () => ctx.revert(); // Cleanup
}, []);

// 4. Use Framer Motion for hover states
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ duration: 0.3 }}
>
```

**Key Animation Timing:**
- **Page load (Hero)**: 0-2s sequential entrance
- **Scroll reveals**: Triggered at 70-80% viewport
- **Hover effects**: 0.3s smooth transitions
- **Card staggers**: 0.15-0.2s between elements
- **Card movement**: Consistent 30px vertical movement (y: 30)
- **Duration**: 0.8s for smooth, soft animations
- **Easing**: power2.out for gentle deceleration

**Accessibility:**
- All animations respect `prefers-reduced-motion`
- Custom cursor disabled on mobile/tablet
- GSAP context cleanup prevents memory leaks
- Focus rings maintained for keyboard navigation

**Critical Animation Rules:**
1. **Always use `immediateRender: false`** on `gsap.from()` to prevent elements from being hidden on page load
2. **Never use `clearProps: 'all'`** - it causes blinking/flashing by removing opacity after animations complete
3. **Use `toggleActions: 'play none none none'`** to ensure animations only play once on scroll
4. **Consistent movement**: Use `y: 30` for vertical slides (gentle and consistent)
5. **Avoid aggressive transforms**: No scale on scroll animations (reserve for hover effects)
6. **Keep duration at 0.8s**: Provides smooth, elegant feel
7. **Use power2.out easing**: Softer than power3.out, more professional

### Image Pipeline
Images are organized by year and category in `/public/images/`:
```
/public/images/
├── 2024/{hackathons,talks,fellowships,projects}/
├── 2025/{hackathons,talks,fellowships,projects}/
├── hero/ (main background images)
└── profile/ (headshots for contact)
```

Components use `OptimizedImage` wrapper around `next/image` for consistent aspect ratios and placeholder handling.

### Global Configuration
- **Social links & contact info**: Centralized in `lib/utils.ts` under `SOCIAL_LINKS` and `CONTACT_INFO` constants
- **Theme**: Dark mode default with system preference detection via `next-themes`
- **Static export**: Configured in `next.config.js` with GitHub Pages optimization
- **Animation globals**: Lenis, ScrollProgress, and CustomCursor integrated in `app/layout.tsx`

## Key Technical Patterns

### Content Updates
To update portfolio content, modify the relevant JSON file in `/data/`. All sections automatically reflect changes:
- Set `"featured": true` in projects.json or oss.json to display in main sections
- Date strings should be in 'YYYY-MM' format for consistent formatting
- Image paths should reference `/public/images/` structure

### Image Handling
Use the `OptimizedImage` component instead of raw `next/image`:
```tsx
import { OptimizedImage, ImagePlaceholder } from '@/components/ui/image'

// For actual images
<OptimizedImage
  src="/images/2024/hackathons/event-photo.jpg"
  alt="Descriptive alt text"
  aspectRatio="photo" // or "hero", "square", "portrait"
/>

// For development placeholders
<ImagePlaceholder
  aspectRatio="hero"
  title="Event photo description"
/>
```

### Styling System
- **Utility classes**: Custom utilities in `app/globals.css` include:
  - `.glass-card`, `.photo-card`, `.gradient-overlay` - Visual effects
  - `.hover-lift`, `.hover-glow`, `.hover-tilt` - Hover animations
  - `.animate-gradient`, `.animate-shimmer`, `.animate-float` - Keyframe animations
  - `.gradient-text`, `.gradient-text-blue` - Gradient text effects
- **Component classes**: `.btn-primary`, `.btn-secondary`, `.badge-*` variants
- **Focus management**: `.focus-ring` class for accessibility
- **Animation utilities**: Premium keyframes for gradients, shimmer, float, pulse-glow

**Important CSS Rules:**
- **NO manual CSS resets** in globals.css - Tailwind Preflight handles all normalization
- Always use responsive padding: `px-4 sm:px-6 lg:px-8`
- Max-width containers: `max-w-7xl mx-auto`
- Body has `overflow-x: hidden` to prevent horizontal scroll issues
- `prefers-reduced-motion` media query disables all animations if user prefers

### Adding New Animated Sections

When creating new sections with animations:

1. **Mark component as client-side**: Add `'use client'` directive at top
2. **Import animation libraries**:
```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
```

3. **Register GSAP plugins** (outside component):
```tsx
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

4. **Create refs for animated elements**
5. **Setup GSAP context in useEffect**
6. **Add motion.div wrappers for Framer Motion hover effects**
7. **Use descriptive class names** (e.g., `.section-card`) for GSAP targeting
8. **Always cleanup** with `ctx.revert()` in useEffect return

### PDF Export
The `/resume` page includes print-optimized styles and uses the `PDFDownloadButton` component for browser-native PDF generation.

## Deployment Architecture

### GitHub Pages Setup
- **Static export**: `output: 'export'` in `next.config.js` generates `/out` directory
- **GitHub Actions**: `.github/workflows/deploy.yml` handles automatic deployment
- **Domain configuration**: Modify `basePath` and `assetPrefix` in `next.config.js` for subdirectory deployment

### Content Management
For client updates without code changes:
1. Edit JSON files in `/data/`
2. Add images following `/public/images/` structure
3. Update social links in `lib/utils.ts`
4. Modify SEO metadata in `app/layout.tsx`

## Performance Considerations

**Build Output:** ~203 KB First Load JS (excellent for animation-heavy site)

**Animation Performance:**
- GSAP uses requestAnimationFrame for 60fps
- Lenis provides smooth scrolling without jank
- Framer Motion optimized for React reconciliation
- Complex animations disabled on mobile (<1024px)
- ScrollTrigger lazy-loads animations until viewport proximity

**Optimization Tips:**
- Keep GSAP timelines under 2s for initial load
- Use `will-change` sparingly via Framer Motion
- Stagger delays should not exceed 0.2s
- Image priority flag on Hero images only

## Image Guidelines Reference

Detailed image specifications and organization guidelines are documented in `IMAGE_GUIDELINES.md`. Key points:
- **Hero images**: 1600x900px (16:9 ratio)
- **Project screenshots**: 1200x675px (16:9 ratio)
- **Event photos**: 1200x900px (4:3 ratio)
- **Profile photos**: 800x800px (1:1 ratio)

## Development Notes

- The portfolio is designed to work with placeholder images during development
- All external links open in new tabs with security attributes
- Components are server-side by default; add `"use client"` only for interactive features or animations
- The lightbox component handles photo gallery viewing with keyboard navigation
- PDF styles are embedded directly in the resume page for static generation compatibility
- Custom cursor only renders on desktop devices (checked via window width and touch detection)
- All animations check for `prefers-reduced-motion` before initializing

### Troubleshooting Animations

**If animations cause blinking/flashing:**
- Check that `immediateRender: false` is present on all `gsap.from()` calls
- Remove any `clearProps: 'all'` or `clearProps: 'transform,opacity'` from animations
- Ensure `toggleActions` is set to prevent animation replaying

**If CSS styles not loading:**
- Clear Next.js cache: `rm -rf .next node_modules/.cache`
- Restart dev server: Kill all running processes and run `npm run dev`
- Verify `globals.css` is imported in `app/layout.tsx`
- Check browser console for CSS 404 errors

**If hover effects not working:**
- Verify Framer Motion `whileHover` props are on `motion.*` or `m.*` elements
- Ensure GSAP animations don't conflict (no scale/transform in scroll animations)
- Check that elements aren't being affected by parent overflow or z-index issues
