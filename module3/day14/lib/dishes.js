// Shared data layer. Moved out of app/menu in Day 37: it is used by the menu AND the dish route,
// so it belongs outside app/ ("anything used by more than one route").

export const CATEGORIES = ["Mains", "Vegan", "Sides", "Drinks"];

const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Mains", price: 420, description: "Minced beef with mitmita and niter kibbeh, served with ayib." },
  { id: "doro-wat", name: "Doro wat", category: "Mains", price: 380, description: "Slow-cooked chicken stew in berbere with a boiled egg." },
  { id: "tibs", name: "Beef tibs", category: "Mains", price: 360, description: "Sizzling cubes of beef with onion, rosemary and green chilli." },
  { id: "dulet", name: "Dulet", category: "Mains", price: 300, description: "Spiced minced tripe, liver and beef, fried in butter." },
  { id: "shiro", name: "Shiro", category: "Vegan", price: 220, description: "Silky chickpea stew simmered with garlic and onion." },
  { id: "beyaynetu", name: "Beyaynetu", category: "Vegan", price: 260, description: "A fasting platter of lentils, greens, split peas and salad." },
  { id: "firfir", name: "Injera firfir", category: "Sides", price: 180, description: "Torn injera soaked in spiced sauce." },
  { id: "ful", name: "Ful", category: "Sides", price: 150, description: "Fava beans with tomato, onion and a squeeze of lemon." },
  { id: "buna", name: "Buna", category: "Drinks", price: 40, description: "Coffee from the pot, roasted at the table." },
  { id: "tej", name: "Tej", category: "Drinks", price: 120, description: "Honey wine, served in a berele." },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Fake network latency so loading.js is visible. Override with DISH_DELAY_MS.
const DELAY = Number(process.env.DISH_DELAY_MS ?? 800);

export async function getDishes() {
  await sleep(DELAY);
  return dishes;
}

export async function getDish(id) {
  await sleep(DELAY);
  return dishes.find((d) => d.id === id) ?? null;
}

// Synchronous lookup for server-side validation (no fake latency).
export function findDish(id) {
  return dishes.find((d) => d.id === id) ?? null;
}
