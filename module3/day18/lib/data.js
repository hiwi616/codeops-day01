export const DISHES = [
  // Stews & Poultry
  {
    id: "doro-wat",
    name: "Doro Wat",
    category: "stews",
    price: 480,
    description:
      "Slow-simmered tender chicken drumstick infused with spicy berbere sauce and spiced niter kibbeh, served with a hard-boiled egg.",
    image: "/images/dishes/doro-wat.jpg",
  },
  {
    id: "siga-wat",
    name: "Key Siga Wat",
    category: "stews",
    price: 420,
    description:
      "Spicy and savory beef stew slow-cooked with caramelized onions, garlic, ginger, and Ethiopian berbere.",
    image: "/images/dishes/siga-wat.jpg",
  },
  {
    id: "alicha-wat",
    name: "Minchet Abish Alicha",
    category: "stews",
    price: 390,
    description:
      "Finely minced lean beef cooked in a fragrant, mild turmeric, cardamom, and garlic sauce for non-spicy stew lovers.",
    image: "/images/dishes/alicha-wat.jpg",
  },

  // Sautéed & Grilled Meats
  {
    id: "shekla-tibs",
    name: "Shekla Tibs",
    category: "meat",
    price: 440,
    description:
      "Tender cubes of prime beef sautéed with onions, rosemary, and jalapeños, served sizzling hot on a traditional clay burner.",
    image: "/images/dishes/shekla-tibs.jpg",
  },
  {
    id: "derek-tibs",
    name: "Derek Tibs",
    category: "meat",
    price: 460,
    description:
      "Crispy pan-fried beef chunks seasoned with rosemary, garlic, and sea salt, served with spicy awaze and mitmita dip.",
    image: "/images/dishes/derek-tibs.jpg",
  },
  {
    id: "kitfo",
    name: "Special Kitfo",
    category: "meat",
    price: 450,
    description:
      "Minced extra-lean top round seasoned with mitmita and warm niter kibbeh, accompanied by house-made ayib (cottage cheese) and gomen.",
    image: "/images/dishes/kitfo.jpg",
  },
  {
    id: "gored-gored",
    name: "Gored Gored",
    category: "meat",
    price: 430,
    description:
      "Cubed raw tenderloin tossed in clarified niter kibbeh and hot awaze paste.",
    image: "/images/dishes/gored-gored.jpg",
  },

  // Vegetarian & Fasting (Yetsom)
  {
    id: "yetsom-beyaynetu",
    name: "Yetsom Beyaynetu",
    category: "vegetarian",
    price: 360,
    description:
      "Grand fasting platter featuring misir wat, kik alicha, shiro, gomen, atkilt wat, and beetroot salad over fresh teff injera.",
    image: "/images/dishes/yetsom-beyaynetu.jpg",
  },
  {
    id: "shiro-tegamino",
    name: "Shiro Tegabino",
    category: "vegetarian",
    price: 240,
    description:
      "Roasted chickpea flour slow-simmered with garlic, onions, and berbere until thick, served bubbling in an earthenware dish.",
    image: "/images/dishes/shiro-tegamino.jpg",
  },
  {
    id: "bozena-shiro",
    name: "Bozena Shiro",
    category: "meat",
    price: 320,
    description:
      "Hearty spiced chickpea puree enriched with pieces of dried and shredded beef (quanta).",
    image: "/images/dishes/bozena-shiro.jpg",
  },
  {
    id: "misir-wat",
    name: "Misir Wat",
    category: "vegetarian",
    price: 210,
    description:
      "Split red lentils simmered in aromatic berbere stew, cooked until soft, velvety, and fragrant.",
    image: "/images/dishes/misir-wat.jpg",
  },
  {
    id: "kik-alicha",
    name: "Kik Alicha",
    category: "vegetarian",
    price: 200,
    description:
      "Split yellow peas cooked in a mild turmeric sauce with sweet onions, garlic, and fresh ginger.",
    image: "/images/dishes/kik-alicha.jpg",
  },
  {
    id: "gomen-be-siga",
    name: "Gomen be Siga",
    category: "meat",
    price: 340,
    description:
      "Chopped collard greens stewed with beef rib pieces, ginger, garlic, and hot green peppers.",
    image: "/images/dishes/gomen-be-siga.jpg",
  },

  // Breakfast & Specialty
  {
    id: "quanta-firfir",
    name: "Quanta Fir-Fir",
    category: "breakfast",
    price: 310,
    description:
      "Torn pieces of injera thoroughly soaked in spicy berbere stew simmered with sun-dried seasoned beef.",
    image: "/images/dishes/quanta-firfir.jpg",
  },
  {
    id: "chechebsa",
    name: "Chechebsa (Kita Fir-Fir)",
    category: "breakfast",
    price: 220,
    description:
      "Shredded flatbread pan-fried in warm niter kibbeh and berbere, served with a side of honey and fresh yogurt.",
    image: "/images/dishes/chechebsa.jpg",
  },
];

export async function getDishes({ page = 1, limit = 50, query = "" } = {}) {
  let list = DISHES;
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q),
    );
  }
  const total = list.length;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);
  return { dishes: paginated, total, totalPages: Math.ceil(total / limit) };
}

export async function getDishById(id) {
  return DISHES.find((d) => d.id === id) || null;
}

export const ORDERS = [
  {
    id: "ord_101",
    userId: "usr_1",
    customer: "Almaz",
    status: "preparing",
    total: 480,
    placedAt: new Date().toISOString(),
  },
  {
    id: "ord_102",
    userId: "usr_2",
    customer: "Dawit",
    status: "out_for_delivery",
    total: 800,
    placedAt: new Date().toISOString(),
  },
];

export async function getOrderById(id) {
  return (
    ORDERS.find((o) => o.id === id) || {
      id,
      userId: "usr_1",
      customer: "Guest",
      status: "preparing",
      total: 480,
      placedAt: new Date().toISOString(),
    }
  );
}
