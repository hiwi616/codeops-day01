import Image from "next/image";
import { notFound } from "next/navigation";
import { getDishes, getDishById } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const res = await getDishes();
  const list = Array.isArray(res) ? res : res?.dishes || [];
  return list.map((dish) => ({ id: dish.id }));
}

// Day 44: Dynamic Open Graph & Twitter Cards per dish
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found — Addis Eats",
    };
  }

  return {
    title: `${dish.name} | Authentic Ethiopian Cuisine`,
    description: dish.description,
    openGraph: {
      title: `${dish.name} - Addis Eats`,
      description: dish.description,
      images: [
        {
          url: dish.image,
          width: 800,
          height: 600,
          alt: dish.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: dish.name,
      description: dish.description,
      images: [dish.image],
    },
  };
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  // Day 44: Schema.org MenuItem JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: dish.image,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
    suitableForDiet:
      dish.category === "vegetarian"
        ? "https://schema.org/VegetarianDiet"
        : undefined,
  };

  return (
    <article className="max-w-2xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-md mb-6 bg-slate-100">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
      </div>

      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        {dish.category}
      </span>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        {dish.name}
      </h1>
      <p className="text-slate-600 text-base leading-relaxed mb-4">
        {dish.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-2xl font-bold text-slate-900">
          {dish.price} ETB
        </span>
        <AddToCartButton dish={dish} />
      </div>
    </article>
  );
}
