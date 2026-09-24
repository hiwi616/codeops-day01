// app.js - Steps 3-6: signup form with validation and localStorage.

const STORAGE_KEY = "signupEntries";
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

// ---- Cache element references once -----------------------------------
const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name-input");
const phoneInput = document.querySelector("#phone-input");
const errorArea = document.querySelector("#error-area");
const signupCountEl = document.querySelector("#signup-count");

// ---- Step 2's helpers, reused here -------------------------------------

function save(key, arrayValue) {
  localStorage.setItem(key, JSON.stringify(arrayValue));
}

function load(key) {
  const raw = localStorage.getItem(key);
  if (raw === null) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn(`Corrupt data at key "${key}", resetting:`, err.message);
    return [];
  }
}

// ---- Step 6: show how many people have signed up -----------------------

function updateSignupCount() {
  const entries = load(STORAGE_KEY);
  const count = entries.length;
  signupCountEl.textContent = `${count} ${count === 1 ? "person has" : "people have"} signed up.`;
}

// ---- Step 5: show only the FIRST problem found --------------------------

function findFirstError(name, phone) {
  if (name.length < 2) {
    return "Name must be at least two characters.";
  }
  if (!PHONE_REGEX.test(phone)) {
    return "Phone must start with 0 or +251, followed by 9 and 8 more digits (e.g. 0912345678).";
  }
  return null; // no problems found
}

// ---- Step 4 + 3: form handling ---------------------------------------------

function handleSubmit(event) {
  event.preventDefault(); // step 4: preventDefault

  const name = nameInput.value.trim(); // step 4: read trimmed values
  const phone = phoneInput.value.trim();

  const firstError = findFirstError(name, phone);

  if (firstError) {
    errorArea.textContent = firstError; // step 5: textContent, first problem only
    return;
  }

  errorArea.textContent = "";

  // Step 6: save on success, clear the form, update the count
  const entries = load(STORAGE_KEY);
  entries.push({ name, phone });
  save(STORAGE_KEY, entries);

  form.reset();
  nameInput.focus();
  updateSignupCount();
}

form.addEventListener("submit", handleSubmit);

// Step 6: on load, show how many people have signed up
updateSignupCount();
