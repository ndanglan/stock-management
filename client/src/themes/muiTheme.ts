import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#536dfe',
    },
    secondary: {
      main: '#8fa0fe',
    },
    error: {
      main: '#ff5c93',
    },
    success: {
      main: '#3cd4a0',
    },
    warning: {
      main: '#ffc260',
    },

    text: {
      primary: '#4a4b51',
      disabled: '#b9b9b9',
      secondary: '#8fa0fe',
    },
  } as any,
});
