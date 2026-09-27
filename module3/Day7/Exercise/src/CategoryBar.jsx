import PropTypes from "prop-types";

function CategoryBar({ categories, selected, onSelect }) {
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

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryBar;
