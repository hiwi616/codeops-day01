import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page-notfound">
      <h2>Page not found</h2>
      <p>There's no page at this address.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}

export default NotFound;
