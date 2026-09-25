import { Link } from "react-router-dom";
import CheckoutPanel from "../CheckoutPanel";
import { useCart } from "../context/CartContext";

// A standalone /cart screen. It reads the same CartContext as the header
// badge and the Menu page, so anything added anywhere still shows up
// here after navigating away and back — the cart's state lives above
// the router, not inside any one route.
function Cart() {
  const { items } = useCart();

  return (
    <main className="page-cart">
      <h2>Your cart</h2>
      <CheckoutPanel />
      {items.length > 0 && (
        <Link to="/checkout" className="cta-link">
          Proceed to checkout
        </Link>
      )}
    </main>
  );
}

export default Cart;
