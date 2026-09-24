import Header from "./Header";
import Dish from "./Dish";

const dishes = [
  { id: 1, name: "Margherita Pizza", price: 12.5 },
  { id: 2, name: "Pad Thai", price: 9.75 },
  { id: 3, name: "Ramen", price: 11.0 },
  { id: 4, name: "Tacos al Pastor", price: 8.25 },
];

function App() {
  return (
    <div>
      <Header />
      {dishes.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </div>
  );
}

export default App;
