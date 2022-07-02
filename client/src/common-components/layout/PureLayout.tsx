import { Container } from '@mui/material';
import React, { ReactNode } from 'react';

interface IPureLayout {
  children: ReactNode;
}

const PureLayout = (props: IPureLayout) => {
  return <Container maxWidth="lg">{props.children}</Container>;
};

export default PureLayout;
