# Day 36 - Next.js intro and file-based routing

Addis Eats rebuilt on the Next.js **App Router**. There is no route table: the folder tree under `app/` is the router.

## Run it

```bash
npm install
npm run dev
npm run build && npm start
```

## Routes and the file that produces each one

| URL                                 | File                                 |
| ----------------------------------- | ------------------------------------ |
| `/`                                 | `app/page.js`                        |
| `/menu`                             | `app/menu/page.js`                   |
| `/menu/kitfo` (any dish id)         | `app/menu/[id]/page.js`              |
| `/cart`                             | `app/cart/page.js`                   |
| `/checkout`                         | `app/checkout/page.js`               |
| `/orders/history`                   | `app/orders/history/page.js`         |
| any unclaimed path, or `notFound()` | `app/not-found.js`                   |
| (shell around everything)           | `app/layout.js`                      |
| menu loading state                  | `app/menu/loading.js`                |
| menu error state                    | `app/menu/error.js` (`"use client"`) |

Not routes (no `page.js`, so they are just files): `app/menu/DishList.jsx`, `app/menu/CategoryBar.jsx`, `app/menu/dishes.js`, `app/menu/ErrorTrigger.jsx`, `app/cart/CheckoutButton.jsx`.

## Build output

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ○ /checkout
├ ○ /menu
├ ƒ /menu/[id]
└ ○ /orders/history


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

```
