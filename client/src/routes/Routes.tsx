import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stores/reducers';
import { Route, Routes as Router } from 'react-router-dom';
import AuthorizedRoutes from './AuthorizedRoutes';
import NonAuthorizedRoutes from './NonAuthorizedRoutes';
import LoginPage from '../pages/non-auth/Login';
import { mainRoutes } from './constants';

const Home = React.lazy(() => import('pages/home/Home'));

const Routes = () => {
  const auth = useSelector((state: AppState) => state.auth);

  return (
    <Router>
      <Route
        path={mainRoutes.Login}
        element={
          <NonAuthorizedRoutes isAuthenticated={auth.userProfile?.accessToken}>
            <LoginPage />
          </NonAuthorizedRoutes>
        }
      />
      <Route
        path={mainRoutes.All}
        element={
          <AuthorizedRoutes isAuthenticated={auth.userProfile?.accessToken}>
            <Home />
          </AuthorizedRoutes>
        }
      />
    </Router>
  );
};

export default Routes;
