import Link from "next/link";

export default function MenuNotFound() {
  return (
    <main>
      <h1>Dish not found</h1>
      <p>Sorry, Addis Eats could not find that dish.</p>
      <Link href="/menu">Return to the menu</Link>
    </main>
  );
}