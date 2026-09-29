import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // RequireAuth stashed the page the person was headed to in
  // location.state.from; fall back to /checkout if it's missing
  // (e.g. someone opened /login directly).
  const from = location.state?.from?.pathname || "/checkout";

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  };

  return (
    <main className="page-login">
      <form className="order-form" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <p className="hint">
          Placeholder sign-in for this exercise: submitting marks you as
          signed in and sends you back to {from}.
        </p>
        <button type="submit" className="submit-btn">
          Sign in
        </button>
      </form>
    </main>
  );
}

export default Login;
