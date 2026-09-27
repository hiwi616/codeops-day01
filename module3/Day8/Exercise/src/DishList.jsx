import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./Card";
import Dish from "./Dish";

function DishList({ dishes, loading, error, emptyMessage, onAdd }) {
  if (loading) {
    return (
      <p className="status" role="status">
        <span className="spinner" aria-hidden="true" /> Loading menu...
      </p>
    );
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
          {/* The card links to its own page. The Add button sits next to
              the link rather than inside it, so it isn't a <button>
              nested in an <a> (invalid HTML) and its click doesn't also
              trigger navigation. */}
          <Link to={`/menu/${dish.id}`} className="dish-link">
            <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
          </Link>
          <button
            type="button"
            className="add-btn"
            onClick={() => onAdd(dish)}
          >
            Add
          </button>
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
