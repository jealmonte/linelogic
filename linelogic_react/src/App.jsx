// App.jsx
import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Evaluation from './components/Evaluation';
import Results from './components/Results'; // Import the Results component
import { withAuthInfo } from "@propelauth/react";
import { Routes, Route, Navigate } from 'react-router-dom';

function App({ isLoggedIn, user }) {
  return (
    <div id="root">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/evaluation" element={isLoggedIn ? <Evaluation /> : <Navigate to="/" />} />
        <Route path="/results" element={isLoggedIn ? <Results /> : <Navigate to="/" />} /> // Add a new Route for the Results component
      </Routes>
    </div>
  );
}

export default withAuthInfo(App);