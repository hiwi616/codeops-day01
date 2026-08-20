# Addis Market — Shopping List

A single-page shopping list for Addis Market. Add the things you need to buy
with an ETB price, mark them as bought as you go, remove anything you don't
need, and watch the running total update live. Built with plain HTML, CSS,
and JavaScript — no frameworks, no build step.

## How to open it

1. Clone or download this repository.
2. Open `index.html` directly in your browser (double-click it, or drag it
   into a browser window).

No server or install step is required. If your browser blocks local file
requests for any reason, you can also serve it with any static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What it does

- **Add an item** — fill in a name and an ETB price in the form and submit.
  The form uses `preventDefault()` so the page never reloads, and it
  validates that both fields are filled before adding anything. If either
  field is empty, an inline error message appears.
- **Render items** — each item is added to the list with `createElement` and
  `append`, one row at a time. The list is never rebuilt from a string.
- **Delete an item** — click "Remove" on any row. Deletion is handled by a
  single delegated `click` listener on the list container (`#item-list`),
  not one listener per row.
- **Mark as bought** — click anywhere on a row (outside the Remove button)
  to toggle a `bought` class on that row. All the visual styling for the
  bought state (strikethrough, muted color, checkmark) lives in
  `styles.css`, not inline styles.
- **Running total** — the ETB total at the bottom of the list recalculates
  automatically whenever an item is added or removed.

## Files

- `index.html` — page structure and the add-item form
- `styles.css` — all styling, including the "bought" row state
- `app.js` — state, rendering, event handling, and the running total

## Status

This is week one of the build: the core add / delete / toggle / total loop.
More features (editing items, persistence, categories) are planned as the
week continues.
