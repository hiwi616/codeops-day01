import Link from "next/link";
import { CATEGORIES } from "@/lib/dishes";

// Wraps /menu and /menu/[id]. Renders instantly (no data), so the sidebar
// is on screen before any dish arrives.
export default function MenuLayout({ children }) {
  return (
    <div className="grid gap-8 md:grid-cols-[13rem_1fr]">
      <aside aria-label="Menu categories">
        <h2 className="font-bold text-green-900">Categories</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <Link href="/menu" className="underline">
              All dishes
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c} className="text-stone-700">
              {c}
            </li>
          ))}
        </ul>
      </aside>
      <section>{children}</section>
    </div>
  );
}
