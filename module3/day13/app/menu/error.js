"use client"; // error boundaries need state + a click handler (see Day 38)

export default function MenuError({ error, reset }) {
  return (
    <main role="alert" className="rounded border border-red-300 bg-red-50 p-6">
      <h1 className="text-xl font-bold text-red-900">The menu could not load</h1>
      <p className="mt-1 text-sm text-red-800">{error.message}</p>
      <button onClick={() => reset()} className="mt-4 rounded bg-red-800 px-4 py-2 text-sm text-white">
        Try again
      </button>
    </main>
  );
}
