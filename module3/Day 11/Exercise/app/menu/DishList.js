import Link from "next/link";

const dishes = [
  { id: "1", name: "Doro Wat", price: 240 },
  { id: "2", name: "Tibs", price: 280 },
  { id: "3", name: "Kitfo", price: 350 }
];

export default function DishList() {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li className="dish-card" key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.price} ETB</p>
          <Link href={`/menu/${dish.id}`}>View dish</Link>
        </li>
      ))}
    </ul>
  );
}