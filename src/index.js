import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './styles/styledComponentsMUI';

import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
