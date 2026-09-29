# Addis Eats - Resilience and Performance (Day 9)

A Vite + React project. The checkout flow now survives its own bugs
(error boundaries), loads its heavier routes on demand (lazy + Suspense),
avoids one re-render it didn't need to do, and opens dish details in an
accessible modal via a portal.

## Where each exercise lives

1. **`ErrorBoundary` class, taking a `fallback` prop.** `src/ErrorBoundary.jsx`.
   A class component, because `getDerivedStateFromError`/`componentDidCatch`
   have no hook equivalent. `fallback` can be a plain node or a function
   `(error, reset) => node`.
2. **Deliberate throw inside one dish; header and cart still work.**
   `DishList.jsx` has a "🧨 Simulate menu crash" button. Clicking it sets
   state that throws on the *next* render — error boundaries only catch
   errors thrown during render/lifecycle, never inside an event handler
   itself, so the throw can't happen directly in the `onClick`. `Menu.jsx`
   wraps just `<DishList>` in an `ErrorBoundary`, so when it crashes, the
   search box and category chips above it, and the header/nav/cart badge
   in `Layout`, are all unaffected — they're not inside that boundary's
   subtree.
3. **A second boundary around the cart panel, failing independently.**
   `SafeCheckoutPanel.jsx` wraps `CheckoutPanel` in its own `ErrorBoundary`
   instance, separate from the menu's. It's used by both `pages/Cart.jsx`
   and `pages/Checkout.jsx`, so there's one definition instead of
   duplicating the fallback markup. `CheckoutPanel.jsx` has its own
   "🧨 Simulate cart crash" button, independent of the menu's.
4. **`checkout` and `receipt` routes, lazy-loaded behind a Suspense
   skeleton.** `src/App.jsx` uses `lazy(() => import("./pages/Checkout"))`
   and the same for `Receipt`; each route's `element` wraps them (and, for
   checkout, `RequireAuth`) in `<Suspense fallback={<PageSkeleton />}>`.
   `Receipt` (`src/pages/Receipt.jsx`) is new: on a successful order,
   `Checkout.jsx` now calls `navigate("/receipt", { state: {...} })`
   instead of showing an inline confirmation message, so the confirmation
   screen is itself something that can be code-split.
5. **Profiler session while adding three dishes.** See "How to profile"
   below — this can't be captured or narrated from here, since it needs
   an actual browser.
6. **Fix one unnecessary re-render, then compare.** Fixed: `CategoryBar`
   is now wrapped in `React.memo`, and `Menu.jsx`'s `setCategory` is now
   wrapped in `useCallback`. Before this, `setCategory` was a brand-new
   function on every render of `Menu` (e.g. every keystroke in the search
   box), so `CategoryBar`'s `onSelect` prop looked "different" every time
   — `memo` alone would have done nothing without also stabilizing that
   prop. See "How to profile" for confirming this with the Profiler.
7. **Dish modal, `createPortal`, closes on Escape, returns focus.**
   `src/DishModal.jsx`. Rendered via `createPortal(..., document.body)`,
   so it isn't clipped or mis-positioned by anything in `DishList`'s own
   layout. An effect adds a `keydown` listener for Escape and moves focus
   to the modal's close button on open; its cleanup removes the listener
   and returns focus to whichever "Quick view" button opened it (tracked
   in `DishList.jsx`'s `lastTriggerRef`), not just to `<body>`.

## How to profile (exercises 5 and 6)

1. Open the app, go to `/menu`, and open React DevTools > **Profiler**.
2. Click record, add three different dishes to the cart (click "Add"
   three times, on three different cards), then stop recording.
3. Look at the flame graph / ranked chart for that recording. Before the
   fix in exercise 6, `CategoryBar` shows up re-rendering on unrelated
   updates (it re-renders whenever `Menu` re-renders, even from an unrelated
   state change) — that's the "slowest / most surprising" component in
   this exercise, not because any single render is slow, but because it's
   rendering far more often than the category chips actually change.
4. To compare: record once *before* checking out this project as-is (i.e.
   temporarily revert `CategoryBar.jsx`'s `memo()` wrap and `Menu.jsx`'s
   `useCallback` around `setCategory`, back to a plain function and a
   plain component), and once after (the current code). Typing in the
   search box is the clearest test: before the fix, every keystroke also
   re-renders `CategoryBar`; after the fix, it doesn't, since neither its
   `categories`/`selected` props nor its now-stable `onSelect` prop
   changed.

## How to verify everything else

- **Error boundaries:** on `/menu`, click "🧨 Simulate menu crash" — only
  the dish list area should be replaced by a red-bordered message; the
  search box, chips, header, nav and cart badge should keep working. Add
  a dish to the cart, go to `/cart`, click "🧨 Simulate cart crash" —
  only the cart panel should break, and the menu should be unaffected if
  you go back to it.
- **Lazy loading:** open DevTools > Network, filter by JS, and visit
  `/menu` first — you shouldn't see a separate chunk for Checkout or
  Receipt yet. Navigate to `/checkout` (signed in) and you should
  briefly see the skeleton, then a new chunk load in the Network tab.
- **Receipt route:** complete a checkout with a valid form (see Day 8's
  README for the `fail`-in-Notes test hook, which still works) and you
  should land on `/receipt` with your name, area and total shown.
- **Dish modal:** click "Quick view" on any dish. Focus should move to
  the "×" close button. Press Escape — the modal should close, and focus
  should return to the "Quick view" button you clicked, not jump to the
  top of the page.

## How to run

```bash
npm install
npm run dev
node src/cart/cartReducer.manualtest.js
node src/validate.manualtest.js
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Project structure (new/changed since the Day 8 mini-project)

- `src/ErrorBoundary.jsx` - the class component
- `src/SafeCheckoutPanel.jsx` - `CheckoutPanel` wrapped in its own boundary
- `src/DishModal.jsx` - portal-based quick-view modal
- `src/PageSkeleton.jsx` - Suspense fallback
- `src/pages/Receipt.jsx` - new route, the post-checkout confirmation
- `src/App.jsx` - `Checkout`/`Receipt` are now `lazy()`, wrapped in `Suspense`
- `src/CategoryBar.jsx` - wrapped in `React.memo`
- `src/pages/Menu.jsx` - `setCategory` wrapped in `useCallback`; `DishList` wrapped in `ErrorBoundary`
- `src/DishList.jsx` - crash-test button, Quick view button + modal state
- `src/CheckoutPanel.jsx` - its own crash-test button
- `src/Checkout.jsx` - navigates to `/receipt` on success instead of an inline message
