# Portfolio Wireframes - Image Placement Guide

## Hero Section (Above Fold)
```
[LARGE HERO IMAGE - 16:9 aspect ratio, 1600x900px]
├── Gerson at hackathon/building (candid, professional)
├── Overlay gradient (bottom 40%)
└── Content positioned over gradient:
    ├── H1: "Gerson" (4xl)
    ├── Tagline: "Web3 Developer & Open Source Contributor" (xl)
    ├── Metrics row: [20+ OSS] [3 Fellowships] [Multiple Hackathon Wins]
    ├── CTA buttons: [Contact via Telegram] [Download Resume PDF]
    └── Social icons: GitHub, X, LinkedIn, Telegram

Aspect ratio: 16:9
Recommended size: 1600x900px
Alt text: "Gerson presenting at [Event Name] wearing [description]"
```

## Featured Projects (Masonry Grid)
```
[PROJECT 1 - Large card]     [PROJECT 2 - Medium]
├── Cover image (4:3)        ├── Screenshot (16:9)
├── Outcome badge            ├── "2nd Place" badge
├── Title + one-line desc    └── Tech tags
└── Tech stack icons

[PROJECT 3 - Medium]         [PROJECT 4 - Small]
├── App screenshot (9:16)    ├── Logo/icon (1:1)
├── Impact metrics           ├── Brief title
└── Demo/repo links          └── Link

Each card:
- Hover: scale(1.02) + shadow
- Image aspect preserved with object-fit: cover
- Minimum height: 280px
- Border radius: 0.5rem
```

## Open Source Timeline
```
[GITHUB CONTRIBUTION GRAPH - 1200x300px]
├── Heatmap visual showing 20+ contributions
├── OnlyDust logo overlay
└── "$10k+ earned" metric prominently displayed

[CONTRIBUTION CARDS - Horizontal scroll on mobile]
├── Card 1: [PR screenshot] + impact description + Starknet tag
├── Card 2: [Issue screenshot] + solution + Cairo tag
├── Card 3: [Code diff image] + feature added + Python tag
└── Card 4: [Documentation] + improvement + Rust tag

Image specs:
- PR/Issue screenshots: 800x450px (16:9)
- Code diffs: 1000x600px for readability
- Contributor badges: 120x120px (square)
```

## Hackathons Gallery (Pinterest-style masonry)
```
[STARKNET HACKER HOUSE - Brussels 2024]
├── Group photo at venue (4:3, 1200x900px)
├── Presentation moment (16:9, 1200x675px)
├── Working session candid (1:1, 800x800px)
└── Badge/certificate (document scan)

[ETH PURA VIDA - Speaking]
├── Stage photo wide shot (16:9, 1200x675px)
├── Slide screenshot ("Blockchain: Más allá del Casino")
├── Audience interaction moment (4:3)
└── Award ceremony photo (3:4 portrait)

[ARKTHEMIST PROJECT]
├── Demo screenshot (16:9, 1200x675px)
├── Team photo (4:3, 1200x900px)
├── "3rd Best Starknet dApp" badge/trophy
└── Architecture diagram (custom aspect)

Each gallery item:
- Lightbox on click
- Caption with event, date, location
- Tags: #hackathon #speaking #award
```

## Experience Section
```
[NETHERMIND LOGO - 200x200px square]
├── Company branding/office photo background (subtle)
├── Role: "Rust/Python Developer Intern"
├── Duration: "3 months, 2025"
├── Key achievement: "Python→Rust parsing for Ethereum SSZ"
└── Tech stack badges: [Rust] [Python] [Ethereum]

[ONLYDUST FELLOWSHIP - 400x300px card]
├── OnlyDust branding/logo
├── Fellowship badge/certificate
├── "$1k/month x 3 months"
└── "Positive maintainer feedback" quote
```

## Speaking Section
```
[ETH PURA VIDA STAGE PHOTO - 16:9, 1200x675px]
├── Wide shot: Gerson presenting with slides visible
├── Overlay: Talk title "Blockchain: Más allá del Casino"
├── Event logo badge
├── Key takeaway bullets
└── Link to slides (if available)

Recommended: 2-3 additional candid photos
- Audience engagement moment
- Q&A session
- Post-talk networking
```

## Fellowships Timeline
```
[INVISIBLE GARDEN 2024]
├── Program logo (200x200px)
├── Cohort group photo (4:3, 1200x900px)
├── "Selected 2024 & 2025" badge
└── Focus areas: Ethereum/ZK/AI/Cryptography

[DEVCONNECT SCHOLARSHIP]
├── Ethereum Foundation logo
├── Argentina event photo
├── "<100 scholars worldwide" metric
└── Travel/venue photos
```

## Contact Section
```
[GERSON PORTRAIT - Professional headshot]
├── 1:1 aspect ratio (800x800px)
├── Clear, well-lit, friendly but professional
├── Positioned left of contact form
└── Subtle background blur

[CONTACT FORM - Right side]
├── Telegram CTA (primary)
├── Email option (secondary)
├── Calendly embed placeholder
└── Social links row
```

## Image Optimization Guidelines

### Naming Convention
```
/public/images/
├── 2024/
│   ├── hackathons/
│   │   ├── eth-pura-vida-stage-presentation.jpg
│   │   ├── starknet-hacker-house-group-photo.jpg
│   │   └── arkthemist-demo-screenshot.png
│   ├── talks/
│   └── fellowships/
└── 2025/
    ├── projects/
    ├── oss/
    └── internships/
```

### Size Specifications
- Hero images: 1600x900px (16:9)
- Project screenshots: 1200x675px (16:9)
- Event photos: 1200x900px (4:3)
- Portraits: 800x800px (1:1)
- Gallery thumbnails: 600x338px
- Icons/logos: 200x200px or SVG

### Alt Text Examples
- "Gerson presenting 'Blockchain: Más allá del Casino' at ETH Pura Vida 2024 conference stage"
- "Arkthemist arbitration-as-a-service dashboard showing dispute resolution interface"
- "Starknet Hacker House Brussels 2024 group photo with international participants"
- "OnlyDust contribution graph showing 20+ merged pull requests in Starknet ecosystem"