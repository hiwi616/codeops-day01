import Header from "./Header";
import Menu from "./Menu";
import { dishes } from "./data";

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
