import Link from "next/link";

export default function CartPage() {
  return (
    <main>
      <h1>Shopping Cart</h1>
      <p>Your cart is currently empty.</p>
      <Link href="/menu">Continue shopping</Link>
      <p><Link href="/checkout">Go to checkout</Link></p>
    </main>
  );
}