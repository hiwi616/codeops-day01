// No directive of its own: it is imported by FilterShell (a client file), so it is client code
// by inheritance. It only renders buttons and calls the callback it was given.
export default function CategoryBar({ categories, selected, onSelect }) {
  const all = ["All", ...categories];
  return (
    <div role="group" aria-label="Filter by category" className="mt-3 flex flex-wrap gap-2 text-sm">
      {all.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          aria-pressed={selected === c}
          className={
            "rounded-full border px-3 py-1 " +
            (selected === c ? "border-green-800 bg-green-800 text-white" : "border-green-800 text-green-900")
          }
        >
          {c}
        </button>
      ))}
    </div>
  );
}
