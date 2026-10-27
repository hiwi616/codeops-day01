import SignInForm from "@/components/SignInForm";
import CheckoutForm from "@/components/CheckoutForm";
import { getSession } from "@/lib/session"; // <-- reads cookies(): THIS is what makes /checkout dynamic
import { getDishes } from "@/lib/dishes";
import { signOut } from "@/app/actions";

// DYNAMIC: depends on who is asking (session cookie). Explicit so a refactor can't flip it.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await getSession();
  const dishes = await getDishes();

  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Checkout</h1>
      {user ? (
        <>
          <form action={signOut} className="mt-1 text-sm">
            Signed in as <strong>{user.name}</strong>.{" "}
            <button className="underline">Sign out</button>
          </form>
          <CheckoutForm dishes={dishes} />
        </>
      ) : (
        <>
          <p className="mt-1">Sign in to place an order.</p>
          <SignInForm next="/checkout" />
        </>
      )}
    </main>
  );
}
