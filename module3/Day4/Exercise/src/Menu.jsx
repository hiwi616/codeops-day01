import { useState, useEffect, useRef } from "react";
import { categories } from "./data";
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

  // Exercises 2-6: fetch the menu. Runs on mount and again whenever
  // the category changes (it is in the dependency array).
  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.BASE_URL}dishes.json`, {
          signal: controller.signal,
        });

        // fetch only rejects on network failure, so a 404 must be checked by hand.
        if (!res.ok) {
          throw new Error(
            `Could not load the menu (${res.status} ${res.statusText || "error"}).`
          );
        }

        const data = await res.json();
        setDishes(
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category)
        );
        setLoading(false);
      } catch (err) {
        // A cancelled request is expected, not an error to show.
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      }
    }

    loadDishes();

    // Cleanup: cancel the previous request before the next one starts
    // (and when the component unmounts).
    return () => controller.abort();
  }, [category]);

  const query = search.trim().toLowerCase();
  const shown = dishes.filter((dish) => dish.name.toLowerCase().includes(query));

  // Exercise 1: keep the tab title in sync with the number of dishes shown.
  useEffect(() => {
    document.title = `Addis Eats (${shown.length} dishes)`;
  }, [shown.length]);

  // Exercise 7: focus the search box once, when the component mounts.
  // This has to be inside an effect: during the first render the input
  // does not exist in the DOM yet, so searchRef.current is null. Refs are
  // attached after React commits the DOM, and effects run after that commit.
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const handleAdd = (price) => {
    setTotal((t) => t + price);
  };

  const emptyMessage = query
    ? `No dishes match "${search.trim()}".`
    : `No dishes in "${category}" right now.`;

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
