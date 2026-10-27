import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schema";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }
    const orderId = `ord_${Date.now()}`;
    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
