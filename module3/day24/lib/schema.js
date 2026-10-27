import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^09\d{8}$/,
      "Phone must be a valid 10-digit number starting with 09",
    ),
  address: z.string().min(5, "Delivery address must be specified"),
  items: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Order must contain at least one dish"),
});
