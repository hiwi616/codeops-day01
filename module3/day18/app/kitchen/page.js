import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ORDERS } from "@/lib/data";

export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/kitchen");

  if (user.role !== "staff") {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">403 - Forbidden</h1>
        <p className="mt-2 text-slate-600">
          Staff role required to view the kitchen queue.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Kitchen Orders Dashboard
      </h1>
      <p className="text-slate-600 mb-6">
        Signed in as Staff: <strong>{user.name}</strong>
      </p>

      <div className="grid gap-4">
        {ORDERS.map((o) => (
          <div
            key={o.id}
            className="border border-slate-200 p-4 rounded-lg bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <span className="font-bold text-blue-900">#{o.id}</span> &mdash;{" "}
              {o.customer} ({o.status})
            </div>
            <strong className="text-slate-900">{o.total} ETB</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
