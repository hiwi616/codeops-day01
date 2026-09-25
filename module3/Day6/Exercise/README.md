# Addis Eats - Routed (Day 6)

A Vite + React project. The single-page app from Week 1 is now a real
multi-page app with `react-router-dom`, while the cart and theme context
persist across every screen transition (they wrap the whole `<Routes>` tree,
not any single page).

## Where each exercise lives

1. **`BrowserRouter`.** Installed with `npm install react-router-dom`.
   `src/main.jsx` wraps `<App />` in `<BrowserRouter>`. `src/App.jsx` defines
   the routes with `<Routes>`/`<Route>`.
2. **`Link` and `NavLink`.** Every internal navigation uses `Link` (the
   dish cards in `DishList.jsx`, the "Back to the menu" link in
   `DishPage.jsx`, the landing page's button in `Home.jsx`) instead of a
   plain `<a href="...">`. The top nav in `Layout.jsx` uses `NavLink`,
   whose function form of `className` marks whichever tab matches the
   current URL as `.nav-link-active`.
3. **`Layout`.** `src/pages/Layout.jsx` renders the header, the nav and the
   footer once, with an `<Outlet />` in between for whichever child route
   matched. Every screen (`Home`, `MenuPage`, `DishPage`, `CheckoutPage`,
   `Login`, `NotFound`) is nested inside it in `App.jsx`.
4. **Index route and catch-all.** `<Route index element={<Home />} />` is
   the landing page at `/`. `<Route path="*" element={<NotFound />} />` is
   last in the list, so it only matches when nothing else did.
5. **`menu/:id` and `useParams`.** `src/pages/DishPage.jsx` reads the id
   with `useParams()` and looks the dish up by `id`. Every dish card in
   `DishList.jsx` links to its own page with `<Link to={"/menu/" + dish.id}>`.
6. **Category in the query string.** `src/pages/MenuPage.jsx` uses
   `useSearchParams()` instead of `useState` for the selected category:
   `?category=Stew` in the URL is the source of truth, and "All" is
   represented by the param being absent. This means the current filter
   survives a page refresh and can be shared as a link.
7. **`RequireAuth`.** `src/auth/RequireAuth.jsx` checks `useAuth()` (a
   placeholder `AuthContext` — see below) and redirects to `/login` with
   `state={{ from: location }}` when signed out. `src/pages/Login.jsx`
   reads that state and calls `navigate(from, { replace: true })` after
   "signing in," so the person lands back on `/checkout` (or wherever they
   were headed) instead of always on the same fixed page.

## About the placeholder auth

There's no real backend here, so `AuthContext.jsx` just keeps
`isAuthenticated` as a boolean in `useState`. Clicking "Sign in" on
`/login` sets it to `true`. This is enough to demonstrate the redirect
and "return to where you were" behaviour `RequireAuth` is meant to show;
it resets on every page refresh, since it isn't persisted anywhere.

## What changed structurally

- `Dish.jsx` is now presentational only (name, price, Spicy badge). The
  Add button moved out to `DishList.jsx`, so it isn't nested inside the
  `<Link>`'s `<a>` tag (a button inside a link is invalid HTML, and would
  also trigger navigation on click).
- The old `Menu.jsx` and `Header.jsx` split into `pages/Layout.jsx` and
  `pages/MenuPage.jsx`.
- `CheckoutPanel.jsx` and `OrderForm.jsx` are now composed together in
  `pages/CheckoutPage.jsx`, which is the element `RequireAuth` guards.

## Project structure (new since the Week 1 project)

- `src/pages/Layout.jsx` - header, nav (`NavLink`), `Outlet`, footer
- `src/pages/Home.jsx` - index route / landing page
- `src/pages/MenuPage.jsx` - menu, category in the query string
- `src/pages/DishPage.jsx` - `menu/:id`, reads `useParams`
- `src/pages/CheckoutPage.jsx` - composes `CheckoutPanel` + `OrderForm`
- `src/pages/Login.jsx` - placeholder sign-in, redirects back via location state
- `src/pages/NotFound.jsx` - the `"*"` route
- `src/auth/RequireAuth.jsx`, `src/context/AuthContext.jsx` - the auth guard

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## How to verify

- Click through Home, Menu and Checkout in the nav; the active tab should
  be visibly different from the others.
- Click a dish's name/price to go to its own page at `/menu/<id>`; the URL
  changes and the same dish's details are shown.
- Pick a category chip on the Menu page; the URL should show
  `?category=...`. Refresh the page — the same category should still be
  selected.
- Visit `/checkout` directly (or click the Checkout tab) while signed out.
  You should land on `/login`. Click "Sign in", and you should be sent
  back to `/checkout`.
- Visit a made-up path like `/nope` and confirm the NotFound page shows,
  with a link back to Home.
