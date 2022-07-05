import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { JsxElement } from 'typescript';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  color?: any;
  disable?: boolean;
}

export const PrimaryButton = (props: Props) => {
  const { disable = false } = props;
  return (
    <Button disabled={disable} variant="contained" color="primary" onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export const SecondaryButton = (props: Props) => {
  const { disable = false } = props;
  return (
    <Button disabled={disable} variant="outlined" color={props.color || 'primary'} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};
