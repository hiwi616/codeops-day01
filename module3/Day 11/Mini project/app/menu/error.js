"use client";

export default function MenuError({ error, reset }) {
  return (
    <main>
      <h1>Menu could not load</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
      <button type="button" onClick={() => reset()}>Try again</button>
    </main>
  );
}