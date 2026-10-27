# STRATEGY.md — Route Rendering Strategies & Asset Performance (Day 43)

- **/**: Dynamic (`ƒ`) — Layout evaluates dynamic session cookie to show authentication status (`Hi, User` / `Sign In` / `Sign Out`); fonts loaded via `next/font` for zero CLS.
- **/menu**: ISR (`revalidate = 3600`) — Menu catalog and prices change a few times a day; cached at edge and regenerated hourly[cite: 1]. Uses `next/image` with `priority` on the first card to optimize Largest Contentful Paint (LCP).
- **/menu/[id]**: Static via params (`●`) — Pre-rendered dish pages via `generateStaticParams`[cite: 1]. Hero image is marked with `priority` for immediate above-the-fold paint.
- **/cart**: Client — Tab-local order lines and running ETB calculations[cite: 1].
- **/checkout**: Dynamic (`ƒ`) — Protected by middleware; requires authenticated session and handles server action submission[cite: 1].
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by middleware; server component seeds initial data via `fallbackData`, followed by background client SWR polling.
- **/signin**: Dynamic (`ƒ`) — Authentication form with `next` redirect query parameter and open-redirect sanitization.
- **/kitchen**: Dynamic (`ƒ`) — Role-guarded staff queue checking claims server-side (`user.role === 'staff'`).
- **/api/dishes**: Dynamic (`ƒ`) — Search and dish retrieval endpoint serving debounced queries.
- **/api/orders/[id]**: Dynamic (`ƒ`) — Status polling endpoint polled every 5 seconds by SWR.
