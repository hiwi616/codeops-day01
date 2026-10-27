/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache Components ("use cache", cacheComponents: true) is the newer caching model that
  // create-next-app turns on by default in Next.js 16.4. The Day 36-40 reading sheets teach the
  // route-segment model instead (revalidate, dynamic, generateStaticParams, dynamicParams), and
  // those exports are NOT allowed while cacheComponents is on. So it is deliberately left off.
  // If you scaffold a fresh project with create-next-app, make sure cacheComponents is not enabled.
};

export default nextConfig;
