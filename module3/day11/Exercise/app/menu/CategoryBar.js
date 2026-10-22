"use client";

const categories = ["All", "Traditional", "Popular", "Vegetarian"];

export default function CategoryBar() {
  return (
    <div className="categories" aria-label="Menu categories">
      {categories.map((category) => (
        <button key={category} type="button">
          {category}
        </button>
      ))}
    </div>
  );
}