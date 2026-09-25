import Header from "./Header";
import Menu from "./Menu";

const dishes = [
  { id: 1, name: "Doro Wat", price: 240, category: "Stew", spicy: true },
  { id: 2, name: "Kitfo", price: 280, category: "Meat", spicy: true },
  { id: 3, name: "Shiro", price: 150, category: "Stew", spicy: false },
  { id: 4, name: "Tibs", price: 220, category: "Meat", spicy: false },
  { id: 5, name: "Firfir", price: 130, category: "Breakfast", spicy: false },
];

function App() {
  // Change to "Meat" or "Breakfast" to see other filters,
  // or "Dessert" to see the empty state.
  const category = "Stew";

  return (
    <div className="app">
      <Header />
      <Menu dishes={dishes} category={category} />
    </div>
  );
}

export default App;
