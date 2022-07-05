import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'stores';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
const { store, persistor } = configureStore();
import { theme } from './themes/muiTheme';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              autoHideDuration={1000}
              maxSnack={5}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
