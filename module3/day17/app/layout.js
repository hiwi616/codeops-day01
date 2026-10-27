import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import { getSession } from "@/lib/session";
import { signOut } from "@/app/auth-actions";

export const metadata = {
  title: "Addis Eats",
  description: "Food ordering application",
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200">
          <Link href="/" className="font-bold text-xl text-blue-900">
            Addis Eats
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link href="/menu" className="hover:text-blue-600">
              Menu
            </Link>
            <Link href="/cart" className="hover:text-blue-600">
              Cart
            </Link>
            <Link href="/checkout" className="hover:text-blue-600">
              Checkout
            </Link>
            {user?.role === "staff" && (
              <Link
                href="/kitchen"
                className="text-amber-700 font-bold hover:text-amber-800"
              >
                Kitchen
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
                <span className="text-slate-600 font-normal">
                  Hi, {user.name}
                </span>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-red-600 hover:underline"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </nav>
        </header>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
