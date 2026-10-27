// Also colocated and NOT a route. Plain markup for now - Day 38 makes it interactive.
export default function CategoryBar({ categories }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2 text-sm">
      {categories.map((c) => (
        <li key={c} className="rounded-full border border-green-800 px-3 py-1 text-green-900">
          {c}
        </li>
      ))}
    </ul>
  );
}
