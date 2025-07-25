import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppContext';
import App from './App';
import './index.css';
import axios from "axios";
axios.defaults.baseURL = "https://emi-calculator-nkdk.onrender.com/";
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
