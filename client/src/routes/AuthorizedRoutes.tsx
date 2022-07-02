import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from '../common-components/layout/MainLayout';

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
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MainLayout>
      )}
    </>
  );
};

export default AuthorizedRoutes;
