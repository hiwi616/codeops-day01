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

  // Exercise 2: the fetching logic now lives in useFetch, reused here.
  // The dependency array is `[]`: we always fetch the full list once,
  // and filter by category on the client afterwards.
  const url = `${import.meta.env.BASE_URL}dishes.json`;
  const { data, loading, error } = useFetch(url, []);
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

  // Exercise 7: useCallback keeps this function reference stable across
  // Menu re-renders, so it doesn't invalidate props on every memoized Dish
  // just because Menu re-rendered (e.g. from typing in the search box).
  // dispatch from useReducer/context is already stable, so the deps array
  // can safely be empty.
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
