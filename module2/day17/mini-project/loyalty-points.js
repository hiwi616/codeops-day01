// loyalty-points.js
//
// A loyalty-points module for a TeleBirr shop. Each card's points
// balance is kept private inside a closure - the only way to read or
// change it is through the earn/redeem/balance functions this module
// exposes. Calculation logic is pure; no console output happens here.

// ---- Pure calculation helpers -------------------------------------

// The default earn rule: 1 point per 10 ETB spent, rounded down.
// A pure function - same input always gives the same output, no side effects.
function standardEarnRule(amountSpent) {
  return Math.floor(amountSpent / 10);
}

// A holiday earn rule: double points. Also pure. This can be passed
// into earn() instead of the standard rule, without touching the
// module's internals at all.
function holidayEarnRule(amountSpent) {
  return Math.floor(amountSpent / 10) * 2;
}

// calculatePoints is the higher-order function: it takes an earn rule
// (itself a function) as a parameter and applies it. This is what lets
// callers swap in a different rule (e.g. holidayEarnRule) without any
// changes to the module body.
function calculatePoints(amountSpent, earnRule) {
  return earnRule(amountSpent);
}

// nextRedeemedBalance is a pure helper that computes what the balance
// WOULD be after a redemption, without actually changing anything.
// It returns null if the redemption would push the balance below zero,
// so the caller can decide what to do (this keeps the function pure -
// no throwing, no logging, just a value).
function nextRedeemedBalance(currentBalance, amount) {
  const result = currentBalance - amount;
  return result < 0 ? null : result;
}

// ---- The factory: creates a new, independent loyalty card ---------

function createLoyaltyCard(startingBalance = 0) {
  // `points` lives only inside this function's scope. The three
  // functions returned below form closures over `points` - they can
  // read and update it, but nothing outside this factory call can
  // reach it directly. There is no property or variable exposed that
  // holds `points`, so it cannot be read or overwritten from outside
  // except by calling earn(), redeem(), or balance().
  let points = startingBalance;

  function earn(amountSpent, earnRule = standardEarnRule) {
    const pointsEarned = calculatePoints(amountSpent, earnRule);
    points += pointsEarned;
    return pointsEarned; // pure calculation result, no logging here
  }

  function redeem(amount) {
    const nextBalance = nextRedeemedBalance(points, amount);
    if (nextBalance === null) {
      return false; // refused - would go below zero
    }
    points = nextBalance;
    return true; // redemption succeeded
  }

  function balance() {
    return points; // read-only getter - the only way to see the balance
  }

  return { earn, redeem, balance };
}

module.exports = {
  createLoyaltyCard,
  standardEarnRule,
  holidayEarnRule,
  calculatePoints,
  nextRedeemedBalance,
};
