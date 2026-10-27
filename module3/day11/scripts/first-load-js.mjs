// "First Load JS" for a route = the JavaScript the browser downloads on first load.
// Next.js 16 no longer prints it in `next build`, so measure it directly:
//   npm run build && npm start        (in one terminal)
//   npm run first-load-js -- /menu     (in another)
// Use the SAME method for before and after so the numbers are comparable.
import { gzipSync } from "node:zlib";

const path = process.argv[2] ?? "/";
const base = process.argv[3] ?? "http://localhost:3000";

const html = await (await fetch(new URL(path, base))).text();
const urls = new Set();
for (const m of html.matchAll(/<script[^>]*\ssrc=["']([^"']+)["']/g)) urls.add(m[1]);
for (const m of html.matchAll(/<link[^>]*rel=["']preload["'][^>]*as=["']script["'][^>]*href=["']([^"']+)["']/g)) urls.add(m[1]);
for (const m of html.matchAll(/<link[^>]*href=["']([^"']+\.js[^"']*)["'][^>]*as=["']script["']/g)) urls.add(m[1]);

let raw = 0, gz = 0;
const rows = [];
for (const u of urls) {
  const buf = Buffer.from(await (await fetch(new URL(u, base))).arrayBuffer());
  const g = gzipSync(buf).length;
  raw += buf.length; gz += g;
  rows.push([u.split("/").pop().slice(0, 48), (buf.length / 1024).toFixed(1), (g / 1024).toFixed(1)]);
}
console.table(rows.map(([file, kb, gzkb]) => ({ file, "kB": kb, "kB gzip": gzkb })));
console.log(`${path}: ${urls.size} script file(s), ${(raw / 1024).toFixed(1)} kB raw, ${(gz / 1024).toFixed(1)} kB gzip  <- First Load JS`);
