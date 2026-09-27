import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

function DishDetail() {
  // useParams reads the dynamic part of the route (menu/:id) as a
  // string, so it's compared against dish.id (a number) with Number(id).
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const url = `${import.meta.env.BASE_URL}dishes.json`;
  const { data, loading, error } = useFetch(url, []);

  if (loading) {
    return (
      <main className="page-dish">
        <p className="status" role="status">
          <span className="spinner" aria-hidden="true" /> Loading dish...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-dish">
        <p className="status status-error" role="alert">
          {error}
        </p>
      </main>
    );
  }

  const dish = (data || []).find((d) => d.id === Number(id));

  if (!dish) {
    return (
      <main className="page-dish">
        <p className="empty">No dish with that id.</p>
        <Link to="/menu">Back to the menu</Link>
      </main>
    );
  }

  return (
    <main className="page-dish">
      <Link to="/menu" className="back-link">
        &larr; Back to the menu
      </Link>
      <h2>
        {dish.name} {Boolean(dish.spicy) && <span className="badge">Spicy</span>}
      </h2>
      <p className="dish-category">{dish.category}</p>
      <p className="dish-price">{dish.price} ETB</p>
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem(dish)}
      >
        Add to cart
      </button>
    </main>
  );
}

export default DishDetail;
