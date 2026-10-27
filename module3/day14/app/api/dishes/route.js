import { getDishes, CATEGORIES } from "@/lib/dishes";
import { fail } from "@/lib/http";

// GET /api/dishes            -> every dish
// GET /api/dishes?category=Vegan
// Reading request.url makes this handler dynamic (it varies per request).
export async function GET(request) {
  const category = new URL(request.url).searchParams.get("category");
  if (category && !CATEGORIES.includes(category)) {
    return fail("Unknown category", 400); // malformed request
  }
  const dishes = await getDishes();
  return Response.json(category ? dishes.filter((d) => d.category === category) : dishes);
}
