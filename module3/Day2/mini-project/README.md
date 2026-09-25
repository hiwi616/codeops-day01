# Addis Eats - Typed Menu (Day 2)

A Vite + React project that renders a static Addis Eats menu, driven by props and typed with PropTypes.

## What it shows

- `Dish` declares PropTypes: `name` and `price` required, `spicy` optional, and a `currency` default of "ETB"
- A "Spicy" badge rendered with `&&`, guarded with `Boolean(spicy)` so a stray `0` never renders
- A reusable `Card` wrapper that renders its `children`
- `Menu` filters dishes by category, shows an empty state (early return) when nothing matches, and maps the filtered list using each dish's `id` as the key
- Menu data lives in `src/data.js` (id, name, price, category, spicy)

## Project structure

- `src/data.js` - the menu array
- `src/App.jsx` - picks the category and renders Header + Menu
- `src/Menu.jsx` - filter, empty state, map
- `src/Dish.jsx` - typed dish component with the Spicy badge
- `src/Card.jsx` - wrapper component
- `src/Header.jsx` - page header

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
Change `category` in `src/App.jsx` to try other filters, or to `"Dessert"` to see the empty state.
