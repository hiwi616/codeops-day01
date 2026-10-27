import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/data";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
