# Day 14 — Flexbox, Grid & Positioning

Five CSS layout exercises covering Flexbox, CSS Grid, and positioning.

## Files

1. **`01-navbar-flexbox.html`** — a navbar built with `display: flex`, `justify-content: space-between` (logo on the left, links + button pushed to the right), and `align-items: center` for vertical centering.
2. **`02-cards-flex.html`** — a row of four cards using `flex: 1` so they share the available width equally, with `flex-wrap: wrap` and a `gap` so they reflow onto a new line on a narrow screen instead of squeezing.
3. **`03-photo-gallery-grid.html`** — a photo gallery using `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`. Resize the browser window and the column count adjusts on its own, with no media queries needed.
4. **`04-page-layout-grid-areas.html`** — a full page layout with `grid-template-areas` (header, sidebar, main, footer), collapsing to a single stacked column via a `@media (max-width: 700px)` query.
5. **`05-product-card-badge.html`** — a product card with a circular "ETB Sale" badge pinned to its top-right corner using `position: relative` on the card and `position: absolute` (with negative offsets) on the badge.

## Run

Open any file directly in a browser — double-click it, or use a tool like VS Code's Live Server extension. For exercises 3 and 4, resize your browser window to see the responsive behavior in action:
- **Exercise 3**: the gallery's column count changes continuously as you resize.
- **Exercise 4**: below 700px wide, the layout collapses to a single column.
