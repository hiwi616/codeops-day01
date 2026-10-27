import Link from "next/link";

// Rendered for a path nobody claimed AND whenever notFound() is called.
export default function NotFound() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Nothing here</h1>
      <p className="mt-2">That page or dish does not exist.</p>
      <Link href="/menu" className="mt-4 inline-block underline">
        Back to the menu
      </Link>
    </main>
  );
}
