// Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import orgBtn from '../assets/org_btn.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const handlePlusButtonClick = () => {
    navigate('/dashboard'); // Navigate to the dashboard
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="button-container">
          <button
            className="plus-button bg-630031 hover:bg-CF4420 text-4xl text-black p-1 rounded-3xl flex justify-center items-center w-30 h-30 mb-6"
            onClick={handlePlusButtonClick}
          >
            +
          </button>
          <span className="button-label">New</span>
        </div>
        <div className="button-container">
          <button className="image-button">
            <img src={orgBtn} alt="Icon" />
          </button>
          <span className="button-label">Demo</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;