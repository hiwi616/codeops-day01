# Country Facts

A single-page app where you enter a country name and it fetches and displays facts about it — capital, population, region, currencies, and flag — from the free [REST Countries API](https://restcountries.com/). No framework; just `fetch`, `async`/`await`, and the DOM.

## How to run it

Open `index.html` in any browser — double-click the file, or use a tool like VS Code's Live Server extension. No build step, no API key required.

## Which API it uses

[restcountries.com](https://restcountries.com/) — specifically:
```
https://restcountries.com/v3.1/name/{country}
```
This endpoint is free and requires no API key or authentication.

## What it does

- **Default view** — on first load, the page automatically searches for and displays Ethiopia's facts (capital: Addis Ababa).
- **Search** — type any country name into the input and click "Search" (or press Enter).
- **Loading state** — while the request is in flight, a "Loading..." message is shown; it's removed once the request finishes (success or failure).
- **Error handling** — `res.ok` is checked explicitly (not just relying on the `fetch` promise resolving), and both HTTP errors (e.g. a country that doesn't exist, or misspelled) and network-level errors (e.g. no internet connection) are caught with `try`/`catch` and shown as the same friendly "Country not found" message, rather than crashing the page.
- **Rendering** — on success, the flag, capital, population, region, and currencies are built with `document.createElement` and appended into the DOM (no `innerHTML` string building).
- **Population formatting** — the population number is formatted with commas using `toLocaleString`, e.g. `120,283,026`.

## Files

- **`index.html`** — the page structure: search form and a result area holding the loading indicator, error message, and country card (all initially hidden except loading logic controls them at runtime).
- **`styles.css`** — all styling, including the loading and error message states.
- **`app.js`** — all the logic: caches element references once, fetches from the API, formats population and currencies, renders the country card with `createElement`, and defaults to Ethiopia on load.

## Self-check

- ✅ Shows a loading state before the data appears.
- ✅ Searching a non-existent country shows a friendly error rather than crashing.
- ✅ Checks `res.ok`, not just relying on the `fetch` promise resolving.
- ✅ Population is formatted readably (e.g. `120,283,026`).
- ✅ Defaults to Ethiopia's facts on first load.
