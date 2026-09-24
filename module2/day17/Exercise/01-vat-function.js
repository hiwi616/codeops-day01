// 1. Write a vat(amount, rate = 0.15) function using a default parameter,
//    then write the same logic as an arrow function with an implicit return.

function vat(amount, rate = 0.15) {
  return amount * (1 + rate);
}

const vatArrow = (amount, rate = 0.15) => amount * (1 + rate);

console.log("vat(1000):", vat(1000));
console.log("vat(1000, 0.10):", vat(1000, 0.10));
console.log("vatArrow(1000):", vatArrow(1000));
console.log("vatArrow(1000, 0.10):", vatArrow(1000, 0.10));

module.exports = { vat, vatArrow };
