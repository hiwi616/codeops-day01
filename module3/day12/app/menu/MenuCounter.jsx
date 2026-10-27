"use client";

import { useState } from "react";

// Exercise 3: this lives in the MENU LAYOUT. Click it a few times, open a dish,
// and the count survives - layouts stay mounted across navigation.
export default function MenuCounter() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="mt-4 w-full rounded border border-green-800 px-3 py-2 text-sm"
    >
      Layout counter: {count}
    </button>
  );
}
