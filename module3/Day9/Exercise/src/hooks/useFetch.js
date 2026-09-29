import { useState, useEffect } from "react";

// Generic fetch hook, extracted from the fetching logic that used to
// live inline in Menu (Day 29 / Day 4). `url` and `deps` work together:
// pass the values the fetch depends on in `deps`, the same way you'd
// build a useEffect dependency array, and the hook refetches when they change.
export function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Request failed (error ${res.status}).`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
