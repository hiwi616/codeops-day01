"use client";

export default function MenuError({ error, reset }) {
  return (
    <div>
      <h2>Could not load dishes</h2>
      <p>{error.message || "An error occurred."}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
