# SEO Audit — gersonloaiza.com

**Date:** 2026-02-12
**Site type:** Personal portfolio (single-page, static export to GitHub Pages)
**Domain:** gersonloaiza.com

---

## Executive Summary

The site has solid on-page metadata (title, description, OG/Twitter cards) and correct heading hierarchy across sections. However, several foundational SEO assets are missing: no robots.txt, no sitemap, no favicon, no OG image file, and no structured data. The metadata also references the wrong domain (Vercel fallback instead of actual custom domain).

**Top 5 priorities:**
1. Fix metadataBase and OG URLs to use `gersonloaiza.com`
2. Create the missing `og-image.png` (referenced but doesn't exist)
3. Add `robots.txt` and `sitemap.xml`
4. Add JSON-LD Person schema
5. Fix duplicate H1 in hero section

---

## Findings

### 1. Domain Mismatch in Metadata
**Impact:** HIGH
**File:** `app/layout.tsx:14,34`

`metadataBase` falls back to `https://gerson-portfolio.vercel.app` and OG `url` hardcodes that same Vercel domain. The actual deployed site is `https://gersonloaiza.com` (per CNAME file). This means all canonical URLs, OG URLs, and sitemap references point to the wrong domain.

**Fix:** Update `metadataBase` and all OG/Twitter URLs to `https://gersonloaiza.com`.

---

### 2. Missing OG Image
**Impact:** HIGH
**File:** `app/layout.tsx:40,52`

Metadata references `/images/og-image.png` but the file does not exist in `public/images/`. Every social share (Twitter, LinkedIn, Slack, Discord) will show a broken or missing preview image.

**Fix:** Create a 1200x630 OG image and place at `public/images/og-image.png`.

---

### 3. Missing robots.txt
**Impact:** MEDIUM

No robots.txt exists anywhere in the project. Search engines use defaults, but an explicit file is best practice — especially to reference the sitemap.

**Fix:** Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://gersonloaiza.com/sitemap.xml
```

---

### 4. Missing Sitemap
**Impact:** MEDIUM

No sitemap.xml or sitemap.ts exists. For a single-page site the impact is lower, but a sitemap still helps Google discover and confirm the canonical URL.

**Fix:** Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gersonloaiza.com/</loc>
    <lastmod>2026-02-12</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### 5. Duplicate H1 Tags in Hero
**Impact:** MEDIUM
**File:** `components/sections/hero.tsx:287,301`

Two `<h1>` elements exist — one invisible (layout shift placeholder, `aria-hidden="true"`) and one visible (animated typing). While the invisible one has `aria-hidden`, crawlers still see two H1 elements in the DOM which is suboptimal.

**Fix:** Change the invisible placeholder H1 (line 287) to a `<div>` or `<span>` styled identically. Only the visible H1 at line 301 should remain.

---

### 6. No Structured Data (JSON-LD)
**Impact:** MEDIUM

No schema markup exists anywhere. A Person/ProfilePage schema would help search engines understand who Gerson is and surface rich results (knowledge panel, social links).

**Fix:** Add JSON-LD to `app/layout.tsx` `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Gerson",
    "jobTitle": "Web3 Developer",
    "url": "https://gersonloaiza.com",
    "sameAs": [
      "https://github.com/Gerson2102",
      "https://x.com/Glv_exe02",
      "https://www.linkedin.com/in/gerson-lv/"
    ]
  }
}
```

---

### 7. Missing Favicon
**Impact:** LOW

No favicon.ico, apple-touch-icon, or icon files exist. Browsers show a generic icon and log 404 errors in the console.

**Fix:** Add `public/favicon.ico` and optionally `app/icon.png` + `app/apple-icon.png`.

---

### 8. Google Search Console Not Connected
**Impact:** LOW
**File:** `app/layout.tsx:66-68`

The verification field is commented out. Without Search Console, you can't monitor indexation, coverage issues, or search performance.

**Fix:** Register the site in Google Search Console, get the verification code, and uncomment/fill in the `google` verification field.

---

### 9. Missing Web App Manifest
**Impact:** LOW

No `manifest.json` or `site.webmanifest` exists. Not critical for SEO, but adds PWA support and improves mobile "add to home screen" experience.

---

## What's Working Well

| Area | Status |
|------|--------|
| Title tag | Good — descriptive, includes name + role, 52 chars |
| Meta description | Good — 134 chars, includes differentiators |
| Keywords meta | Present with 10 relevant terms |
| OG/Twitter card config | Properly structured (image file just missing) |
| Heading hierarchy | Correct H1 > H2 > H3 > H4 flow across all 7 sections |
| `lang="en"` on html | Present |
| External links | All have `rel="noopener noreferrer"` |
| Robots meta | Allows index + follow with generous snippet/image limits |
| Semantic HTML | Proper `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` |
| Accessibility | aria-labels on buttons, roles on interactive elements |
| HTTPS | Enforced via GitHub Pages |

---

## Prioritized Action Plan

### Critical (do first)
1. **Fix domain** — Update `metadataBase` and OG `url` to `https://gersonloaiza.com`
2. **Create OG image** — 1200x630 PNG at `public/images/og-image.png`

### Important (do soon)
3. **Add robots.txt** — `public/robots.txt` with sitemap reference
4. **Add sitemap.xml** — `public/sitemap.xml` with canonical URL
5. **Fix duplicate H1** — Change invisible placeholder to `<div>`
6. **Add JSON-LD** — Person/ProfilePage schema in layout head

### Nice-to-have
7. Add favicon files
8. Connect Google Search Console
9. Add web app manifest
10. Create custom 404 page (`app/not-found.tsx`)
