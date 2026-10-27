import { notFound } from "next/navigation";
import { getDishes, getDishById } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <article style={{ maxWidth: "600px" }}>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>
        <strong>Category:</strong> {dish.category}
      </p>
      <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        {dish.price} ETB
      </p>
      <AddToCartButton dish={dish} />
    </article>
  );
}
