import CartView from "@/components/CartView";

// Day 37 had "use client" on this whole page. Pushed down: the page is a server component
// and only CartView (which reads the cart store) runs in the browser.
export default function CartPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-green-900">Your cart</h1>
      <CartView />
    </main>
  );
}
