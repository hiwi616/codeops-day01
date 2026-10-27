// After `npm run build`: searches the JavaScript the browser downloads for secrets.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const needles = ["sk_live_", "sk_test_", "TELEBIRR_SECRET", "DATABASE_URL", ...process.argv.slice(2)];
const found = [];
function walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".js")) {
      const text = readFileSync(p, "utf8");
      for (const needle of needles) if (text.includes(needle)) found.push(`${needle}  in  ${p}`);
    }
  }
}
walk(".next/static");
console.log(found.length ? "SECRETS FOUND:\n" + found.join("\n") : "Clean: nothing sensitive in .next/static");
process.exit(found.length ? 1 : 0);
