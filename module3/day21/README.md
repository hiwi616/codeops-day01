# Addis Eats — Full-Stack Next.js Food Ordering Platform (Day 46)

Addis Eats features accessible data representation, category revenue visualization via Recharts, URL-based server-side sorting and pagination, and an integrated full-stack ordering flow.

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
