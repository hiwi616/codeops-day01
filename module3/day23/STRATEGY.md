# STRATEGY.md — Route Rendering Strategies & Real-Time Matrix (Day 47)

- **/**: Dynamic (`ƒ`) — Evaluates session cookie; injects Restaurant JSON-LD and zero-CLS fonts.
- **/menu**: ISR (`revalidate = 3600`) — Hourly catalog cache at the edge with WebP/AVIF hero images.
- **/menu/[id]**: Static via params (`●`) — 15 dishes pre-rendered with MenuItem JSON-LD and OG tags.
- **/orders/history**: Dynamic (`ƒ`) — Server Component executing server-side sorting/pagination, streaming Recharts charts and Leaflet delivery zones.
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by middleware; initial paint seeded via `fallbackData`, followed by background client SWR polling.
- **/cart**: Client — Tab-local order state with local storage synchronization.
- **/checkout**: Dynamic (`ƒ`) — Protected by middleware; executes progressive `useActionState` mutations.
- **/kitchen**: Dynamic (`ƒ`) — Role-guarded staff board checking claims server-side (`user.role === 'staff'`).
- **/signin**: Dynamic (`ƒ`) — Form targeting server actions with open-redirect sanitization.
- **/api/orders/export**: Dynamic (`ƒ`) — Serves raw CSV export stream; blocked from search engine crawling.
- **/api/orders/stream**: Dynamic (`ƒ`) — Persistent Server-Sent Events stream emitting live order queue events.
- **/api/dishes**: Dynamic (`ƒ`) — Debounced dish search endpoint returning JSON arrays.
- **/api/orders/[id]**: Dynamic (`ƒ`) — Order polling endpoint.
- **/robots.txt**: Static (`○`) — Robots exclusion standard.
- **/sitemap.xml**: Static (`○`) — Canonical search discovery XML sitemap.
