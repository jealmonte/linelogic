import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "@propelauth/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const authUrl = "https://166792692.propelauthtest.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider authUrl={authUrl}>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);