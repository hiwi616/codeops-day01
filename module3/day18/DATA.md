# DATA.md — Query Strategy, Lifecycle & Environment Data (Day 43)

| Query Key / Data Source            | Where It Runs              | Refresh Rule                                  | Justification                                                                                                               |
| :--------------------------------- | :------------------------- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Direct DB (`getDishes()`)          | Server Component (`/menu`) | Hourly ISR (`revalidate = 3600`)              | Menu changes infrequently; server pre-rendering eliminates client waterfalls and delivers instant static markup[cite: 1].   |
| `/api/orders/${id}`                | Client Leaf (`useSWR`)     | `refreshInterval: 5000`                       | Real-time status polling for kitchen updates seeded with server `fallbackData` to avoid loading spinners on first paint.    |
| `/api/dishes?q=${debounced}`       | Client Leaf (`useSWR`)     | On debounced input change (`null` when empty) | Dynamic keystroke search; 300ms debounce prevents request floods, and `keepPreviousData: true` prevents layout flashing.    |
| Cart State                         | Client Context             | LocalStorage synced                           | Private to tab; no network overhead until checkout submission.                                                              |
| Runtime Environment (`lib/env.js`) | Node.js Runtime / Edge     | On application boot / build time              | Validates public (`NEXT_PUBLIC_`) and private variables using Zod before server execution to fail fast on misconfiguration. |
