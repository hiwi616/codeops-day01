import { getOrderById } from "@/lib/data";
import { OrderStatus } from "@/components/OrderStatus";
import { SecurityAttackDemo } from "@/components/SecurityAttackDemo";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const initialOrder = await getOrderById(id);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Live Order Tracking
      </h1>
      <OrderStatus id={id} initialData={initialOrder} />
      <SecurityAttackDemo currentOrderId={id} />
    </div>
  );
}
