# Gerson's Portfolio - Visual Identity System

## Color Palette (Photography-Focused)

### Primary Colors
- **Primary Blue**: #0ea5e9 - Tech-forward, trustworthy, complements warm photo tones
- **Accent Orange**: #f97316 - Energy, creativity, pops against blue backgrounds
- **Neutral Grays**: #171717 (dark) to #fafafa (light) - Photography-friendly neutrals

### Dark Mode
- Background: #0a0a0a (near black for photo contrast)
- Cards/Panels: #171717 (rich dark gray)
- Text Primary: #fafafa (soft white)
- Text Secondary: #a3a3a3 (medium gray)

### Light Mode
- Background: #fafafa (warm white)
- Cards/Panels: #ffffff (pure white)
- Text Primary: #171717 (rich black)
- Text Secondary: #525252 (dark gray)

## Typography

### Font Stack
- **Primary**: Inter (clean, modern, excellent readability)
- **Mono**: JetBrains Mono (code snippets, technical details)

### Hierarchy
- **H1 Hero**: 4xl-6xl (clamp 2.5rem-4rem) - Bold weight
- **H2 Section**: 3xl (1.875rem) - Semibold weight
- **H3 Card Titles**: xl (1.25rem) - Medium weight
- **Body**: base (1rem) - Regular weight
- **Small/Meta**: sm (0.875rem) - Medium weight

## Component Design Principles

### Image-First Design
- Images drive layout decisions, not constrain them
- Asymmetrical grids that accommodate various aspect ratios
- Generous whitespace around photos for breathing room
- Consistent border-radius (0.5rem) for cohesive feel

### Interaction States
- Hover: Subtle scale (1.02x) + shadow elevation
- Focus: 2px blue outline with rounded corners
- Active: Slight scale down (0.98x) for tactile feedback

### Motion
- Entrance: Fade-in + slide-up (0.5s ease-out)
- Hover transitions: 0.2s ease-in-out
- Page transitions: 0.3s ease-in-out

## Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1440px
- Large: 1440px+

## Accessibility
- Color contrast: 4.5:1 minimum (WCAG AA)
- Focus indicators: Always visible
- Reduced motion support: prefers-reduced-motion
- Alt text: Descriptive for context, not just description