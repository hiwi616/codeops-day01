export default function DishSkeleton() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded bg-stone-200" />
      ))}
      <p className="sr-only">Loading dishes</p>
    </div>
  );
}
