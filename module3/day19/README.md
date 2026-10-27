# Addis Eats — Full Stack Next.js Food Ordering Platform (Day 44)

A food ordering application built on Next.js App Router featuring server-side rendering strategies, SWR live data polling, edge route middleware, Core Web Vitals optimization, and search engine discovery architecture.

---

## 1. Production Build Output

Verified via `npm run build` (Next.js 16.4.2 Turbopack with 15 local Ethiopian dishes, dynamic sitemap, and robots.txt):

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
├ ○ /robots.txt
├ ƒ /signin
└ ○ /sitemap.xml

ƒ Proxy (Middleware)
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

✓ Generating static pages using 7 workers (28/28) in 3.0s
```
