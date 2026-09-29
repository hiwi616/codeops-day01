import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import PageSkeleton from "./PageSkeleton";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Checkout and Receipt are code-split: their JS isn't downloaded until
// the person actually navigates to one of these routes, instead of
// being bundled into the same chunk as Home/Menu that everyone loads on
// their very first visit. React.lazy returns a component that suspends
// (throws a promise) while its chunk is loading - Suspense is what
// catches that and shows PageSkeleton in the meantime.
const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));

// No <CartProvider> here anymore. The cart now lives in a zustand store
// (src/store/cartStore.js), which needs no provider at all - any
// component can import useCartStore (or one of the narrow selector
// hooks) directly, whether it's inside this tree or not. Theme and auth
// are unrelated to that change and are still ordinary Context providers.
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="checkout"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  </Suspense>
                }
              />
              <Route
                path="receipt"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Receipt />
                  </Suspense>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
