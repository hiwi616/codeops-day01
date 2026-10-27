import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish } from "../dishes";

// Route: /menu/kitfo, /menu/shiro ...
// params arrives as a PROP (no hook). In Next.js 16 it is a Promise (sync access was removed), so we await it.
export default async function DishPage({ params }) {
  const { id } = await params; // always a string

  const dish = await getDish(id);
  if (!dish) notFound(); // renders app/not-found.js

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
