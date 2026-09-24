# TeleBirr Tip & Split Calculator

A script that takes a bill amount and party size, adds a tiered tip, adds a payment-method service fee, and prints the total and amount per person in ETB.

## Files

- **`tip.js`** — the script itself.
- **`expected.txt`** — the exact console output `node tip.js` should produce with the sample inputs baked into the script.
- **`README.md`** — this file.

## How it works

- **Inputs**: `billInput` and `partySizeInput` are defined as strings (like they might come from a form or command line), then converted with `Number()`.
- **Tiered tip**: 10% tip when the bill is strictly over 300 ETB, otherwise 5%.
- **Service fee (via `switch`)**: based on `paymentMethod` —
  - `"telebirr"` → 1.5% service fee
  - `"cbebirr"` → 1% service fee
  - `"cash"` (or anything else) → no service fee
- **Total & per-person amount**: `total = bill + tip + serviceFee`, then `total / partySize`.
- **Output**: printed with template literals, one clear line per value.

## Run

```bash
node tip.js
```

Then compare the output to `expected.txt` — they should match exactly with the sample inputs currently in the script (bill `450`, party size `3`, payment method `"telebirr"`).

To try different values, edit `billInput`, `partySizeInput`, or `paymentMethod` at the top of `tip.js` and re-run.

## Self-check

- ✅ Reads `bill` and `partySize`, converting both with `Number()`.
- ✅ Adds a 10% tip when the bill is over 300 ETB, else 5% (verified at the boundary: a bill of exactly 300 correctly gets 5%, not 10%).
- ✅ Computes the total and the per-person amount.
- ✅ Prints a clear message using template literals.
- ✅ Uses a `switch` to add a TeleBirr / CBE Birr service fee.
- ✅ Running `node tip.js` matches `expected.txt` exactly (verified — both generated from the same real run).
