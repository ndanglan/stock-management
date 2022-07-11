import React, { useEffect } from 'react';
import { IconButton, Menu, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IMoreButton {
  menuItems: JSX.Element[];
}

const MoreButton = (props: IMoreButton) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <IconButton onClick={handleClick} aria-describedby={id}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Menu open={open} anchorEl={anchorEl} onClick={handleClose}>
          {props.menuItems}
        </Menu>
      </Popover>
    </>
  );
};

export default MoreButton;
