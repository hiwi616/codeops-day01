import Link from "next/link";
import DishCard from "@/components/DishCard";
import { getSpecials } from "@/lib/dishes";

// STATIC: the specials are fixed per build, so this page is a plain HTML file.
export default async function HomePage() {
  const specials = await getSpecials();
  return (
    <main>
      <h1 className="text-4xl font-bold text-green-900">Addis Eats</h1>
      <p className="mt-2 max-w-prose">
        Kitfo, shiro and fresh buna, delivered across Addis Ababa. Order from the menu and pay at the door.
      </p>
      <h2 className="mt-8 text-xl font-bold">Today&apos;s specials</h2>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2">
        {specials.map((d) => (
          <DishCard key={d.id} dish={d} />
        ))}
      </ul>
      <Link href="/menu" className="mt-6 inline-block rounded bg-green-800 px-4 py-2 text-white">
        See the full menu
      </Link>
    </main>
  );
}
