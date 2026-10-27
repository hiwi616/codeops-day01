"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, getOrder, markCancelled } from "@/lib/orders";
import { getSession, USERS } from "@/lib/session";

// With useActionState the action receives (previousState, formData).
export async function placeOrder(prevState, formData) {
  // Authorisation lives INSIDE the action - a hidden button is not security.
  const user = await getSession();
  if (!user) return { error: "Please sign in before ordering.", fieldErrors: {} };

  let items = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    items = [];
  }
  // Lets the form work with no JavaScript (cart lives in the browser, so no cart items arrive).
  const quick = String(formData.get("quickDish") ?? "");
  if (Array.isArray(items) && items.length === 0 && quick) items = [{ id: quick, qty: 1 }];

  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    area: String(formData.get("area") ?? ""),
  };

  const parsed = orderSchema.safeParse({ ...values, items });
  if (!parsed.success) {
    return { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors, values };
  }

  const created = createOrder(user.id, parsed.data);
  if (created.fieldErrors) return { error: "Validation failed", fieldErrors: created.fieldErrors, values };

  revalidatePath("/orders"); // tell Next.js which cached pages are now wrong
  revalidatePath("/kitchen");
  return { id: created.order.id, total: created.order.total };
}

export async function cancelOrder(prevState, formData) {
  const user = await getSession();
  if (!user) return { ok: false, error: "Not signed in" };

  // The id came from the client - never trust it. Look the record up and check the owner.
  const order = getOrder(String(formData.get("orderId") ?? ""));
  if (!order) return { ok: false, error: "No such order" };
  if (order.userId !== user.id) return { ok: false, error: "Not yours" };
  if (order.status === "cancelled") return { ok: false, error: "Already cancelled" };

  markCancelled(order.id);
  revalidatePath("/orders");
  revalidatePath("/kitchen");
  return { ok: true };
}

export async function signIn(formData) {
  const id = String(formData.get("userId") ?? "");
  if (!USERS.some((u) => u.id === id)) return;
  const jar = await cookies();
  jar.set("session", id, { httpOnly: true, sameSite: "lax", path: "/" });
  redirect(formData.get("next") === "/orders" ? "/orders" : "/checkout");
}

export async function signOut() {
  const jar = await cookies();
  jar.delete("session");
  redirect("/");
}
