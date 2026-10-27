import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>This is the checkout page.</p>
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}