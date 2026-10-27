import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const orders = globalThis.ORDERS_DB || [];
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
