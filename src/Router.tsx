import React from "react";
import { Route, Routes } from "react-router-dom";
import Autorization from "./pages/autorization";
import Contacts from "./pages/contacts";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Autorization />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default Router;
