import React from 'react';

import AuthorizedRoutes from './AuthorizedRoutes';
import NonAuthorizedRoutes from './NonAuthorizedRoutes';

const Routes: React.FC = () => {
  const isAuthenticate = false;
  return (
    <>
      <NonAuthorizedRoutes />
      <AuthorizedRoutes isAuthenticated={isAuthenticate} />
    </>
  );
};

export default Routes;
