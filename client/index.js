import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const appElement = createRoot(document.getElementById('app'));

appElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);