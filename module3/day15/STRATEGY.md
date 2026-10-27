# STRATEGY.md

One line per route: the strategy, and why. Marker = what `npm run build` prints (Next.js 16: `○` static, `●` prerendered from params, `ƒ` dynamic).

| Route | Strategy | Marker | Why |
| --- | --- | --- | --- |
| `/` | Static | ○ | Today's specials are fixed per build; nobody in particular asks. |
| `/menu` | ISR, `revalidate = 3600` | ○ | Dishes change a few times a day; an hour of staleness misleads nobody, speed matters most. |
| `/menu/[id]` | Static via `generateStaticParams` | ● | Every dish id is known at build time. |
| `/cart` | Client | ○ | Private to one browser; the page is static HTML, `CartView` renders the cart from `localStorage`. |
| `/checkout` | Dynamic, `force-dynamic` | ƒ | Reads the session cookie (`getSession()` -> `cookies()`) and validates against live prices. |
| `/orders` | Dynamic, `force-dynamic` | ƒ | Per-user list, depends on the cookie. |
| `/kitchen` | ISR, `revalidate = 3600` + `revalidatePath` | ○ | Public order counter: cached for speed, refreshed the moment an order changes. |
| `/api/dishes` | Route handler (dynamic) | ƒ | Reads `request.url` for `?category=`. For outside callers only. |
| `/api/dishes/[id]` | Route handler (dynamic) | ƒ | Per-id lookup, honest 404. |
| `/api/orders` | Route handler, POST | ƒ | A write; never cached. |

## One route I changed my mind about
`/cart` first looked like it needed `"use client"` on the whole page. Pushing the directive down into `CartView` keeps the page a server component and ships far less JavaScript.

## Traps avoided
- `Header`/`Footer`/layouts never read cookies, otherwise every route would turn dynamic.
- Prices are never accepted from the client; `lib/orders.js` re-prices from the menu.
