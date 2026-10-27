import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Addis Eats",
  description: "Order Ethiopian food online",
};

// The ROOT layout is mandatory: it is the only place <html> and <body> exist,
// and the only place global CSS is imported.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
        <Header />
        <div className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
