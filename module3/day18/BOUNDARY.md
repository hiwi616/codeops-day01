# BOUNDARY.md — Server & Client Boundary Map (Day 43)

- **middleware.js**: Edge Runtime — Reads session cookie, validates paths via narrow matcher, and executes early redirects before entering Node runtime.
- **lib/session.js**: Server Helper — Reads/writes HTTP-only, secure cookies via Next.js `next/headers`.
- **lib/env.js**: Runtime Helper — Validates environment variables across client (`NEXT_PUBLIC_`) and server boundaries using Zod.
- **app/auth-actions.js**: Server Actions (`'use server'`) — Executes sign-in, sign-out, and ownership-guarded mutations (`cancelOrder`).
- **app/layout.js**: Server Component — Configures zero-CLS self-hosted font (`next/font/google`), resolves session identity, and wraps content with providers.
- **app/signin/page.js**: Server Component — Form targeting server actions with open-redirect sanitization.
- **app/kitchen/page.js**: Server Component — Verifies staff role on the server before rendering the kitchen order queue.
- **app/page.js**: Server Component — Static landing page (`○`)[cite: 1].
- **app/menu/page.js**: Server Component — Directly fetches dishes from data layer; renders responsive `next/image` with priority on LCP element.
- **app/menu/[id]/page.js**: Server Component — Pre-renders static dish HTML using `generateStaticParams` and high-priority hero `next/image`.
- **components/MenuSearch.jsx**: Client Component (`'use client'`) — Interactive leaf utilizing 300ms debounce, `null` key for empty inputs, and SWR caching.
- **components/OrderStatus.jsx**: Client Component (`'use client'`) — Background polling leaf via SWR (`refreshInterval: 5000`) seeded with server `fallbackData`.
- **components/AddToCartButton.jsx**: Client Component (`'use client'`) — Interactive button leaf dispatching items into the cart store.
- **components/Providers.jsx**: Client Component (`'use client'`) — Manages browser cart state and localStorage synchronization.
- **app/cart/page.js**: Client Component (`'use client'`) — Displays interactive cart lines and running ETB calculations[cite: 1].
- **app/checkout/page.js**: Client Component (`'use client'`) — Form component tracking pending submissions with `useActionState`[cite: 1].
- **app/actions.js**: Server Action (`'use server'`) — Server-side order creation and validation logic[cite: 1].
