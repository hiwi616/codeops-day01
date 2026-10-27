import { Suspense } from "react";
import DishList from "./DishList";
import DishSkeleton from "./DishSkeleton";
import ErrorTrigger from "./ErrorTrigger";

// ISR: static, rebuilt in the background at most once an hour.
// Why 3600? Dishes change a few times a day and speed matters most;
// a menu that is up to an hour old misleads nobody (a promo price would).
export const revalidate = 3600;

export default function MenuPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Menu</h1>
      {/* Heading and sidebar are instant; only the slow part waits. */}
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
      <ErrorTrigger />
    </main>
  );
}
