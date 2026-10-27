import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>The page or dish you requested does not exist.</p>
      <Link href="/menu">Back to Menu</Link>
    </div>
  );
}
