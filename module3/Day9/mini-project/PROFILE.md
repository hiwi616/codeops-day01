# Profile: one slow re-render, found and fixed

**This file is a template with the reasoning already filled in, but the
actual millisecond numbers in the results table are placeholders — I
can't open a browser or run the React DevTools Profiler from here. Run
the steps below yourself, in your own browser, and replace the bracketed
numbers with what you actually measure before you submit.** Reporting a
guessed number as if it were measured would defeat the point of this
exercise; the check for "a real before-and-after difference, not just a
guess" means these two numbers have to come from an actual recording.

## What I profiled

The `/menu` page, specifically typing in the search box while a category
is selected.

## What I expected to see, and why

Before the fix below, every keystroke in the search box:

1. Updates `search` state in `Menu.jsx`.
2. Re-renders `Menu`.
3. On that re-render, `Menu` defines a brand-new `setCategory` function
   (it was a plain arrow function in the component body, not wrapped in
   anything).
4. `CategoryBar` receives that new function as its `onSelect` prop. Even
   though `categories` and `selected` never changed, `onSelect` looks
   different on every render — so if `CategoryBar` were a plain function
   component, it re-renders regardless; and even if it were wrapped in
   `React.memo`, the new `onSelect` reference alone would still fail the
   prop comparison and force a re-render anyway.

So typing in the search box was expected to re-render `CategoryBar` on
every keystroke, despite the category chips having nothing to do with
the search box at all.

## The fix

Two changes, in `src/CategoryBar.jsx` and `src/pages/Menu.jsx`:

1. `CategoryBar` is wrapped in `React.memo`.
2. `Menu`'s `setCategory` is wrapped in `useCallback` (with
   `[setSearchParams]` as its dependency — `setSearchParams` from
   `react-router-dom` is already stable across renders, so this callback
   never needs to be recreated either).

Both were needed together: `memo` alone does nothing if the function
passed in as a prop is still new every render, and stabilizing the
function alone does nothing if the component receiving it isn't
memoized in the first place.

## How to reproduce the measurement yourself

1. Run `npm run dev`, open the app, go to `/menu`, and open React
   DevTools → **Profiler**.
2. Click record, type 5-6 characters into the search box one at a time
   (pausing briefly between keystrokes so each one is a distinguishable
   commit), then stop recording.
3. In the **Ranked** chart, find `CategoryBar`. Click one of its bars to
   see that commit's "render duration" for that component in the right
   panel. Note roughly how many of the keystroke-commits it appears in,
   and a representative duration.
4. **Before:** temporarily remove `memo(...)` from `CategoryBar.jsx`
   (so it exports the plain `CategoryBarBase` function) and remove the
   `useCallback` wrapper from `setCategory` in `Menu.jsx` (back to a
   plain arrow function). Repeat steps 1-3 and record the same numbers.
5. **After:** put both back (the versions currently in this repo) and
   repeat steps 1-3 once more.
6. Fill in the table below with what you actually saw.

## Results

| | Commits `CategoryBar` appeared in (out of ~6 keystrokes) | Representative render duration |
|---|---|---|
| Before (no memo/useCallback) | `[fill in from your recording]` | `[fill in, e.g. "0.3 ms x 6 commits"]` |
| After (current code) | `[fill in from your recording]` | `[fill in, e.g. "0 commits — doesn't render"]` |

The expected result is that "After," `CategoryBar` stops appearing in the
Profiler at all for search-box keystrokes — not that any single render
gets dramatically faster. A category chip bar is cheap to render either
way; the actual win is **frequency**, not per-render speed: going from
"re-renders on every keystroke" to "doesn't re-render for this
interaction at all."

## No unjustified optimizations

Every `memo`/`useCallback` currently in this codebase, and why:

| Where | What | Justified by |
|---|---|---|
| `src/Dish.jsx` | `memo(DishBase)` | Added in an earlier exercise (Day 6) specifically because `DishList` re-rendering (e.g. from the Add-to-cart handler) was re-rendering every `Dish` card, confirmed with the Profiler at the time. |
| `src/CategoryBar.jsx` | `memo(CategoryBarBase)` | This profiling session, above. |
| `src/pages/Menu.jsx` | `useCallback` around `setCategory` | This profiling session, above — required for `CategoryBar`'s `memo` to actually take effect. |

Nothing else in the project is wrapped in `memo`, `useCallback`, or
`useMemo` speculatively. `Checkout.jsx`'s `handleAdd = addItem` is not a
performance optimization — `addItem` from the zustand store is already a
stable reference, so there's nothing to memoize there in the first place.
