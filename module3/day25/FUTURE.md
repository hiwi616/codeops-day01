# FUTURE.md — MoSCoW Triage, Scope Cuts & Post-Capstone Roadmap (Day 49)

## 1. MoSCoW Triage Matrix

### Must Have (Completed & Verified)

- **Hybrid Rendering Architecture**: Hourly ISR on `/menu`, static pre-rendering (`generateStaticParams`) for all 15 authentic Ethiopian dishes on `/menu/[id]`, and dynamic SSR on session-scoped routes.
- **Three-Layer Security Defense**:
  1. Edge Middleware (`middleware.js`) blocking unauthenticated traffic to `/checkout` and `/orders/:path*`.
  2. Server Component Role Gating (`user.role === 'staff'`) on `/kitchen`.
  3. Server Action Ownership Verification (`order.userId === user.id`) in `cancelOrder` and `updateOrderStatus`.
- **Live Data Lifecycle**: Server-seeded `fallbackData` with 5-second SWR background polling on `/orders/[id]` and 300ms debounced dish search with `keepPreviousData: true`.
- **Core Web Vitals & SEO**: Zero-CLS self-hosted `Inter` font via `next/font/google`, responsive WebP/AVIF local imagery via `next/image`, dynamic Open Graph tags, Schema.org JSON-LD (`Restaurant` and `MenuItem`), `/sitemap.xml`, and `/robots.txt`.

### Should Have (Completed & Verified)

- **Data Representation & Analytics**: Recharts category revenue visualization (`SalesChart.jsx`) with `.sr-only` screen-reader table fallback and semantic HTML order register (`AccessibleOrderTable.jsx`) with server-side URL sorting and pagination (`/orders/history`).
- **Geospatial & Real-Time Streams**: Client-isolated Leaflet delivery zone map (`ssr: false`), Server-Sent Events (`/api/orders/stream`), RFC 4180 CSV export (`/api/orders/export`), and `Intl` ETB/EAT formatting.
- **Keyboard Accessibility**: Synthetic keyboard handlers (`+`, `-`, `Delete`) and `aria-live` regions on `/cart`.

### Could Have (Consciously Cut to Protect Build Quality)

- **Live Telebirr / Chapa Payment Webhook Integration**: Cut from the 4-hour capstone build window to avoid external third-party sandbox flakiness during the live 8-minute demo.
- **Multi-Driver Live GPS Socket Tracking**: Simplified to a 5km Bole Medhanialem delivery radius polygon on OpenStreetMap to keep client bundle weight minimal and deterministic.

### Won't Have (Out of Scope for Module 3)

- **Native iOS/Android Rider App**: Deferred to future mobile track.

---

## 2. Module 4 Backend & Infrastructure Roadmap

1. **Persistent PostgreSQL + Prisma ORM**: Replace `globalThis.ORDERS_DB` in-memory store with a managed PostgreSQL instance and row-level locking for kitchen state transitions.
2. **Cryptographic JWT / Session Store**: Upgrade HMAC cookie signing to Redis-backed sliding sessions with refresh token rotation.
3. **Automated End-to-End Playwright Suite**: Codify the curl contract battery and the Three Security Attacks into CI/CD GitHub Actions.
