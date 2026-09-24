# Storage, JSON & Forms — Step-by-Step Exercises

Six small, testable steps combining `localStorage`, JSON, forms, and regex validation, worked in order.

## Steps

1. **`01-theme-toggle/`** — a theme toggle demo (`index.html` + `app.js`) that remembers the user's choice: it saves to `localStorage` on every change and restores it as soon as the page loads. This exact save-on-change / restore-on-load pattern is what you'd drop into any earlier project to add a persistent theme or language toggle.
2. **`02-storage-helpers.js`** — standalone `save(key, array)` and `load(key)` helpers that stringify an array to `localStorage` and parse it back, guarding both the "nothing saved yet" (`null`) case and corrupt/invalid JSON with `try`/`catch`. Includes a small self-test you can run directly with `node 02-storage-helpers.js`.
3. **`03-06-signup-form/`** — a signup form built from steps 3 through 6:
   - **Step 3** — labelled name and phone inputs, a submit button, and a dedicated error area (`#error-area`).
   - **Step 4** — on submit, `preventDefault()` stops the reload, and the trimmed name/phone values are validated: name at least two characters, phone against the Ethiopian regex `/^(?:\+251|0)9\d{8}$/`.
   - **Step 5** — shows a clear, specific message for the **first** problem found (not every problem at once), using `textContent`.
   - **Step 6** — on success, the entry is saved to `localStorage` as JSON (reusing the `save`/`load` helpers from step 2), the form is cleared, and the page shows how many people have signed up — both right after submitting and again on page load.

## Run

- **Step 1:** open `01-theme-toggle/index.html` in a browser.
- **Step 2:** `node 02-storage-helpers.js` (runs its own self-test).
- **Steps 3-6:** open `03-06-signup-form/index.html` in a browser.

## Self-check

- ✅ An empty or too-short name is rejected with a clear message.
- ✅ The phone regex accepts both `0…` and `+251…` numbers, and rejects bad ones.
- ✅ Only the *first* problem found is shown per submission, not a list of every issue.
- ✅ Valid entries are saved to `localStorage` as JSON via the reusable `save`/`load` helpers.
- ✅ The signup count is correct both immediately after submitting and after a page reload.
- ✅ `null` (nothing saved yet) and corrupt JSON are both handled without crashing.
