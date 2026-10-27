# Addis Eats — Full-Stack Next.js 16 Capstone Platform (Day 49)

Addis Eats is a production-ready Ethiopian food ordering, real-time kitchen dispatch, and sales analytics platform built with Next.js 16 App Router (Turbopack), React 19, SWR, Recharts, Leaflet, and Tailwind CSS.

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
