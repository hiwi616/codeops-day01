import PropTypes from "prop-types";
import { memo } from "react";

function DishBase({ id, name, price, category, spicy = false, currency = "ETB", onAdd }) {
  return (
    <div className="dish">
      <div className="dish-info">
        <h3>
          {name} {Boolean(spicy) && <span className="badge">Spicy</span>}
        </h3>
        <p>
          {price} {currency}
        </p>
      </div>
      <button
        type="button"
        className="add-btn"
        onClick={() => onAdd && onAdd({ id, name, price, category, spicy })}
      >
        Add
      </button>
    </div>
  );
}

DishBase.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func,
};

// Exercise 7: React.memo skips re-rendering a Dish when its own props
// haven't changed, even if its parent (DishList) re-renders.
const Dish = memo(DishBase);
export default Dish;
