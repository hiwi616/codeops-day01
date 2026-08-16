# Day 19 — DOM Warm-up

Small HTML page + vanilla JS covering core DOM manipulation and events, warming up for the Week-2 project.

## Files

- **`index.html`** — the page containing all 5 exercise sections.
- **`script.js`** — all the JS logic, one section per exercise.

## Exercises

1. **textContent + classList.toggle** — clicking the button selects the `<h1>`, changes its text with `textContent`, and toggles a `highlight` CSS class with `classList.toggle`.
2. **createElement + append** — takes an array of three Ethiopian city names, creates an `<li>` for each with `createElement`, and appends them to the `<ul>`.
3. **Click listener + bubbling** — a button inside a div. Both the button and the div have their own click listeners. Clicking the button logs `event.target` from both listeners, showing the event bubbling up from the button to the div.
4. **Delegated listener for delete** — a list of items, each with its own delete button, but only **one** click listener is attached to the parent `<ul>`. It checks `event.target` to know which delete button was clicked and removes that `<li>`.
5. **Form submit** — a form with one text input. On submit, `preventDefault()` stops the page reload, the input's value is read, appended as a new `<li>` to a list, and the field is cleared.

## Run

Just open `index.html` in a browser (double-click it, or use a tool like VS Code's Live Server extension).
