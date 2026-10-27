// components/OrderStatus.jsx
"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function OrderStatus({ id, initialData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialData,
    refreshInterval: 5000,
    revalidateOnFocus: true,
  });

  if (error)
    return <p className="text-red-600">Could not refresh order status.</p>;

  return (
    <div className="border border-slate-200 bg-white rounded-xl p-6 max-w-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900">Order #{order.id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            order.status === "delivered"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {order.status}
        </span>
      </div>
      <p className="text-slate-600">
        Customer: <strong className="text-slate-800">{order.customer}</strong>
      </p>
      <p className="text-slate-600 mt-1">
        Total: <strong className="text-slate-800">{order.total} ETB</strong>
      </p>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Polled via SWR every 5 seconds
      </div>
    </div>
  );
}
