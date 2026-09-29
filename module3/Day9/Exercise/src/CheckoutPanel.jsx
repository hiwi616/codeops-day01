import { useState } from "react";
import { useCartItems, useCartTotal, useCartRemove, useCartClear } from "./store/cartStore";

function CheckoutPanel() {
  // A separate crash switch from DishList's - this one tests the second,
  // independent ErrorBoundary that wraps the cart panel (see
  // SafeCheckoutPanel.jsx). Crashing here should never affect the menu,
  // and crashing the menu should never affect this.
  const [crash, setCrash] = useState(false);
  if (crash) {
    throw new Error(
      "Deliberate crash inside the checkout panel, for the ErrorBoundary demo."
    );
  }

  const items = useCartItems();
  const total = useCartTotal();
  const remove = useCartRemove();
  const clear = useCartClear();

  if (items.length === 0) {
    return <p className="cart-empty">Your cart is empty. Add a dish above.</p>;
  }

  return (
    <section className="checkout-panel">
      <h2>Checkout</h2>
      <button type="button" className="dev-crash-btn" onClick={() => setCrash(true)}>
        🧨 Simulate cart crash
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x{item.qty} - {item.price * item.qty} ETB
            <button
              type="button"
              className="remove-btn"
              onClick={() => remove(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {total} ETB</p>
      <button type="button" className="clear-btn" onClick={clear}>
        Clear cart
      </button>
    </section>
  );
}

export default CheckoutPanel;
