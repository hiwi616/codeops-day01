import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Wrap any route element in <RequireAuth> to guard it.
//
// isLoading matters here: on the very first render after a refresh, we
// don't yet know whether the person is signed in (AuthContext is still
// checking localStorage). If we redirected to /login immediately, anyone
// who refreshes /checkout while signed in would get bounced to the login
// screen for a split second, or worse, get sent there and stay there.
// So RequireAuth waits for isLoading to finish before it decides anything.
function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <p className="status" role="status">
        <span className="spinner" aria-hidden="true" /> Checking your session...
      </p>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
