import React from 'react';
import ReactDOM from 'react-dom';
import ApolloProvider from './apollo/Provider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './components/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f97a9',
      main: '#16697a',
      dark: '#003e4e',
      contrastText: '#eaeaea',
    },
    secondary: {
      light: '#ffff8f',
      main: '#e5ed5d',
      dark: '#b0bb28',
      contrastText: '#141414',
    },
  },
});

ReactDOM.render(
  <ApolloProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
  , document.getElementById('root')
);
