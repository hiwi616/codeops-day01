// Skeleton while the segment loads (the layout sidebar is already on screen).
export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="h-8 w-40 animate-pulse rounded bg-stone-300" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded bg-stone-200" />
        ))}
      </div>
      <p className="sr-only">Loading dishes</p>
    </div>
  );
}
