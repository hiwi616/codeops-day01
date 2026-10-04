// The fallback for the cart panel's ErrorBoundary. Specifically
// reassures the person their cart hasn't been emptied - the cart lives
// in a zustand store (src/store/cartStore.js), completely separate from
// whatever crashed in this component's render, so the data really is
// still there even though this panel currently isn't.
function CartUnavailable() {
  return (
    <div className="crash-fallback" role="alert">
      <p>Something went wrong showing your cart.</p>
      <p>Your items are still saved - try reloading, or keep browsing the menu.</p>
      <button type="button" onClick={() => window.location.reload()}>
        Reload the page
      </button>
    </div>
  );
}

export default CartUnavailable;
