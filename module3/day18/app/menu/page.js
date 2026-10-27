import Image from "next/image";
import Link from "next/link";
import { getDishes } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";
import { MenuSearch } from "@/components/MenuSearch";

export const revalidate = 3600;

export default async function MenuPage() {
  const result = await getDishes();
  const dishes = Array.isArray(result) ? result : result?.dishes || [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Addis Eats Authentic Ethiopian Menu
        </h1>
        <p className="mt-1 text-slate-500">
          Traditional wats, sizzling tibs, and fresh vegetarian platters
          delivered daily.
        </p>
      </div>

      <MenuSearch />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {dishes.map((dish, index) => (
          <article
            key={dish.id}
            className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Local next/image with LCP optimization on the first visible dish */}
              <div className="relative w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-lg">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              <div className="p-4">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
                  {dish.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  <Link
                    href={`/menu/${dish.id}`}
                    className="text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    {dish.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {dish.description}
                </p>
                <span className="block mt-3 text-base font-semibold text-slate-900">
                  {dish.price} ETB
                </span>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end">
              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
