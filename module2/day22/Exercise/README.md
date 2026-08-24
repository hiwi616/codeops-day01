# ETB Currency Converter & Watchlist

A single-page app that converts ETB to other currencies using live exchange rates, and lets you build a persistent watchlist of currencies to keep an eye on. Built step by step, in the order given on the reading sheet.

## How it was built (in order)

1. **Scaffold** — `index.html` with empty containers: `#status`, the `#convert-form`, `#result`, an empty `#currency-select`, and an empty `#watchlist <ul>`. `app.js` declares the `state` object (`{ rates: {}, watchlist: [] }`) and caches all element references once.
2. **`render()` against fake rates** — first tested with hard-coded fake data (`{ USD: 0.0177, KES: 2.29 }`) to confirm the dropdowns filled correctly, before any network code existed (see the comment at the bottom of `app.js`).
3. **`loadRates()`** — replaces the fake data with a live `fetch` to `https://api.exchangerate-api.com/v4/latest/ETB`, checks `res.ok`, stores `data.rates` into `state.rates`, and shows loading/error messages in `#status`.
4. **The convert form** — `preventDefault()`, reads and validates the trimmed amount with `Number()` (guarding both empty input and negative/NaN values), looks up the rate for the selected currency from `state`, and shows a formatted result line like `100 ETB = 1.77 USD`.
5. **The watchlist** — an "Add" button that guards against duplicate entries, `renderWatchlist()` that rebuilds the list from `state.watchlist`, and a single delegated click listener on the `<ul>` that removes a row by reading its `data-c` attribute.
6. **Persistence** — `save()` and `load()` read/write the watchlist to `localStorage` as JSON (guarding `null` and corrupt data), called from `init()` so the watchlist survives a full page reload.

## Files

- **`index.html`** — the page structure: status line, convert form, result line, and watchlist section.
- **`app.js`** — all the logic, built through the six steps above.

## Run

Open `index.html` in a browser — double-click the file, or use a tool like VS Code's Live Server extension. No build step, no API key required (the exchange rate API is free and keyless).

## Self-check

- ✅ The dropdown fills from `render()` — first verified against fake rates, then against live data.
- ✅ `loadRates()` checks `res.ok` and shows both loading and error states.
- ✅ The convert form validates the amount (rejects empty, non-numeric, and negative input) before computing a result.
- ✅ Adding an already-watched currency is a no-op — no duplicates appear.
- ✅ Removing a row works through a single delegated listener on the list, using `data-c` to identify which currency to remove.
- ✅ The watchlist is saved on every change and restored on load — confirmed to survive a simulated full page reload.
