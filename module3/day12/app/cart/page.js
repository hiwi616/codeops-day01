"use client";

import { useState } from "react";
import Link from "next/link";

// Strategy: CLIENT. A cart is one person's private state, so it is rendered in
// the browser. (Day 38 pushes "use client" down into a leaf instead of the page.)
export default function CartPage() {
  const [note, setNote] = useState("");
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Your cart</h1>
      <p className="mt-2">Nothing here yet - the real cart arrives on Day 38.</p>
      <label className="mt-4 block text-sm" htmlFor="note">
        Delivery note (client state)
      </label>
      <input
        id="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mt-1 w-full max-w-sm rounded border border-stone-400 px-2 py-1"
      />
      <Link href="/menu" className="mt-4 inline-block underline">
        Keep browsing
      </Link>
    </main>
  );
}
