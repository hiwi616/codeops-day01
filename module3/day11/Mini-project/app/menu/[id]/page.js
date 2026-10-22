import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = [
  { id: "1", name: "Doro Wat", price: 240, description: "Spiced chicken stew served Ethiopian-style." },
  { id: "2", name: "Tibs", price: 280, description: "Sautéed meat with aromatic spices." },
  { id: "3", name: "Kitfo", price: 350, description: "A well-known Ethiopian minced beef dish." }
];

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p><strong>Price: {dish.price} ETB</strong></p>
      <p className="muted">Dish ID: {id}</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}