# STRATEGY.md — Route Rendering Strategies (Day 41)

- **/**: Static (`○`) — Landing page with today's specials; public content that does not vary per user or depend on request headers[cite: 1, 3, 4].
- **/menu**: ISR (`revalidate = 3600`) — Menu catalog and prices change a few times a day; cached at the edge and regenerated hourly[cite: 1, 3].
- **/menu/[id]**: Static via params (`●`) — All dish IDs are known in advance and pre-rendered with `generateStaticParams`; missing IDs trigger `notFound()`[cite: 1, 3, 4].
- **/cart**: Client — Order lines and running ETB calculations are private to one browser tab and rely on local state[cite: 1, 3].
- **/checkout**: Dynamic (`λ`) — Progressive form using server actions and request-time validation[cite: 1, 3, 4].
- **/orders/[id]**: Dynamic (`ƒ`) — Server component fetches the initial order state at request time to seed `fallbackData`, followed by background client SWR polling[cite: 10, 12, 13].
- **/api/dishes**: Dynamic (`ƒ`) — Route handler serving the debounced search queries and catalog filters[cite: 10, 13].
- **/api/orders/[id]**: Dynamic (`ƒ`) — Route handler polled by SWR every 5 seconds for status updates[cite: 10, 13].
