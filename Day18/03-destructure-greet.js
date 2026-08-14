const customer = {
  name: "Selamawit Tesfaye",
  city: "Addis Ababa",
  balance: 1250.5,
};

const { name, city } = customer;
console.log(`Destructured -> name: ${name}, city: ${city}`);

function greet({ name }) {
  return `Hello, ${name}! Welcome back.`;
}

console.log(greet(customer));

module.exports = { customer, greet };
