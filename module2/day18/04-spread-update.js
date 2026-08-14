const customer = {
  name: "Selamawit Tesfaye",
  city: "Addis Ababa",
  balance: 1250.5,
};

const updatedCustomer = {
  ...customer,
  city: "Hawassa",
  phone: "+251-911-000000",
};

console.log("Original customer:", customer);
console.log("Updated customer:", updatedCustomer);
console.log("Original unchanged?", customer.city === "Addis Ababa" && customer.phone === undefined);

module.exports = { customer, updatedCustomer };
