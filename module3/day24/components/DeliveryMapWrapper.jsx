"use client";

import dynamic from "next/dynamic";

const DynamicDeliveryMap = dynamic(() => import("@/components/DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
      Loading Delivery Zones...
    </div>
  ),
});

export function DeliveryMapWrapper() {
  return <DynamicDeliveryMap />;
}
