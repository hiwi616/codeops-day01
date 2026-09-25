import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import CategoryBar from "../CategoryBar";
import DishList from "../DishList";

function MenuPage() {
  // The category filter lives in the URL (?category=Stew) instead of
  // component state, so it survives a refresh and can be linked to
  // directly. "All" is represented by the param being absent.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const { dispatch, total } = useCart();

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

  const handleAdd = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  // Sets or clears ?category=, without disturbing any other query
  // params (there aren't any here yet, but this pattern scales).
  const setCategory = (next) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next === "All") {
        params.delete("category");
      } else {
        params.set("category", next);
      }
      return params;
    });
  };

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

export default MenuPage;
