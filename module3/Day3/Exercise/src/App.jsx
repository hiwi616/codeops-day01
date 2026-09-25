import { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import DeliveryForm from "./DeliveryForm";
import { dishes, categories } from "./data";

function App() {
  // Running order total, in ETB.
  const [total, setTotal] = useState(0);

  const handleAdd = (price) => {
    setTotal((t) => t + price);
  };

  return (
    <div className="app">
      <Header />
      <Menu dishes={dishes} categories={categories} onAdd={handleAdd} />
      <p className="total">Order total: {total} ETB</p>
      <DeliveryForm />
    </div>
  );
}

export default App;
