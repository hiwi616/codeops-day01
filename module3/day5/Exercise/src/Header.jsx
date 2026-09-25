import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="header">
      <h1>Addis Eats</h1>
      <p>Ethiopian dishes, made fresh</p>
      <ThemeToggle />
    </header>
  );
}

export default Header;
