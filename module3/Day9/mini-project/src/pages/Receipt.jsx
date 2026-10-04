import { Link, useLocation } from "react-router-dom";

// Reads the order details passed via navigate("/receipt", { state }) in
// Checkout.jsx. If this page is reached directly (a refresh, or a typed
// URL) there's no location.state, so it falls back to a generic message
// instead of crashing on undefined values.
function Receipt() {
  const location = useLocation();
  const order = location.state;

  if (!order) {
    return (
      <main className="page-receipt">
        <h2>No recent order</h2>
        <p>We don't have an order to show — it may have already been viewed.</p>
        <Link to="/menu">Back to the menu</Link>
      </main>
    );
  }

  return (
    <main className="page-receipt">
      <h2>Thanks, {order.name}!</h2>
      <p>Your order is on its way to {order.area}.</p>
      <p className="cart-total">Total: {order.total} ETB</p>
      <Link to="/menu" className="cta-link">
        Back to the menu
      </Link>
    </main>
  );
}

export default Receipt;
