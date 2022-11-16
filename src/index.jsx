import React from 'react';
import { Amplify } from 'aws-amplify';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import App from './pages/App';
import { theme } from './theme';

import reportWebVitals from './reportWebVitals';
import { store } from './storage/store';
import awsExports from './aws-exports';
import './index.css';

Amplify.configure(awsExports);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
