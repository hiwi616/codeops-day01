import { cookies } from "next/headers";
import Link from "next/link";

// Strategy: DYNAMIC. The checkout depends on WHO is asking (the session cookie).
// The line that makes it dynamic is the cookies() read below. We also say so
// explicitly, so a refactor can never silently turn this page static.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const jar = await cookies(); // <-- THE READ that requires dynamic rendering
  const session = jar.get("session")?.value ?? null;

  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Checkout</h1>
      <p className="mt-2">
        {session ? `Signed in as ${session}.` : "You are not signed in."} (Rendered on every request.)
      </p>
      <Link href="/cart" className="mt-4 inline-block underline">
        Back to the cart
      </Link>
    </main>
  );
}
