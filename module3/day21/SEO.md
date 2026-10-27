# SEO.md — Search Engine Optimization & Discovery Strategy (Day 46)

## 1. Dynamic Metadata & Social Sharing (Open Graph / Twitter Cards)

- **Metadata Base**: Standardized in `app/layout.js` using `metadataBase: new URL(...)` pointing to the verified environment URL (`NEXT_PUBLIC_APP_URL`).
- **Title Template**: Configured as `%s | Addis Eats` across all public and internal routes.
- **Dynamic OG Cards (`/menu/[id]`)**: Evaluated through `generateMetadata({ params })` at request/build time, delivering dish-specific titles, descriptions, and 800x600 preview images.

---

## 2. Structured Data (JSON-LD)

- **Root Scope (`app/layout.js`)**: Implements Schema.org `Restaurant` markup specifying cuisine (`Ethiopian`), currency (`ETB`), opening hours, and service locality (`Addis Ababa`).
- **Dish Details Scope (`app/menu/[id]/page.js`)**: Implements Schema.org `MenuItem` markup with structured price, currency, availability, and dietary markers (`VegetarianDiet`).

---

## 3. Crawler Control & Exclusion

- **Dynamic XML Sitemap (`app/sitemap.js`)**: Serves from `/sitemap.xml`, indexing the homepage (daily), `/menu` (hourly), and all 15 authentic dish detail pages (weekly).
- **Robots Exclusion Standard (`app/robots.js`)**: Serves from `/robots.txt`.
  - Publicly Allowed: `/`, `/menu`, and `/menu/*`.
  - Private Disallows: `/checkout`, `/orders/*`, `/orders/history`, `/kitchen`, `/signin`, and `/api/*`.
