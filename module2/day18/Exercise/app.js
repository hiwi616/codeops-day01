const { addVat, VAT } = require("./money");

const prices = [200, 450, 700, 850];

const pricesWithVat = prices.map(addVat);

console.log(`VAT rate: ${VAT * 100}%`);
console.log("Prices before VAT:", prices);
console.log("Prices after VAT:", pricesWithVat.map((p) => p.toFixed(2)));
