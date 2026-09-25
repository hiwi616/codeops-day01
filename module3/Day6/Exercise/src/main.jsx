import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter goes outside App, so every route below can use
        routing hooks (useNavigate, useParams, useSearchParams, ...). */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
