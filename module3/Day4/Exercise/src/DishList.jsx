import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

function DishList({ dishes, loading, error, emptyMessage, onAdd }) {
  // Early returns, in order: loading, then error, then empty.
  // The list below only renders when there is something to show.
  if (loading) {
    return <p className="status">Loading menu...</p>;
  }

  if (error) {
    return (
      <p className="status status-error" role="alert">
        {error}
      </p>
    );
  }

  if (dishes.length === 0) {
    return <p className="empty">{emptyMessage}</p>;
  }

  return (
    <div className="menu">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            onAdd={onAdd}
          />
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  emptyMessage: PropTypes.string,
  onAdd: PropTypes.func,
};

export default DishList;
