import { memo } from "react";
import PropTypes from "prop-types";

function CategoryBarBase({ categories, selected, onSelect }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={cat === selected ? "chip chip-active" : "chip"}
          aria-pressed={cat === selected}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryBarBase.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Memoized so that typing in the search box - which re-renders Menu on
// every keystroke, but never changes categories/selected/onSelect -
// doesn't also re-render every category chip each time. This only
// works because Menu now passes a stable onSelect (see the useCallback
// around setCategory in Menu.jsx); an inline arrow function recreated
// every render would still defeat this memoization even with memo()
// applied here.
const CategoryBar = memo(CategoryBarBase);
export default CategoryBar;
