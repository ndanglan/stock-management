import React from 'react';
import { Avatar, Button, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { AuthState } from '../../stores/reducers/authReducer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { blue, cyan } from '@mui/material/colors';

interface IInfo {
  user?: AuthState['userProfile'];
  onLogout: () => void;
}

const Info = (props: IInfo) => {
  const { user, onLogout } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack spacing={1} direction="row" alignItems={'center'}>
        <Avatar>
          {user ? (
            <Avatar
              sx={{
                color: '#87805E',
                backgroundColor: '#EDDFB3',
              }}
            >
              {user?.username.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <PersonIcon color="primary" />
          )}
        </Avatar>
        <Button variant="text" onClick={handleClick}>
          <Typography color={'white'}>{user ? user?.username : 'Anonymous'}</Typography>
          <KeyboardArrowDownIcon
            sx={{
              color: 'white',
            }}
          />
        </Button>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user && (
          <MenuItem>
            <Stack spacing={2} direction="row" alignItems={'center'}>
              <Avatar>
                {user ? (
                  <Avatar
                    sx={{
                      color: '#87805E',
                      backgroundColor: '#EDDFB3',
                    }}
                  >
                    {user?.username.charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <PersonIcon />
                )}
              </Avatar>
              <div>
                <Typography
                  color={'black'}
                  sx={{
                    fontWeight: '500',
                    fontSize: '20px',
                  }}
                >
                  {' '}
                  {user ? user?.username : 'Anonymous'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#B09B71',
                  }}
                >
                  {user ? user?.email : 'No email available'}
                </Typography>
              </div>
            </Stack>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={onLogout}>
          <Stack spacing={2} direction={'row'}>
            <LogoutIcon color="primary" />
            <Typography color={'primary'}>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Info;
