import React, { memo } from 'react';
import { IconButton, styled, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react';
import Info from './Info';
import { AuthState } from '../../stores/reducers/authReducer';
import { cyan } from '@mui/material/colors';
interface INavbar {
  toggleDrawer: () => void;
  user?: AuthState['userProfile'];
  onLogout: () => void;
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, color }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: color,
}));

const Navbar = (props: INavbar) => {
  const { toggleDrawer, user, onLogout } = props;
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stock management
        </Typography>
        <Info user={user} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
