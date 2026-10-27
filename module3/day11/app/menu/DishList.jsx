import Link from "next/link";

// Lives in app/menu/ but is NOT a route: only page.js makes a folder reachable.
export default function DishList({ dishes }) {
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
      {dishes.map((d) => (
        <li key={d.id} className="rounded border border-stone-300 bg-white p-4">
          <p className="text-xs text-stone-500">{d.category}</p>
          <h2 className="text-lg font-bold">
            <Link href={`/menu/${d.id}`} className="hover:underline">
              {d.name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-stone-700">{d.description}</p>
          <p className="mt-2 font-semibold text-green-900">{d.price} ETB</p>
        </li>
      ))}
    </ul>
  );
}
