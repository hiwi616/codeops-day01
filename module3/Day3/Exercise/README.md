# Addis Eats - Interactive Menu (Day 3)

A Vite + React project. The static menu from Days 1-2 now responds to the user with state.

## What it does

1. `Dish` has its own `count` state and an "Add" button; the count shows beside the dish name.
2. `Menu` owns the selected `category` state, and `CategoryBar` renders the chips from an array, highlighting the selected one.
3. The category state is lifted into `Menu` and passed down to `CategoryBar` as `selected` and `onSelect`.
4. The dish list is filtered from the category state. When nothing matches (try "Dessert"), `DishList` returns an empty-state message early.
5. `App` keeps a running order total in state and shows it in ETB below the menu.
6. `DeliveryForm` is a controlled form (name, phone, area) using a single state object and one change handler.
7. The TeleBirr number is validated as it is typed, and the "Place order" button stays disabled until the name and area are filled in and the number is valid.

## Project structure

- `src/data.js` - dishes array and categories array
- `src/App.jsx` - order total state; renders Header, Menu, total, DeliveryForm
- `src/Menu.jsx` - category state; renders CategoryBar and DishList
- `src/CategoryBar.jsx` - category chips (`categories`, `selected`, `onSelect`)
- `src/DishList.jsx` - empty state and the mapped list, keyed by dish `id`
- `src/Dish.jsx` - typed dish with count state, Add button and Spicy badge
- `src/Card.jsx` - wrapper component
- `src/DeliveryForm.jsx` - controlled form with TeleBirr validation
- `src/Header.jsx` - page header

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Notes

- A valid TeleBirr number is an Ethiopian mobile number: `09XXXXXXXX` or `07XXXXXXXX`, or the same with `+251` instead of the leading `0`.
- A dish's count resets when its category is filtered out, because the `Dish` component is removed and remounted. The order total is kept in `App`, so it is not lost.
