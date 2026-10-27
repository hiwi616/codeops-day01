# DATA.md — Query Strategy, Data Lifecycles & Real-Time Formats (Day 47)

| Query Key / Data Source               | Where It Runs                        | Refresh Rule / Transport                 | Justification                                                                  |
| :------------------------------------ | :----------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------- |
| Direct DB (`getDishes()`)             | Server Component (`/menu`)           | Hourly ISR (`revalidate = 3600`)         | Infrequently changing catalog; eliminates client waterfall.                    |
| SSE Stream (`/api/orders/stream`)     | Server Route Handler                 | Push (`text/event-stream`, 4s heartbeat) | Real-time push stream without polling overhead.                                |
| CSV Export (`/api/orders/export`)     | Server Route Handler                 | On demand (`GET`)                        | Streams RFC 4180 CSV export files.                                             |
| Order History Params (`searchParams`) | Server Component (`/orders/history`) | URL Request Time                         | Server-side sorting and pagination without heavy client-side table bundles.    |
| Leaflet Geo Data                      | Client Component (`<DeliveryMap />`) | Static Client Leaf                       | Visualizes Addis Ababa delivery radius on an interactive OpenStreetMap canvas. |
| `/api/orders/${id}`                   | Client Hook (`useSWR`)               | `refreshInterval: 5000`                  | Real-time polling seeded with server `fallbackData`.                           |
| `/api/dishes?q=${debounced}`          | Client Hook (`useSWR`)               | On debounced input change                | Keystroke search with 300ms debounce.                                          |
| Cart State                            | Client Context (`useCart`)           | LocalStorage synced                      | Tab-private state with zero network overhead.                                  |
