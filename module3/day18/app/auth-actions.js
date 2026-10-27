"use server";

import { redirect } from "next/navigation";
import { setSession, clearSession, getSession } from "@/lib/session";
import { ORDERS } from "@/lib/data";

export async function signIn(...args) {
  const formData = args.find((arg) => arg && typeof arg.get === "function");

  const phone = formData ? formData.get("phone")?.toString() || "" : "";
  const next = formData ? formData.get("next")?.toString() || "/" : "/";

  let token = "tok_customer_1";
  if (phone === "0922222222") token = "tok_customer_2";
  if (phone === "0900000000") token = "tok_staff_1";

  await setSession(token);

  const destination =
    next.startsWith("/") && !next.startsWith("//") ? next : "/";

  redirect(destination);
}

export async function signOut() {
  await clearSession();
  redirect("/signin");
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("401 Unauthorized: Not signed in");
  }

  const order = ORDERS.find((o) => o.id === orderId);
  if (!order) {
    throw new Error("404 Not Found: Order does not exist");
  }

  if (order.userId && order.userId !== user.id) {
    throw new Error("403 Forbidden: Not your order");
  }

  order.status = "cancelled";
  return { success: true, message: `Order ${orderId} cancelled` };
}
