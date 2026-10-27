# BOUNDARY.md — Server & Client Boundary Map (Day 41)

- **app/layout.js**: Server Component — Root layout shell, renders global header and passes children to `Providers`[cite: 3].
- **components/Providers.jsx**: Client Component (`'use client'`) — Manages browser cart state and localStorage synchronization[cite: 3].
- **app/page.js**: Server Component — Static landing page (`○`)[cite: 1, 4].
- **app/menu/page.js**: Server Component — Direct asynchronous data access (`await getDishes()`) with hourly ISR (`revalidate = 3600`)[cite: 1, 3].
- **app/menu/[id]/page.js**: Server Component — Dynamic segment statically pre-rendered via `generateStaticParams`[cite: 1, 3, 4].
- **components/MenuSearch.jsx**: Client Component (`'use client'`) — Interactive leaf utilizing 300ms debounce, `null` key for empty queries, and SWR caching with `keepPreviousData: true`.
- **components/OrderStatus.jsx**: Client Component (`'use client'`) — Background polling leaf via SWR (`refreshInterval: 5000`) seeded with server-side `fallbackData`[cite: 10, 12, 13].
- **components/AddToCartButton.jsx**: Client Component (`'use client'`) — Interactive button leaf dispatching items into the cart store[cite: 3].
- **app/cart/page.js**: Client Component (`'use client'`) — Displays interactive cart lines and running ETB calculations[cite: 1, 3].
- **app/checkout/page.js**: Client Component (`'use client'`) — Form component tracking pending submissions with `useActionState`[cite: 1, 2].
- **app/actions.js**: Server Action (`'use server'`) — Server-side order creation and Zod schema validation[cite: 1, 3].
