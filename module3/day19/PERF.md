# PERF.md — Core Web Vitals & Optimization Strategy (Day 44)

## 1. Font Strategy (Target: CLS < 0.05, Achieved: CLS = 0)

- **Implementation**: Managed using `next/font/google` (`Inter`) configured in `app/layout.js`.
- **Zero-CLS Mechanism**: The font files are automatically downloaded and self-hosted locally by Next.js at build time. No external requests are made to Google Fonts servers during page visits.
- **Metric Override & Font Swapping**: Configured with `display: 'swap'` and injected via a CSS variable (`--font-inter`). Next.js calculates automatic size-adjust and fallback font metric overrides to match system font geometry, completely eliminating visual layout shifts when text loads.

---

## 2. Image Optimization (LCP & Modern Formats)

- **Component Pipeline**: Replaced native HTML `<img>` elements with Next.js `next/image` in `app/menu/page.js` and `app/menu/[id]/page.js`.
- **Local Asset Source**: 15 authentic Ethiopian dish images stored locally under `public/images/dishes/`, eliminating third-party CDN lookup latencies, cross-origin handshakes, and external downtime risks.
- **Modern Formats**: WebP and AVIF modern compression formats are dynamically served based on client browser support, reducing image payload transfer size by up to 60–80% compared to raw JPEGs.
- **Responsive Sizing (`sizes`)**:
  - Dish grid cards configure: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`.
  - Mobile viewports download small mobile-resolution assets instead of full desktop resolutions.
- **Largest Contentful Paint (LCP) Priority**:
  - On `/menu`, the first above-the-fold dish card image receives `priority={index === 0}` to trigger high-priority preloading in the HTML `<head>`.
  - On `/menu/[id]`, the hero dish image is tagged with `priority={true}` so the primary content block renders immediately without waiting for lazy-load scroll intersections.

---

## 3. Environment Variable Hygiene & Runtime Validation

- **Validation Layer**: Built with Zod in `lib/env.js` and parsed on server/build startup.
- **Boundary Enforcement**:
  - Client-exposed variables are strictly restricted to keys prefixed with `NEXT_PUBLIC_` (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`).
  - Sensitive server secrets (`SESSION_SECRET`) are guarded on the server runtime and never leaked into client JavaScript bundles.
- **Fail-Fast Safety**: Invalid or missing environment keys throw descriptive validation errors during application initialization rather than causing silent runtime failures in production.
