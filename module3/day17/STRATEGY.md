# STRATEGY.md — Route Rendering Strategies (Day 42)

- **/**: Dynamic (`ƒ`) — Layout evaluates dynamic session cookie to show authentication status (`Hi, User` / `Sign Out`)[cite: 17].
- **/menu**: ISR (`revalidate = 3600`) — Menu catalog and prices change a few times a day; cached at edge and regenerated hourly[cite: 1, 3].
- **/menu/[id]**: Static via params (`●`) — Pre-rendered dish pages via `generateStaticParams`[cite: 1, 3, 4].
- **/cart**: Client — Tab-local order lines and ETB calculations[cite: 1, 3].
- **/checkout**: Dynamic (`ƒ`) — Protected by middleware; requires authenticated session and handles server action submission[cite: 1, 14, 17].
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by middleware; scoped query with SWR polling[cite: 10, 14, 17].
- **/signin**: Dynamic (`ƒ`) — Authentication form with `next` redirect query parameter[cite: 18].
- **/kitchen**: Dynamic (`ƒ`) — Role-guarded staff queue[cite: 18, 36].
- **/api/dishes**: Dynamic (`ƒ`) — Search and dish retrieval endpoint[cite: 10, 13].
- **/api/orders/[id]**: Dynamic (`ƒ`) — Order status polling endpoint[cite: 10, 13].
