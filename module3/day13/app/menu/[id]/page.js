import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish, getDishes } from "@/lib/dishes";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

// Server component. Only <AddToCartButton> (the leaf) is client code.
export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  return (
    <main>
      <h1 className="text-3xl font-bold text-green-900">{dish.name}</h1>
      <p className="mt-2 max-w-prose">{dish.description}</p>
      <p className="mt-3 text-lg font-semibold">{formatPrice(dish.price)}</p>
      <div className="mt-4">
        <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
      </div>
      <Link href="/menu" className="mt-6 inline-block underline">
        Back to the menu
      </Link>
    </main>
  );
}
