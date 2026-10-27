# Day 37 - Layouts and rendering strategies

Builds on Day 36. New this day:

- `app/layout.js` - root layout owning `<html>`/`<body>`, global CSS, `Header` and `Footer`
- `app/menu/layout.js` - nested layout with a category sidebar and a counter (state survives navigation)
- `app/menu/page.js` - `revalidate = 3600` (ISR) plus `<Suspense>` around the slow dish list
- `app/menu/[id]/page.js` - `generateStaticParams` -> one HTML file per dish
- `app/checkout/page.js` - forced dynamic; the comment names the `cookies()` read
- `STRATEGY.md` - every route, its strategy, one line of why
- `lib/` and `components/` - shared code lives outside `app/`

## Run

```bash
npm install
npm run build && npm start
```

Run `npm run build` after each exercise (as the sheet asks) and compare the markers with `STRATEGY.md`.

## Exercise checklist

1. Root layout with header, footer and `globals.css` - owns `html` and `body`.
2. `app/menu/layout.js` with a sidebar; open a dish and the sidebar does not remount.
3. Click the **Layout counter**, then open `/menu/kitfo`: the count is preserved.
4. `revalidate = 3600` on the menu; build still marks `/menu` static (○).
5. `generateStaticParams` on the dish route: the build prints one path per dish (10 dishes -> 10 pages).
6. `cookies()` on checkout flips its marker from ○ to ƒ.
7. `<DishList />` wrapped in `<Suspense>`; throttle to Slow 3G and the sidebar appears before the dishes.

## Check

- Marker per route matches `STRATEGY.md`.
- The exact line that makes checkout dynamic: `const jar = await cookies();` in `app/checkout/page.js`.
- Justification for the only revalidate window: dishes change a few times a day, an hour of staleness is harmless.

## Build output

```
Route (app)            Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ○ /menu                      1h      1y
├   /menu/[id]
│ ├ ● /menu/kitfo
│ ├ ● /menu/doro-wat
│ ├ ● /menu/tibs
│ └ ● [+7 more paths]
└ ○ /orders/history


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

```
