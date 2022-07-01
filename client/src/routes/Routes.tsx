import React from 'react';

import AuthorizedRoutes from './AuthorizedRoutes';
import NonAuthorizedRoutes from './NonAuthorizedRoutes';

const Routes: React.FC = () => {
  return (
    <>
      <NonAuthorizedRoutes />
      <AuthorizedRoutes isAuthenticated={false} />
    </>
  );
};

export default Routes;
