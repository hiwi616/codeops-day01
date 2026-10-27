import { getDish } from "@/lib/dishes";
import { fail } from "@/lib/http";

// GET /api/dishes/kitfo  -> 200 dish, or 404 with the standard error shape
export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return fail("No such dish", 404);
  return Response.json(dish);
}
