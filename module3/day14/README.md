# Day 39 - Route handlers and server actions

The server half of Addis Eats, in the same repository as the pages.

## Endpoints

| Method + path                         | Success   | Errors                                     |
| ------------------------------------- | --------- | ------------------------------------------ |
| `GET /api/dishes` (`?category=Vegan`) | 200 list  | 400 unknown category                       |
| `GET /api/dishes/[id]`                | 200 dish  | 404 `{ error, fieldErrors }`               |
| `POST /api/orders`                    | 201 order | 400 bad JSON, 422 `{ error, fieldErrors }` |

Every failure has the same shape: `{ "error": "...", "fieldErrors": { field: ["message"] } }`.

## Pages added

- `/checkout`: guarded form (demo sign-in as Almaz or Dawit). Dynamic, because it reads the session cookie.
- `/orders`: your orders, with cancel. Dynamic.
- `/kitchen`: a public cached (ISR) order counter, so `revalidatePath` has a cached page to refresh.

## Server actions (`app/actions.js`)

- `placeOrder`: replaces the fetch. Validated with the same `lib/schema.js` as the API. Calls `revalidatePath("/orders")` and `revalidatePath("/kitchen")`. Driven by `useActionState` in `components/CheckoutForm.jsx`.
- `cancelOrder`: checks the session and that the order belongs to the signed-in user, inside the action.
- `signIn` / `signOut`: demo cookie session.

Note: with `useActionState` an action's signature is `(previousState, formData)`.

## Proof (production build: `npm run build && npm start`)

```
curl -i localhost:3000/api/dishes/not-a-dish
-> HTTP/1.1 404 Not Found   {"error":"No such dish","fieldErrors":{}}

curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0912"}'
-> HTTP/1.1 422 Unprocessable Entity
   {"error":"Validation failed","fieldErrors":{"phone":["Use 09… or +2519…"],"area":["Choose a delivery area"]}}

curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz Tesfaye","phone":"0912345678","area":"Bole","items":[{"id":"kitfo","qty":2}]}'
-> HTTP/1.1 201 Created   {"id":"ord_801", ... "total":840,"currency":"ETB","status":"placed"}

curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d 'not json'
-> HTTP/1.1 400 Bad Request   {"error":"Request body must be valid JSON","fieldErrors":{}}
```

The server calculates the total (2 x Kitfo 420 = 840 ETB) from its own menu; the client never sends a price.

## Exercise checklist

1. `GET /api/dishes`: done
2. `GET /api/dishes/[id]` with 404 and the standard error shape: done
3. `POST /api/orders` with the zod schema, 422 + `fieldErrors`: done
4. Branch on the status code: the fetch version is below; the live form uses the server action
5. Same submission as a server action, fetch deleted: `placeOrder`
6. `useActionState` for the pending flag, `revalidatePath` after a write: done
7. `cancelOrder` checking session and record owner: done

### Exercise 4 - the fetch version (replaced by the action in exercise 5)

```js
const res = await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, phone, area, items }),
});
if (res.status === 201) {
  /* show the order id */
} else if (res.status === 422) {
  const { fieldErrors } = await res.json(); /* show beside each field */
} else {
  /* 400 / 500: show a general message */
}
```

## Notes

- `POST /api/orders` stores the order for the signed-in user, or `guest` with no cookie, so curl works. A real API would require auth.
- `lib/session.js` is a demo: a real app signs or encrypts its session cookie.
- The order store is in memory and resets when the server restarts.

## Build output

```
Route (app)            Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ○ /cart
├ ƒ /checkout
├ ○ /kitchen                   1h      1y
├ ○ /menu                      1h      1y
├   /menu/[id]
│ ├ ● /menu/kitfo
│ ├ ● /menu/doro-wat
│ ├ ● /menu/tibs
│ └ ● [+7 more paths]
└ ƒ /orders


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
