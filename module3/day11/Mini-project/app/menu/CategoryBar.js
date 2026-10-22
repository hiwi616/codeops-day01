"use client";

const categories = ["All dishes", "Traditional", "Popular"];

export default function CategoryBar() {
  return (
    <div className="categories" aria-label="Dish categories">
      {categories.map((category) => (
        <button type="button" key={category}>{category}</button>
      ))}
    </div>
  );
}