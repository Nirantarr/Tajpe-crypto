// src/main.jsx - THE CORRECT VERSION

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Router is here
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This is the one and only Router for the entire application */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

