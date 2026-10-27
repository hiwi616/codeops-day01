"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";
import { useCart } from "@/components/Providers";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart = [], clearCart } = useCart() || {};
  const [state, formAction, isPending] = useActionState(placeOrder, null);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-slate-600 mb-6">
          Add delicious Ethiopian dishes before checking out.
        </p>
        <Link
          href="/menu"
          className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
        Checkout Order
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Order Summary
          </h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-700">
                  {item.name}{" "}
                  <span className="text-slate-400">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-slate-900">
                  {item.price * item.quantity} ETB
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between font-bold text-base text-slate-900">
            <span>Total Payable</span>
            <span className="text-blue-900">{total} ETB</span>
          </div>
        </div>

        <form
          action={formAction}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <input type="hidden" name="items" value={JSON.stringify(cart)} />

          {state?.error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={state?.values?.name || "Almaz Kebede"}
              required
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            {state?.errors?.name && (
              <p className="text-red-600 text-xs mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number (09...)
            </label>
            <input
              type="tel"
              name="phone"
              defaultValue={state?.values?.phone || "0912345678"}
              required
              placeholder="0911223344"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            {state?.errors?.phone && (
              <p className="text-red-600 text-xs mt-1">
                {state.errors.phone[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Delivery Address
            </label>
            <textarea
              name="address"
              rows={3}
              defaultValue={
                state?.values?.address || "Bole Medhanialem, House 412"
              }
              required
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            {state?.errors?.address && (
              <p className="text-red-600 text-xs mt-1">
                {state.errors.address[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            onClick={() => {
              if (clearCart) setTimeout(clearCart, 500);
            }}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? "Confirming Order..." : `Place Order (${total} ETB)`}
          </button>
        </form>
      </div>
    </div>
  );
}
