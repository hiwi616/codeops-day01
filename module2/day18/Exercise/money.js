const VAT = 0.15;

function addVat(price) {
  return price * (1 + VAT);
}

module.exports = { addVat, VAT };
