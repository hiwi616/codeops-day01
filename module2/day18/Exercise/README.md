# Day 18 — Daily Exercise

Practicing array methods, object destructuring, spread, and ES module basics. No manual for-loops with counters — array methods only where applicable.

## Files

1. **`01-vat-prices.js`** — Takes an array of ETB prices, uses `map` to add 15% VAT, `filter` to keep prices under 1000, and `reduce` to compute the grand total.
2. **`02-customer-entries.js`** — Builds a customer object (`name`, `city`, `balance`) and logs every key/value pair using `Object.entries` inside a `for...of` loop.
3. **`03-destructure-greet.js`** — Destructures `name` and `city` from a customer in one line, and defines `greet({ name })` using parameter destructuring.
4. **`04-spread-update.js`** — Uses the spread operator to create an updated copy of a customer (new city + phone field) without mutating the original object.
5. **`money.js` + `app.js`** — `money.js` exports `addVat` and `VAT`; `app.js` imports them and applies `addVat` across a list of prices.

## Run

```bash
node 01-vat-prices.js
node 02-customer-entries.js
node 03-destructure-greet.js
node 04-spread-update.js
node app.js
```
