import { NextResponse } from "next/server";
import { getDishes } from "@/lib/data";

export async function GET(request) {
  const dishes = await getDishes();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();

  if (query) {
    const filtered = dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query),
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(dishes);
}
