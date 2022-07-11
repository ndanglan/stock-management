import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from 'pages/non-auth/Login';
interface INonAuthorizedRoutes {
  isAuthenticated: boolean;
  children: any;
}
const NonAuthorizedRoutes = (props: INonAuthorizedRoutes) => {
  if (props.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{props.children}</>;
};

export default NonAuthorizedRoutes;
