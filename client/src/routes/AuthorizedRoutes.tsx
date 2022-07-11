import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../common-components/layout/MainLayout';

interface IProps {
  isAuthenticated: boolean;
  children: any;
}

const AuthorizedRoutes = ({ isAuthenticated = false, children }: IProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{isAuthenticated && <MainLayout>{children}</MainLayout>}</>;
};

export default AuthorizedRoutes;
