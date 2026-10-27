"use client";

import { CartProvider } from "./CartProvider";

// The standard pattern: providers need state, so they are a client component in their
// own file. app/layout.js stays a server component and just passes `children` in, so every
// page inside is still server-rendered.
export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
