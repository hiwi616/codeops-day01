import Link from "next/link";
import AddToCartButton from "./AddToCartButton"; // client leaf inside a server component: fine
import { formatPrice } from "@/lib/format";

// SERVER component: pure markup from data - ships no JavaScript of its own.
// data-category lets FilterShell hide cards with CSS without re-rendering them on the client.
export default function DishCard({ dish }) {
  return (
    <li
      data-category={dish.category}
      className="rounded border border-stone-300 bg-white p-4"
    >
      <p className="text-xs text-stone-500">{dish.category}</p>
      <h2 className="text-lg font-bold">
        <Link href={`/menu/${dish.id}`} className="hover:underline">
          {dish.name}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-stone-700">{dish.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-semibold text-green-900">
          {formatPrice(dish.price)}
        </span>
        <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
      </div>
    </li>
  );
}
