# STRATEGY.md — Route Rendering Strategies & Discovery Engine (Day 44)

- **/**: Dynamic (`ƒ`) — Layout evaluates dynamic session cookie to show authentication status; embeds Schema.org `Restaurant` structured data; fonts self-hosted via `next/font` for zero CLS.
- **/menu**: ISR (`revalidate = 3600`) — Menu catalog and prices cached at edge and regenerated hourly. Uses `next/image` with `priority` on the first card to optimize Largest Contentful Paint (LCP). Listed with high priority (0.9) in the sitemap.
- **/menu/[id]**: Static via params (`●`) — 15 authentic Ethiopian dishes pre-rendered via `generateStaticParams`. Dynamic Open Graph social previews generated per dish; embeds Schema.org `MenuItem` JSON-LD.
- **/robots.txt**: Static (`○`) — Next.js special route handler serving crawler permissions and indexing limits.
- **/sitemap.xml**: Static (`○`) — Automatically resolves base domain and lists all active dish URLs for search engine discovery.
- **/cart**: Client — Tab-local order lines and running ETB calculations.
- **/checkout**: Dynamic (`ƒ`) — Protected by middleware; blocked by `robots.txt` from indexing.
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by middleware; blocked by `robots.txt`; server component seeds initial data via `fallbackData`, followed by background client SWR polling.
- **/signin**: Dynamic (`ƒ`) — Blocked by `robots.txt`; provides secure authentication entry with open-redirect defenses.
- **/kitchen**: Dynamic (`ƒ`) — Blocked by `robots.txt`; role-guarded staff queue checking claims server-side (`user.role === 'staff'`).
- **/api/dishes**: Dynamic (`ƒ`) — Blocked by `robots.txt`; serves debounced search queries.
- **/api/orders/[id]**: Dynamic (`ƒ`) — Blocked by `robots.txt`; polled every 5 seconds by SWR.
