import { findDish } from "./dishes";

// In-memory store that survives dev hot reloads. Swap for a database later.
const store = (globalThis.__addisOrders ??= { orders: new Map(), seq: 800 });

// Prices ALWAYS come from the server's menu, never from the client.
export function createOrder(userId, data) {
  const lines = [];
  const unknown = [];
  for (const it of data.items) {
    const dish = findDish(it.id);
    if (!dish) unknown.push(it.id);
    else lines.push({ id: dish.id, name: dish.name, price: dish.price, qty: it.qty });
  }
  if (unknown.length) return { fieldErrors: { items: [`Unknown dish: ${unknown.join(", ")}`] } };

  const order = {
    id: `ord_${++store.seq}`,
    userId,
    name: data.name,
    phone: data.phone,
    area: data.area,
    lines,
    total: lines.reduce((n, l) => n + l.price * l.qty, 0),
    currency: "ETB",
    status: "placed",
    createdAt: new Date().toISOString(),
  };
  store.orders.set(order.id, order);
  return { order };
}

export const getOrder = (id) => store.orders.get(id) ?? null;
export const listOrders = (userId) =>
  [...store.orders.values()].filter((o) => o.userId === userId).reverse();
export function markCancelled(id) {
  const o = store.orders.get(id);
  if (o) o.status = "cancelled";
  return o;
}

export function countOrders() {
  const all = [...store.orders.values()];
  return {
    placed: all.filter((o) => o.status === "placed").length,
    cancelled: all.filter((o) => o.status === "cancelled").length,
    latest: all.length ? all[all.length - 1].id : null,
  };
}
