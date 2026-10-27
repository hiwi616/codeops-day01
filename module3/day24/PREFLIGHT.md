# PREFLIGHT.md — Production Deployment & Accessibility Audit (Day 48)

## 1. Environment & Build Hygiene

- **Framework Engine**: Next.js 16.4.2 (App Router with Turbopack).
- **Variable Validation**: `lib/env.js` parses environment secrets with Zod before execution, failing fast if missing (`NEXT_PUBLIC_APP_URL`, `SESSION_SECRET`).
- **Clean Compilation**: Verified via `npm run build` with zero uncaught SSR errors or dynamic bailouts[cite: 2].

---

## 2. Accessibility & Synthetic Event Handling (WCAG 2.1 AA)

- **Keyboard Navigation (`app/cart/page.js`)**:
  - Shopping cart items feature `tabIndex={0}` and respond directly to `+`, `-`, and `Delete`/`Backspace` keystrokes.
  - Inputs and buttons carry focus ring indicators (`focus:ring-2 focus:ring-blue-500`).
- **Screen Reader Announcements**:
  - Cart quantity updates broadcast dynamically via `aria-live="polite"` and `aria-live="assertive"`.
  - Visual data charts (`SalesChart.jsx`) embed `.sr-only` semantic table fallbacks.
  - Historical tables (`AccessibleOrderTable.jsx`) use `<caption>`, `scope="col"`, and dynamic `aria-sort` indicators.

---

## 3. Route Protection & Crawler Security

- **Layer 1 Edge Middleware**: Intercepts unauthenticated calls to `/checkout` and `/orders/:path*` with early 307 redirects.
- **Layer 2 Server Role Claim**: Server components enforce `user.role === 'staff'` on `/kitchen`.
- **Layer 3 Action Ownership**: Mutations verify caller ID matches `order.userId` before state modifications.
- **Robots Exclusion Standard**: `/robots.txt` actively denies indexation to private endpoints (`/checkout`, `/orders/*`, `/kitchen`, `/api/*`).

---

## 4. Vercel Pre-Flight Readiness

- [x] All images optimized via `next/image` with responsive `sizes` and high-priority LCP flags.
- [x] Zero-CLS self-hosted fonts verified via `next/font/google` (`display: 'swap'`).
- [x] Dynamic Leaflet map safely isolated inside `components/DeliveryMapWrapper.jsx` (`ssr: false`).
- [x] Real-time endpoints verified: SSE order push stream (`/api/orders/stream`) and CSV export (`/api/orders/export`).
