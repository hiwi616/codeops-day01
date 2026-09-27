import { useCartItems, useCartTotal, useCartRemove, useCartClear } from "./store/cartStore";

function CheckoutPanel() {
  // Four separate narrow selectors instead of one useCart() call: this
  // component re-renders when items or total change, but remove and
  // clear are stable function references from the store and never cause
  // a re-render on their own.
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
