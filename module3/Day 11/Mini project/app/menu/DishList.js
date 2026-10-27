import Link from "next/link";

const dishes = [
  { id: "1", name: "Doro Wat", price: 240, description: "Spiced chicken stew served Ethiopian-style." },
  { id: "2", name: "Tibs", price: 280, description: "Sautéed meat with aromatic spices." },
  { id: "3", name: "Kitfo", price: 350, description: "A well-known Ethiopian minced beef dish." }
];

export default function DishList() {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li className="dish-card" key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p><strong>{dish.price} ETB</strong></p>
          <Link href={`/menu/${dish.id}`}>View dish</Link>
        </li>
      ))}
    </ul>
  );
}