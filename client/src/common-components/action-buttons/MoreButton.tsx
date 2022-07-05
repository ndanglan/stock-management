import React from 'react';
import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IMoreButton {
  menuItems: JSX.Element[];
}

const MoreButton = (props: IMoreButton) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {props.menuItems}
      </Menu>
    </>
  );
};

export default MoreButton;
