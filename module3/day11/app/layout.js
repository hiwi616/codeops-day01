import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Addis Eats",
  description: "Order Ethiopian food online",
};

// Root shell (minimal for now - Day 37 turns this into a real header/footer).
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <nav className="flex flex-wrap gap-5 bg-green-900 px-6 py-3 text-sm text-white">
          <Link href="/" className="mr-4 text-base font-bold text-amber-300">
            Addis Eats
          </Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/orders/history">Order history</Link>
        </nav>
        <div className="mx-auto max-w-4xl p-6">{children}</div>
      </body>
    </html>
  );
}
