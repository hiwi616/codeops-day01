import Link from "next/link";

// Server component. Do NOT read cookies here: a cookie read in a shared
// component makes EVERY route dynamic (see STRATEGY.md).
export default function Header() {
  return (
    <header className="bg-green-900 text-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-5 px-6 py-3 text-sm">
        <Link href="/" className="mr-4 text-base font-bold text-amber-300">
          Addis Eats
        </Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/orders/history">Order history</Link>
      </nav>
    </header>
  );
}
