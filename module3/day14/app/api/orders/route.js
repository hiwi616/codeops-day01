import { orderSchema } from "@/lib/schema";
import { createOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";
import { fail } from "@/lib/http";

// POST /api/orders
//   201 { id, total, currency, ... }   created
//   400 malformed JSON
//   422 { error, fieldErrors }          well-formed but invalid
// Anyone can call this with curl and no form, so EVERY rule is enforced here.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail("Request body must be valid JSON", 400);
  }

  const result = orderSchema.safeParse(body);
  if (!result.success) {
    return fail("Validation failed", 422, result.error.flatten().fieldErrors);
  }

  const user = await getSession();
  const created = createOrder(user?.id ?? "guest", result.data);
  if (created.fieldErrors) return fail("Validation failed", 422, created.fieldErrors);

  return Response.json(created.order, { status: 201 });
}
