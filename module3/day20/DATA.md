# DATA.md — Query Strategy & Data Lifecycles (Day 45)

| Query Key / Data Source      | Where It Runs                 | Refresh Rule                                  | Justification                                                                                                             |
| :--------------------------- | :---------------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Direct DB (`getDishes()`)    | Server Component (`/menu`)    | Hourly ISR (`revalidate = 3600`)              | Dish catalog changes infrequently; server pre-rendering eliminates client waterfalls[cite: 1, 3].                         |
| `globalThis.ORDERS_DB`       | Server Actions / API Routes   | Mutation (`revalidatePath`)                   | In-memory simulated persistence across server actions (`placeOrder`, `updateOrderStatus`) and route handlers[cite: 1, 3]. |
| `/api/orders/${id}`          | Client Hook (`useSWR`)        | `refreshInterval: 5000`                       | Real-time status polling for kitchen updates seeded with server `fallbackData` to avoid first-paint spinners.             |
| `/api/dishes?q=${debounced}` | Client Hook (`useSWR`)        | On debounced input change (`null` when empty) | Keystroke search; 300ms debounce prevents request floods, and `keepPreviousData: true` prevents layout flashing.          |
| Cart State                   | Client Context (`useCart`)    | LocalStorage synced                           | Private to browser tab; zero network overhead until checkout submission[cite: 3].                                         |
| Sitemap (`sitemap()`)        | Server Route (`/sitemap.xml`) | Build & Request Time                          | Dynamically queries all 15 authentic dish IDs to publish search engine crawler paths.                                     |
| Environment (`lib/env.js`)   | Node.js Runtime / Edge        | App Initialization                            | Validates public (`NEXT_PUBLIC_APP_URL`) and server secrets via Zod before server execution.                              |
