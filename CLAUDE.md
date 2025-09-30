# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Gerson's Web3 portfolio - a Next.js 14 static site showcasing Web3 development experience, open source contributions, hackathon achievements, and speaking engagements. The portfolio is optimized for GitHub Pages deployment and designed with an image-first, photography-focused approach.

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
The application follows a section-based homepage architecture:

```
app/page.tsx (Homepage)
├── HeroSection (metrics from stats.json)
├── ProjectsSection (filtered from projects.json by featured flag)
├── OpenSourceSection (filtered from oss.json by featured flag)
├── ExperienceSection (from experience.json)
├── SpeakingSection (from talks.json)
├── FellowshipsSection (from fellowships.json)
└── ContactSection (static content + social links from lib/utils.ts)
```

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
- **Utility classes**: Custom utilities in `app/globals.css` include `.glass-card`, `.photo-card`, `.gradient-overlay`
- **Component classes**: `.btn-primary`, `.btn-secondary`, `.badge-*` variants
- **Focus management**: `.focus-ring` class for accessibility

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

## Image Guidelines Reference

Detailed image specifications and organization guidelines are documented in `IMAGE_GUIDELINES.md`. Key points:
- **Hero images**: 1600x900px (16:9 ratio)
- **Project screenshots**: 1200x675px (16:9 ratio)
- **Event photos**: 1200x900px (4:3 ratio)
- **Profile photos**: 800x800px (1:1 ratio)

## Development Notes

- The portfolio is designed to work with placeholder images during development
- All external links open in new tabs with security attributes
- Components are server-side by default; add `"use client"` only for interactive features
- The lightbox component handles photo gallery viewing with keyboard navigation
- PDF styles are embedded directly in the resume page for static generation compatibility