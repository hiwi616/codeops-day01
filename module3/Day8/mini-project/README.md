# The Addis Eats Checkout (Mini-Project)

A complete checkout form that handles all six honesty requirements: four
fields in one state object, rules in a pure function, errors that appear
after a field is touched and update live as it's corrected, a real label
per field with full ARIA wiring, a submitting state that can't fire twice,
and a failure path that keeps every value and moves focus to the problem.

## Files

- `src/validate.js` - the pure `validate(form)` function, plus `AREAS` and
  `FIELD_ORDER`
- `src/Field.jsx` - one reusable field wrapper: label, the control itself,
  and its error/hint text, with `aria-invalid`/`aria-describedby` wired on
  automatically (this is what the sheet calls `Field.js` — see the note
  below on the file extension)
- `src/Checkout.jsx` - the checkout form itself
- `src/pages/Checkout.jsx` - the *route*, which renders `CheckoutPanel` and
  this `Checkout` form together (two different files that both relate to
  "checkout" — one is the page, one is the form)

**A note on `Field.js` vs `Field.jsx`:** the file contains JSX (it returns
`<div>...</div>`), so it's named `Field.jsx` — Vite's default setup only
transforms JSX inside `.jsx` files, not plain `.js` files. Every other
component in this project (`Checkout.jsx`, `Menu.jsx`, etc.) follows the
same rule, so this keeps the naming consistent across the project rather
than making one file an exception.

## Validation rules, and why each one exists

| Field | Rule | Why |
|---|---|---|
| Name | Required | The delivery needs a name to hand the order to — the field's only job is identifying who ordered it, so an empty value has no reasonable fallback. |
| TeleBirr number | Required, and must match `09XXXXXXXX` / `+2519XXXXXXXX` | This is how the restaurant reaches the customer for delivery, and (per the earlier Day 6/7 sheets) how a TeleBirr payment would be verified. A number that isn't shaped like a real Ethiopian mobile number can't be dialed or charged, so it's rejected before it ever reaches "the network." |
| Delivery area | Required (one of Bole, Kazanchis, Megenagna, Piassa) | The order has to be routed to a rider who covers that area. An unset selection has no address to fall back to, so it's treated the same as leaving a required field blank. |
| Notes | Optional, no rule | Notes are a convenience (gate code, landmark) — there's nothing to validate, since any text, including none at all, is a fine note. |

## How the pieces fit together

- **One state object, one change handler.** `Checkout.jsx` holds
  `{ name, phone, area, notes }` in a single `useState`; every field's
  `onChange` is the same `handleChange`, which reads `e.target.name`/
  `.value`.
- **`validate(form)` is pure, called every render.** Not stored in state,
  not run in an effect — so a field's error updates on the very next
  keystroke that fixes it, with no lag.
- **Errors shown only after a visit.** `show(field)` only returns an
  error once `touched[field]` is true (set `onBlur`), or once a submit
  attempt has marked every field touched.
- **`Field.jsx` wires the ARIA attributes once, not four times.** Every
  field's label, `aria-invalid`, and `aria-describedby` (pointing at
  either its error or its hint) come from the same twenty lines of code,
  used four times, instead of being repeated per field.
- **Submitting can't fire twice.** `handleSubmit` checks a `useRef` flag
  synchronously before doing anything else, so two fast clicks on "Place
  order" can't both slip through before the button's `disabled` state has
  had a chance to re-render. See the comment above `submittingRef` in
  `Checkout.jsx` for why a ref is used instead of state here.
- **Failure keeps every value.** See "Testing the failure path" below.
- **Readable without color.** Every invalid field's border switches to
  *dashed*, not just red, and its error message starts with a warning
  glyph (⚠) — two cues that survive a greyscale display or a viewer who
  can't distinguish red from the surrounding palette. The error text
  itself is also bold, adding a contrast difference on top of the color
  change.

## Testing the failure path

Type the word **`fail`** (any case) into the Notes field and submit an
otherwise-valid form. This is a deliberate, documented test hook (see the
comment above `simulateSubmit` in `Checkout.jsx`) so the failure branch
can be triggered on demand, rather than relying on random chance, which
would make it hard to test or grade reliably. Any other value in Notes
succeeds after a short delay, clears the cart, and shows a confirmation.

## Check yourself

- **Enter submits the form:** yes — this is a native `<form>` with a
  submit button, so pressing Enter in any text field submits it, with no
  extra code needed.
- **Keyboard-only completion:** every field is a normal, focusable
  `<input>`/`<select>`/`<textarea>`, and the button is a real `<button>`,
  so Tab, Shift+Tab, typing, and Enter/Space all work without a mouse.
- **An untouched empty field stays quiet:** confirmed — `show(field)`
  returns nothing until that field's been visited.
- **A corrected field clears its message immediately:** confirmed — since
  `errors` is recomputed fresh every render from the current `form`.
- **Pressing Order twice quickly sends only one order:** confirmed by the
  `submittingRef` guard — the second click's `handleSubmit` call returns
  immediately at the top, before it does anything else.
- **Every value survives a simulated failure:** confirmed — the `catch`
  block never calls `setForm(emptyForm)`; only the success path does.
- **Greyscale legibility:** confirmed — the dashed border and the ⚠ glyph
  don't depend on color, only the border-color and text-color do.

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Manual tests

```bash
node src/validate.manualtest.js
node src/cart/cartReducer.manualtest.js
```

Every line in both should print `PASS`.
