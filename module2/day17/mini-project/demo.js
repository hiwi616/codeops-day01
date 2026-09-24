// demo.js
//
// Demo script for the loyalty-points module. All console.log calls
// (side effects) live here, at the edge of the program - the module
// itself never logs anything.

const { createLoyaltyCard, holidayEarnRule } = require("./loyalty-points");

console.log("=== Customer A's card ===");
const customerA = createLoyaltyCard();

console.log("Starting balance:", customerA.balance());

const earned1 = customerA.earn(250); // 250 ETB spent -> 25 points (standard rule)
console.log(`Earned ${earned1} points for spending 250 ETB.`);
console.log("Balance after earning:", customerA.balance());

const redeemed1 = customerA.redeem(10);
console.log(`Redeem 10 points -> ${redeemed1 ? "success" : "refused"}.`);
console.log("Balance after redeeming 10:", customerA.balance());

// Try to redeem more points than the customer has - should be refused
const redeemed2 = customerA.redeem(1000);
console.log(`Redeem 1000 points -> ${redeemed2 ? "success" : "refused"}.`);
console.log("Balance stays at:", customerA.balance());

// Swap in the holiday earn rule (double points) without touching the module
const earned2 = customerA.earn(100, holidayEarnRule);
console.log(`Earned ${earned2} points for spending 100 ETB using the holiday rule (double points).`);
console.log("Balance after holiday earning:", customerA.balance());

// Confirm the balance can't be read or set directly from outside -
// there is no `.points` property on the returned object.
console.log("Direct access attempt customerA.points:", customerA.points); // undefined

console.log("\n=== Customer B's card (independent balance) ===");
const customerB = createLoyaltyCard();

console.log("Customer B starting balance:", customerB.balance());
const earnedB = customerB.earn(500);
console.log(`Customer B earned ${earnedB} points for spending 500 ETB.`);
console.log("Customer B balance:", customerB.balance());

console.log("\nFinal check - each card keeps its own balance:");
console.log("Customer A balance:", customerA.balance());
console.log("Customer B balance:", customerB.balance());
