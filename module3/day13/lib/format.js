// Plain helper, safe on both sides. Fixed locale so server and browser print the same text
// (a different locale would cause a hydration mismatch).
export function formatPrice(n) {
  return `${n.toLocaleString("en-US")} ETB`;
}
