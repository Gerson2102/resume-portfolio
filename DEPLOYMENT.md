# Deployment Guide

Complete step-by-step instructions for deploying Gerson's portfolio to GitHub Pages with optional custom domain setup.

## 🎯 Pre-Deployment Checklist

### Content Preparation
- [ ] Update personal information in `lib/utils.ts`
- [ ] Add project data to `data/projects.json`
- [ ] Update open source contributions in `data/oss.json`
- [ ] Add experience details to `data/experience.json`
- [ ] Include speaking engagements in `data/talks.json`
- [ ] Update fellowship information in `data/fellowships.json`
- [ ] Add profile images to `public/images/profile/`
- [ ] Include project screenshots in appropriate year folders

### Technical Preparation
- [ ] Test build locally: `npm run build && npm run export`
- [ ] Verify all images load correctly
- [ ] Check responsive design on multiple screen sizes
- [ ] Test dark/light theme switching
- [ ] Validate PDF export functionality
- [ ] Run accessibility checks
- [ ] Test performance with Lighthouse

## 🚀 GitHub Pages Deployment

### Step 1: Repository Setup

1. **Create GitHub Repository**
   ```bash
   # If starting fresh
   git init
   git add .
   git commit -m "Initial commit: Portfolio setup"

   # Create repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Repository Settings**
   - Repository name: `portfolio` or `YOUR_USERNAME.github.io`
   - Visibility: Public (required for free GitHub Pages)
   - Include README: ✅ (already created)

### Step 2: Configure GitHub Pages

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section

2. **Configure Pages Source**
   - Source: Select "GitHub Actions"
   - This enables the workflow in `.github/workflows/deploy.yml`

3. **Verify Workflow Permissions**
   - Go to Settings → Actions → General
   - Workflow permissions: Select "Read and write permissions"
   - Allow GitHub Actions to create and approve pull requests: ✅

### Step 3: Deploy

1. **Trigger Deployment**
   ```bash
   # Make any change and push to trigger deployment
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Monitor Deployment**
   - Go to "Actions" tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Deployment typically takes 2-3 minutes

3. **Access Your Site**
   - User site: `https://YOUR_USERNAME.github.io`
   - Project site: `https://YOUR_USERNAME.github.io/REPO_NAME`

## 🌐 Custom Domain Setup (Optional)

### Step 1: Domain Configuration

1. **Add CNAME File**
   ```bash
   # Add to public directory
   echo "your-domain.com" > public/CNAME
   git add public/CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Update Next.js Configuration**
   ```javascript
   // next.config.js - No changes needed for custom domain
   // Only modify basePath/assetPrefix for subpath deployments
   ```

### Step 2: DNS Configuration

1. **For Root Domain (example.com)**
   ```
   A Records:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. **For Subdomain (www.example.com)**
   ```
   CNAME Record:
   www.example.com → YOUR_USERNAME.github.io
   ```

3. **Recommended DNS Setup**
   ```
   # Root domain A records
   @ A 185.199.108.153
   @ A 185.199.109.153
   @ A 185.199.110.153
   @ A 185.199.111.153

   # WWW subdomain CNAME
   www CNAME YOUR_USERNAME.github.io.
   ```

### Step 3: GitHub Pages Domain Settings

1. **Configure Custom Domain**
   - Repository Settings → Pages
   - Custom domain: Enter `your-domain.com`
   - Wait for DNS check to pass (may take up to 24 hours)

2. **Enable HTTPS**
   - Check "Enforce HTTPS" once DNS is verified
   - GitHub automatically provisions SSL certificate

## 🛠 Advanced Configuration

### Subpath Deployment

If deploying to `username.github.io/repository-name`:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/repository-name',
  assetPrefix: '/repository-name/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}
```

### Environment Variables

For different deployment environments:

```bash
# .env.local (not committed)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

```typescript
// lib/analytics.ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const gaId = process.env.NEXT_PUBLIC_GA_ID
```

## 📊 Post-Deployment Setup

### Analytics Integration

1. **Google Analytics 4**
   ```typescript
   // app/layout.tsx
   import Script from 'next/script'

   // Add before closing </head>
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${GA_ID}');
     `}
   </Script>
   ```

2. **Plausible Analytics (Privacy-Friendly)**
   ```typescript
   <Script
     defer
     data-domain="your-domain.com"
     src="https://plausible.io/js/script.js"
   />
   ```

### Search Console Setup

1. **Google Search Console**
   - Add property: `https://your-domain.com`
   - Verify ownership via HTML file or DNS
   - Submit sitemap: `https://your-domain.com/sitemap.xml`

