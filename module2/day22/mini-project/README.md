# Ethiopia Weather Explorer

A data-driven single-page app showing live weather for major Ethiopian cities — same pattern as the ETB currency watch app (fetch, `async`/`await`, `try`/`catch`, `res.ok`, DOM rendering with `createElement`), built against a different free API and styled with Tailwind CSS.

## Which API it uses

[Open-Meteo](https://open-meteo.com/) — specifically the forecast endpoint:
```
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto
```
Completely free, no API key or sign-up required. City coordinates are hardcoded in `app.js` (8 major Ethiopian cities), so there's no separate geocoding step.

## How to run it

Open `index.html` in any browser — double-click the file, or use a tool like VS Code's Live Server extension. No build step, no dependencies to install (Tailwind is loaded via CDN in `index.html`).

## What it does

- **City picker** — choose from 8 Ethiopian cities (Addis Ababa, Bahir Dar, Hawassa, Mekelle, Gondar, Dire Dawa, Jimma, Adama).
- **Default view** — loads Addis Ababa's weather automatically on first load.
- **Current weather card** — shows temperature, a weather description with emoji icon, and wind speed.
- **5-day forecast** — a row of cards showing each day's high/low and icon.
- **Loading & error states** — a "Loading weather..." message while the request is in flight, and a friendly error message (checking `res.ok` and catching network failures) if something goes wrong.
- **Attractive styling** — built with Tailwind CSS utility classes for a clean, card-based layout with a soft gradient background.

## Files

- **`index.html`** — page structure and Tailwind CDN script tag.
- **`app.js`** — all the logic: city coordinates, weather-code-to-description mapping, fetching, and rendering the current weather card and forecast grid with `createElement`.
