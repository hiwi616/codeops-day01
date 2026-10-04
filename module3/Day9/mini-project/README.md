# Addis Eats - Resilient and Fast (Day 9 Mini-Project)

A Vite + React project. A failure in the menu can no longer take down the
cart — each has its own error boundary with a fallback that actually
helps. The checkout and receipt routes only download when someone
navigates to them. One real re-render was profiled, fixed, and measured
again (see `PROFILE.md`). The dish modal traps focus, escapes on Escape,
and returns focus on close.

## Files the sheet asks for

- `src/ErrorBoundary.jsx` - the boundary class
- `src/App.jsx` - routes, lazy-loaded checkout/receipt behind Suspense
- `src/ui/Modal.jsx` - the generic, reusable modal (portal, Escape, focus
  trap, focus return) — dish-specific content is passed in as `children`
  from `DishList.jsx`, not baked into `Modal` itself
- `PROFILE.md` - the profiling write-up, at the repo root

## Requirements, and where each one is met

- **Separate error boundaries, each with a useful fallback.**
  `src/pages/Menu.jsx` wraps `DishList` in `<ErrorBoundary fallback={<MenuUnavailable />}>`.
  `src/SafeCheckoutPanel.jsx` wraps `CheckoutPanel` in
  `<ErrorBoundary fallback={<CartUnavailable />}>`. Both fallback
  components (`src/MenuUnavailable.jsx`, `src/CartUnavailable.jsx`) do
  two things a bare error message doesn't: they say what's *not* broken
  (`CartUnavailable` specifically reassures the person their items are
  still saved — true, since the cart lives in a zustand store completely
  separate from whichever component just crashed), and they give a next
  step (a reload button).
- **A deliberate thrown error, proving one region fails alone.**
  `DishList.jsx` has a "🧨 Simulate menu crash" button;
  `CheckoutPanel.jsx` has its own, independent "🧨 Simulate cart crash."
  Each sets state that throws on the next render (error boundaries only
  catch render-phase throws, never ones inside an event handler directly).
- **Checkout and receipt, lazy-loaded behind a Suspense skeleton.**
  `App.jsx` uses `lazy(() => import("./pages/Checkout"))` and the same
  for `Receipt`, each route wrapped in `<Suspense fallback={<PageSkeleton />}>`.
- **`PROFILE.md`, before-and-after.** At the repo root. It documents the
  same `CategoryBar`/`setCategory` fix from the exercise (still the one
  real optimization in this codebase), with the exact reproduction steps
  and a results table — **the actual millisecond numbers are
  placeholders you need to fill in from your own Profiler recording**;
  see the note at the top of that file for why I didn't invent numbers.
- **Dish modal: portal, Escape, focus trap, focus return.**
  `src/ui/Modal.jsx` is now a fully generic shell (no dish-specific code
  in it at all) with a real focus trap: Tab and Shift+Tab cycle only
  through the modal's own focusable elements (recomputed on every Tab
  press), rather than escaping into the page behind it. `DishList.jsx`
  passes the dish's name/category/price and an "Add to cart" button as
  `children` — two focusable elements (that button and the × close
  button) make the trap something you can actually feel while testing.
- **No optimization left unjustified by a measurement.** See the table at
  the end of `PROFILE.md` — every `memo`/`useCallback` in the project is
  listed there with what justified it.

## Check yourself

- **Thrown error, header/cart still working:** on `/menu`, click
  "🧨 Simulate menu crash" — only the dish list area shows
  `MenuUnavailable`; the search box, chips, header, nav and cart badge
  all keep working.
- **Fallback tells the person what failed and offers something to do:**
  both fallbacks name the problem, say what's unaffected, and offer a
  reload button — not just a stack trace.
- **Network tab, checkout chunk only on navigation:** open DevTools →
  Network, filter JS, visit `/menu` first (no Checkout/Receipt chunk
  yet), then navigate to `/checkout` — a new chunk should load then, with
  the skeleton showing briefly first.
- **A failed chunk download shows the boundary, not a blank screen:**
  this is harder to simulate without actually breaking your network, but
  structurally, nothing currently wraps the lazy routes in an
  `ErrorBoundary` — only `Suspense`. `Suspense` handles the *loading*
  state; it does not catch a *failed* `import()`. If you want to verify
  this specific failure mode, wrap the `<Suspense>` blocks in `App.jsx`
  in an `ErrorBoundary` too (with its own fallback, e.g. "Couldn't load
  this page — check your connection and try again") and test it by
  throttling the network to "Offline" right as you click a nav link to
  `/checkout` on a fresh load.
- **`PROFILE.md` shows a real difference, not a guess:** fill in the
  placeholders per the instructions inside that file before you submit.
- **Modal usable with only the keyboard:** tab to a dish's "Quick view"
  button, press Enter, confirm focus lands on the × button, Tab to "Add
  to cart," Tab again and confirm focus wraps back to ×  (not out into
  the page), then press Escape and confirm focus returns to the "Quick
  view" button you started from.

## How to run

```bash
npm install
npm run dev
node src/cart/cartReducer.manualtest.js
node src/validate.manualtest.js
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Project structure (new/changed since the Day 9 exercise)

- `src/ui/Modal.jsx` - new, generic, replaces `src/DishModal.jsx` (removed)
- `src/MenuUnavailable.jsx`, `src/CartUnavailable.jsx` - new, dedicated fallback components
- `src/pages/Menu.jsx`, `src/SafeCheckoutPanel.jsx` - now pass those as plain-element fallbacks
- `src/DishList.jsx` - quick-view content moved to `Modal`'s `children`, with an Add-to-cart button inside the modal
- `PROFILE.md` - new, at the repo root