2. **Bing Webmaster Tools**
   - Add site and verify ownership
   - Submit sitemap for Bing indexing

### Performance Monitoring

1. **Core Web Vitals**
   - Use Google PageSpeed Insights
   - Monitor Web Vitals in Search Console
   - Set up alerts for performance degradation

2. **Lighthouse CI**
   ```yaml
   # Add to GitHub workflow for continuous monitoring
   - name: Lighthouse CI
     uses: treosh/lighthouse-ci-action@v9
     with:
       uploadArtifacts: true
       temporaryPublicStorage: true
   ```

## 🔧 Troubleshooting

### Common Deployment Issues

1. **Build Fails**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm install
   npm run build
   ```

2. **Images Not Loading**
   - Verify image paths are correct (case-sensitive)
   - Check file extensions match exactly
   - Ensure images are in `public/` directory
   - Clear browser cache

3. **404 Errors**
   - Confirm `.nojekyll` file is in build output
   - Check GitHub Pages source configuration
   - Verify custom domain DNS settings
   - Wait for DNS propagation (up to 24 hours)

4. **Styling Issues**
   - Clear CDN cache if using one
   - Check for CSS purging issues
   - Verify Tailwind build process

### GitHub Actions Debugging

1. **Workflow Logs**
   - Actions tab → Select failed workflow
   - Expand each step to see detailed logs
   - Common issues: Node version, dependencies, permissions

2. **Permissions Issues**
   ```yaml
   # Ensure workflow has correct permissions
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

3. **Build Artifacts**
   - Download artifacts from failed builds
   - Check generated `out/` directory structure
   - Verify all assets are included

## 📈 Optimization Tips

### Performance Optimization

1. **Image Optimization**
   ```typescript
   // Use appropriate sizes attribute
   <OptimizedImage
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     priority={false} // Only true for above-fold images
   />
   ```

2. **Font Optimization**
   ```typescript
   // Preload critical fonts
   <link
     rel="preload"
     href="/fonts/inter-var.woff2"
     as="font"
     type="font/woff2"
     crossOrigin="anonymous"
   />
   ```

3. **Critical CSS**
   - Inline critical CSS for above-fold content
   - Use font-display: swap for web fonts
   - Minimize render-blocking resources

### SEO Optimization

1. **Meta Tags**
   ```typescript
   // Update for each page
   export const metadata: Metadata = {
     title: 'Gerson - Web3 Developer',
     description: 'Web3 developer specializing in Starknet ecosystem...',
     keywords: ['Web3', 'Starknet', 'Developer', 'Costa Rica'],
     openGraph: {
       title: 'Gerson - Web3 Developer',
       description: '...',
       url: 'https://your-domain.com',
       images: ['/images/og-image.png']
     }
   }
   ```

2. **Structured Data**
   ```typescript
   // Add JSON-LD structured data for better search results
   const structuredData = {
     "@context": "https://schema.org",
     "@type": "Person",
     "name": "Gerson",
     "jobTitle": "Web3 Developer",
     "worksFor": { "@type": "Organization", "name": "OnlyDust" },
     "url": "https://your-domain.com"
   }
   ```

## 🔄 Continuous Integration

### Automated Testing

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

### Automated Sitemap Updates

```typescript
// scripts/generate-sitemap.js
// Run after build to generate dynamic sitemap
const fs = require('fs')
const globby = require('globby')

async function generateSitemap() {
  const pages = await globby(['out/**/*.html'])
  // Generate sitemap XML
}

generateSitemap()
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks

- [ ] Update dependencies monthly: `npm update`
- [ ] Monitor Core Web Vitals weekly
- [ ] Check for broken links quarterly
- [ ] Update content as achievements occur
- [ ] Review and optimize images periodically
- [ ] Monitor search console for issues

### Getting Help

1. **Documentation**: Review this guide and README.md
2. **GitHub Issues**: Create issue for technical problems
3. **Community**: Next.js Discord, GitHub Discussions
4. **Direct Contact**: Telegram @Glv_rar for urgent issues

---

**Deployment Checklist Summary:**
- ✅ Content updated and verified
- ✅ Local build tested successfully
- ✅ Repository created and configured
- ✅ GitHub Pages enabled with Actions
- ✅ Custom domain configured (if applicable)
- ✅ DNS settings updated
- ✅ SSL certificate active
- ✅ Analytics and monitoring setup
- ✅ Performance optimized
- ✅ SEO configured

Your portfolio should now be live and accessible to the world! 🎉