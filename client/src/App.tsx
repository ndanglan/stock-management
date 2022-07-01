import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Routes from 'routes/Routes';
import { screenResize } from './stores/actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(screenResize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
  return (
    <div className="container vw-100">
      <Routes />
    </div>
  );
};

export default App;
