import { getOrderById } from "@/lib/data";
import { OrderStatus } from "@/components/OrderStatus";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const initialOrder = await getOrderById(id);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Live Order Tracking
      </h1>
      <OrderStatus id={id} initialData={initialOrder} />
    </div>
  );
}
