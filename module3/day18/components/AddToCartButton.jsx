"use client";

import { useCart } from "@/components/Providers";

export function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(dish)}
      style={{
        padding: "0.5rem 1rem",
        background: "#1B4D8E",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Add to Order
    </button>
  );
}
