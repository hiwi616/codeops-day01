import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

// Rendered with createPortal into document.body, not into whatever DOM
// node DishList happens to sit inside. That matters for a modal
// specifically: DishList's own container might have a fixed height,
// overflow: hidden, or a transform - all of which would clip or
// mis-position an "overlay" if it were just a normal nested element.
// Portals let the component still live in the React tree (so props,
// context and events all work normally) while its actual DOM node is
// attached somewhere else entirely.
function DishModal({ dish, onClose, returnFocusTo }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    // Focus moves into the modal as soon as it opens, so keyboard and
    // screen-reader users land somewhere sensible instead of the focus
    // silently staying on whatever was behind the now-open modal.
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Returning focus on exit: without this, after the modal unmounts,
      // focus falls back to <body> and a keyboard user has to tab in
      // from the very top of the page again to get back to where they
      // were.
      returnFocusTo?.current?.focus();
    };
  }, [onClose, returnFocusTo]);

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 id="dish-modal-title">
          {dish.name} {Boolean(dish.spicy) && <span className="badge">Spicy</span>}
        </h2>
        <p className="dish-category">{dish.category}</p>
        <p className="dish-price">{dish.price} ETB</p>
      </div>
    </div>,
    document.body
  );
}

DishModal.propTypes = {
  dish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    spicy: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  returnFocusTo: PropTypes.shape({ current: PropTypes.any }),
};

export default DishModal;
