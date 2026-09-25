import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

function Menu({ dishes, category }) {
  const visible = dishes.filter((dish) => dish.category === category);

  if (visible.length === 0) {
    return <p className="empty">No dishes in "{category}" right now.</p>;
  }

  return (
    <main className="menu">
      {visible.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
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
  category: PropTypes.string.isRequired,
};

export default Menu;
