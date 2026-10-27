# AUTH.md — Three-Layer Route Protection & Live Attack Verification (Day 49)

## 1. Multi-Layer Protection Matrix

| Route / Action        | Layer 1: Edge Middleware                                | Layer 2: Server Page / Role Check             | Layer 3: Action Ownership Check                      |
| :-------------------- | :------------------------------------------------------ | :-------------------------------------------- | :--------------------------------------------------- |
| `/menu`, `/menu/[id]` | Public (excluded from matcher)                          | Public Server Components                      | N/A (Read-only)                                      |
| `/checkout`           | Redirects unauthenticated to `/signin?next=%2Fcheckout` | Session hydrated in layout                    | `placeOrder` validates session & Zod schema          |
| `/orders/[id]`        | Redirects unauthenticated to `/signin?next=...`         | Seeds `fallbackData` server-side              | `cancelOrder` verifies `order.userId === user.id`    |
| `/orders/history`     | Protected route                                         | Calls `getSession()`, redirects if null       | Read-only scoped history                             |
| `/kitchen`            | Public path in middleware                               | Enforces `user.role === 'staff'` server-side  | `updateOrderStatus` enforces `user.role === 'staff'` |
| `/api/orders/export`  | API route                                               | Enforces `getSession()` (`401` if signed out) | Scoped CSV stream                                    |

---

## 2. The Three Live Security Verification Attacks

1. **Attack 1 — Signed-Out Server Action Call**:
   - **Vector**: Invoking `cancelOrder("ord_101")` without a valid session cookie.
   - **Defense**: `app/auth-actions.js` inspects `await getSession()` before touching data.
   - **Live Refusal**: `{ error: "401 Unauthorized: Not signed in", status: 401 }`.

2. **Attack 2 — Cross-Account Tampered Record ID**:
   - **Vector**: Signed in as Almaz (`usr_1`) and invoking `cancelOrder("ord_102")` (Dawit's order, owned by `usr_2`).
   - **Defense**: `cancelOrder` compares `order.userId !== user.id` on the server.
   - **Live Refusal**: `{ error: "403 Forbidden: Not your order", status: 403 }`.

3. **Attack 3 — Crafted External Open Redirect**:
   - **Vector**: Navigating to `/signin?next=https://malicious.example.com` or `/signin?next=//evil.com`.
   - **Defense**: `signIn` action validates `rawNext.startsWith("/") && !rawNext.startsWith("//")`.
   - **Live Refusal**: External URL is discarded and user is safely routed to `/`.
