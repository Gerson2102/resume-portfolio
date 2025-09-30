# Image Guidelines & Pipeline

## Directory Structure

```
/public/images/
├── 2024/
│   ├── hackathons/
│   │   ├── starknet-hacker-house-group.jpg
│   │   ├── starknet-hacker-house-presentation.jpg
│   │   ├── eth-pura-vida-stage.jpg
│   │   ├── eth-pura-vida-award-ceremony.jpg
│   │   └── arkthemist-demo-screenshot.png
│   ├── talks/
│   │   ├── eth-pura-vida-stage-wide.jpg
│   │   ├── eth-pura-vida-presentation-slide.png
│   │   └── eth-pura-vida-audience-interaction.jpg
│   ├── fellowships/
│   │   ├── invisible-garden-cohort-2024.jpg
│   │   └── invisible-garden-research-session.jpg
│   └── projects/
│       ├── crypto-swipe-app.png
│       └── dojo-game-interface.png
├── 2025/
│   ├── hackathons/
│   │   ├── arkthemist-dashboard-demo.png
│   │   └── starknet-hackathon-winner-badge.png
│   ├── fellowships/
│   │   ├── onlydust-fellowship-badge.png
│   │   └── devconnect-argentina-2025.jpg
│   ├── experience/
│   │   ├── nethermind-logo.png
│   │   └── alpen-labs-team-call.jpg
│   └── projects/
│       └── ssz-parser-code.png
├── hero/
│   └── gerson-hero-image.jpg (Main hero image)
├── profile/
│   └── gerson-portrait.jpg (Contact section headshot)
└── og-image.png (Open Graph/social media image)
```

## Image Specifications

### Aspect Ratios & Sizes

1. **Hero Images** (16:9)
   - Resolution: 1600x900px minimum
   - Used for: Main hero background, project covers
   - Focus: Action shots, event photos, project demos

2. **Event Photos** (4:3)
   - Resolution: 1200x900px minimum
   - Used for: Group photos, hackathon moments, speaking events
   - Focus: Clear faces, readable text/slides

3. **Portrait Photos** (1:1)
   - Resolution: 800x800px minimum
   - Used for: Profile images, contact section
   - Focus: Professional headshots, good lighting

4. **Project Screenshots** (16:9 or custom)
   - Resolution: 1200x675px for 16:9
   - Used for: Application interfaces, code demos
   - Focus: Clear UI elements, readable text

5. **Gallery Thumbnails**
   - Resolution: 600x338px (16:9) or 600x450px (4:3)
   - Used for: Photo gallery previews
   - Focus: Visual clarity at smaller sizes

### File Formats

- **JPEG**: Photos, complex images with many colors
- **PNG**: Screenshots, images with text, transparent backgrounds
- **WebP/AVIF**: Optimized versions (generated automatically by Next.js)

## Naming Convention

Use descriptive, kebab-case names that include:
1. Event/context
2. Subject/content
3. Type (optional)

Examples:
- `starknet-hacker-house-group-photo.jpg`
- `eth-pura-vida-stage-presentation.jpg`
- `arkthemist-dashboard-screenshot.png`
- `onlydust-contribution-graph.png`

## Alt Text Guidelines

Write descriptive alt text that includes:
1. **What**: What's in the image
2. **Who**: People involved (if relevant)
3. **Where**: Location/event
4. **When**: Time period (if relevant)

### Examples:

```javascript
// Good alt text examples
"Gerson presenting 'Blockchain: Más allá del Casino' at ETH Pura Vida 2024 conference stage with audience visible"
"Arkthemist arbitration dashboard showing dispute resolution interface with dark theme"
"Starknet Hacker House Brussels 2024 group photo with 20+ international participants outside venue"
"OnlyDust contribution graph displaying 20+ merged pull requests in Starknet ecosystem projects"
```

## Optimization Settings

### Next.js Image Component Usage

```typescript
import { OptimizedImage } from '@/components/ui/image'

// Standard usage
<OptimizedImage
  src="/images/2024/hackathons/starknet-hacker-house-group.jpg"
  alt="Starknet Hacker House Brussels 2024 group photo with international participants"
  aspectRatio="photo"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // Only true for above-the-fold images
/>
```

### Responsive Sizes Attribute

```typescript
// Hero images
sizes="(max-width: 768px) 100vw, 100vw"

// Project cards
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

// Gallery thumbnails
sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
```

## Content Guidelines

### Photo Quality Requirements

1. **Resolution**: High enough for largest display size
2. **Lighting**: Good exposure, avoid extreme shadows
3. **Composition**: Clear subject, uncluttered background
4. **Focus**: Sharp focus on main subjects
5. **File Size**: Balance quality with loading speed (< 500KB ideal)

### Photo Categories & Content

1. **Hackathon Photos**
   - Team collaboration moments
   - Presentation/demo scenes
   - Award ceremonies
   - Venue/event atmosphere
   - Code/project screenshots

2. **Speaking Engagements**
   - Stage/podium shots
   - Audience interaction
   - Slide presentations
   - Q&A sessions
   - Event signage/branding

3. **Fellowship Programs**
   - Cohort group photos
   - Working sessions
   - Research collaborations
   - Program logos/certificates
   - Virtual meeting screenshots

4. **Project Documentation**
   - Application interfaces
   - Code editors/IDEs
   - Architecture diagrams
   - Demo videos (thumbnails)
   - User interactions

### Missing Images Strategy

For development, use the `ImagePlaceholder` component:

```typescript
import { ImagePlaceholder } from '@/components/ui/image'

<ImagePlaceholder
  aspectRatio="hero"
  title="Gerson presenting at ETH Pura Vida"
  className="w-full h-full"
/>
```

## Image Collection Checklist

### Priority 1 (Essential)
- [ ] Professional headshot for contact section
- [ ] Main hero image (event/building photo)
- [ ] 2-3 hackathon photos (Brussels, ETH Pura Vida)
- [ ] Speaking photo from ETH Pura Vida
- [ ] Project screenshots (Arkthemist, CryptoSwipe)

### Priority 2 (Important)
- [ ] Fellowship group photos
- [ ] Additional hackathon moments
- [ ] Code editor screenshots
- [ ] OnlyDust contribution graphs
- [ ] Certificate/award photos

### Priority 3 (Nice to have)
- [ ] Behind-the-scenes working photos
- [ ] Travel/venue photos
- [ ] Community event photos
- [ ] Technical diagrams/architecture
- [ ] Social media header images

## Performance Optimization

### Lazy Loading Strategy
- **Above fold**: `priority={true}`, no lazy loading
- **Below fold**: `priority={false}`, lazy load enabled
- **Gallery images**: Always lazy loaded

### CDN Integration (Future)
When scaling, consider:
- Cloudinary for automatic optimization
- Custom domain for image serving
- Advanced transformations (blur placeholders, art direction)

### Monitoring
Track Core Web Vitals:
- **LCP (Largest Contentful Paint)**: Optimize hero images
- **CLS (Cumulative Layout Shift)**: Use aspect ratio containers
- **FID (First Input Delay)**: Minimize JavaScript for image interactions