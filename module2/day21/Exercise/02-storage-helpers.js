// 02-storage-helpers.js
//
// save() and load() helpers that stringify an array to localStorage
// and parse it back, guarding null and corrupt data with try/catch.

function save(key, arrayValue) {
  localStorage.setItem(key, JSON.stringify(arrayValue));
}

function load(key) {
  const raw = localStorage.getItem(key);

  if (raw === null) {
    return []; // nothing saved yet
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return []; // guard against valid JSON that isn't the shape we expect
    }
    return parsed;
  } catch (err) {
    console.warn(`Corrupt data at key "${key}", resetting:`, err.message);
    return [];
  }
}

// ---- Demo / self-test (only runs when this file is executed directly) ----
if (typeof module !== "undefined" && require.main === module) {
  // A minimal fake localStorage so this file can be run standalone with Node.
  const fakeStorage = {};
  global.localStorage = {
    getItem: (k) => (k in fakeStorage ? fakeStorage[k] : null),
    setItem: (k, v) => { fakeStorage[k] = v; },
  };

  console.log("load() on empty storage:", load("demo"));

  save("demo", [{ name: "Test" }]);
  console.log("load() after save():", load("demo"));

  localStorage.setItem("corrupt", "{not valid json");
  console.log("load() on corrupt data:", load("corrupt"));

  localStorage.setItem("wrong-shape", JSON.stringify({ not: "an array" }));
  console.log("load() on wrong-shape JSON:", load("wrong-shape"));
}

module.exports = { save, load };
