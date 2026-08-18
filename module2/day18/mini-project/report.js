// report.js
//
// Responsible for the summary logic: separating credits/debits,
// totaling them, formatting receipt strings, and producing an
// updated (non-mutated) copy of a single transaction. No raw data
// lives here, and no console output happens here - only pure
// functions that return values for app.js to print.

// Separates credit transactions from all transactions using filter.
function getCredits(transactionList) {
  return transactionList.filter((txn) => txn.type === "credit");
}

// Separates debit transactions from all transactions using filter.
function getDebits(transactionList) {
  return transactionList.filter((txn) => txn.type === "debit");
}

// Totals a list of transactions' amounts using reduce.
function totalAmount(transactionList) {
  return transactionList.reduce((total, txn) => total + txn.amount, 0);
}

// Builds a list of formatted receipt strings using map, destructuring
// { customer, amount } directly in the callback's parameter.
function formatReceipts(transactionList) {
  return transactionList.map(({ customer, amount, type }) => {
    const label = type === "credit" ? "Credit" : "Debit";
    return `${label}: ${customer} - ${amount} ETB`;
  });
}

// Returns an UPDATED COPY of a transaction with a corrected amount,
// using spread so the original transaction object is never mutated.
function correctTransactionAmount(transaction, newAmount) {
  return { ...transaction, amount: newAmount };
}

module.exports = {
  getCredits,
  getDebits,
  totalAmount,
  formatReceipts,
  correctTransactionAmount,
};
