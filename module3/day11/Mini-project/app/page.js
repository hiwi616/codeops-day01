import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Addis Eats</h1>
      <p>Explore some favourite Ethiopian dishes and discover your next meal.</p>
      <nav>
        <Link href="/menu">Explore Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}