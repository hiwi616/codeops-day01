import Header from "./Header";
import Menu from "./Menu";
import Cart from "./Cart";
import OrderForm from "./OrderForm";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

// Reads the theme from context and applies it as a class on the
// outermost element, so the CSS in index.css can key off it.
function Shell() {
  const { theme } = useTheme();

  return (
    <div className={`app app-${theme}`}>
      <Header />
      <Menu />
      <Cart />
      <OrderForm />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Shell />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
