import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data";
import { useFetch } from "../hooks/useFetch";
import { useCartStore, useCartTotal } from "../store/cartStore";
import CategoryBar from "../CategoryBar";
import DishList from "../DishList";
import ErrorBoundary from "../ErrorBoundary";
import MenuUnavailable from "../MenuUnavailable";

function Menu() {
  // The category filter lives in the URL (?category=Stew) instead of
  // component state, so it survives a refresh and can be linked to
  // directly. "All" is represented by the param being absent.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  // Narrow selectors: addItem is a stable function reference from the
  // store, and useCartTotal only re-renders this component when the
  // total actually changes (e.g. not when the search box is typed in).
  const addItem = useCartStore((state) => state.addItem);
  const total = useCartTotal();

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

  // addItem from zustand is already a stable reference (it doesn't
  // change between renders the way a new inline function would), so
  // wrapping it in useCallback again would be redundant - but keeping
  // handleAdd as its own function still means DishList only ever sees
  // one prop name (onAdd) regardless of which store or context backs it.
  const handleAdd = addItem;

  // Sets or clears ?category=, without disturbing any other query
  // params (there aren't any here yet, but this pattern scales).
  //
  // Wrapped in useCallback with an empty dependency array: setSearchParams
  // from react-router is already stable across renders, so this function
  // never needs to change either. Before this fix, setCategory was a new
  // function on every render of Menu (e.g. every keystroke in the search
  // box), which meant CategoryBar's onSelect prop looked "different" on
  // every render even after CategoryBar itself was wrapped in
  // React.memo - so memo alone did nothing until this was fixed too.
  const setCategory = useCallback(
    (next) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (next === "All") {
          params.delete("category");
        } else {
          params.set("category", next);
        }
        return params;
      });
    },
    [setSearchParams]
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
      {/* The dish list has its own ErrorBoundary, separate from the
          cart panel's (SafeCheckoutPanel.jsx). If a dish crashes, only
          this fallback replaces the list - the search box and category
          chips above it, and the header/cart badge in Layout, are
          unaffected because they aren't inside this boundary's tree. */}
      <ErrorBoundary fallback={<MenuUnavailable />}>
        <DishList
          dishes={shown}
          loading={loading}
          error={error}
          emptyMessage={emptyMessage}
          onAdd={handleAdd}
        />
      </ErrorBoundary>
      <p className="total">Cart total: {total} ETB</p>
    </main>
  );
}

export default Menu;
