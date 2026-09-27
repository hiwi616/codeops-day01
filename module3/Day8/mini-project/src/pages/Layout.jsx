import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import CartBadge from "../CartBadge";

function navClass({ isActive }) {
  return isActive ? "nav-link nav-link-active" : "nav-link";
}

function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1>
            Addis Eats <CartBadge />
          </h1>
          <ThemeToggle />
        </div>
        <nav className="nav">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navClass}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={navClass}>
            Checkout
          </NavLink>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <p>Addis Eats - a CodeOps practice project.</p>
      </footer>
    </div>
  );
}

export default Layout;
