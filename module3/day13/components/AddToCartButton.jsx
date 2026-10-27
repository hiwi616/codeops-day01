"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

// Props are plain serialisable data (strings/numbers) - no callbacks cross the boundary.
export default function AddToCartButton({ id, name, price }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add({ id, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      onClick={handleClick}
      aria-live="polite"
      className="rounded bg-green-800 px-3 py-1 text-sm text-white hover:bg-green-900"
    >
      {added ? "Added" : "Add to order"}
    </button>
  );
}
