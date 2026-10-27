# AUTH.md — Route Protection & Authorization Matrix

| Route / Action         | Protected By                   | What Each Layer Proves                                                                              |
| :--------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------- |
| `/menu`                | Public                         | Public catalog; indexable, no cookies required[cite: 36].                                           |
| `/checkout`            | Middleware + Page Check        | Proves a session cookie exists, verifies active session[cite: 36].                                  |
| `/orders/:id`          | Middleware + Page Scoped Query | Proves session exists and only renders order data belonging to this account[cite: 36].              |
| `/kitchen`             | Page Check + Role Claim        | Server verifies user.role === 'staff' before rendering queue[cite: 36].                             |
| `cancelOrder` (Action) | Direct Action Authorization    | Verifies session identity AND enforces record ownership (`order.userId === user.id`)[cite: 18, 37]. |

---

## Verification: The Three Attacks

1. **Attack 1 (Signed-out caller):**
   - Action: Calling `cancelOrder("ord_101")` without a session cookie[cite: 38].
   - Result: Refused with `401 Unauthorized: Not signed in`[cite: 18].
2. **Attack 2 (Signed-in caller attacking another account):**
   - Action: Signed in as `usr_1` (Almaz) and calling `cancelOrder("ord_102")` (Dawit's order)[cite: 38].
   - Result: Refused with `403 Forbidden: Not your order`[cite: 18].
3. **Attack 3 (Crafted open redirect link):**
   - Action: Visiting `/signin?next=https://malicious.example.com`[cite: 38].
   - Result: Neutralized by `destination.startsWith("/")` check and redirected safely to `/`[cite: 18].
