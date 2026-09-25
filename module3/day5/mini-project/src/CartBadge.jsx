import { useCart } from "./context/CartContext";

// Reads the cart straight from context. App never passes cart data as a
// prop to Header, and Header never passes anything to CartBadge either —
// this is the "no prop drilling" requirement.
function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  if (count === 0) return null;

  return <span className="cart-badge">{count}</span>;
}

export default CartBadge;
