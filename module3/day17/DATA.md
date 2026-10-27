# DATA.md — Query Strategy & Lifecycle

| Query Key                    | Where It Runs              | Refresh Rule                                  | Justification                                                                                     |
| :--------------------------- | :------------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Direct DB (`getDishes()`)    | Server Component (`/menu`) | Hourly ISR (`revalidate = 3600`)              | Menu changes infrequently; pre-rendering eliminates client waterfall[cite: 1, 3].                 |
| `/api/orders/${id}`          | Client Leaf (`useSWR`)     | `refreshInterval: 5000`                       | Real-time status polling for kitchen updates seeded with server `fallbackData`[cite: 10, 12, 13]. |
| `/api/dishes?q=${debounced}` | Client Leaf (`useSWR`)     | On debounced input change (`null` when empty) | Dynamic user keystroke query; `keepPreviousData: true` prevents layout flash[cite: 10, 12, 13].   |
| Cart State                   | Client Context             | LocalStorage synced                           | Private to tab; no network overhead until checkout submission[cite: 3].                           |
