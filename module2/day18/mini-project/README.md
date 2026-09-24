# TeleBirr Transaction Report

A small report generator over a list of TeleBirr transactions for an Addis shop, using `map`/`filter`/`reduce`, destructuring, and spread — split across reusable modules.

## Files

- **`transactions.js`** — holds the raw transaction data. Each transaction is `{ id, customer, amount, type }`, where `type` is `"credit"` or `"debit"` and `amount` is in ETB. This module only exports data; it does no calculation or formatting.
- **`report.js`** — exports the summary logic:
  - `getCredits` / `getDebits` — use `filter` to separate transactions by type.
  - `totalAmount` — uses `reduce` to total a list of transactions' amounts.
  - `formatReceipts` — uses `map`, destructuring `{ customer, amount, type }` directly in the callback parameter, to build formatted receipt strings with template literals.
  - `correctTransactionAmount` — uses spread (`{ ...transaction, amount: newAmount }`) to return an **updated copy** of a transaction with a corrected amount, leaving the original object untouched.

  All functions in this module are pure — they take input and return output, with no `console.log` calls.
- **`app.js`** — the entry point. Imports the data from `transactions.js` and the functions from `report.js`, then prints the full report. This is the only file where `console.log` is used.
- **`sample-output.txt`** — a saved sample of the printed report from running `app.js`.

## Run

```bash
node app.js
```

## Self-check

- ✅ Uses `filter`, `map`, and `reduce` — no manual counter loops.
- ✅ `formatReceipts`'s callback destructures `{ customer, amount, type }` in its parameter.
- ✅ `correctTransactionAmount` uses spread to produce a new object; the original transaction (`transactions[1]`, Dawit Alemu's 450 ETB debit) stays unchanged, confirmed by `originalTransaction.amount === 450 && correctedTransaction.amount === 500` printing `true`.
- ✅ Logic is split across `transactions.js` (data), `report.js` (summary functions), and `app.js` (prints the report), with clear `module.exports` / `require` lines.
- ✅ Receipt strings are built with template literals showing the customer and ETB amount, e.g. `` `${label}: ${customer} - ${amount} ETB` ``.
