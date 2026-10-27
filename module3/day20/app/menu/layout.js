export default function MenuLayout({ children }) {
  return (
    <section>
      <aside style={{ marginBottom: "1rem", color: "#666" }}>
        <small>Addis Eats Daily Menu — Hourly Revalidation</small>
      </aside>
      {children}
    </section>
  );
}
