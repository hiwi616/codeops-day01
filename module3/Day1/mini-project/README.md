# Addis Eats (Static Menu)

A small Vite + React project that renders a static Addis Eats menu.
A `Header` component and a reusable `Dish` component are composed in `App`,
and the menu is rendered from an array of dish objects using `.map()` with a unique `key`.

## Project structure

- `src/App.jsx` - holds the dishes array and renders Header + the menu
- `src/Dish.jsx` - reusable component, takes `name` and `price` props and shows the price in ETB
- `src/Header.jsx` - page header
- `src/main.jsx` - React entry point

## How to run

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build
```
