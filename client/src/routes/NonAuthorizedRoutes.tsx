import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from 'pages/non-auth/Login';
interface INonAuthorizedRoutes {
  isAuthenticated: boolean;
}
const NonAuthorizedRoutes = (props: INonAuthorizedRoutes) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate('/');
    }
  }, [props.isAuthenticated]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default NonAuthorizedRoutes;
