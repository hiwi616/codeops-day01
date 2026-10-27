# Day 38 - Server and client components

Same behaviour as Day 37, different download: the browser only gets code for things that must react to the user.

## What changed

- `app/menu/page.js` is an **async server component** that awaits its dishes. The Vite version's `useFetch` hook and its loading/error state are gone; `loading.js`, `error.js` and `notFound()` hold those states.
- Client leaves only: `FilterShell`, `AddToCartButton`, `CartBadge`, `CartView`, `Providers`/`CartProvider`.
- `components/Providers.jsx` wraps `children`; `app/layout.js` is still a server component.
- `FilterShell` (client) wraps `DishList` (server) through `children`, never through an import.
- `npm run boundary` lists every file containing `"use client"`.
- `BOUNDARY.md` documents every component and why it runs where it does.

## Run

```bash
npm install
npm run build && npm start
npm run boundary
```

## Exercise 7 - First Load JS for /menu

Next.js 16 no longer prints First Load JS in `npm run build`, so I measured it with `scripts/first-load-js.mjs`. It fetches the route from the running production server and adds up every JavaScript file the page loads.

```bash
npm run build && npm start         # terminal 1
npm run first-load-js -- menu      # terminal 2
```

|                                                            | script files | kB raw | kB gzip |
| ---------------------------------------------------------- | ------------ | ------ | ------- |
| /menu before (directive too high on DishCard and DishList) | TODO         | TODO   | TODO    |
| /menu after (directives on leaves only)                    | 10           | 567.7  | 175.9   |

Detail of the "after" measurement (gzip): 70.3 kB, 45.2 kB, 38.7 kB, 7.4 kB, 6.8 kB, 3.8 kB, 1.9 kB, 1.0 kB, 0.4 kB, 0.3 kB.

**Explanation:** most of the 175.9 kB gzip is the framework itself (React, the Next.js client runtime and the Turbopack runtime), which every route needs whatever I do. What I control is what is added on top. With `"use client"` on `DishCard` and `DishList`, those components and everything they import are bundled and shipped to the browser. Pushed down to the leaves, they are rendered on the server as plain HTML and send no JavaScript. The saving is small here because these components are tiny, but it grows with the size of the components and the libraries they use.

## Proof that DishList is not shipped

I searched the production JavaScript for a string that only appears in the DishList/DishCard markup:

```bash
grep -rl "mt-4 grid gap-4" .next/static
```

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
