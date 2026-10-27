# SEO.md — Search Engine Optimization & Discovery Strategy (Day 44)

## 1. Dynamic Metadata & Social Sharing (Open Graph / Twitter Cards)

- **Metadata Base**: Standardized in `app/layout.js` using `metadataBase: new URL(...)` pointing to the verified environment URL (`NEXT_PUBLIC_APP_URL`). Ensures all relative asset URLs and canonical paths resolve to valid absolute URLs for social scrapers (WhatsApp, Telegram, Twitter, Facebook).
- **Title Template**: Configured as `%s | Addis Eats` to keep SERP branding consistent across search results.
- **Dynamic OG Cards (`/menu/[id]`)**:
  - Evaluated through `generateMetadata({ params })` at request/build time for each of the 15 dishes.
  - Dynamically populates dish-specific title, description, and local image path (`/images/dishes/*.jpg`) with explicit dimensions (800x600).
  - Uses `twitter:card: "summary_large_image"` to deliver wide-format previews across mobile feed apps.

---

## 2. Structured Data (JSON-LD)

- **Root Scope (`app/layout.js`)**:
  - Implements Schema.org `Restaurant` type embedded via `<script type="application/ld+json">`.
  - Outlines cuisine (`Ethiopian`), currency (`ETB`), service locality (`Addis Ababa`), opening hours (`Mo-Su 10:00-22:00`), and price range.
- **Dish Details Scope (`app/menu/[id]/page.js`)**:
  - Implements Schema.org `MenuItem` type embedded via `<script type="application/ld+json">`.
  - Injects item `name`, `description`, `image`, and `offers` (`price`, `priceCurrency: "ETB"`, `availability: "InStock"`).
  - Fasting/Vegetarian dishes include `suitableForDiet: "https://schema.org/VegetarianDiet"`, qualifying them for Google Rich Snippets in diet-filtered searches.

---

## 3. Crawler Control & Indexing

- **Dynamic XML Sitemap (`app/sitemap.js`)**:
  - Served automatically from `/sitemap.xml`.
  - Indexes the homepage (priority: 1.0, daily), `/menu` (priority: 0.9, hourly), and iterates over all 15 authentic Ethiopian dish detail pages (priority: 0.8, weekly).
- **Robots Exclusion Standard (`app/robots.js`)**:
  - Served automatically from `/robots.txt`.
  - Explicitly allows search engines on `/`, `/menu`, and all `/menu/*` routes.
  - Restricts access (`Disallow`) on private, state-dependent, and mutation routes:
    - `/checkout` (session-protected)
    - `/orders/*` (customer-scoped live polling)
    - `/kitchen` (role-guarded staff board)
    - `/signin` (auth entry point)
    - `/api/*` (internal data APIs)
  - Points directly to the absolute URL of `/sitemap.xml`.
