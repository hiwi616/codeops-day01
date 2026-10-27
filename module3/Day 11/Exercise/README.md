# Next.js App Router Exercise

This project covers the seven Module 3 exercises:
1. Scaffold a Next.js App Router project.
2. Add Home, Menu, Cart, and Checkout routes.
3. Add the dynamic `/menu/[id]` route and render the ID.
4. Keep `DishList.js` and `CategoryBar.js` inside `app/menu/`; these files do not create routes.
5. Use `next/link` and a client component with `useRouter`.
6. Add `loading.js` and `error.js` under the menu segment.
7. Add `not-found.js` and call `notFound()` for an unknown dish.

## Run the project

Install Node.js (LTS), then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Known dish IDs are `1`, `2`, and `3`. Try `/menu/999` to test the not-found page.

The menu page contains a short delay to make `loading.js` easier to observe. Remove the delay in `app/menu/page.js` after testing.

## GitHub

After creating a GitHub repository and connecting it as `origin`:

```bash
git add .
git commit -m "Complete Module 3 Next.js exercises"
git push -u origin main
```
