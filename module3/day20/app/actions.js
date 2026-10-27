"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { orderSchema } from "@/lib/schema";

// Mock database store for orders across the app lifecycle
globalThis.ORDERS_DB = globalThis.ORDERS_DB || [
  {
    id: "ord_101",
    userId: "usr_1",
    customerName: "Almaz",
    phone: "0912345678",
    address: "Bole Medhanialem, House 412",
    status: "preparing",
    items: [{ id: "doro-wat", name: "Doro Wat", price: 450, quantity: 1 }],
    total: 450,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ord_102",
    userId: "usr_2",
    customerName: "Dawit",
    phone: "0923456789",
    address: "Kazanchis, Guinea Conakry St",
    status: "delivering",
    items: [
      { id: "shekla-tibs", name: "Shekla Tibs", price: 440, quantity: 2 },
    ],
    total: 880,
    createdAt: new Date().toISOString(),
  },
];

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user) {
    redirect("/signin?next=/checkout");
  }

  const rawItems = formData.get("items");
  let items = [];
  try {
    items = JSON.parse(rawItems || "[]");
  } catch {
    return { error: "Invalid cart payload." };
  }

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    items: items.map((i) => ({ id: i.id, quantity: Number(i.quantity) })),
  };

  const validation = orderSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      values: rawData,
    };
  }

  const orderId = `ord_${Date.now().toString().slice(-4)}`;
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const newOrder = {
    id: orderId,
    userId: user.id,
    customerName: rawData.name,
    phone: rawData.phone,
    address: rawData.address,
    status: "received",
    items,
    total,
    createdAt: new Date().toISOString(),
  };

  globalThis.ORDERS_DB.unshift(newOrder);

  revalidatePath("/kitchen");
  redirect(`/orders/${orderId}`);
}

export async function updateOrderStatus(orderId, nextStatus) {
  const user = await getSession();
  if (!user || user.role !== "staff") {
    throw new Error("403 Forbidden: Staff privileges required");
  }

  const order = globalThis.ORDERS_DB.find((o) => o.id === orderId);
  if (order) {
    order.status = nextStatus;
    revalidatePath("/kitchen");
    revalidatePath(`/orders/${orderId}`);
  }
}
