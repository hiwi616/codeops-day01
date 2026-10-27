"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";

// CLIENT shell that WRAPS server content. It never imports DishList - the server renders
// DishList first and passes the finished result in as `children`.
export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");
  return (
    <div data-filter={selected}>
      <CategoryBar categories={categories} selected={selected} onSelect={setSelected} />
      {children}
    </div>
  );
}
