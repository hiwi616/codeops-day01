// 3. Write a discountBy(rate) factory and create memberPrice (10%) and
//    salePrice (30%) from it. Apply both to a price of 1000 ETB.

function discountBy(rate) {
  return function (price) {
    return price * (1 - rate);
  };
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

const originalPrice = 1000;

console.log("Original price:", originalPrice, "ETB");
console.log("Member price (10% off):", memberPrice(originalPrice), "ETB");
console.log("Sale price (30% off):", salePrice(originalPrice), "ETB");

module.exports = { discountBy, memberPrice, salePrice };
