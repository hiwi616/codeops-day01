import Link from "next/link";
import { getDishes } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";
import { MenuSearch } from "@/components/MenuSearch";

export const revalidate = 3600;

export default async function MenuPage() {
  const result = await getDishes();
  // Safe normalization: whether getDishes returns an array or { dishes: [...] }
  const dishes = Array.isArray(result) ? result : result?.dishes || [];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Addis Eats Menu
        </h1>
        <p className="mt-1 text-slate-500">
          Fresh traditional dishes prepared daily with hourly updates.
        </p>
      </div>

      <MenuSearch />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {dishes.map((dish) => (
          <article
            key={dish.id}
            className="border border-slate-200 bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                <Link
                  href={`/menu/${dish.id}`}
                  className="text-blue-900 hover:text-blue-700 transition-colors"
                >
                  {dish.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                {dish.description}
              </p>
              <span className="block mt-3 text-base font-semibold text-slate-900">
                {dish.price} ETB
              </span>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
