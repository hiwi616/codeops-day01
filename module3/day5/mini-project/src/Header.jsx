import ThemeToggle from "./ThemeToggle";
import CartBadge from "./CartBadge";

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <h1>
          Addis Eats <CartBadge />
        </h1>
        <ThemeToggle />
      </div>
      <p>Ethiopian dishes, made fresh</p>
    </header>
  );
}

export default Header;
