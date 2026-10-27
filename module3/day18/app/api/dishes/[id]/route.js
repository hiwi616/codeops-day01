import { NextResponse } from "next/server";
import { getDishById } from "@/lib/data";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish)
    return NextResponse.json({ error: "Dish not found" }, { status: 404 });
  return NextResponse.json(dish);
}
