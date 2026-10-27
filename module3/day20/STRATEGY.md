# STRATEGY.md — Route Rendering Strategies & Integration Matrix (Day 45)

- **/**: Dynamic (`ƒ`) — Evaluates dynamic session cookie to show authentication status; renders Schema.org `Restaurant` structured data; zero-CLS fonts via `next/font`[cite: 1].
- **/menu**: ISR (`revalidate = 3600`) — Menu catalog and prices cached at edge and regenerated hourly[cite: 1, 3]. Uses `next/image` with `priority` on the first card for LCP optimization.
- **/menu/[id]**: Static via params (`●`) — 15 authentic Ethiopian dishes pre-rendered via `generateStaticParams`[cite: 1, 3]. Dynamic Open Graph metadata and Schema.org `MenuItem` JSON-LD.
- **/robots.txt**: Static (`○`) — Next.js special route handler serving crawler permissions and indexing limits.
- **/sitemap.xml**: Static (`○`) — Dynamically resolves base domain and lists all 15 active dish URLs for search engine discovery.
- **/cart**: Client — Tab-local order lines and running ETB calculations[cite: 1, 3].
- **/checkout**: Dynamic (`ƒ`) — Protected by middleware; handles `useActionState` progressive form submissions[cite: 1, 2]. Blocked by `robots.txt`.
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by middleware; server component seeds initial data via `fallbackData`, followed by background client SWR polling.
- **/signin**: Dynamic (`ƒ`) — Blocked by `robots.txt`; provides secure authentication entry with open-redirect defenses.
- **/kitchen**: Dynamic (`ƒ`) — Blocked by `robots.txt`; role-guarded staff queue checking claims server-side (`user.role === 'staff'`).
- **/api/dishes**: Dynamic (`ƒ`) — Blocked by `robots.txt`; serves debounced search queries.
- **/api/orders/[id]**: Dynamic (`ƒ`) — Blocked by `robots.txt`; polled every 5 seconds by SWR.
