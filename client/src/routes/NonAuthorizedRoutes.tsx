import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/non-auth/Login';
interface IProps {
  isAuthenticated: boolean;
}
const NonAuthorizedRoutes = ({ isAuthenticated = true }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default NonAuthorizedRoutes;
