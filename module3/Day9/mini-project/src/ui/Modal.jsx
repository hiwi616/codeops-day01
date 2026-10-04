import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// A generic modal shell: no knowledge of dishes or any other content.
// Anything can be passed as children. Rendered with createPortal into
// document.body so it's never clipped or mis-positioned by whatever
// container its trigger happens to live inside.
function Modal({ titleId, onClose, returnFocusTo, children }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    function getFocusable() {
      return Array.from(dialogNode.querySelectorAll(FOCUSABLE_SELECTOR));
    }

    // Focus moves into the modal as soon as it opens.
    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      // Focus trap: Tab and Shift+Tab cycle only through the modal's own
      // focusable elements, instead of escaping into the page behind it.
      // Recomputed on every Tab press (not just once on mount), in case
      // the modal's own content ever changes while it's open.
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Focus return: without this, focus falls back to <body> when the
      // modal unmounts, and a keyboard user has to tab in from the top
      // of the page again to get back to where they were.
      returnFocusTo?.current?.focus();
    };
  }, [onClose, returnFocusTo]);

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
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
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  titleId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  returnFocusTo: PropTypes.shape({ current: PropTypes.any }),
  children: PropTypes.node,
};

export default Modal;
