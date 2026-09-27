import CheckoutPanel from "../CheckoutPanel";
import Checkout from "../Checkout";

// The route: composes the cart summary with the checkout form. The form
// itself lives in src/Checkout.jsx (not this file) - two different
// files, in two different folders, that happen to both relate to
// "checkout": this one is the page/route, that one is the form.
function CheckoutPage() {
  return (
    <main className="page-checkout">
      <CheckoutPanel />
      <Checkout />
    </main>
  );
}

export default CheckoutPage;
