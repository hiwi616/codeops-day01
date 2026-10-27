"use client";

import Link from "next/link";
import { useCart } from "@/components/Providers";

export default function CartPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>
          Your cart is empty. <Link href="/menu">Browse menu</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0",
              borderBottom: "1px solid #eaeaea",
            }}
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{item.price * item.quantity} ETB</span>
          </li>
        ))}
      </ul>
      <h3>Total: {total} ETB</h3>
      <Link
        href="/checkout"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          background: "#1B4D8E",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
