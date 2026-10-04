import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./Card";
import Dish from "./Dish";
import Modal from "./ui/Modal";

function DishList({ dishes, loading, error, emptyMessage, onAdd }) {
  // A deliberate crash, for testing the ErrorBoundary that wraps this
  // component in Menu.jsx. Note this can't just throw directly inside
  // the button's onClick - React error boundaries only catch errors
  // thrown during render (and in lifecycle methods/constructors), not
  // inside event handlers. So the button sets state instead, and the
  // throw happens on the very next render, where the boundary actually
  // catches it.
  const [crash, setCrash] = useState(false);
  if (crash) {
    throw new Error(
      "Deliberate crash inside the dish list, for the ErrorBoundary demo."
    );
  }

  // Which dish's "quick view" modal is open, if any.
  const [openDish, setOpenDish] = useState(null);
  // The button that opened the modal, so Modal can return focus to the
  // right place (not just "whichever button happened to be last") when
  // it closes.
  const lastTriggerRef = useRef(null);

  function openQuickView(dish, e) {
    lastTriggerRef.current = e.currentTarget;
    setOpenDish(dish);
  }

  function closeQuickView() {
    setOpenDish(null);
  }

  function handleAddFromModal() {
    onAdd(openDish);
    closeQuickView();
  }

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
      <button type="button" className="dev-crash-btn" onClick={() => setCrash(true)}>
        🧨 Simulate menu crash
      </button>
      {dishes.map((dish) => (
        <Card key={dish.id}>
          {/* The card links to its own page. The Add and Quick view
              buttons sit next to the link rather than inside it, so
              neither is a <button> nested in an <a> (invalid HTML) and
              clicking either doesn't also trigger navigation. */}
          <Link to={`/menu/${dish.id}`} className="dish-link">
            <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
          </Link>
          <div className="card-actions">
            <button
              type="button"
              className="quick-view-btn"
              onClick={(e) => openQuickView(dish, e)}
            >
              Quick view
            </button>
            <button
              type="button"
              className="add-btn"
              onClick={() => onAdd(dish)}
            >
              Add
            </button>
          </div>
        </Card>
      ))}

      {openDish && (
        <Modal
          titleId="dish-modal-title"
          onClose={closeQuickView}
          returnFocusTo={lastTriggerRef}
        >
          <h2 id="dish-modal-title">
            {openDish.name}{" "}
            {Boolean(openDish.spicy) && <span className="badge">Spicy</span>}
          </h2>
          <p className="dish-category">{openDish.category}</p>
          <p className="dish-price">{openDish.price} ETB</p>
          <button type="button" className="add-btn" onClick={handleAddFromModal}>
            Add to cart
          </button>
        </Modal>
      )}
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
