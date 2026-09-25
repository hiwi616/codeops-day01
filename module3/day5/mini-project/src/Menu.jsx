import { useState, useEffect, useRef, useCallback } from "react";
import { categories } from "./data";
import { useFetch } from "./hooks/useFetch";
import { useCart } from "./context/CartContext";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const { dispatch, total } = useCart();

  // The category is part of the URL and part of useFetch's dependency
  // array, so switching chips re-runs the fetch effect: the in-flight
  // request for the old category is aborted, and a new one starts for
  // the new category. The menu data here is a single static JSON file,
  // so both requests happen to return the same array either way — but
  // the cancel-on-change behaviour is real and is the thing to check in
  // the Network tab (see README > "How to verify").
  const url = `${import.meta.env.BASE_URL}dishes.json?category=${encodeURIComponent(category)}`;
  const { data, loading, error } = useFetch(url, [category]);
  const allDishes = data || [];

  const filtered =
    category === "All"
      ? allDishes
      : allDishes.filter((dish) => dish.category === category);

  const query = search.trim().toLowerCase();
  const shown = filtered.filter((dish) => dish.name.toLowerCase().includes(query));

  useEffect(() => {
    document.title = `Addis Eats (${shown.length} dishes)`;
  }, [shown.length]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // useCallback keeps this function's reference stable across Menu
  // re-renders (e.g. from typing in the search box), so it doesn't
  // invalidate props on every memoized Dish just because Menu re-rendered.
  // dispatch from context is already stable, so the deps array is just that.
  const handleAdd = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  const emptyMessage = query
    ? `No dishes match "${search.trim()}".`
    : `Nothing in "${category}" yet. Try another category.`;

  return (
    <main>
      <input
        ref={searchRef}
        type="search"
        className="search"
        placeholder="Search dishes"
        aria-label="Search dishes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
      <DishList
        dishes={shown}
        loading={loading}
        error={error}
        emptyMessage={emptyMessage}
        onAdd={handleAdd}
      />
      <p className="total">Cart total: {total} ETB</p>
    </main>
  );
}

export default Menu;
