# BOUNDARY.md - what runs where, and why

Rule used: build server-first, add `"use client"` only where something forces it, and put it on the **smallest** component that needs it.

| Component | Runs on | Why |
| --- | --- | --- |
| `app/layout.js` | server | Passes `children` into `Providers`; imports nothing that carries the directive except `Providers` itself (a client entry point). |
| `components/Providers.jsx` | **client** | Context requires state. Own file so the root layout stays on the server. |
| `components/CartProvider.jsx` | **client** | `useReducer`, `useEffect`, `localStorage`. |
| `components/Header.jsx` | server | Static links; only `CartBadge` is a client leaf. |
| `components/CartBadge.jsx` | **client** | Reads the live cart count from context. |
| `components/Footer.jsx` | server | Static markup. |
| `app/menu/layout.js` | server | Sidebar markup, no interactivity. |
| `app/menu/MenuCounter.jsx` | **client** | Exercise tool: `useState` + `onClick` to prove layouts persist. |
| `app/menu/page.js` | server | `await getDishes()`; no interactivity of its own. |
| `app/menu/FilterShell.jsx` | **client** | Holds the selected category; wraps server content through `children`. |
| `app/menu/CategoryBar.jsx` | client (by import) | Buttons; imported by `FilterShell`, so no directive needed. |
| `app/menu/DishList.jsx` | server | Pure markup from data. |
| `components/DishCard.jsx` | server | Pure markup from data. |
| `components/AddToCartButton.jsx` | **client** | `onClick`, writes to the cart store. |
| `app/menu/[id]/page.js` | server | Awaits one dish; `generateStaticParams`. |
| `app/cart/page.js` | server | Heading only. |
| `components/CartView.jsx` | **client** | Quantity inputs, remove buttons, cart state. |
| `app/menu/ErrorTrigger.jsx` | **client** | Test tool: throws on click to prove `error.js`. |
| `app/menu/error.js` | **client** | Error boundaries need state and a click handler to offer a retry. |

Files with the directive: run `npm run boundary` (9 files: CartBadge, AddToCartButton, CartProvider, CartView, Providers, FilterShell, MenuCounter, ErrorTrigger, menu/error.js). `MenuCounter` and `ErrorTrigger` are test tools you can delete after the demo, leaving 7.

## Why `error.js` needs `"use client"` (one sentence)
React error boundaries are class-based and recover through state plus an event handler (`reset()`), and state and handlers only exist in the browser.

## Props crossing the boundary
Only serialisable data: strings, numbers, arrays. `AddToCartButton` receives `id`, `name`, `price`; no server component passes a function to a client component. (`FilterShell` -> `CategoryBar` passes a callback, but that is client-to-client, which is fine.)
