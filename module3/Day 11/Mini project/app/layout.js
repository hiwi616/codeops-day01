import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover Ethiopian food with Addis Eats"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}