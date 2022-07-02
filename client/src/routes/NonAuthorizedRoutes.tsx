import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from 'pages/non-auth/Login';
import PureLayout from '../common-components/layout/PureLayout';
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
    <PureLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </PureLayout>
  );
};

export default NonAuthorizedRoutes;
