import React, { memo, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Autorization from "./pages/autorization";
import Contacts from "./pages/contacts";
import AuthContext from "./context/auth-context";

function Router() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (!authCtx.user) {
      navigate("/", { replace: true });
    }
  }, [authCtx.user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Autorization />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default memo(Router);
