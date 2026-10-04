import ErrorBoundary from "./ErrorBoundary";
import CartUnavailable from "./CartUnavailable";
import CheckoutPanel from "./CheckoutPanel";

// A single wrapped definition, used by both pages/Cart.jsx and
// pages/Checkout.jsx, so the cart panel gets the same independent
// ErrorBoundary everywhere it appears, without repeating the fallback
// markup in two files.
function SafeCheckoutPanel() {
  return (
    <ErrorBoundary fallback={<CartUnavailable />}>
      <CheckoutPanel />
    </ErrorBoundary>
  );
}

export default SafeCheckoutPanel;
