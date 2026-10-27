import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import ErrorTrigger from "./ErrorTrigger";
import { getDishes, CATEGORIES } from "./dishes";

// Route: /menu   (loading.js shows while this awaits, error.js if it throws)
export default async function MenuPage() {
  const dishes = await getDishes();
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Menu</h1>
      <CategoryBar categories={CATEGORIES} />
      <DishList dishes={dishes} />
      <ErrorTrigger />
    </main>
  );
}
