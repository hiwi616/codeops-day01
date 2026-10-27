"use client";

import { useActionState } from "react";
import { useCart } from "@/components/Providers";
import { placeOrder } from "@/app/actions";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, null);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (state?.success) {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <p>{state.message}</p>
        <button
          onClick={() => clearCart()}
          style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        >
          Start New Order
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "450px" }}>
      <h1>Checkout</h1>
      <p>
        Running Total: <strong>{total} ETB</strong>
      </p>
      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(
            cart.map((i) => ({ id: i.id, quantity: i.quantity })),
          )}
        />
        <div>
          <label style={{ display: "block" }}>Full Name</label>
          <input
            name="name"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {state?.errors?.name && (
            <p style={{ color: "red" }}>{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label style={{ display: "block" }}>Phone Number (09XXXXXXXX)</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="0911223344"
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {state?.errors?.phone && (
            <p style={{ color: "red" }}>{state.errors.phone[0]}</p>
          )}
        </div>
        <div>
          <label style={{ display: "block" }}>Delivery Address</label>
          <input
            name="address"
            required
            placeholder="Bole, Addis Ababa"
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {state?.errors?.address && (
            <p style={{ color: "red" }}>{state.errors.address[0]}</p>
          )}
        </div>
        {state?.errors?.items && (
          <p style={{ color: "red" }}>{state.errors.items[0]}</p>
        )}
        <button
          type="submit"
          disabled={isPending || cart.length === 0}
          style={{
            padding: "0.75rem",
            background: isPending || cart.length === 0 ? "#ccc" : "#1B4D8E",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
