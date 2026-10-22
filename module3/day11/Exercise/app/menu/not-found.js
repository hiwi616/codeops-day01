import Link from "next/link";

export default function DishNotFound() {
  return (
    <main>
      <h1>Dish not found</h1>
      <p>Sorry, we could not find that dish.</p>
      <Link href="/menu">Return to menu</Link>
    </main>
  );
}