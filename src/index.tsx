import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

import { AppRoutes } from './components';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <AppRoutes />
  </ThemeProvider>,
);
