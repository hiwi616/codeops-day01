# Addis Eats — Full-Stack Next.js Food Ordering Platform (Day 47)

Addis Eats is a production-grade full-stack Ethiopian food ordering platform built on Next.js 16 App Router (Turbopack). Day 47 introduces geospatial delivery mapping via Leaflet, real-time kitchen status broadcasts via Server-Sent Events (SSE), localized currency and time formatting via native `Intl`, and downloadable CSV transaction registries.

---

## 1. Production Build Output

Verified via `npm run build` (Next.js 16.4.2 Turbopack):

```text
Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ƒ /api/orders/export
├ ƒ /api/orders/stream
├ ƒ /cart
├ ƒ /checkout
├ ƒ /kitchen
├ ƒ /menu
├ ƒ /menu/[id]
├ ƒ /orders/[id]
├ ƒ /orders/history
├ ○ /robots.txt
├ ƒ /signin
└ ○ /sitemap.xml

ƒ Proxy (Middleware)
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```
