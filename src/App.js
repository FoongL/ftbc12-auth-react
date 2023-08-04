import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// importing pages

import TokenAuth from "./pages/tokenAuth";
import Auth0 from "./pages/auth0";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")} style={{ margin: "5px" }}>
        Tokens
      </button>
      <button onClick={() => navigate("/oauth")} style={{ margin: "5px" }}>
        OAuth
      </button>
      <Routes>
        <Route path="/" element={<TokenAuth />} />
        <Route path="/oauth" element={<Auth0 />} />
      </Routes>
    </div>
  );
}

export default App;
