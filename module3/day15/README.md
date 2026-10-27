# Addis Eats

A food-ordering app for Ethiopian dishes, built with **Next.js 16 (App Router)**, React 19 and Tailwind CSS 4. Browse the menu, filter by category, build a cart, sign in and place an order.

It is a learning project: I built it to practise the Next.js App Router, and every route has a deliberate rendering strategy and every component has a deliberate place on the server or the client.

## What it demonstrates

- File-based routing with nested layouts, a dynamic route (`/menu/[id]`), and `loading.js`, `error.js` and `not-found.js` states.
- A rendering strategy chosen per route: static, ISR, prerendered from params, dynamic, and client-side state.
- Server components that fetch their own data; `"use client"` only on the small interactive pieces.
- A route handler API and a server action that share one zod schema for validation.
- Authorization checked inside the server action, not only in the UI.
- A checkout form that still works with JavaScript disabled.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev                 # development
npm run build && npm start  # production (use this to judge performance and rendering)
```

Open http://localhost:3000. Demo sign-in users are Almaz and Dawit (a simple cookie, not real authentication).

## Routes

| Route        | Rendering                            | Why                                            |
| ------------ | ------------------------------------ | ---------------------------------------------- |
| `/`          | Static                               | Today's specials are fixed per build.          |
| `/menu`      | ISR, revalidated hourly              | Dishes change a few times a day.               |
| `/menu/[id]` | Static via `generateStaticParams`    | Every dish is known at build time.             |
| `/cart`      | Client                               | Cart state is private to the browser.          |
| `/checkout`  | Dynamic                              | Depends on the session cookie.                 |
| `/orders`    | Dynamic                              | Per-user data.                                 |
| `/kitchen`   | ISR, refreshed with `revalidatePath` | Public counter, updated when an order changes. |

Full reasoning for each route is in [`STRATEGY.md`](./STRATEGY.md); which components run on the server or the client, and why, is in [`BOUNDARY.md`](./BOUNDARY.md).

```
app/
  layout.js  page.js  not-found.js  actions.js
  menu/   layout.js  page.js  loading.js  error.js  [id]/page.js
  cart/  checkout/  orders/  kitchen/
  api/dishes/route.js  api/dishes/[id]/route.js  api/orders/route.js
components/  lib/  scripts/
```

## API

Every error uses the same shape: `{ "error": "...", "fieldErrors": { "field": ["message"] } }`.

| Method and path                       | Success   | Errors                                  |
| ------------------------------------- | --------- | --------------------------------------- |
| `GET /api/dishes` (`?category=Vegan`) | 200 list  | 400 unknown category                    |
| `GET /api/dishes/[id]`                | 200 dish  | 404 no such dish                        |
| `POST /api/orders`                    | 201 order | 400 invalid JSON, 422 validation errors |

The server prices every order from its own menu; the client never sends a price. Orders are placed through the `placeOrder` server action from the checkout form; the action and the API share `lib/schema.js`.

## Verification

Run on the production build.

**Build output**

```
Route (app)            Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ○ /cart
├ ƒ /checkout
├ ○ /kitchen                   1h      1y
├ ○ /menu                      1h      1y
├   /menu/[id]
│ ├ ● /menu/kitfo
│ ├ ● /menu/doro-wat
│ ├ ● /menu/tibs
│ └ ● [+7 more paths]
└ ƒ /orders

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

Every marker matches the strategy table above.

**API checks**

```
curl -i localhost:3000/api/dishes/not-a-dish
-> 404 Not Found   {"error":"No such dish","fieldErrors":{}}

curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0912"}'
-> 422 Unprocessable Entity
   {"error":"Validation failed","fieldErrors":{"phone":["Use 09… or +2519…"],"area":["Choose a delivery area"]}}
```

**Failure checks**

| Check                                                                      | Result                  |
| -------------------------------------------------------------------------- | ----------------------- |
| Slow 3G on `/menu`: shell and sidebar appear first                         | Pass                    |
| Error thrown on the menu page: `error.js` renders, header and cart survive | Pass                    |
| `/menu/not-a-dish`: `not-found.js`                                         | Pass                    |
| Invalid phone at checkout: message shown beside the field                  | Pass                    |
| JavaScript disabled: the order is still placed through the server action   | Pass                    |
| Production bundle searched for secrets (`npm run scan`)                    | Pass, nothing sensitive |
| Signed in as another user, cancelling someone else's order                 | Refused ("Not yours")   |

## Bundle size

Next.js 16 no longer prints First Load JS in `npm run build`, so I measured it with `npm run first-load-js -- menu` on the running production server, which adds up every JavaScript file `/menu` downloads.

| Version                                              | script files | kB raw | kB gzip |
| ---------------------------------------------------- | ------------ | ------ | ------- |
| Server components, directives on the leaves (Day 38) | 10           | 567.7  | 175.9   |
| Final version                                        | 9            | 566.4  | 175.3   |

Most of this is the framework itself (React, the Next.js client runtime and the Turbopack runtime), which every route pays for. The app's own client code is small because only the interactive pieces are client components (`FilterShell`, `AddToCartButton`, `CartBadge`, `CartView`, the forms and the cart provider). The dish list, cards, layouts and pages are server components and ship no JavaScript.

I did not build a client-only Vite version of Addis Eats, so there is no Vite baseline here. The Vite versus Next.js comparison is done on my clinic booking project instead.

## Limitations

- Orders are stored in memory and reset when the server restarts.
- Sign-in is a demo cookie with two fixed users, not real authentication.
- There is no payment integration.
- The error button on `/menu` and the cancel-by-id box on `/orders` are demo aids for testing the error boundary and the ownership check.

## Notes on Next.js 16

Cache Components, the new caching model recommended in 16.4, are left off on purpose in `next.config.mjs`. This project uses the route-segment options (`revalidate`, `dynamic`, `generateStaticParams`), which Cache Components does not allow.
