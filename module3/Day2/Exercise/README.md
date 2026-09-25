# Addis Eats (Static Menu)

A small Vite + React project that renders a static Addis Eats menu, driven entirely by props.

## What it shows

- `Header` and a reusable `Dish` component composed in `App`
- `Dish` uses PropTypes (`name` and `price` required, `spicy` optional) and a `currency` default of "ETB"
- A "Spicy" badge rendered conditionally with `&&` (guarded with `Boolean()` so a `0` never renders)
- A `Card` wrapper component that renders its children
- `Menu` filters dishes by category, shows an empty state with an early return, and maps the result using each dish's `id` as the key

## Project structure

- `src/App.jsx` - dishes array and the selected category
- `src/Menu.jsx` - filter, empty state, map
- `src/Dish.jsx` - dish name, price, currency, Spicy badge
- `src/Card.jsx` - wrapper component
- `src/Header.jsx` - page header

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
