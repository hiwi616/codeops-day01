const prices = [200, 450, 700, 850, 300, 950, 100];

const VAT_RATE = 0.15;

const withVat = prices.map((price) => price * (1 + VAT_RATE));

const underThousand = withVat.filter((price) => price < 1000);

const grandTotal = underThousand.reduce((total, price) => total + price, 0);

console.log("Original prices:", prices);
console.log("Prices with 15% VAT:", withVat.map((p) => p.toFixed(2)));
console.log("Prices under 1000 ETB (with VAT):", underThousand.map((p) => p.toFixed(2)));
console.log("Grand total (ETB):", grandTotal.toFixed(2));

module.exports = { prices, withVat, underThousand, grandTotal };
