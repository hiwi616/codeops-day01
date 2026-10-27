"use client";

import { useState } from "react";

// Test tool for exercise 6: throwing while rendering is caught by error.js.
export default function ErrorTrigger() {
  const [boom, setBoom] = useState(false);
  if (boom) throw new Error("Deliberate test error from the menu page");
  return (
    <button
      onClick={() => setBoom(true)}
      className="mt-8 rounded border border-red-700 px-3 py-1 text-sm text-red-800"
    >
      Test error.js (throws on click)
    </button>
  );
}
