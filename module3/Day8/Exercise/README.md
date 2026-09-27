# Addis Eats - A Checkout You Can Trust (Day 8)

A Vite + React project. The placeholder delivery form is replaced with a
real, accessible checkout: one state object, a pure validation function,
per-field "visited" tracking, full ARIA wiring, a submitting state, and a
simulated failed request that keeps the person's input intact.

## Where each exercise lives

1. **One state object.** `src/CheckoutForm.jsx` holds `{ name, phone, area,
   notes }` in a single `useState`, updated by one `handleChange` that
   reads `e.target.name`/`e.target.value`.
2. **Area `<select>`, bound correctly.** The five `AREAS` (Bole,
   Kazanchis, Megenagna, Piassa) live in `src/validateCheckout.js`; the
   `<select>` in `CheckoutForm.jsx` uses `value={form.area}` and the same
   `handleChange`, so it's a controlled field like the text inputs.
3. **`validate(form)`, a pure function, called during render.**
   `src/validateCheckout.js`. `CheckoutForm.jsx` calls
   `const errors = validate(form);` directly in the component body -
   not in an effect, not cached in state - so it's always in sync with
   the current `form` on every render.
4. **Touched fields, errors shown only after a visit.** `touched` is its
   own state object, set to `true` for a field `onBlur`. A field's error
   only renders when `visibleErrors[field] && touched[field]` (see the
   JSX for each field). Submitting also marks every field touched, so a
   person who tabs straight to the button without blurring anything still
   sees why it's blocked.
5. **Labels, `aria-invalid`, `aria-describedby`, `role="alert"`.** Every
   field has a `<label htmlFor>` matching its `id`. Each input's
   `aria-invalid` reflects whether its (visible) error is currently
   showing, and `aria-describedby` points at that error's id (or, for the
   phone field with no error, at its hint's id instead, so it's always
   describing something.) Every error `<p>` has `role="alert"`, so screen
   readers announce it as soon as it appears.
6. **Submitting flag, ETB total in the button.** `isSubmitting` disables
   the button and changes its label to "Placing order..."; while idle, the
   button reads `Place order - {total} ETB`, where `total` comes from the
   cart (`useCartTotal()`), so the label always names the real amount.
7. **Simulated failure: reason shown, every value kept, first bad field
   focused.** See "Testing the failure path" below for how to trigger it.
   On failure: `submitError` is set and rendered as the phone field's
   error (this simulation always names the phone as the problem, the way
   a TeleBirr verification failure realistically would); the form's
   values are **not** reset; and focus moves to the phone input via a
   ref. The same `focusFirstBadField` helper is also used when the
   client-side `validate()` blocks a submit before any request is even
   made, so both kinds of failure - a bad request and bad client input -
   are handled the same way.

## Testing the failure path

Type the word **`fail`** (any case) into the Notes field and submit a
form that's otherwise valid. This is a deliberate, documented test hook -
see the comment above `simulateSubmit` in `CheckoutForm.jsx` - so the
failure branch can be triggered on demand instead of relying on random
chance, which would make it hard to test or grade reliably. Any other
value in Notes (including leaving it empty) succeeds after a short
delay, clears the cart, and shows a confirmation message.

## How to verify

- Submit with everything empty: all three fields should show their
  errors and the first one (Name) should end up focused.
- Fill in a bad phone number (e.g. `0712345678`) and tab out: the phone
  error should appear right after you leave the field, not before.
- Fill in everything correctly and submit: the button should briefly say
  "Placing order...", then a confirmation message should appear, the
  cart should clear, and the form should reset.
- Fill in everything correctly, type `fail` in Notes, and submit: the
  button should briefly say "Placing order...", then the phone field
  should show a red error message and be focused, and every value you
  typed (name, phone, area, notes) should still be in the form.
- Open the browser's accessibility tree or a screen reader and confirm
  each error is exposed as `role="alert"` and each invalid field has
  `aria-invalid="true"`.

## Manual tests for `validate()`

```bash
node src/validateCheckout.manualtest.js
```

Every line should print `PASS`.

## Project structure (new/changed since the Day 7 mini-project)

- `src/validateCheckout.js` - pure `validate(form)`, `AREAS`, `FIELD_ORDER`
- `src/validateCheckout.manualtest.js` - manual tests for `validate()`
- `src/CheckoutForm.jsx` - the checkout form (replaces `OrderForm.jsx`)
- `src/pages/Checkout.jsx` - now renders `CheckoutForm` instead of `OrderForm`

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
