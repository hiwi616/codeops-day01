// Shown automatically while app/menu/page.js is awaiting its data.
// This is the <Suspense fallback> you wrote by hand on Day 34.
export default function Loading() {
  return (
    <main aria-busy="true">
      <div className="h-8 w-40 animate-pulse rounded bg-stone-300" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded bg-stone-200" />
        ))}
      </div>
      <p className="sr-only">Loading the menu</p>
    </main>
  );
}
