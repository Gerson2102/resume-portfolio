# Gerson's Web3 Portfolio

A production-ready, image-forward portfolio website showcasing Web3 development experience, open source contributions, hackathon achievements, and speaking engagements. Built with Next.js 14 and optimized for GitHub Pages deployment.

## 🌟 Features

- **Image-First Design**: Photography-focused layout highlighting hackathons, conferences, and achievements
- **Responsive & Accessible**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Themes**: Automatic system preference detection with manual toggle
- **Static Export**: Optimized for GitHub Pages with no server-side requirements
- **SEO Optimized**: Meta tags, Open Graph, structured data for maximum discoverability
- **PDF Resume Export**: Browser-native PDF generation from resume page
- **Lightbox Gallery**: Full-screen photo viewing with keyboard navigation
- **Performance Focused**: Lazy loading, optimized images, and minimal JavaScript

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Typography**: Inter (primary), JetBrains Mono (code)
- **Icons**: Lucide React
- **Images**: next/image with optimization
- **Themes**: next-themes
- **Deployment**: GitHub Pages (static export)

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage with all sections
│   ├── photos/            # Photo gallery page
│   └── resume/            # PDF-optimized resume page
├── components/
│   ├── layout/            # Header, footer, navigation
│   ├── sections/          # Homepage sections (hero, projects, etc.)
│   └── ui/                # Reusable UI components
├── content/               # MDX content files
├── data/                  # JSON data files
├── lib/                   # Utilities and configurations
├── public/
│   ├── images/            # Organized image assets
│   ├── robots.txt         # SEO configuration
│   └── sitemap.xml        # Search engine sitemap
└── .github/workflows/     # GitHub Actions deployment
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gerson2102/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Build and export static files
npm run deploy       # Build, export, and add .nojekyll
```

## 📸 Adding Images

### Image Organization

Follow the directory structure in `IMAGE_GUIDELINES.md`:

```
/public/images/
├── 2024/
│   ├── hackathons/     # Hackathon photos
│   ├── talks/          # Speaking engagement photos
│   ├── fellowships/    # Program and cohort photos
│   └── projects/       # Project screenshots
├── 2025/
│   └── ...            # Same structure for current year
├── hero/              # Main hero background images
├── profile/           # Professional headshots
└── og-image.png       # Social media preview image
```

### Image Specifications

- **Hero Images**: 1600x900px (16:9)
- **Event Photos**: 1200x900px (4:3)
- **Project Screenshots**: 1200x675px (16:9)
- **Profile Photos**: 800x800px (1:1)
- **File Formats**: JPEG for photos, PNG for screenshots
- **Optimization**: Images automatically optimized by Next.js

### Using Images in Components

```typescript
import { OptimizedImage } from '@/components/ui/image'

<OptimizedImage
  src="/images/2024/hackathons/starknet-hacker-house-group.jpg"
  alt="Starknet Hacker House Brussels 2024 group photo"
  aspectRatio="photo"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## 🔧 Customization

### Updating Content

1. **Personal Info**: Edit `lib/utils.ts` for social links and contact info
2. **Projects**: Update `data/projects.json` with your projects
3. **Open Source**: Modify `data/oss.json` with contributions
4. **Experience**: Edit `data/experience.json` for work history
5. **Talks**: Update `data/talks.json` with speaking engagements
6. **Fellowships**: Modify `data/fellowships.json` with programs

### Customizing Design

1. **Colors**: Edit `tailwind.config.js` for brand colors
2. **Typography**: Modify font imports in `app/layout.tsx`
3. **Components**: Update component styles in `components/` directory
4. **Layout**: Adjust section spacing in `app/globals.css`

### Content Examples

```json
// data/projects.json
{
  "id": "my-project",
  "title": "My Awesome Project",
  "summary": "Brief description for cards",
  "description": "Detailed description for full view",
  "outcomes": ["1st Place", "Best Technical Implementation"],
  "stack": ["Next.js", "TypeScript", "Tailwind"],
  "links": {
    "github": "https://github.com/username/project",
    "demo": "https://project-demo.vercel.app"
  },
  "coverImage": "/images/2024/projects/my-project-cover.png",
  "featured": true,
  "year": 2024
}
```

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Repository Setup**
   ```bash
   # Create new repository on GitHub
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on push to main

3. **Custom Domain (Optional)**
   ```bash
   # Add CNAME file to public directory
   echo "your-domain.com" > public/CNAME
   ```

4. **Configure Domain DNS**
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

### Alternative Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Drag and drop 'out' folder to Netlify
```

#### Custom Server
```bash
npm run build
# Serve 'out' directory with any static file server
```

## ⚡ Performance & SEO

### Core Web Vitals Optimization

- **LCP**: Hero images optimized with `priority={true}`
- **CLS**: Aspect ratio containers prevent layout shifts
- **FID**: Minimal JavaScript, optimized interactions

### SEO Features

- Meta tags and Open Graph data
- Structured data for rich snippets
- XML sitemap generation
- Robots.txt configuration
- Image alt text and captions

### Analytics Setup

Add privacy-friendly analytics by including script in `app/layout.tsx`:

```typescript
// Example: Plausible Analytics
<Script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.js"
/>
```

## 🔐 Privacy & Security

- No tracking cookies or personal data collection
- External links open in new tabs with security attributes
- Images served from same domain (no external CDNs by default)
- No server-side code or database requirements

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **Image Loading Issues**
   - Verify image paths are correct
   - Check file extensions (case-sensitive)
   - Ensure images exist in public directory

3. **GitHub Pages 404**
   - Verify `.nojekyll` file exists in build output
   - Check repository Pages settings
   - Confirm workflow has proper permissions

4. **PDF Export Issues**
   - Ensure print styles are loading
   - Check browser compatibility
   - Verify resume page structure

### Development Tips

- Use `ImagePlaceholder` for missing images during development
- Test responsive design at different screen sizes
- Validate HTML and accessibility with browser tools
- Monitor Core Web Vitals in production

## 📈 Future Enhancements

- **CMS Integration**: Contentful or Sanity for non-technical content updates
- **Image CDN**: Cloudinary integration for advanced image optimization
- **Multi-language**: i18n support for Spanish/English versions
- **Blog Section**: MDX-powered blog for technical articles
- **Contact Form**: Serverless form handling with Vercel or Netlify
- **Project Case Studies**: Detailed project breakdown pages
- **Search Functionality**: Client-side search for projects and content

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues:

- **Telegram**: [@Glv_rar](https://t.me/Glv_rar) (fastest response)
- **GitHub Issues**: Create an issue in this repository
- **Email**: gerson@example.com

---

Built with ❤️ by Gerson using Next.js, Tailwind CSS, and GitHub Pages.