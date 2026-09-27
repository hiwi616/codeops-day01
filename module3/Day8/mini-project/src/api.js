// All talking to the "server" lives here, so components only deal with state.

export async function fetchDishes(category, signal) {
  let res;

  try {
    res = await fetch(`${import.meta.env.BASE_URL}dishes.json`, { signal });
  } catch (err) {
    // A cancelled request must stay an AbortError so the caller can ignore it.
    if (err.name === "AbortError") throw err;
    throw new Error(
      "We couldn't reach the menu. Check your connection and try again."
    );
  }

  // fetch only rejects on network failure, so HTTP errors (like a 404)
  // have to be checked by hand.
  if (!res.ok) {
    throw new Error(
      `We couldn't load the menu right now (error ${res.status}). Please try again later.`
    );
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error("The menu data looks broken. Please try again later.");
  }

  return category === "All"
    ? data
    : data.filter((dish) => dish.category === category);
}
