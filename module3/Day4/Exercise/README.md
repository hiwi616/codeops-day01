# Addis Eats - The Menu Meets the World (Day 4)

A Vite + React project. The menu now loads its data from a JSON file and syncs with the browser using `useEffect` and `useRef`.

## What it does

1. **Tab title.** `document.title` is set to the number of dishes currently shown and updates whenever the list changes (`useEffect` with `shown.length` as the dependency).
2. **Fetching.** The dishes moved from `src/data.js` to `public/dishes.json`, and `Menu` fetches them inside `useEffect`.
3. **Loading and error state.** `DishList` renders each one with an early return before the list.
4. **Clear errors.** The fetch checks `res.ok` and throws a readable message, so a 404 reaches the error branch instead of failing silently.
5. **Category in the dependency array.** Switching category runs the effect again and refetches the list.
6. **Abort in cleanup.** Each request has an `AbortController`. The effect's cleanup aborts the previous request, and the resulting `AbortError` is ignored.
7. **Focus on mount.** The search input is focused with `useRef` inside an effect that runs once.

## Why the focus call has to be inside an effect

While React is rendering, the input does not exist in the DOM yet, so `searchRef.current` is `null`. React attaches the ref after it commits the DOM, and effects run after that commit. Calling `focus()` during render would crash, and focusing is a side effect anyway, which belongs in an effect, not in render.

## How to check the requests

- **Loading state:** open DevTools > Network, set throttling to "Slow 4G" or "Slow 3G", and reload. You should see "Loading menu...".
- **404 / error state:** temporarily rename `public/dishes.json`, reload, and the page should show "Could not load the menu (404 ...)". Rename it back afterwards.
- **Cancelled request:** with throttling on, click two category chips quickly. In the Network tab, the first `dishes.json` request shows as "(canceled)". (In development, React's Strict Mode also mounts twice, so you may see one cancelled request on first load too.)

## Project structure

- `public/dishes.json` - the menu data, fetched at runtime
- `src/data.js` - the category list
- `src/Menu.jsx` - category, total and fetched-dishes state; the effects; the search input
- `src/DishList.jsx` - loading and error early returns, empty state, mapped list keyed by id
- `src/CategoryBar.jsx` - stateless category chips
- `src/Dish.jsx` - typed dish with the Spicy badge and Add button
- `src/Card.jsx` - wrapper component
- `src/OrderForm.jsx` - controlled form with TeleBirr validation
- `src/Header.jsx`, `src/App.jsx`, `src/main.jsx`

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
