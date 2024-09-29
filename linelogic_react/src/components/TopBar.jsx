// components/TopBar.jsx
import React from 'react';
import { useLogoutFunction } from "@propelauth/react";
import LLLogo from '../assets/LL-colored.png'; 

const TopBar = () => {
    const logout = useLogoutFunction(); // Get the logout function

  const handleLogout = async () => {
    await logout(); // Log the user out
    window.location.href = '/'; // Redirect to the landing page
  };

  return (
  <div className="top-bar">
    <div className="logo-container"> {/* Added a container for styling if needed */}
    <img src={LLLogo} alt="LineLogic Logo" className="logo" /> {/* Logo image */}
    </div>
    <div className="top-bar-container">
      <div className="menu">
        <div className="item">
          <a href="#" className="link">
            <span> Settings </span>
            <svg viewBox="0 0 360 360" xmlSpace="preserve">
              <g id="SVGRepo_iconCarrier">
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                ></path>
              </g>
            </svg>
          </a>
          <div className="submenu">
            <div className="submenu-item">
              <a href="#" className="submenu-link">Profile details</a>
            </div>
            <div className="submenu-item">
              <a href="#" className="submenu-link">Notifications</a>
            </div>
            <div className="submenu-item">
            <button onClick={handleLogout} className="submenu-link">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default TopBar;