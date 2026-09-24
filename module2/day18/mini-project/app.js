// app.js
//
// The entry point. Imports the raw data from transactions.js and the
// summary functions from report.js, then prints the full report.
// This is the only file where console.log is used - all calculation
// and formatting logic stays in report.js.

const { transactions } = require("./transactions");
const {
  getCredits,
  getDebits,
  totalAmount,
  formatReceipts,
  correctTransactionAmount,
} = require("./report");

console.log("===== TeleBirr Transaction Report =====\n");

// --- Separate credits and debits, then total each ---
const credits = getCredits(transactions);
const debits = getDebits(transactions);

const totalCredits = totalAmount(credits);
const totalDebits = totalAmount(debits);

console.log(`Total credits: ${totalCredits} ETB (${credits.length} transactions)`);
console.log(`Total debits: ${totalDebits} ETB (${debits.length} transactions)`);
console.log(`Net balance: ${totalCredits - totalDebits} ETB\n`);

// --- Formatted receipt strings for every transaction ---
console.log("--- Receipts ---");
const receipts = formatReceipts(transactions);
receipts.forEach((receipt) => console.log(receipt));

// --- Demonstrate the spread-based correction, without mutating the original ---
console.log("\n--- Correcting a transaction amount (spread, no mutation) ---");
const originalTransaction = transactions[1]; // Dawit Alemu, 450 ETB debit
const correctedTransaction = correctTransactionAmount(originalTransaction, 500);

console.log("Original transaction:", originalTransaction);
console.log("Corrected copy:", correctedTransaction);
console.log(
  "Original unchanged?",
  originalTransaction.amount === 450 && correctedTransaction.amount === 500
);
