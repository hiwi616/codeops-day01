import { useState } from "react";
import { dishes, categories } from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

// Menu owns the state that both CategoryBar and DishList depend on:
// the selected category, and the running order total.
function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const shown =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  const handleAdd = (price) => {
    setTotal((t) => t + price);
  };

  return (
    <main>
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
      <DishList dishes={shown} category={category} onAdd={handleAdd} />
      <p className="total">Order total: {total} ETB</p>
    </main>
  );
}

export default Menu;
