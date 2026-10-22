"use client";

import { useRouter } from "next/navigation";

export default function MenuButton() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/cart")}>
      Go to Cart
    </button>
  );
}