# STRATEGY.md - how each route is rendered, and why

Two questions per route: **does it depend on who is asking?** and **how stale may it be?**

| Route | Strategy | Marker | Why |
| --- | --- | --- | --- |
| `/` | Static | ○ | The story and address never change between builds. |
| `/menu` | ISR, `revalidate = 3600` | ○ | Dishes change a few times a day; an hour-old menu misleads nobody and speed matters most. |
| `/menu/[id]` | Static via `generateStaticParams` | ● | Every dish id is known at build time, so each dish is a plain HTML file. |
| `/cart` | Client | ○ | One person's private state; the page shell is static, the cart renders in the browser. |
| `/checkout` | Dynamic (`force-dynamic`) | ƒ | Reads the session cookie with `cookies()`; the response depends on who asks. |
| `/orders/history` | Static | ○ | Placeholder content in Day 37. |

Next.js 16 prints `ƒ` (Dynamic) where the sheets print `λ`, and no longer prints Size or First Load JS.

## Streaming
`/menu` sends the heading and the sidebar (from `app/menu/layout.js`) immediately; `<DishList />` is wrapped in `<Suspense>` and streams in behind them.

## Traps avoided
- `Header` and `Footer` never read cookies or headers, otherwise every page would turn dynamic.
- Layouts never re-run on navigation, so the sidebar counter keeps its value.
