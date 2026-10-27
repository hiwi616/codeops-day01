import { NextResponse } from "next/server";
import { getDishes } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const result = await getDishes({ query: q });
  const dishList = Array.isArray(result) ? result : result?.dishes || [];

  return NextResponse.json(dishList);
}
