import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Ethiopian Food Menu</h1>
      <p>This project demonstrates Next.js App Router routes.</p>
      <nav>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}