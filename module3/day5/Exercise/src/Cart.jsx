import { useCart } from "./context/CartContext";

function Cart() {
  const { items, dispatch, total } = useCart();

  if (items.length === 0) {
    return <p className="cart-empty">Your cart is empty. Add a dish above.</p>;
  }

  return (
    <section className="cart">
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x{item.qty} - {item.price * item.qty} ETB
            <button
              type="button"
              className="remove-btn"
              onClick={() => dispatch({ type: "remove", id: item.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {total} ETB</p>
      <button
        type="button"
        className="clear-btn"
        onClick={() => dispatch({ type: "clear" })}
      >
        Clear cart
      </button>
    </section>
  );
}

export default Cart;
