# Three ways to build the same cart

This project has now implemented the cart three times:

1. `src/cart/cartReducer.js` + `src/context/CartContext.jsx` - the
   original: a plain reducer, wired up with `useReducer` and handed to
   the tree through React Context. **Still in the repo, but no longer
   used by the running app** - it's kept as the artifact for Exercises 1
   and 2 (see below).
2. `src/store/cartStore.js` - a zustand store. **This is what the app
   actually runs on now.**
3. `src/store/cartSlice.js` - a Redux Toolkit slice. **Written for this
   exercise only; not wired into the app.** There's no `configureStore`
   call and no `<Provider>` anywhere in this project.

## Exercises 1-2: hardening the Context version (before moving away from it)

- `useCart()` in `CartContext.jsx` already threw a clear error
  ("useCart must be used inside a CartProvider") if called outside a
  `<CartProvider>`, from when it was first written - so Exercise 1 was
  already satisfied by the existing code. No change was needed.
- Auth and theme were already split into their own providers
  (`AuthContext.jsx`, `ThemeContext.jsx`), completely separate from the
  cart provider, each in its own file, each wrapped independently in
  `App.jsx` - so Exercise 2 was also already true going into this
  exercise. (`CartProvider` itself has since been removed from
  `App.jsx` as part of Exercise 4-5, since zustand doesn't use a
  provider at all - see below.)

## Exercise 3: profiling with React DevTools

1. Open the app, then open the React DevTools tab and go to
   **Components > the gear icon > "Highlight updates when components
   render."**
2. Add a dish to the cart from `/menu`.
3. Before the zustand migration (Context + one `useCart()` per
   component), every consumer of `CartContext` - `CartBadge`,
   `CheckoutPanel`, `Menu` - would flash, because Context re-renders
   every consumer whenever the provided value object changes, even the
   ones that only cared about, say, the item count.
4. After the zustand migration (Exercise 5, narrow selectors), only the
   components whose selected value actually changed should flash. Adding
   a dish updates `items`, `total` and the count, so `CartBadge`,
   `CheckoutPanel` and `Menu`'s total line do still flash (their selected
   values did change) - but a component that only reads, say, the theme,
   should not flash just because the cart changed. The win isn't "nothing
   re-renders," it's that re-renders are now tied to the specific slice
   of state a component actually reads, not to "did the cart change at
   all."

## Exercise 4: the zustand store

`cartStore.js` has no Provider, no Context, and no `dispatch({ type, ...
})` object shape - just `addItem(dish)`, `remove(id)`, `clear()` as
plain functions on the store, called directly.

## Exercise 5: narrow selectors, replacing useCart

Every former `useCart()` call became one or more selector calls:

| Component        | Before (Context)              | After (zustand)                                   |
| ----------------- | ------------------------------ | -------------------------------------------------- |
| `CartBadge`       | `useCart()` -> `items`         | `useCartCount()`                                   |
| `CheckoutPanel`   | `useCart()` -> everything      | `useCartItems()`, `useCartTotal()`, `useCartRemove()`, `useCartClear()` |
| `Menu`            | `useCart()` -> `dispatch`, `total` | `useCartStore(state => state.addItem)`, `useCartTotal()` |
| `DishDetail`      | `useCart()` -> `dispatch`      | `useCartStore(state => state.addItem)`             |
| `Cart` (page)     | `useCart()` -> `items`         | `useCartItems()`                                   |

Each component now subscribes only to the specific value(s) it reads,
rather than the whole `{ items, dispatch, total }` object every
`useCart()` call used to return.

## Exercise 6: persist middleware

`cartStore.js` wraps its store in zustand's `persist` middleware, keyed
`"addis-eats-cart"`. This writes to `localStorage` after every change and
reads it back on startup - the cart now survives a page refresh, with no
extra code in any component. (The Context version never had this; adding
it there would have meant writing the `localStorage` read/write by hand
inside `useReducer`'s initializer and an effect.)

## Exercise 7: the same cart as a Redux Toolkit slice

`cartSlice.js` is the same three operations (`addItem`, `removeItem`,
`clear`) as `createSlice` reducers. The most visible difference from
`cartReducer.js` is that RTK's Immer integration allows "mutating" code
(`existing.qty += 1`, `state.items.push(...)`) that produces a new
immutable state under the hood - `cartReducer.js` has to spread
everything by hand (`{ ...item, qty: item.qty + 1 }`) to get the same
result.

### Zustand vs Redux Toolkit, side by side

- **Boilerplate to wire in.** Redux Toolkit needs `configureStore`, a
  root `<Provider store={store}>` wrapping the app, and `useSelector`/
  `useDispatch` at every call site. Zustand needs none of that - `create`
  returns a hook you import directly, which is why removing
  `CartProvider` from `App.jsx` in Exercise 4-5 didn't require adding
  any other kind of provider in its place.
- **Reading a slice of state.** Both support narrow selectors
  (`useCartStore(state => state.items)` vs `useSelector(selectCartItems)`),
  so the actual re-render behaviour from Exercise 3/5 would look similar
  either way, once wired in with selectors.
- **Updating state.** Zustand's `set` callback still returns a new object
  by hand (unless you add its own Immer middleware); RTK gets Immer for
  free inside every `createSlice` reducer, which is why `cartSlice.js`
  reads more like "just mutate it" than `cartStore.js` does.
- **When each earns its keep.** For one cart in one small app, zustand's
  lack of ceremony (no Provider, no slice registration, no root store
  file) is hard to beat. Redux Toolkit's structure - actions, a
  predictable single store, and its DevTools time-travel debugging -
  tends to pay off more in larger apps with many interacting slices of
  state, or where a team already has Redux conventions in place.
