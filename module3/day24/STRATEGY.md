# STRATEGY.md — Route Rendering Strategies & Justifications (Day 49 Capstone)

- **/**: Dynamic (`ƒ`) — Evaluates session cookie in root layout to display personalized auth controls; embeds Schema.org `Restaurant` JSON-LD and zero-CLS self-hosted `Inter` font.
- **/menu**: ISR (`revalidate = 3600`) — Catalog cached at the edge and revalidated hourly; uses `next/image` with `priority` on the first card for optimal LCP (`1.1s`).
- **/menu/[id]**: Static via params (`●`) — All 15 Ethiopian dishes pre-rendered at build time via `generateStaticParams` with dynamic Open Graph cards and `MenuItem` JSON-LD.
- **/orders/[id]**: Dynamic (`ƒ`) — Protected by Edge Middleware; Server Component fetches initial order to seed SWR `fallbackData` and mounts the live `<SecurityAttackDemo />` verification battery.
- **/orders/history**: Dynamic (`ƒ`) — Session-guarded Server Component parsing URL `searchParams` (`sort`, `order`, `page`) alongside `<SalesChart />` (Recharts) and `<DeliveryMapWrapper />` (Leaflet `ssr: false`).
- **/cart**: Client (`'use client'`) — Tab-local order lines with WCAG 2.1 AA keyboard listeners (`+`, `-`, `Delete`) and `aria-live` regions.
- **/checkout**: Dynamic (`ƒ`) — Protected by Edge Middleware; progressive order form powered by React 19 `useActionState` and server-side Zod validation.
- **/kitchen**: Dynamic (`ƒ`) — Protected by server-side role verification (`user.role === 'staff'`); live dispatch board invoking `updateOrderStatus`.
- **/signin**: Dynamic (`ƒ`) — Authentication entry point enforcing open-redirect path sanitization (`next.startsWith("/") && !next.startsWith("//")`).
- **/api/orders/export**: Dynamic (`ƒ`) — Session-guarded route handler streaming downloadable CSV reports.
- **/api/orders/stream**: Dynamic (`ƒ`) — Persistent `text/event-stream` SSE endpoint.
- **/api/dishes**: Dynamic (`ƒ`) — JSON array search endpoint serving debounced SWR queries.
- **/robots.txt & /sitemap.xml**: Static (`○`) — Crawler access rules and canonical XML sitemap enumerating public routes.
