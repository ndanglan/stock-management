import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from 'pages/home/Home';

interface IProps {
  isAuthenticated: boolean;
}

const AuthorizedRoutes: React.FC<IProps> = ({ isAuthenticated = false }) => {
  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AuthorizedRoutes;
