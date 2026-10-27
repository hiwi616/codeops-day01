import Link from "next/link";
import SignInForm from "@/components/SignInForm";
import CancelForm from "@/components/CancelForm";
import { getSession } from "@/lib/session";
import { listOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic"; // per-user data (cookie)

export default async function OrdersPage() {
  const user = await getSession();
  if (!user)
    return (
      <main>
        <h1 className="text-2xl font-bold text-green-900">Your orders</h1>
        <p className="mt-1">Sign in to see your orders.</p>
        <SignInForm next="/orders" />
      </main>
    );

  const orders = listOrders(user.id);
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Orders for {user.name}</h1>
      {orders.length === 0 && (
        <p className="mt-2">
          No orders yet. <Link href="/menu" className="underline">Browse the menu</Link>
        </p>
      )}
      <ul className="mt-4 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="rounded border border-stone-300 bg-white p-4">
            <p className="font-bold">
              {o.id} <span className="font-normal text-stone-600">- {o.status}</span>
            </p>
            <p className="text-sm">{o.lines.map((l) => `${l.qty} x ${l.name}`).join(", ")}</p>
            <p className="text-sm">
              {formatPrice(o.total)} to {o.area}
            </p>
            {o.status === "placed" && (
              <div className="mt-2">
                <CancelForm orderId={o.id} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <section className="mt-8 border-t border-stone-300 pt-4">
        <h2 className="font-semibold">Test tool: attack the cancel action</h2>
        <p className="mb-2 text-sm text-stone-600">Place an order as Almaz, sign in as Dawit, then try to cancel Almaz&apos;s id.</p>
        <CancelForm />
      </section>
    </main>
  );
}
