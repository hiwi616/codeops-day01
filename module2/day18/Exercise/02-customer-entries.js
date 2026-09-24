const customer = {
  name: "Selamawit Tesfaye",
  city: "Addis Ababa",
  balance: 1250.5,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}

module.exports = { customer };
