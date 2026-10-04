import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page-home">
      <h2>Welcome to Addis Eats</h2>
      <p>Ethiopian dishes, made fresh and delivered around Addis Ababa.</p>
      <Link to="/menu" className="cta-link">
        Browse the menu
      </Link>
    </main>
  );
}

export default Home;
