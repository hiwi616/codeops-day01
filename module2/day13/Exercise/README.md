# Day 13 — CSS Fundamentals

Five CSS exercises covering custom properties, the box model, specificity, table styling, and color conversion.

## Files

1. **`01-custom-properties-button.html`** — a `:root` block with four custom properties (two colors, one spacing value, one font stack), all consumed via `var()` on a single styled button.
2. **`02-box-sizing-demo.html`** — a 300px-wide card with 24px padding and a 2px border, shown twice: once with `content-box` (renders at 352px — 300 + 48px padding + 4px border) and once with `border-box` (renders at exactly 300px). A small script measures and displays the actual rendered width of each, confirming the math live in the browser.
3. **`03-specificity-prediction.html`** — a paragraph targeted by an element selector (`p`), a class selector (`.highlight`), and an ID selector (`#unique-paragraph`), each setting a different color. Includes the specificity score for each rule and a written prediction, followed by the actual rendered result to confirm it — the ID wins, so the paragraph renders red. (Verified independently with jsdom's CSS cascade resolution.)
4. **`04-flight-table-zebra.html`** — a five-row Ethiopian Airlines schedule table with a styled header row, zebra striping via `tr:nth-child(even)`, and comfortable cell padding (`12px 16px`).
5. **`05-hex-to-rgb-hsl.html`** — a three-color hex palette (Forest Green `#1F5C3A`, Sunset Gold `#F0B429`, Clay Red `#B3261E`) converted to both `rgb()` and `hsl()`. Each swatch has a hover state that's a lighter shade of the same color — produced by keeping the hue and saturation identical and only increasing the lightness value by 15 percentage points.

## Run

Open any file directly in a browser — double-click it, or use a tool like VS Code's Live Server extension.

## Notes on verification

- Exercise 2's width measurements run live in your browser via a small script, so you can see the actual numbers rather than just trusting the math in the comments.
- Exercise 3's prediction was independently checked using jsdom's CSS cascade engine, which confirmed the ID selector wins and the paragraph computes to `rgb(255, 0, 0)` (red).
- Exercise 5's rgb/hsl conversions were computed programmatically (Python's `colorsys`) for accuracy, not estimated by eye.
