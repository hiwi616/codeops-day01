# Addis Eats - Week 1, Split Across Real Screens (Day 6 Mini-Project)

A Vite + React project. The Week 1 single-page app is now a real multi-page
app: a landing page, a menu with a shareable filter, a page per dish, a cart
that survives every navigation, and a checkout that can't be reached without
signing in. One `Layout` renders the frame; the router decides what fills it.

## Route table

```
<ThemeProvider>
  <CartProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<DishDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </CartProvider>
</ThemeProvider>
```

(`login` isn't in the sheet's worked start, but it's where `RequireAuth`
sends a signed-out visitor, so it's added as a normal, unguarded route.)

## Requirements, and where each one is met

- **Nested route table, `Layout` parent, index route, `"*"` catch-all.**
  See the table above, and `src/App.jsx`. `Layout` (`src/pages/Layout.jsx`)
  is the parent for every other route; `index` is `Home`; `"*"` is
  `NotFound`, listed last so it only matches when nothing else did.
- **Navigation built from `Link` and `NavLink`, current screen highlighted.**
  The nav in `Layout.jsx` uses `NavLink`, whose function-form `className`
  adds `.nav-link-active` to whichever tab matches the URL. Every other
  internal link (`Home`'s "Browse the menu" button, each dish card,
  `DishDetail`'s "Back to the menu", `Cart`'s "Proceed to checkout") uses
  `Link`, not a plain `<a>`.
- **Dynamic `/menu/:id`, read with `useParams`.** `src/pages/DishDetail.jsx`.
  A made-up id, like `/menu/not-a-dish`, doesn't match any dish and shows
  "No dish with that id" instead of crashing (`Number("not-a-dish")` is
  `NaN`, which never equals a real dish's numeric `id`).
- **Category filter in the query string, shareable.** `src/pages/Menu.jsx`
  uses `useSearchParams()`. `/menu?category=Vegan` reads straight from the
  URL on load — there's no local state that needs to "catch up" — so
  opening that link directly or in a new tab shows the filtered menu
  immediately. (This menu's categories are Stew/Meat/Breakfast; "Vegan"
  from the sheet's example just wouldn't match anything and would show the
  empty state, the same way an unmatched category does today.)
- **Cart provider mounted above the router.** In `App.jsx`, `CartProvider`
  wraps `BrowserRouter`, not the other way around. It's mounted once for
  the app's whole lifetime, so switching routes never remounts or resets
  it — that's what makes adding a dish, then visiting `/cart` (or any other
  screen), still show the same order.
- **`RequireAuth` guard on `/checkout`, waits for loading, remembers the
  destination.** `src/context/AuthContext.jsx` exposes `isLoading` (true
  only while it's checking `localStorage` for an existing session) and
  `isAuthenticated`. `src/auth/RequireAuth.jsx` shows a "Checking your
  session..." message while `isLoading` is true, and only *then* decides
  whether to render the page or redirect to `/login` with
  `state={{ from: location }}`. `src/pages/Login.jsx` reads that state and
  sends the person back to `from` after "signing in."
- **Every route loads correctly when typed straight into the address bar.**
  Because the filter lives in the URL and the auth check runs on mount
  (not on navigation), every route — including `/menu?category=Stew`,
  `/menu/3`, and `/checkout` — resolves correctly on a fresh load, not just
  when reached by clicking through the app. See "Deploying" below for the
  one extra step a static host needs for this to work after a refresh.

## Check-yourself, one at a time

- **Cart survives navigation:** add a dish from `/menu`, then click "Cart"
  in the nav — it's the same order, because `CartProvider` never remounted.
- **Header keeps its state:** the theme and the cart badge don't reset when
  you move between screens, for the same reason.
- **Shareable filter:** pick "Stew" on `/menu`, copy the URL
  (`.../menu?category=Stew`), and open it in a new tab — the same filter is
  already applied.
- **Not-a-dish:** visit `/menu/not-a-dish` — you get a "not found" message,
  not a crash.
- **Signed-out `/checkout`:** visit `/checkout` directly while signed out.
  You're sent to `/login`; after clicking "Sign in," you land back on
  `/checkout`.
- **Refresh while signed in:** sign in, then refresh the page while on
  `/checkout`. You should briefly see "Checking your session...," then stay
  on `/checkout` — not get sent to the login screen. (This relies on
  `localStorage`, so it only works in a normal, non-private browser
  window — private/incognito windows clear it.)

## About the placeholder auth

There's no real backend. `AuthContext.jsx` stores a boolean in
`localStorage`, with a short artificial delay so the loading state is
observable and testable, standing in for a real "check my session with the
server" call.

## Deploying as a static site

A static host (GitHub Pages, Netlify, etc.) doesn't know about your
client-side routes by default — the *server* only has one real file,
`index.html`. Typing `/menu/3` straight into the address bar sends a
request for a literal `/menu/3` path, which most static hosts will 404 on,
even though React Router would handle it just fine once the app has
loaded. Two common fixes:
- **GitHub Pages:** copy `dist/index.html` to `dist/404.html` after
  building, so any unmatched path still serves your app, which then lets
  the router take over.
- **Netlify:** add a `public/_redirects` file containing `/* /index.html 200`.

This doesn't come up at all with `npm run dev` locally, since Vite's dev
server already handles this for you.

## Project structure

- `src/pages/Layout.jsx` - header, nav (`NavLink`), `Outlet`, footer
- `src/pages/Home.jsx` - index route / landing page
- `src/pages/Menu.jsx` - menu, category in the query string
- `src/pages/DishDetail.jsx` - `menu/:id`, reads `useParams`
- `src/pages/Cart.jsx` - standalone cart screen
- `src/pages/Checkout.jsx` - composes `CheckoutPanel` + `OrderForm`, guarded by `RequireAuth`
- `src/pages/Login.jsx` - placeholder sign-in, redirects back via location state
- `src/pages/NotFound.jsx` - the `"*"` route
- `src/auth/RequireAuth.jsx`, `src/context/AuthContext.jsx` - the auth guard, with loading + persistence
- `src/context/CartContext.jsx`, `src/cart/cartReducer.js` - the cart, from Week 1
- `src/hooks/useFetch.js` - the fetch hook, from Day 5

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).
