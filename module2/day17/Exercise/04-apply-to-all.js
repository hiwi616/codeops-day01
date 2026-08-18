// 4. Write a higher-order applyToAll(list, fn) that runs fn over every
//    item and returns the results, then use it to add VAT to an array of prices.

function applyToAll(list, fn) {
  return list.map(fn);
}

const prices = [200, 450, 700, 850];

const addVat = (price) => price * 1.15;

const pricesWithVat = applyToAll(prices, addVat);

console.log("Original prices:", prices);
console.log("Prices with VAT:", pricesWithVat);

module.exports = { applyToAll, addVat };
