import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <Routes>
            {/* Layout renders the header/nav/footer once, and an Outlet
                for whichever of these nested routes matches. */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="menu/:id" element={<DishPage />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <CheckoutPage />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
