# Addis Eats on Next.js

A small Next.js App Router project for the IBT Module 3 exercise.

## Routes

- `/` — Home page (`app/page.js`)
- `/menu` — Menu (`app/menu/page.js`)
- `/menu/1` — Dynamic dish page (`app/menu/[id]/page.js`)
- `/cart` — Cart (`app/cart/page.js`)
- `/checkout` — Checkout (`app/checkout/page.js`)

## Route and component notes

- `app/menu/DishList.js` and `app/menu/CategoryBar.js` are components, not routes, because neither file is named `page.js`.
- `app/menu/loading.js` displays a loading UI for the menu segment.
- `app/menu/error.js` is a client component that provides an error boundary and Retry button.
- `app/menu/[id]/page.js` calls `notFound()` when the dish ID is unknown.
- `app/menu/not-found.js` displays the custom not-found UI for the menu segment.

## Run locally

Install Node.js LTS, then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Test the routes

- `/`
- `/menu`
- `/menu/1`
- `/menu/2`
- `/menu/999` (should show the not-found UI)
- `/cart`
- `/checkout`

The menu page has a short delay so `loading.js` is easier to observe. Remove the delay in `app/menu/page.js` after testing.

To test the error UI, temporarily add `throw new Error("Testing menu error")` inside `app/menu/page.js`, visit `/menu`, and then remove the throw.
