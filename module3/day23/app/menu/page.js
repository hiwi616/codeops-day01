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
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Addis Eats Authentic Ethiopian Menu
        </h1>
        <p className="mt-2 text-slate-600 text-base">
          Traditional wats, sizzling tibs, and fresh vegetarian platters
          delivered daily.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <MenuSearch />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {dishes.map((dish, index) => (
          <article
            key={dish.id}
            className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Responsive image container */}
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 20vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              <div className="p-5">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
                  {dish.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900 hover:text-blue-700 transition-colors">
                  <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
                </h2>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
              <span className="text-lg font-extrabold text-slate-900">
                {dish.price}{" "}
                <span className="text-xs font-medium text-slate-500">ETB</span>
              </span>
              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
