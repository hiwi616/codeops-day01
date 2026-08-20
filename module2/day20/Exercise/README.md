# Day 20 — Fetch, Async/Await & Error Handling

JavaScript exercises covering `fetch`, `async`/`await`, `try`/`catch`, `res.ok`, and `Promise.all`, run against real public APIs.

## Files

1. **`01-exchange-rate.js`** — `getUsdToEtbRate()`, an async function that fetches the USD→ETB rate from [exchangerate-api.com](https://www.exchangerate-api.com/) (no API key needed), checks `res.ok`, and returns the rate.
2. **`02-async-await-refactor.js`** — a three-step `fetch → .json() → render` `.then()` chain (shown commented out as the "before") rewritten as an `async` function using `await` and `try`/`catch`, fetching a user list from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and rendering it to the console.
3. **`03-fetch-errors.js`** — two parts:
   - **Part A** fetches a deliberately nonexistent domain, confirming the `catch` block runs (this fails at the network level, so `fetch()` itself rejects).
   - **Part B** fetches a real, reachable URL that returns HTTP 404, showing that `fetch()` resolves successfully (the server *did* respond) and why you also need to check `res.ok` — otherwise a 404 error page would be silently treated as a success.
4. **`04-promise-all.js`** — fetches a list of users from JSONPlaceholder, takes the first two, and uses `Promise.all` to fetch each of their posts in parallel rather than one at a time.
5. **`05-loading-page/`** — a tiny HTML + JS page (`index.html`, `script.js`) showing all three UI states: "Loading...", the fetched USD→ETB rate on success, or an error message on failure. Open it in a browser, then toggle DevTools → Network → "Offline" and click "Fetch again" to see the error state; toggle back online to see the loading state followed by success.

## Run

```bash
node 01-exchange-rate.js
node 02-async-await-refactor.js
node 03-fetch-errors.js
node 04-promise-all.js
```

For exercise 5, open `05-loading-page/index.html` directly in a browser (or serve it with a tool like VS Code's Live Server).

## Note on testing

These scripts call real, live public APIs (exchangerate-api.com and jsonplaceholder.typicode.com), so they need an active internet connection to run and produce real 200/404 responses. No API keys are required for either service.
