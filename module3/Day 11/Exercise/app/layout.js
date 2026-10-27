import "./globals.css";

export const metadata = {
  title: "Ethiopian Food Menu",
  description: "Next.js App Router practice project"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}