import Link from "next/link";

export function AccessibleOrderTable({
  orders,
  currentSort,
  currentOrder,
  currentPage,
  totalPages,
}) {
  const getSortUrl = (column) => {
    const isCurrent = currentSort === column;
    const nextOrder = isCurrent && currentOrder === "asc" ? "desc" : "asc";
    return `/orders/history?sort=${column}&order=${nextOrder}&page=1`;
  };

  const getAriaSort = (column) => {
    if (currentSort !== column) return "none";
    return currentOrder === "asc" ? "ascending" : "descending";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm text-slate-700">
          <caption className="p-4 font-bold text-base text-slate-900 text-left border-b border-slate-100">
            Order History & Transaction Register
          </caption>
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
                aria-sort={getAriaSort("id")}
              >
                <Link
                  href={getSortUrl("id")}
                  className="hover:text-blue-900 inline-flex items-center gap-1"
                >
                  Order ID{" "}
                  {currentSort === "id" && (currentOrder === "asc" ? "▲" : "▼")}
                </Link>
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                aria-sort={getAriaSort("customer")}
              >
                <Link
                  href={getSortUrl("customer")}
                  className="hover:text-blue-900 inline-flex items-center gap-1"
                >
                  Customer{" "}
                  {currentSort === "customer" &&
                    (currentOrder === "asc" ? "▲" : "▼")}
                </Link>
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                aria-sort={getAriaSort("total")}
              >
                <Link
                  href={getSortUrl("total")}
                  className="hover:text-blue-900 inline-flex items-center gap-1"
                >
                  Total (ETB){" "}
                  {currentSort === "total" &&
                    (currentOrder === "asc" ? "▲" : "▼")}
                </Link>
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-6 text-center text-slate-400"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-blue-900">
                    <Link href={`/orders/${o.id}`} className="hover:underline">
                      {o.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{o.customerName || o.customer}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        o.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : o.status === "delivering"
                            ? "bg-purple-100 text-purple-800"
                            : o.status === "preparing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {o.total} ETB
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(
                      o.createdAt || o.placedAt || Date.now(),
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* URL query param pagination */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          {currentPage > 1 && (
            <Link
              href={`/orders/history?sort=${currentSort}&order=${currentOrder}&page=${currentPage - 1}`}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200"
            >
              &larr; Previous
            </Link>
          )}
          {currentPage < totalPages && (
            <Link
              href={`/orders/history?sort=${currentSort}&order=${currentOrder}&page=${currentPage + 1}`}
              className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700"
            >
              Next &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
