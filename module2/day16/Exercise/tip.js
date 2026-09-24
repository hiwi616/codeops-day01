// tip.js
//
// TeleBirr tip & split calculator.
// Takes a bill amount and party size, adds a tiered tip, adds a
// payment-method service fee via a switch, then prints the total
// and the amount per person in ETB.

// ---- Sample inputs (as if read from a form or command line) -----------
const billInput = "450";       // bill amount, as a string - needs Number()
const partySizeInput = "3";    // party size, as a string - needs Number()
const paymentMethod = "telebirr"; // "telebirr", "cbebirr", or "cash"

// ---- Read and convert the inputs ---------------------------------------
const bill = Number(billInput);
const partySize = Number(partySizeInput);

// ---- Tiered tip: 10% when the bill is over 300 ETB, else 5% -----------
const tipRate = bill > 300 ? 0.10 : 0.05;
const tipAmount = bill * tipRate;

// ---- Service fee via switch, based on payment method -------------------
let serviceFeeRate;

switch (paymentMethod) {
  case "telebirr":
    serviceFeeRate = 0.015; // 1.5% TeleBirr service fee
    break;
  case "cbebirr":
    serviceFeeRate = 0.01; // 1% CBE Birr service fee
    break;
  case "cash":
    serviceFeeRate = 0; // no service fee for cash
    break;
  default:
    serviceFeeRate = 0;
}

const serviceFee = bill * serviceFeeRate;

// ---- Compute the total and per-person amount ---------------------------
const total = bill + tipAmount + serviceFee;
const perPerson = total / partySize;

// ---- Print a clear message using template literals ---------------------
console.log(`Bill: ${bill.toFixed(2)} ETB`);
console.log(`Tip (${(tipRate * 100).toFixed(0)}%): ${tipAmount.toFixed(2)} ETB`);
console.log(`Service fee (${paymentMethod}, ${(serviceFeeRate * 100).toFixed(1)}%): ${serviceFee.toFixed(2)} ETB`);
console.log(`Total: ${total.toFixed(2)} ETB`);
console.log(`Party size: ${partySize}`);
console.log(`Amount per person: ${perPerson.toFixed(2)} ETB`);
