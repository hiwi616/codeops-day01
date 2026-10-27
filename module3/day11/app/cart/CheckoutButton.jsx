"use client"; // useRouter is a hook, so this must be a client component

import { useRouter } from "next/navigation"; // never "next/router" on the app router

export default function CheckoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/checkout")}
      className="rounded bg-green-800 px-4 py-2 text-sm text-white"
    >
      Go to checkout (router.push)
    </button>
  );
}
