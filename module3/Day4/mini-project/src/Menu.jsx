import { useState, useEffect, useRef } from "react";
import { categories } from "./data";
import { fetchDishes } from "./api";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // Load the dishes on mount, and again whenever the category changes.
  // `category` is the only reactive value this effect reads, so it is the
  // only dependency. (fetchDishes is an import, not component state.)
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const list = await fetchDishes(category, controller.signal);
        setDishes(list);
      } catch (err) {
        // A request we cancelled ourselves is not an error to show.
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        // finally guarantees the loading message can never get stuck.
        // A cancelled request must not switch it off, because a newer
        // request is already in flight.
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    // Cleanup: cancel the previous request when the category changes
    // (or when the component unmounts).
    return () => controller.abort();
  }, [category]);

  // Focus the search box once, on mount. It has to be in an effect because
  // the input is not in the DOM yet while React is rendering.
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const query = search.trim().toLowerCase();
  const shown = dishes.filter((dish) => dish.name.toLowerCase().includes(query));

  const handleAdd = (price) => {
    setTotal((t) => t + price);
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
      <p className="total">Order total: {total} ETB</p>
    </main>
  );
}

export default Menu;
