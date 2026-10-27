import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

// Route: /cart
export default function CartPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Your cart</h1>
      <p className="mt-2">.</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Link href="/menu" className="underline">
          Keep browsing
        </Link>
        <CheckoutButton />
      </div>
    </main>
  );
}
