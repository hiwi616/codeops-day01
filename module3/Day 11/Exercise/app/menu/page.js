import Link from "next/link";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import MenuButton from "./MenuButton";

export default async function MenuPage() {
  // Keep this delay briefly to demonstrate loading.js. Remove it after testing.
  await new Promise((resolve) => setTimeout(resolve, 700));

  return (
    <main>
      <h1>Our Menu</h1>
      <CategoryBar />
      <DishList />
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </div>
      <MenuButton />
    </main>
  );
}