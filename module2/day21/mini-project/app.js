// app.js
// Validated, persistent signup form.
// Combines: form handling, regex validation, JSON, and localStorage.

const STORAGE_KEY = "signupEntries";

const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error-area");
const entriesList = document.getElementById("entries-list");
const emptyMessage = document.getElementById("empty-message");

const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

/**
 * Reads and parses saved entries from localStorage.
 * Handles the "nothing saved yet" case and any corrupt/invalid JSON
 * by falling back to an empty array instead of throwing.
 */
function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    // Keep only well-formed entries in case of partial corruption.
    return parsed.filter(
      (entry) =>
        entry &&
        typeof entry.name === "string" &&
        typeof entry.phone === "string"
    );
  } catch (err) {
    console.warn("Corrupt signup data in localStorage, resetting.", err);
    return [];
  }
}

/**
 * Saves the given entries array to localStorage as JSON.
 */
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Renders the list of saved entries to the page.
 * Uses textContent everywhere so saved values can never be
 * interpreted as HTML.
 */
function renderEntries(entries) {
  entriesList.innerHTML = "";

  if (entries.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  entries.forEach((entry) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = entry.name;

    const phoneSpan = document.createElement("span");
    phoneSpan.className = "phone";
    phoneSpan.textContent = entry.phone;

    li.appendChild(nameSpan);
    li.appendChild(phoneSpan);
    entriesList.appendChild(li);
  });
}

/**
 * Validates trimmed name and phone values.
 * Returns an array of error messages (empty array = valid).
 */
function validate(name, phone) {
  const errors = [];

  if (name.length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  if (!PHONE_REGEX.test(phone)) {
    errors.push(
      "Phone number must be a valid Ethiopian number, e.g. 0912345678 or +251912345678."
    );
  }

  return errors;
}

/**
 * Displays validation errors in the error area using textContent.
 * Clears the area when there are no errors.
 */
function showErrors(errors) {
  errorArea.textContent = errors.join("\n");
}

function handleSubmit(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const errors = validate(name, phone);

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  showErrors([]);

  const entries = loadEntries();
  entries.push({ name, phone });
  saveEntries(entries);
  renderEntries(entries);

  form.reset();
  nameInput.focus();
}

function init() {
  const entries = loadEntries();
  renderEntries(entries);
  form.addEventListener("submit", handleSubmit);
}

init();
