import { AccessibleOrderTable } from "@/components/AccessibleOrderTable";
import { SalesChart } from "@/components/SalesChart";
import { DeliveryMapWrapper } from "@/components/DeliveryMapWrapper";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Order History & Real-Time Dispatch | Addis Eats",
  description:
    "View past orders, export CSV registers, and inspect live delivery zones.",
};

export default async function OrderHistoryPage({ searchParams }) {
  const user = await getSession();
  if (!user) {
    redirect("/signin?next=/orders/history");
  }

  const resolvedParams = await searchParams;
  const sort = resolvedParams.sort || "total";
  const order = resolvedParams.order || "desc";
  const page = parseInt(resolvedParams.page || "1", 10);
  const limit = 4;

  const rawOrders =
    globalThis.ORDERS_DB && globalThis.ORDERS_DB.length > 0
      ? [...globalThis.ORDERS_DB]
      : [
          {
            id: "ord_101",
            customerName: "Almaz",
            status: "preparing",
            total: 480,
            createdAt: new Date().toISOString(),
          },
          {
            id: "ord_102",
            customerName: "Dawit",
            status: "delivering",
            total: 880,
            createdAt: new Date().toISOString(),
          },
          {
            id: "ord_103",
            customerName: "Bethlehem",
            status: "completed",
            total: 360,
            createdAt: new Date().toISOString(),
          },
          {
            id: "ord_104",
            customerName: "Kidus",
            status: "received",
            total: 720,
            createdAt: new Date().toISOString(),
          },
          {
            id: "ord_105",
            customerName: "Yonas",
            status: "completed",
            total: 450,
            createdAt: new Date().toISOString(),
          },
        ];

  rawOrders.sort((a, b) => {
    let aVal = a[sort === "customer" ? "customerName" : sort] ?? "";
    let bVal = b[sort === "customer" ? "customerName" : sort] ?? "";

    if (typeof aVal === "number" && typeof bVal === "number") {
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }
    return order === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const total = rawOrders.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginatedOrders = rawOrders.slice(start, start + limit);

  const chartData = [
    { category: "Stews & Poultry", revenue: 2450 },
    { category: "Grilled Meats", revenue: 3890 },
    { category: "Vegetarian", revenue: 1680 },
    { category: "Breakfast", revenue: 950 },
  ];

  return (
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Order History & Delivery Dispatch
          </h1>
          <p className="mt-1 text-slate-600 text-sm">
            Live delivery radius mapping, localized transaction formatting, and
            automated data exports.
          </p>
        </div>
        <a
          href="/api/orders/export"
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm w-fit"
        >
          <span>📥</span> Export CSV Register
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <SalesChart data={chartData} />
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-2">
              Delivery Radius (Addis Ababa)
            </h2>
            <DeliveryMapWrapper />
          </div>
        </div>
        <div className="lg:col-span-2">
          <AccessibleOrderTable
            orders={paginatedOrders}
            currentSort={sort}
            currentOrder={order}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
