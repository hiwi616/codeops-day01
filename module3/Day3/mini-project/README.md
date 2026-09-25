# Addis Eats - The Interactive Menu (Day 3 Mini-Project)

A Vite + React project. The static menu from Days 1-2 is now a working ordering screen.
Every piece of interactivity comes from state; there is no DOM manipulation.

## What it does

- Clickable category chips filter the dishes (`Menu` owns the `category` state and derives the filtered list)
- `CategoryBar` is stateless: it receives `categories`, `selected` and `onSelect` as props, and styles the active chip
- `DishList` renders the filtered dishes with stable `id` keys, and shows an empty-state message when nothing matches (try "Dessert")
- The order total is held in `Menu` state, updated from the Add button's click handler, and displayed in ETB below the list
- `OrderForm` is a controlled form (name, phone, area) held in one state object, updated with the spread operator and one change handler
- The TeleBirr number is validated as you type; the submit button stays disabled until the name and area are filled in and the number is valid (`0911223344` and `+251911223344` pass, everything else is rejected)

## Where the state lives

`category` and `total` are in `Menu`, the lowest component that contains everything that needs them (`CategoryBar`, `DishList` and the total display). `OrderForm` keeps its own form state because nothing else needs it.

## Project structure

- `src/data.js` - dishes array and categories array
- `src/App.jsx` - renders Header, Menu and OrderForm
- `src/Menu.jsx` - category and total state, filtering
- `src/CategoryBar.jsx` - stateless category chips
- `src/DishList.jsx` - mapped list keyed by id, plus the empty state
- `src/Dish.jsx` - typed dish (PropTypes) with the Spicy badge and Add button
- `src/Card.jsx` - wrapper component
- `src/OrderForm.jsx` - controlled form with TeleBirr validation
- `src/Header.jsx` - page header

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
