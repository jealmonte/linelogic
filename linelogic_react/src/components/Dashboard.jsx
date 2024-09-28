// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const username = user.email.split('@')[0];

  const handlePlusButtonClick = () => {
    navigate('/dashboard');
  };

  const handleCalculateClick = () => {
    navigate('/evaluation');
  };

  return (
    <>
      <TopBar />
      <Sidebar onPlusButtonClick={handlePlusButtonClick} />
      <div className="main-content">
        <h1>
          <div className="greeting font-bold">
            Hi&nbsp;
            {username.split('').map((letter, index) => (
              <span key={index} className="username-letter">
                {letter}
              </span>
            ))}
            ,
          </div>
        </h1>
        <p>Estimate your security time by entering your flight info here:</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your airport name"
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter your gate number"
            className="input-field"
          />
          <button className="calculate-button" onClick={handleCalculateClick}>Calculate</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;