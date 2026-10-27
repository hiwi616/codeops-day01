import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Addis Eats",
  description: "Order Ethiopian food online",
};

// Stays a SERVER component. The client Providers receive server-rendered
// Header / page / Footer as `children`, so none of them join the client bundle.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
        <Providers>
          <Header />
          <div className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
