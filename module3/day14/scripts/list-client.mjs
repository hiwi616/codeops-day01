// Lists every file that carries the "use client" directive (exercise 3 / check yourself).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components", "lib"];
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(js|jsx)$/.test(name)) {
      const head = readFileSync(p, "utf8").split("\n").slice(0, 3).join("\n");
      if (/^\s*["']use client["']/m.test(head)) hits.push(p);
    }
  }
}
for (const r of roots) {
  try { walk(r); } catch {}
}
console.log(hits.sort().join("\n"));
console.log(`\n${hits.length} file(s) with "use client"`);
