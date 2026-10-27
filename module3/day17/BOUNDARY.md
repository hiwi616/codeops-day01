# BOUNDARY.md — Server and Client Boundary Map (Day 42)

- **middleware.js**: Edge Runtime — Reads session cookie, runs narrow path matcher, performs early redirects[cite: 14, 15].
- **lib/session.js**: Server Helper — Reads/writes HTTP-only, secure cookies (`next/headers`)[cite: 16, 20].
- **app/auth-actions.js**: Server Actions (`'use server'`) — Executes sign-in, sign-out, and ownership-guarded mutations[cite: 18, 20].
- **app/layout.js**: Server Component — Resolves session identity to conditionally display navigation links[cite: 3, 18].
- **app/signin/page.js**: Server Component — Accessible sign-in form with server actions and redirect sanitization[cite: 18, 20].
- **app/kitchen/page.js**: Server Component — Verifies staff role on server before rendering orders[cite: 18, 20].
- **app/menu/page.js**: Server Component — Directly awaits dishes from data layer; no client JS overhead[cite: 3].
- **app/menu/[id]/page.js**: Server Component — Pre-renders static dish HTML via `generateStaticParams`[cite: 3, 4].
- **components/MenuSearch.jsx**: Client Component (`'use client'`) — Debounced SWR search leaf[cite: 10, 13].
- **components/OrderStatus.jsx**: Client Component (`'use client'`) — SWR background polling leaf[cite: 10, 13].
- **components/AddToCartButton.jsx**: Client Component (`'use client'`) — Interactive button leaf dispatching items to cart store[cite: 3].
- **components/Providers.jsx**: Client Component (`'use client'`) — Cart Context provider wrapping server children[cite: 3].
- **app/cart/page.js**: Client Component (`'use client'`) — Displays interactive order lines[cite: 1, 3].
- **app/checkout/page.js**: Client Component (`'use client'`) — Progressive form using `useActionState`[cite: 1, 2].
