import { z } from "zod";
import { AREAS } from "./areas";

// ONE schema, two enforcement points: the form (courtesy) and the server (the real check).
export const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

export const orderSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    phone: z.string().trim().regex(phoneRegex, "Use 09… or +2519…"),
    area: z.enum(AREAS, { errorMap: () => ({ message: "Choose a delivery area" }) }),
    items: z
      .array(
        z.object({
          id: z.string().min(1),
          qty: z.number().int().min(1, "Quantity must be at least 1").max(20, "Maximum 20 per dish"),
        })
      )
      .default([]),
  })
  .refine((d) => d.items.length > 0, { message: "Add at least one dish", path: ["items"] });
