// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
        Today&apos;s Specials at Addis Eats
      </h1>
      <p className="mt-3 text-slate-600 text-lg">
        Authentic Ethiopian dishes delivered fresh across the city.
      </p>
      <Link
        href="/menu"
        className="inline-block mt-6 px-6 py-3 bg-[#1B4D8E] hover:bg-blue-800 text-white font-medium rounded transition-colors shadow-sm"
      >
        View Full Menu
      </Link>
    </div>
  );
}
