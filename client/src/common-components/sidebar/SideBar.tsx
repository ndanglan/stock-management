import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText, styled } from '@mui/material';
import { drawerWidth } from '../layout/MainLayout';
import { DataTableConfig } from '../../utilities/constants';

interface ISideBar {
  isOpen: boolean;
  onClick: (name: string) => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SideBar = (props: ISideBar) => {
  const { isOpen, onClick } = props;
  const [selectedItem, setSelectedItem] = useState(0);

  const handleChangeItem = (index: number, name: string) => {
    setSelectedItem(index);
    onClick(name);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        overflowX: 'hidden',
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      <DrawerHeader />
      <List>
        {Object.keys(DataTableConfig).map((text, index) => (
          <ListItemButton
            onClick={(e) => {
              handleChangeItem(index, DataTableConfig[text].value);
            }}
            key={index}
            selected={index === selectedItem}
          >
            <ListItemText primary={DataTableConfig[text].title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
