# Addis Eats — Full Stack Next.js Food Ordering Platform (Day 42)

A food ordering application built on Next.js App Router featuring server-side rendering strategies, SWR live data polling, edge middleware, and three-layer authentication protection[cite: 1, 9, 14, 17].

---

## 1. Day 42 Security & Route Protection Architecture

- **Layer 1: Edge Middleware (`middleware.js`)**:
  - Intercepts requests to `/checkout` and `/orders/:path*` using a narrow matcher[cite: 14, 20].
  - Immediately redirects signed-out users to `/signin?next=...` before layouts or server queries execute[cite: 14, 15].
- **Layer 2: Page-Level Identity & Role Verification**:
  - Private pages (`/kitchen`) check role claims server-side (`user.role === 'staff'`) rather than merely hiding links in the UI[cite: 18, 20].
- **Layer 3: Mutation & Action Ownership Checks (`app/auth-actions.js`)**:
  - Every mutation enforces both authentication AND resource ownership (`order.userId === user.id`)[cite: 17, 18, 20].
- **Cookie Flags**:
  - Set with `httpOnly: true`, `secure: true`, `sameSite: 'lax'`, and 7-day `maxAge` to block script inspection and cross-site request attacks[cite: 16, 20].

---

## 2. The Three Security Verification Attacks

1. **Attack 1 (Signed-Out Mutation Attempt):**
   - Calling `cancelOrder("ord_101")` without a session cookie is refused with:
     `401 Unauthorized: Not signed in`[cite: 18, 38].
2. **Attack 2 (Tampered Resource Ownership Attempt):**
   - Signed in as Almaz (`usr_1`) and attempting to cancel Dawit's order (`ord_102`) is refused with:
     `403 Forbidden: Not your order`[cite: 18, 38].
3. **Attack 3 (Crafted Open Redirect Attempt):**
   - Accessing `/signin?next=https://malicious.example.com` is safely redirected to `/` via `next.startsWith("/")` sanitization[cite: 18, 38].

---

## 3. Documentation Index

- [`AUTH.md`](./AUTH.md) — Route protection matrix and verification attack proofs[cite: 20].
- [`STRATEGY.md`](./STRATEGY.md) — Route rendering strategies and revalidation intervals[cite: 3, 7].
- [`BOUNDARY.md`](./BOUNDARY.md) — Server vs. Client component boundary definitions[cite: 3, 7].
- [`DATA.md`](./DATA.md) — Query lifecycles, caching rules, and SWR keys[cite: 13, 37].

---

## 4. Getting Started & Verification

```bash
npm run build
npm run start
```
