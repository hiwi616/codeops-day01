import DishCard from "@/components/DishCard";

// SERVER component (no directive): receives data, returns markup, ships no JavaScript.
export default function DishList({ dishes }) {
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
      {dishes.map((d) => (
        <DishCard key={d.id} dish={d} />
      ))}
    </ul>
  );
}
