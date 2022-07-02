import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stores/reducers';

import AuthorizedRoutes from './AuthorizedRoutes';
import NonAuthorizedRoutes from './NonAuthorizedRoutes';

const Routes: React.FC = () => {
  const auth = useSelector((state: AppState) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.userProfile?.accessToken) {
      setIsAuthenticated(true);
      return;
    }

    setIsAuthenticated(false);
  }, [auth]);
  return (
    <>
      <NonAuthorizedRoutes isAuthenticated={isAuthenticated} />
      <AuthorizedRoutes isAuthenticated={isAuthenticated} />
    </>
  );
};

export default Routes;
