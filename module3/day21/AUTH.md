# AUTH.md — Route Protection & Authorization Matrix (Day 46)

| Route / Action               | Protected By                  | What Each Layer Proves                                                                                                                               |
| :--------------------------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/menu`                      | Public                        | Unrestricted public catalog; indexable by search bots; no cookies needed[cite: 1, 3].                                                                |
| `/checkout`                  | Middleware + Page Check       | Edge middleware ensures session cookie exists; redirects unauthenticated visitors to `/signin?next=%2Fcheckout`.                                     |
| `/orders/:id`                | Middleware + Scoped Retrieval | Confirms authenticated session and scopes data to the account.                                                                                       |
| `/orders/history`            | Page Check (`getSession()`)   | Requires active session to inspect order records and category sales analytics; redirects unauthenticated visitors to `/signin?next=/orders/history`. |
| `/kitchen`                   | Page Check + Role Claim       | Server verifies `user.role === 'staff'` before rendering the live queue; blocks unauthorized access.                                                 |
| `placeOrder` (Action)        | Server Action Session Check   | Verifies caller is authenticated before accepting order placement and storing records[cite: 1].                                                      |
| `updateOrderStatus` (Action) | Server Action Staff Check     | Verifies `user.role === 'staff'` before allowing any order status transitions.                                                                       |
| `cancelOrder` (Action)       | Direct Action Authorization   | Verifies caller identity AND enforces resource ownership (`order.userId === user.id`).                                                               |

---

## Security Verification Attack Proofs

1. **Attack 1 (Unauthenticated Order History Access):**
   - **Action:** Direct navigation or `curl -i http://localhost:3000/orders/history` without a session cookie.
   - **Result:** Handled with a redirect to `/signin?next=/orders/history`.

2. **Attack 2 (Cross-Account Order Tampering):**
   - **Action:** Attempting to mutate or cancel order `ord_102` while signed in as `usr_1` (Almaz).
   - **Result:** Refused with `403 Forbidden: Not your order`.

3. **Attack 3 (Open Redirect Vector via Query String):**
   - **Action:** Accessing `/signin?next=https://malicious.example.com`.
   - **Result:** Neutralized by path boundary validation (`destination.startsWith("/") && !destination.startsWith("//")`), safely defaulting to `/`.
