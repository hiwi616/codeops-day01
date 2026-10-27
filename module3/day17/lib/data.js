export const DISHES = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    category: "stews",
    price: 450,
    description: "Slow-cooked chicken in berbere sauce with injera.",
  },
  {
    id: "special-tibs",
    name: "Special Tibs",
    category: "meat",
    price: 380,
    description: "Sautéed beef with rosemary, onions, and jalapeños.",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    category: "meat",
    price: 420,
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
  },
  {
    id: "shiro-wat",
    name: "Shiro Wat",
    category: "vegetarian",
    price: 220,
    description: "Simmered chickpea flour stew served in an earthenware pot.",
  },
];

export async function getDishes() {
  return DISHES;
}

export async function getDishById(id) {
  return DISHES.find((d) => d.id === id) || null;
}

export const ORDERS = [
  {
    id: "ord_101",
    userId: "usr_1",
    customer: "Almaz",
    status: "preparing",
    total: 450,
    placedAt: new Date().toISOString(),
  },
  {
    id: "ord_102",
    userId: "usr_2",
    customer: "Dawit",
    status: "out_for_delivery",
    total: 800,
    placedAt: new Date().toISOString(),
  },
];

export async function getOrderById(id) {
  return (
    ORDERS.find((o) => o.id === id) || {
      id,
      userId: "usr_1",
      customer: "Guest",
      status: "preparing",
      total: 450,
      placedAt: new Date().toISOString(),
    }
  );
}
