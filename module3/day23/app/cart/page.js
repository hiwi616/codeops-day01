"use client";

import Link from "next/link";
import { useCart } from "@/components/Providers";
import { formatETB } from "@/lib/formatters";

export default function CartPage() {
  const { cart = [], addToCart, removeFromCart, clearCart } = useCart() || {};

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleKeyDown = (e, item) => {
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      addToCart(item);
    } else if (e.key === "-" || e.key === "_") {
      e.preventDefault();
      removeFromCart(item.id);
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      removeFromCart(item.id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Your Cart is Empty
        </h1>
        <p className="text-slate-600 mb-6 text-sm">
          Select authentic Ethiopian specialties from our menu.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Order Items
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Keyboard navigation: Tab to focus an item, then press{" "}
            <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-slate-800">
              +
            </kbd>{" "}
            or{" "}
            <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-slate-800">
              -
            </kbd>{" "}
            to change quantities.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4 mb-8" aria-live="polite">
        {cart.map((item) => (
          <div
            key={item.id}
            tabIndex={0}
            role="region"
            aria-label={`${item.name}, quantity ${item.quantity}`}
            onKeyDown={(e) => handleKeyDown(e, item)}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <div>
              <h2 className="font-bold text-base text-slate-900">
                {item.name}
              </h2>
              <p className="text-xs text-slate-500">
                {formatETB(item.price)} each
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                <button
                  type="button"
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-slate-100 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  -
                </button>
                <span
                  className="w-8 text-center text-sm font-semibold text-slate-900"
                  aria-live="assertive"
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => addToCart(item)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-slate-100 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  +
                </button>
              </div>

              <span className="font-bold text-base text-slate-900 min-w-[5.5rem] text-right">
                {formatETB(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
            Order Total
          </span>
          <p className="text-2xl font-extrabold text-blue-900">
            {formatETB(total)}
          </p>
        </div>

        <Link
          href="/checkout"
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Proceed to Checkout &rarr;
        </Link>
      </div>
    </div>
  );
}
