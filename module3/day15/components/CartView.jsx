"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartView() {
  const { items, ready, total, setQty, remove } = useCart();

  if (!ready) return <p className="mt-4 text-stone-500">Loading your cart...</p>;
  if (items.length === 0)
    return (
      <p className="mt-4">
        Your cart is empty.{" "}
        <Link href="/menu" className="underline">
          Browse the menu
        </Link>
      </p>
    );

  return (
    <>
      <ul className="mt-4 divide-y divide-stone-300 rounded border border-stone-300 bg-white">
        {items.map((i) => (
          <li key={i.id} className="flex flex-wrap items-center gap-3 p-3">
            <span className="flex-1 font-semibold">{i.name}</span>
            <label className="text-sm" htmlFor={`qty-${i.id}`}>
              Qty
            </label>
            <input
              id={`qty-${i.id}`}
              type="number"
              min={1}
              max={20}
              value={i.qty}
              onChange={(e) => setQty(i.id, Number(e.target.value) || 1)}
              className="w-16 rounded border border-stone-400 px-2 py-1"
            />
            <span className="w-24 text-right">{formatPrice(i.qty * i.price)}</span>
            <button onClick={() => remove(i.id)} className="text-sm text-red-800 underline">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right text-lg font-bold">Total: {formatPrice(total)}</p>
      <div className="mt-4 text-right">
        <Link href="/checkout" className="rounded bg-green-800 px-4 py-2 text-white">
          Go to checkout
        </Link>
      </div>
    </>
  );
}
