// Call validate() directly with plain objects, no React, no test runner.
// Run with: node src/validate.manualtest.js

import { validate, FIELD_ORDER } from "./validate.js";

function check(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? "PASS" : "FAIL"} - ${label}`);
  if (!pass) {
    console.log("  expected:", JSON.stringify(expected));
    console.log("  actual:  ", JSON.stringify(actual));
  }
}

check(
  "empty form has all three errors",
  validate({ name: "", phone: "", area: "", notes: "" }),
  {
    name: "Name is required.",
    phone: "Phone is required.",
    area: "Choose a delivery area.",
  }
);

check(
  "valid form has no errors",
  validate({ name: "Hiwi", phone: "0911223344", area: "Bole", notes: "" }),
  {}
);

check(
  "bad phone format",
  validate({ name: "Hiwi", phone: "0711223344", area: "Bole", notes: "" }),
  { phone: "Enter a valid TeleBirr number, like 0911223344." }
);

check(
  "+251 phone is valid",
  validate({ name: "Hiwi", phone: "+251911223344", area: "Bole", notes: "" }),
  {}
);

const errors = validate({ name: "", phone: "0711223344", area: "", notes: "" });
const firstBad = FIELD_ORDER.find((f) => errors[f]);
check("first bad field, in FIELD_ORDER, is 'name'", firstBad, "name");
