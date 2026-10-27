"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

// Smallest possible client leaf: just the number in the header.
export default function CartBadge() {
  const { count, ready } = useCart();
  return (
    <Link href="/cart">
      Cart
      <span className="ml-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-green-950">
        {ready ? count : 0}
      </span>
    </Link>
  );
}
