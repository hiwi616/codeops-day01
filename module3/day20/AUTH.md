| Route / Action               | Protected By                  | What Each Layer Proves                                                                                           |
| :--------------------------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `/menu`                      | Public                        | Unrestricted public catalog; indexable by search bots; no cookies needed[cite: 1, 3].                            |
| `/checkout`                  | Middleware + Page Check       | Edge middleware ensures session cookie exists; redirects unauthenticated visitors to `/signin?next=%2Fcheckout`. |
| `/orders/:id`                | Middleware + Scoped Retrieval | Confirms authenticated session and scopes data to the account.                                                   |
| `/kitchen`                   | Page Check + Role Claim       | Server verifies `user.role === 'staff'` before rendering the live queue; blocks unauthorized access.             |
| `placeOrder` (Action)        | Server Action Session Check   | Verifies caller is authenticated before accepting order placement and storing records[cite: 1].                  |
| `updateOrderStatus` (Action) | Server Action Staff Check     | Verifies `user.role === 'staff'` before allowing any order status transitions.                                   |
| `cancelOrder` (Action)       | Direct Action Authorization   | Verifies caller identity AND enforces resource ownership (`order.userId === user.id`).                           |

---

## The Three Security Verification Attacks

1. **Attack 1 (Signed-Out Mutation Attempt):**
   - **Action:** Calling `cancelOrder("ord_101")` or `updateOrderStatus("ord_101", "delivering")` without an active session cookie.
   - **Result:** Refused with `401 Unauthorized: Not signed in`.

2. **Attack 2 (Cross-Account Ownership Tampering):**
   - **Action:** Calling `cancelOrder("ord_102")` (Dawit's order) while signed in as `usr_1` (Almaz).
   - **Result:** Refused with `403 Forbidden: Not your order`.

3. **Attack 3 (Crafted Open Redirect Vector):**
   - **Action:** Calling `/signin?next=https://malicious.example.com` or `//malicious.example.com`.
   - **Result:** Neutralized by `destination.startsWith("/") && !destination.startsWith("//")` check; safely routed to `/`.
