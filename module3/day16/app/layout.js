import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Addis Eats",
  description: "Food ordering application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Addis Eats
          </Link>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <Providers>
          <main style={{ padding: "2rem" }}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
