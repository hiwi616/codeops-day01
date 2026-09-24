# CBE Dashboard — Layout Rebuild

A structural rebuild of a **CBE (Commercial Bank of Ethiopia) online-banking-style account dashboard** — the kind of screen you'd see after logging in, showing account balances, quick actions, and recent transactions. Structure only; all content is placeholder data.

## How to open it

Open `index.html` in any browser — double-click the file, or use a tool like VS Code's Live Server extension. No build step, no dependencies.

## What uses Grid vs. Flexbox

### Grid — the page skeleton
- `.app` is the outer page skeleton, built with `grid-template-areas` defining four named regions: `header`, `sidebar`, `main`, and `footer` (in a `260px` sidebar / `1fr` main two-column layout).
- `.cards` (the account balance cards) is a **responsive grid** using `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` — the column count adjusts on its own as the window resizes, with no extra media query needed for that part.

### Flexbox — the components inside each area
- `.navbar` (inside the header) — a flex row with `justify-content: space-between`, logo on the left, notification bell + user name on the right.
- `.sidebar-nav` — a flex column of navigation links.
- `.toolbar` (inside main) — a flex row with the page title on the left and action buttons (Transfer, Pay Bills) on the right.
- `.transaction-list li` — each transaction row is a flex row with the description on the left and the amount on the right.

## Sticky element

`.app-header` uses `position: sticky; top: 0;` — it stays visible at the top of the viewport while the main content area scrolls underneath it.

## Absolutely positioned elements (anchored to relative parents)

- **Notification badge** — `.badge` (`position: absolute`) is anchored to `.notification-wrapper` (`position: relative`), pinning the "3" unread count to the corner of the bell icon.
- **"New" tag** — `.tag` (`position: absolute`) is anchored to `.stat-card` (`position: relative`), pinning a "New" label to the corner of the Savings Account card. Neither is positioned relative to the page — both are anchored to their own local relative parent.

## Responsive behavior

A single `@media (max-width: 700px)` query collapses `.app`'s `grid-template-columns` from `260px 1fr` to `1fr` and redefines `grid-template-areas` to stack everything into one column (header, sidebar, main, footer, in that order). The sidebar nav also switches from a vertical list to a wrapped horizontal row at that breakpoint.

## Self-check

- ✅ The page skeleton uses named grid areas (`header`, `sidebar`, `main`, `footer`), and they restack to a single column under 700px.
- ✅ Each component (navbar, sidebar nav, toolbar, transaction rows) is built with Flexbox.
- ✅ The card grid changes its column count as the window resizes on its own, via `auto-fit`/`minmax`, with no extra media query for that behavior.
- ✅ The header stays visible (sticky) while the main content area scrolls.
- ✅ Both absolutely positioned elements (the notification badge and the "New" tag) are anchored to a relative parent, not the page.
