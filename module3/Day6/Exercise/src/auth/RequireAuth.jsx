import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any route element in <RequireAuth> to guard it. If the person
// isn't signed in, they're sent to /login, and the page they were
// trying to reach is remembered in location state so Login can send
// them back afterwards.
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
