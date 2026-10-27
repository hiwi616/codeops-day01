"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "@/app/actions";
import { useCart } from "./CartProvider";
import { AREAS } from "@/lib/areas";
import { formatPrice } from "@/lib/format";

function Field({ id, label, error, children }) {
  return (
    <div className="mt-3">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

const input = "mt-1 w-full rounded border border-stone-400 px-2 py-1";

export default function CheckoutForm({ dishes }) {
  const { items, clear, total } = useCart();
  // The hook returns the action's result AND the pending flag - no hand-written submitting state.
  const [state, formAction, pending] = useActionState(placeOrder, null);

  useEffect(() => {
    if (state?.id) clear();
  }, [state, clear]);

  if (state?.id) {
    return (
      <div role="status" className="mt-4 rounded border border-green-700 bg-green-50 p-4">
        <p className="font-bold text-green-900">Order {state.id} placed - {formatPrice(state.total)}</p>
        <Link href="/orders" className="mt-2 inline-block underline">
          See your orders
        </Link>
      </div>
    );
  }

  const fe = state?.fieldErrors ?? {};
  const v = state?.values ?? {};

  return (
    <form action={formAction} noValidate className="mt-4 max-w-md rounded border border-stone-300 bg-white p-4">
      {state?.error && !Object.keys(fe).length && (
        <p role="alert" className="mb-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <input type="hidden" name="items" value={JSON.stringify(items.map(({ id, qty }) => ({ id, qty })))} />

      <Field id="name" label="Full name" error={fe.name?.[0]}>
        <input id="name" name="name" defaultValue={v.name} autoComplete="name" className={input}
          aria-invalid={!!fe.name} aria-describedby={fe.name ? "name-error" : undefined} />
      </Field>
      <Field id="phone" label="Phone (09… or +2519…)" error={fe.phone?.[0]}>
        <input id="phone" name="phone" defaultValue={v.phone} inputMode="tel" autoComplete="tel" className={input}
          aria-invalid={!!fe.phone} aria-describedby={fe.phone ? "phone-error" : undefined} />
      </Field>
      <Field id="area" label="Delivery area" error={fe.area?.[0]}>
        <select id="area" name="area" defaultValue={v.area ?? ""} className={input}
          aria-invalid={!!fe.area} aria-describedby={fe.area ? "area-error" : undefined}>
          <option value="">Choose…</option>
          {AREAS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </Field>

      <Field id="quickDish" label={`Order: ${items.length ? `${items.length} dish(es) from your cart, ${formatPrice(total)}` : "your cart is empty - pick one dish instead"}`} error={fe.items?.[0]}>
        <select id="quickDish" name="quickDish" defaultValue="" className={input} disabled={items.length > 0}>
          <option value="">{items.length ? "(using your cart)" : "Choose a dish…"}</option>
          {dishes.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} - {formatPrice(d.price)}
            </option>
          ))}
        </select>
      </Field>

      <button disabled={pending} className="mt-4 rounded bg-green-800 px-4 py-2 text-white disabled:opacity-60">
        {pending ? "Sending…" : "Place order"}
      </button>
    </form>
  );
}
