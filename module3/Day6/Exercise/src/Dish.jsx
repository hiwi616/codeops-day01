import { memo } from "react";
import PropTypes from "prop-types";

// Presentational only: name, price and the Spicy badge. The Add button
// used to live here, but now that each dish links to its own page
// (menu/:id), the button moved out to DishList so it isn't nested
// inside the <Link>'s <a> tag.
function DishBase({ name, price, spicy = false, currency = "ETB" }) {
  return (
    <div className="dish-info">
      <h3>
        {name} {Boolean(spicy) && <span className="badge">Spicy</span>}
      </h3>
      <p>
        {price} {currency}
      </p>
    </div>
  );
}

DishBase.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

// React.memo skips re-rendering a Dish when its own props haven't
// changed, even if its parent (DishList) re-renders.
const Dish = memo(DishBase);
export default Dish;
