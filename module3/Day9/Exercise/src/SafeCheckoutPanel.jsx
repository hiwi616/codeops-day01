import ErrorBoundary from "./ErrorBoundary";
import CheckoutPanel from "./CheckoutPanel";

// A single wrapped definition, used by both pages/Cart.jsx and
// pages/Checkout.jsx, so the cart panel gets the same independent
// ErrorBoundary everywhere it appears, without repeating the fallback
// markup in two files.
function SafeCheckoutPanel() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="crash-fallback">
          <p role="alert">
            Something went wrong showing your cart: {error.message}
          </p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </div>
      )}
    >
      <CheckoutPanel />
    </ErrorBoundary>
  );
}

export default SafeCheckoutPanel;
