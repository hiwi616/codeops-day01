// app/kitchen/page.js
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { updateOrderStatus } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const user = await getSession();
  if (!user || user.role !== "staff") {
    redirect("/signin?next=/kitchen");
  }

  const orders = globalThis.ORDERS_DB || [];

  return (
    <div className="w-full px-6 lg:px-12 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Kitchen Order Board
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time order queue for kitchen staff.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider">
          Staff Authenticated: {user.name}
        </span>
      </div>

      {orders.length === 0 ? (
        <p className="text-slate-500 text-center py-12">No orders in queue.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3">
                  <span className="font-bold text-slate-900 text-base">
                    {order.id}
                  </span>
                  <span
                    className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                      order.status === "received"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "preparing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivering"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 mb-3 space-y-1">
                  <p>
                    <strong>Customer:</strong> {order.customerName} (
                    {order.phone})
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 text-xs mb-4">
                  <p className="font-semibold text-slate-700 mb-1">Dishes:</p>
                  {order.items?.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-slate-600"
                    >
                      <span>{it.name || it.id}</span>
                      <span>× {it.quantity}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-800">
                    <span>Total</span>
                    <span>{order.total} ETB</span>
                  </div>
                </div>
              </div>

              {/* Status Update Form Actions */}
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                {order.status === "received" && (
                  <form
                    action={updateOrderStatus.bind(null, order.id, "preparing")}
                    className="flex-1"
                  >
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Start Preparing
                    </button>
                  </form>
                )}
                {order.status === "preparing" && (
                  <form
                    action={updateOrderStatus.bind(
                      null,
                      order.id,
                      "delivering",
                    )}
                    className="flex-1"
                  >
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Send for Delivery
                    </button>
                  </form>
                )}
                {order.status === "delivering" && (
                  <form
                    action={updateOrderStatus.bind(null, order.id, "completed")}
                    className="flex-1"
                  >
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Mark Delivered
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
