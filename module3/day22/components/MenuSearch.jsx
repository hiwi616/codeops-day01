"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function MenuSearch() {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, 300);

  // null key when empty prevents fetching for empty input
  const { data: results, isValidating } = useSWR(
    debounced.trim()
      ? `/api/dishes?q=${encodeURIComponent(debounced.trim())}`
      : null,
    fetcher,
    { keepPreviousData: true },
  );

  return (
    <div className="mb-8">
      <label
        htmlFor="search"
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        Search the Menu:
      </label>
      <div className="relative max-w-md">
        <input
          id="search"
          type="search"
          placeholder="Search dishes (e.g. Tibs, Wat)..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        {isValidating && (
          <span className="absolute right-3 top-2.5 text-xs text-slate-400">
            Searching...
          </span>
        )}
      </div>

      {results && (
        <ul className="mt-3 max-w-md bg-white border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-100">
          {results.length === 0 ? (
            <li className="p-3 text-sm text-slate-500">
              No dishes matching &quot;{debounced}&quot;
            </li>
          ) : (
            results.map((dish) => (
              <li
                key={dish.id}
                className="p-3 hover:bg-slate-50 transition-colors"
              >
                <Link
                  href={`/menu/${dish.id}`}
                  className="text-blue-600 font-medium block"
                >
                  {dish.name} &mdash;{" "}
                  <span className="text-slate-800 font-semibold">
                    {dish.price} ETB
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
