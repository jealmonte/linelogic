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
            className="plus-button bg-[var(--tw-color-300)] hover:bg-maroon-300 text-4xl text-black p-1 rounded-3xl flex justify-center items-center w-20 h-30 mb-6 !important"
            onClick={handlePlusButtonClick}
          >
            +
          </button>
          <span className="button-label font-helvetica">New</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;