# Day 17 — Functions, Closures & Higher-Order Functions

JavaScript exercises covering default parameters, arrow functions, closures, factory functions, higher-order functions, and array callbacks.

## Files

1. **`01-vat-function.js`** — `vat(amount, rate = 0.15)` using a default parameter, plus the same logic as an arrow function with an implicit return.
2. **`02-counter-closure.js`** — `makeCounter()` closure that returns a function incrementing a private `count`. Includes a comment explaining why `count` stays private (it's only reachable through the returned function, never exposed directly).
3. **`03-discount-factory.js`** — `discountBy(rate)` factory used to create `memberPrice` (10% off) and `salePrice` (30% off), both applied to a price of 1000 ETB.
4. **`04-apply-to-all.js`** — `applyToAll(list, fn)` higher-order function, used to add VAT to an array of prices.
5. **`05-foreach-cities.js`** — uses `forEach` to print each Ethiopian city with its 1-based index (e.g. "1. Addis Ababa").

## Run

```bash
node 01-vat-function.js
node 02-counter-closure.js
node 03-discount-factory.js
node 04-apply-to-all.js
node 05-foreach-cities.js
```
