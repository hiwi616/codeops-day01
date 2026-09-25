import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, spicy = false, currency = "ETB", onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((c) => c + 1);
    if (onAdd) onAdd(price);
  };

  return (
    <div className="dish">
      <div className="dish-info">
        <h3>
          {name} {Boolean(spicy) && <span className="badge">Spicy</span>}
          {count > 0 && <span className="count">x{count}</span>}
        </h3>
        <p>
          {price} {currency}
        </p>
      </div>
      <button type="button" className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func,
};

export default Dish;
