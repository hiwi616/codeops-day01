// transactions.js
//
// Responsible for holding the raw TeleBirr transaction data for the
// Addis shop. This module exports nothing but data - no calculations,
// no formatting, no console output.

const transactions = [
  { id: 1, customer: "Almaz Bekele", amount: 1200, type: "credit" },
  { id: 2, customer: "Dawit Alemu", amount: 450, type: "debit" },
  { id: 3, customer: "Tigist Worku", amount: 3000, type: "credit" },
  { id: 4, customer: "Hanna Girma", amount: 800, type: "debit" },
  { id: 5, customer: "Yonas Tesfaye", amount: 1500, type: "credit" },
  { id: 6, customer: "Marta Solomon", amount: 250, type: "debit" },
  { id: 7, customer: "Abel Mekonnen", amount: 2200, type: "credit" },
];

module.exports = { transactions };
