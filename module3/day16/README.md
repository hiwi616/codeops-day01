# Addis Eats — Day 41: Live Data with SWR

Implementation of client-side data fetching, background polling, debounced search, and URL-based pagination using Next.js App Router and SWR[cite: 8, 13].

---

## 1. Production Build Output

Verified via `npm run build`[cite: 2, 4]:

```text
Route (app)                               Revalidate   Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ○ /cart
├ ○ /checkout
├ ○ /menu                                 1h           1y
├   /menu/[id]
│ ├ ● /menu/doro-wat
│ ├ ● /menu/special-tibs
│ ├ ● /menu/kitfo
│ └ ● /menu/shiro-wat
└ ƒ /orders/[id]

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
