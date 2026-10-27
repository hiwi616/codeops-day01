# PERF.md — Core Web Vitals, Data Representation & Asset Strategy (Day 46)

## 1. Zero-CLS Typography & Font Bundling

- **Strategy**: Self-hosted variable Google Font (`Inter`) loaded via `next/font/google` in `app/layout.js`.
- **Zero-CLS Mechanism**: Next.js downloads and self-hosts font binaries at build time, preventing cross-origin font downloads and flash of unstyled text (FOUT).
- **Metric Overrides**: Configured with `display: 'swap'` and CSS variable `--font-inter` to achieve Cumulative Layout Shift (CLS) = 0.

---

## 2. Responsive Image Pipeline

- **Component Pipeline**: Replaced native HTML `<img>` elements with `next/image` in `app/menu/page.js` and `app/menu/[id]/page.js`.
- **Asset Storage**: 15 authentic Ethiopian dish images served from `public/images/dishes/` with automatic modern WebP/AVIF compression.
- **Responsive Sizing (`sizes`)**: Configured with `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 20vw"`.
- **LCP Priority**: Above-the-fold hero dish cards carry `priority={true}` to prevent Largest Contentful Paint delays.

---

## 3. Data Representation & Recharts Optimization

- **Bundle Isolation**: Recharts client logic (`ResponsiveContainer`, `BarChart`) is isolated strictly to `components/SalesChart.jsx` (`'use client'`), keeping server pages free of charting library bundle overhead.
- **Server-Side Data Computation**: Sorting and pagination algorithms execute directly on the server inside `app/orders/history/page.js`, ensuring only paginated records (4 rows per view) are transferred over the wire.
- **Zero-Layout Shift Charts**: Chart containers declare explicit responsive heights (`h-72`) preventing layout jumps while Recharts computes viewport dimensions.
