"use server";

import { orderSchema } from "@/lib/schema";

export async function placeOrder(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    items: JSON.parse(formData.get("items") || "[]"),
  };

  const result = orderSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const orderId = `ord_${Date.now()}`;
  return {
    success: true,
    orderId,
    message: `Order ${orderId} placed successfully!`,
  };
}
