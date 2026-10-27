# STRATEGY.md — Route Rendering Strategies & Data Representation (Day 46)

- **/**: Dynamic (`ƒ`) — Resolves dynamic session cookie to show authentication status; embeds Schema.org `Restaurant` structured data; zero-CLS fonts via `next/font`[cite: 1].
- **/menu**: ISR (`revalidate = 3600`) — Menu catalog and prices cached at the edge and regenerated hourly[cite: 1, 3]. Uses `next/image` with `priority` on the first card for LCP optimization.
- **/menu/[id]**: Static via params (`●`) — 15 authentic Ethiopian dishes pre-rendered via `generateStaticParams`[cite: 1, 3]. Dynamic Open Graph metadata and Schema.org `MenuItem` JSON-LD.
- **/orders/history**: Dynamic (`ƒ`) — Server Component reading `searchParams` (`sort`, `order`, `page`) to compute server-side sorting and pagination on demand; renders Recharts analytics and accessible table without client hydration waterfalls.
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by middleware; server component seeds initial data via `fallbackData`, followed by background client SWR polling.
- **/cart**: Client — Tab-local order lines and running ETB calculations[cite: 1, 3].
- **/checkout**: Dynamic (`ƒ`) — Protected by middleware; handles `useActionState` progressive form submissions[cite: 1, 2]. Blocked by `robots.txt`.
- **/kitchen**: Dynamic (`ƒ`) — Blocked by `robots.txt`; role-guarded staff queue checking claims server-side (`user.role === 'staff'`).
- **/signin**: Dynamic (`ƒ`) — Blocked by `robots.txt`; provides secure authentication entry with open-redirect defenses.
- **/robots.txt**: Static (`○`) — Next.js special route handler serving crawler permissions and indexing limits.
- **/sitemap.xml**: Static (`○`) — Dynamically resolves base domain and lists all 15 active dish URLs for search engine discovery.
- **/api/dishes**: Dynamic (`ƒ`) — Blocked by `robots.txt`; serves debounced search queries as JSON arrays.
- **/api/orders/[id]**: Dynamic (`ƒ`) — Blocked by `robots.txt`; polled every 5 seconds by SWR.
