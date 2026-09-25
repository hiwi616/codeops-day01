import { useState } from "react";
import PropTypes from "prop-types";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu({ dishes, categories, onAdd }) {
  // The selected category lives here, and is passed down to CategoryBar.
  const [category, setCategory] = useState("All");

  const visible =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <main>
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
      <DishList dishes={visible} category={category} onAdd={onAdd} />
    </main>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func,
};

export default Menu;
