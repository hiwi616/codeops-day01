// The fallback shown when the menu's own ErrorBoundary catches something.
// "Useful" means it does two things a plain error message doesn't:
// it says what's unaffected (so the person isn't left wondering whether
// to trust the rest of the page), and it gives them a concrete next step.
function MenuUnavailable() {
  return (
    <div className="crash-fallback" role="alert">
      <p>Something went wrong loading the menu.</p>
      <p>Your cart and the rest of the site are unaffected.</p>
      <button type="button" onClick={() => window.location.reload()}>
        Reload the page
      </button>
    </div>
  );
}

export default MenuUnavailable;
