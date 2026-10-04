// A placeholder shape shown by Suspense while a lazy-loaded route's code
// is still downloading, instead of a blank page or a spinner with no
// context about what's coming.
function PageSkeleton() {
  return (
    <main className="page-skeleton" aria-busy="true" aria-label="Loading page">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-block" />
    </main>
  );
}

export default PageSkeleton;
