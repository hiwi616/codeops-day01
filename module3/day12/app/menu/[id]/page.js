import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish, getDishes } from "@/lib/dishes";

// Every dish id is known at build time -> one static HTML file per dish.
export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  return (
    <main>
      <p className="text-sm text-stone-500">
        params.id = <code>&quot;{id}&quot;</code>
      </p>
      <h1 className="text-3xl font-bold text-green-900">{dish.name}</h1>
      <p className="mt-2 max-w-prose">{dish.description}</p>
      <p className="mt-3 text-lg font-semibold">{dish.price} ETB</p>
      <Link href="/menu" className="mt-6 inline-block underline">
        Back to the menu
      </Link>
    </main>
  );
}
