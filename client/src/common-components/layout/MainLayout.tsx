import { Container } from '@mui/material';
import React, { ReactNode } from 'react';
import Navbar from '../nav/Navbar';

interface IMainLayout {
  children: ReactNode;
}

const MainLayout = (props: IMainLayout) => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      {props.children}
    </Container>
  );
};

export default MainLayout;
