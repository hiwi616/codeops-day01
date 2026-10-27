import Link from "next/link";

// Route: /
export default function HomePage() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-green-900">Addis Eats</h1>
      <p className="mt-2 max-w-prose">
        Kitfo, shiro and fresh buna, delivered across Addis. This is the Day 36
        build: the whole route tree comes from folders.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/menu" className="rounded bg-green-800 px-4 py-2 text-white">
          See the menu
        </Link>
        <Link href="/menu/kitfo" className="rounded border border-green-800 px-4 py-2">
          Open a dish (/menu/kitfo)
        </Link>
        {/* A path nobody claimed - renders the root not-found.js */}
        <Link href="/does-not-exist" className="rounded border border-stone-400 px-4 py-2">
          Test a bad URL
        </Link>
      </div>
    </main>
  );
}
