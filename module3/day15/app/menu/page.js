import DishList from "./DishList";
import FilterShell from "./FilterShell";
import ErrorTrigger from "./ErrorTrigger";
import { getDishes, CATEGORIES } from "@/lib/dishes";

// ISR, same as Day 37: dishes change a few times a day.
export const revalidate = 3600;

// ASYNC SERVER component: awaits its data directly. No useFetch, no loading flag, no /api.
export default async function MenuPage() {
  const dishes = await getDishes(); // server

  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Menu</h1>
      <FilterShell categories={CATEGORIES}>
        {/* client shell above, server content inside: DishList ships nothing */}
        <DishList dishes={dishes} />
      </FilterShell>
      <ErrorTrigger />
    </main>
  );
}
