import { Container, CssBaseline, Stack, styled } from '@mui/material';
import React, { ReactNode, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutAction } from '../../stores/actions/authActions';
import { AppState } from '../../stores/reducers';
import Navbar from '../nav/Navbar';
import SideBar from '../sidebar/SideBar';

export const drawerWidth = 240;
interface IMainLayout {
  children: ReactNode;
}

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}px`,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const MainLayout = (props: IMainLayout) => {
  const user = useSelector((state: AppState) => state.auth.userProfile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logOutAction());
  }, [dispatch]);

  const handleClick = (name: string) => {
    navigate(`/${name}`);
  };

  return (
    <Container maxWidth="xl" disableGutters={true}>
      <CssBaseline />
      <div>
        <SideBar isOpen={open} onClick={handleClick} />
        <Navbar toggleDrawer={toggleDrawer} user={user} onLogout={handleLogout} />
      </div>
      <Main open={open}>{props.children}</Main>
    </Container>
  );
};

export default MainLayout;
