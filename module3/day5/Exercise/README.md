# Addis Eats - Context, Reducers and Memoization (Day 5)

A Vite + React project. This stage adds app-wide state through Context, moves the
cart to a reducer, and profiles/optimizes the menu's re-renders.

## Where each exercise lives

1. **ThemeContext.** `src/context/ThemeContext.jsx` holds `"light"` / `"dark"`.
   `ThemeToggle` reads it with `useTheme()` from three levels down
   (`App` > `Header` > `ThemeToggle`), with no props passed through `Header`.
2. **useFetch hook.** `src/hooks/useFetch.js` is the Day 4 fetching logic
   (loading, error, `res.ok` check, abort-on-cleanup), pulled out of `Menu`
   into a reusable hook. `Menu` uses it for the dish list.
3. **cartReducer.** `src/cart/cartReducer.js` handles `add`, `remove`,
   `clear` as a plain function, no React involved. `src/cart/cartReducer.manualtest.js`
   calls it directly with plain objects to check each case; run it with
   `node src/cart/cartReducer.manualtest.js`.
4. **useState vs useReducer.** `src/OrderFormUseState.jsx` and
   `src/OrderFormUseReducer.jsx` are two versions of the same three-field
   form, for comparison. `src/USESTATE_VS_USEREDUCER.md` has the
   write-up. Neither file is wired into the running app; `OrderForm.jsx` is
   the one actually used.
5. **CartProvider.** `src/context/CartContext.jsx` holds the reducer and
   provides `items`, `dispatch`, and the derived `total`. `Menu` calls
   `dispatch({ type: "add", dish })`, and `Cart` reads `items`/`total` and
   dispatches `remove` / `clear`.
6. **useMemo on the provider value.** See the comment above `useMemo` in
   `CartContext.jsx`: without it, `CartProvider` would hand every consumer a
   brand-new `{ items, dispatch, total }` object on every render, so context
   consumers would re-render even when the cart itself hadn't changed.
7. **Profiling.** `Dish` is wrapped in `React.memo` (`src/Dish.jsx`), and
   `Menu`'s `handleAdd` is wrapped in `useCallback` so its reference stays
   stable and doesn't defeat the memoization. See "How to profile" below.

## How to profile (Exercise 7)

1. Install the React DevTools browser extension, open DevTools, and go to
   the **Profiler** tab.
2. Click record, type a few characters in the search box (this re-renders
   `Menu`), then stop recording.
3. **Before** wrapping `Dish` in `memo`/`handleAdd` in `useCallback`, every
   `Dish` re-renders on each keystroke, since a new `onAdd` function was
   created on every `Menu` render, which counted as a changed prop.
4. **After** both changes, record again the same way. Only `DishList`'s own
   render and any dish whose actual data changed should show up; unrelated
   `Dish` instances should no longer re-render on every keystroke.

## Project structure (new/changed since Day 4)

- `src/context/ThemeContext.jsx`, `src/ThemeToggle.jsx` - theme context
- `src/hooks/useFetch.js` - extracted fetch hook
- `src/cart/cartReducer.js`, `src/cart/cartReducer.manualtest.js` - cart reducer + manual tests
- `src/context/CartContext.jsx`, `src/Cart.jsx` - cart provider and display
- `src/OrderFormUseState.jsx`, `src/OrderFormUseReducer.jsx`, `src/formReducer.js`, `src/USESTATE_VS_USEREDUCER.md` - comparison
- `src/Dish.jsx` - now wrapped in `React.memo`
- `src/Menu.jsx` - uses `useFetch`, `useCart`, `useCallback`
- `src/App.jsx` - wraps the app in `ThemeProvider` and `CartProvider`

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## How to run the reducer's manual tests

```bash
node src/cart/cartReducer.manualtest.js
```

Every line should print `PASS`.
