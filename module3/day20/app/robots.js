export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu", "/menu/*"],
      disallow: ["/checkout", "/orders/*", "/kitchen", "/signin", "/api/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
