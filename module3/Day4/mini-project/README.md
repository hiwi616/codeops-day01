# Addis Eats - The Menu That Loads Itself (Day 4 Mini-Project)

A Vite + React project. The interactive menu from Day 3 now fetches its own data.
The dishes arrive from an endpoint (`public/dishes.json`), and the loading, error and
empty states are all visible on screen. Switching category quickly never leaves the wrong dishes showing.

## What now comes from the server

- The dishes: there is no hard-coded dish array left in any component. They are fetched from `public/dishes.json`.

## What it does

- **Fetch in an effect.** `Menu` loads the dishes in `useEffect` and stores them in state.
- **Loading and error state.** `DishList` renders each one with an early return before the list.
- **`res.ok` checked.** `src/api.js` throws a message a person can understand (for example "We couldn't load the menu right now (error 404)...").
- **`finally`.** `setLoading(false)` runs in a `finally` block, so the loading message can never get stuck. A cancelled request is not allowed to switch it off, because a newer request is already running.
- **Category in the dependency array.** Changing the category refetches the list.
- **Abort in cleanup.** Each request has an `AbortController`; the cleanup cancels the previous request, and the resulting `AbortError` is ignored.
- **Search focus.** The search input is focused on mount with `useRef`, inside an effect (the input is not in the DOM yet while React renders). The search box also filters by name as you type.
- **Friendly empty state.** A category with no dishes (try "Dessert") shows a note, not an error.

## Where each thing lives

- `public/dishes.json` - the menu data, fetched at runtime
- `src/api.js` - `fetchDishes(category, signal)`: the request, the `res.ok` check and the readable error messages
- `src/Menu.jsx` - category, dishes, loading, error, search and order total state; the effects
- `src/DishList.jsx` - loading, error and empty early returns, then the mapped list keyed by id
- `src/CategoryBar.jsx` - stateless category chips
- `src/Dish.jsx`, `src/Card.jsx`, `src/OrderForm.jsx`, `src/Header.jsx`, `src/App.jsx`, `src/main.jsx`, `src/data.js` (category list)

## How to check it

- **Loading message:** DevTools > Network > set throttling to "Slow 3G", then reload. "Loading menu..." shows before the dishes.
- **Error message:** temporarily rename `public/dishes.json` and reload. You should see a readable error, not a blank screen. Rename it back.
- **Cancelled request:** with throttling on, click two category chips quickly. In the Network tab the first `dishes.json` request shows as "(canceled)". (In development, React's Strict Mode also mounts twice, so you may see one cancelled request on first load too.)
- **Empty state:** click "Dessert".
- **Focus:** the search box has focus as soon as the page loads.

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
