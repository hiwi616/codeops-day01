# TeleBirr Shop — Loyalty Points Module

A loyalty-points module that tracks a customer's points balance privately, using a closure so the balance can never be read or changed except through the functions the module exposes.

## Files

- **`loyalty-points.js`** — the module itself: `createLoyaltyCard()` factory, the pure calculation helpers, and the default/holiday earn rules.
- **`demo.js`** — a demo script showing earning, redeeming, printing the balance, using a swapped-in earn rule, and two independent cards.

## How the balance stays private

`createLoyaltyCard()` declares a local variable, `points`, inside its own function scope:

```js
function createLoyaltyCard(startingBalance = 0) {
  let points = startingBalance;

  function earn(amountSpent, earnRule = standardEarnRule) { ... }
  function redeem(amount) { ... }
  function balance() { return points; }

  return { earn, redeem, balance };
}
```

The three inner functions (`earn`, `redeem`, `balance`) are defined *inside* `createLoyaltyCard`, so they form **closures** over `points` — each one keeps access to that specific variable even after `createLoyaltyCard` has finished running and returned.

Only those three functions are returned and exposed. `points` itself is never attached to the returned object, never logged, and never returned directly. JavaScript has no way to reach into a function's local scope from the outside — there's no `.points` property to read, no way to `JSON.stringify` it out, and no way to assign a new value to it directly. The only way to change `points` is by calling `earn()` or `redeem()`, and the only way to read it is by calling `balance()`.

Because `createLoyaltyCard()` is a **factory** — a function that returns a fresh set of closures every time it's called — each card gets its own independent `points` variable. Calling it twice (e.g. for Customer A and Customer B) produces two completely separate balances that don't affect each other.

## Design notes (matching the requirements)

- **Private balance** — see above. `card.points` is `undefined`; `Object.keys(card)` only shows `earn`, `redeem`, `balance`.
- **Three operations** — `earn(amount)`, `redeem(amount)`, `balance()` (a getter).
- **Earning** — 1 point per 10 ETB spent by default (`standardEarnRule`), rounded down.
- **Redeeming** — subtracts points, but refuses (returns `false`, leaves the balance unchanged) if it would go below zero.
- **Higher-order earn rule** — `earn(amountSpent, earnRule)` accepts a rule function as its second argument. `calculatePoints(amountSpent, earnRule)` applies whichever rule is passed in. A `holidayEarnRule` (double points) is included and can be swapped in at the call site — `customer.earn(100, holidayEarnRule)` — without editing the module body at all.
- **Pure calculations, edges log** — `standardEarnRule`, `holidayEarnRule`, `calculatePoints`, and `nextRedeemedBalance` are all pure: same input, same output, no side effects. `earn()` and `redeem()` only mutate the private `points` closure variable and return a value; they never call `console.log`. All `console.log` calls live in `demo.js`.

## Run

```bash
node demo.js
```

Expected output includes: points earned from a 250 ETB purchase, a successful redemption, a refused over-redemption (balance unchanged), points earned via the holiday rule, confirmation that `customerA.points` is `undefined`, and two customers with separate, independent balances.
