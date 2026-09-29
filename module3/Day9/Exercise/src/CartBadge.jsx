import { useCartCount } from "./store/cartStore";

// Selector: only re-renders when the total item count changes, not when
// (say) a price or name inside the cart changes for some other reason.
function CartBadge() {
  const count = useCartCount();

  if (count === 0) return null;

  return <span className="cart-badge">{count}</span>;
}

export default CartBadge;
