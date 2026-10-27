import Link from "next/link";

// Route: /checkout
export default function CheckoutPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Checkout</h1>
      <p className="mt-2">.</p>
      <Link href="/cart" className="mt-4 inline-block underline">
        Back to the cart
      </Link>
    </main>
  );
}
