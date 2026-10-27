import Link from "next/link";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

export default async function MenuPage() {
  // Temporary delay so you can see loading.js while testing.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return (
    <main>
      <h1>Addis Eats Menu</h1>
      <p>Choose a traditional Ethiopian favourite.</p>
      <CategoryBar />
      <DishList />
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </div>
    </main>
  );
}