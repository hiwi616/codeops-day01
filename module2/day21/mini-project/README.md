# Validated, Persistent Signup Form

A small signup form that collects a name and an Ethiopian phone number,
validates both with regular expressions, shows clear error messages, and
saves valid entries to `localStorage` as JSON so they're restored when the
page is reloaded.

## What it does

- Validates the **name** field (must be at least 2 characters).
- Validates the **phone** field against `/^(?:\+251|0)9\d{8}$/`, accepting
  numbers like `0912345678` or `+251912345678` and rejecting anything else.
- Shows specific error messages in a dedicated error area using
  `textContent` (never `innerHTML`), so entered text is always treated as
  plain text.
- On successful submit, saves the entry to `localStorage` as JSON and
  re-renders the list of saved signups.
- On page load, reads back saved entries from `localStorage`, safely
  handling the case where nothing has been saved yet (`null`) or where the
  stored data is corrupt/invalid JSON (falls back to an empty list instead
  of crashing).

## How to open it

Open `index.html` directly in your browser (double-click it, or drag it
into a browser window) — no build step or server required.

## Files

- `index.html` — form markup and styling.
- `app.js` — validation, localStorage persistence, and rendering logic.
- `README.md` — this file.
