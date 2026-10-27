# STRATEGY.md

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | Story and address never change between builds. |
| `/menu` | ISR, 3600 s | Dishes change a few times a day. |
| `/menu/[id]` | Static via params | Every dish is known at build time. |
| `/cart` | Client | Private browser state. |
| `/checkout` | Dynamic | Reads the session cookie via `getSession()` -> `cookies()`. |
| `/orders` | Dynamic | Per-user data, cookie. |
| `/kitchen` | ISR, `revalidate = 3600` + `revalidatePath` | Public order counter: cached for speed, refreshed the moment an order changes. |
| `/api/dishes`, `/api/dishes/[id]` | Dynamic | Read `request.url` / vary per request. |
| `/api/orders` | Dynamic (POST never cached) | A write. |
