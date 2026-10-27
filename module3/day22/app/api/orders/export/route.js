import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const orders =
    globalThis.ORDERS_DB && globalThis.ORDERS_DB.length > 0
      ? globalThis.ORDERS_DB
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
        ];

  const headers = [
    "Order ID",
    "Customer",
    "Status",
    "Total (ETB)",
    "Created At",
  ];
  const rows = orders.map((o) => [
    o.id,
    `"${(o.customerName || o.customer || "Guest").replace(/"/g, '""')}"`,
    o.status,
    o.total,
    o.createdAt || new Date().toISOString(),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
    "\r\n",
  );

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="addis-eats-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
