# Day 12 — Forms, Tables, Media & Accessibility

A single HTML page (`exercise.html`) covering all five Day 12 exercises: a registration form, a flight table, a media block, accessibility fixes, and a complete `<head>`.

## What's on the page

1. **Ethio Telecom Registration Form** — full name, email, and phone inputs, each with its own `<label>`, plus a branch `<select>` (Bole, Kazanchis, Piassa). The phone field uses `pattern="\+2519\d{8}"` to require the Ethiopian `+251` prefix followed by `9` and 8 more digits. The form uses `method="post"`, appropriate for submitting personal registration data rather than exposing it in the URL via `GET`.
2. **Ethiopian Airlines Flights** — a five-row flight table with a `<caption>`, `<th scope="col">` column headers (Flight, From, To, Departs, Price ETB), and proper `<thead>`/`<tbody>` structure.
3. **Ethiopian Landmark** — a `<figure>` with an image of Fasil Ghebbi in Gondar (meaningful `alt` text) and a `<figcaption>`, plus a Google Maps `<iframe>` with a descriptive `title` attribute.
4. **Accessibility Improvements** — a real `<button>` (keyboard-focusable and announced correctly by screen readers, unlike a clickable `<div>`), a properly labelled username `<input>` (linked via matching `label for`/`input id`), and an image with meaningful `alt` text describing the rock-hewn church at Lalibela.
5. **Complete `<head>`** — a unique `<title>`, a `meta description`, `charset`, and `viewport`, all present at the top of the page.

## Run

Open `exercise.html` directly in a browser — double-click the file, or use a tool like VS Code's Live Server extension. No build step, no dependencies.

## Validation

This page should be run through the [W3C Markup Validator](https://validator.w3.org/#validate_by_input) to confirm it passes as valid HTML5, per the assignment instructions.

## Self-check

- ✅ Registration form: every control labelled, phone validated to `+251` + 9 digits, `POST` used for personal data.
- ✅ Flight table: caption, `scope="col"` headers, proper `thead`/`tbody`.
- ✅ Media block: meaningful `alt` text, `figcaption`, and a `title` on the iframe.
- ✅ Accessibility fixes: a real `<button>`, a labelled input, and a described image.
- ✅ Complete `<head>`: unique title, meta description, charset, viewport.
