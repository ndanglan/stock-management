import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const Home = React.lazy(() => import('pages/home/Home'));
interface IProps {
  isAuthenticated: boolean;
}

const AuthorizedRoutes = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </>
  );
};

export default AuthorizedRoutes;
