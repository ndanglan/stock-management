
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "pages/non-auth/Login";

const NonAuthorizedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};

export default NonAuthorizedRoutes;