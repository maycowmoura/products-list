import React from 'react';
import ReactDOM from 'react-dom';
import { MainContextProvider } from './contexts/MainContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
