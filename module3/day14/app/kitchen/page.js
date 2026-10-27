import Link from "next/link";
import { countOrders } from "@/lib/orders";

// A PUBLIC, CACHED page: static + ISR (one hour). It never reads cookies, so it can be cached.
// placeOrder / cancelOrder call revalidatePath("/kitchen"), which is what makes a new order
// show up here immediately instead of up to an hour later.
// (Check it on `npm run build && npm start` - the dev server always renders fresh.)
export const revalidate = 3600;

export default function KitchenPage() {
  const { placed, cancelled, latest } = countOrders();
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Kitchen board</h1>
      <p className="mt-2">
        {placed} order(s) in the queue, {cancelled} cancelled.
        {latest && <> Latest: <strong>{latest}</strong>.</>}
      </p>
      <p className="mt-1 text-sm text-stone-600">Rendered at {new Date().toISOString().slice(11, 19)} UTC (cached).</p>
      <Link href="/menu" className="mt-4 inline-block underline">
        Back to the menu
      </Link>
    </main>
  );
}
