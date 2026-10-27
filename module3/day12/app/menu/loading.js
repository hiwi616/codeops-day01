import DishSkeleton from "./DishSkeleton";

// Segment-level fallback: replaces the whole PAGE (not the layout) while it loads.
export default function Loading() {
  return (
    <>
      <div className="h-8 w-40 animate-pulse rounded bg-stone-300" />
      <DishSkeleton />
    </>
  );
}
