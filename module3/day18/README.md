# Addis Eats — Full Stack Next.js Food Ordering Platform (Day 43)

A food ordering platform built on Next.js App Router featuring server-side rendering strategies, SWR live data polling, edge route middleware, and Core Web Vitals asset optimization[cite: 1].

---

## 1. Production Build Output

Verified via `npm run build` (Next.js 16 Turbopack with 15 local Ethiopian dishes):

```text
Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ƒ /cart
├ ƒ /checkout
├ ƒ /kitchen
├ ƒ /menu
├ ƒ /menu/[id] (15 dishes pre-rendered)
├ ƒ /orders/[id]
└ ƒ /signin

ƒ Proxy (Middleware)
ƒ  (Dynamic)  server-rendered on demand

✓ Generating static pages using 7 workers (26/26) in 1893ms
```
