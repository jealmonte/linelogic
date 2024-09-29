// components/TopBar.jsx
import React from 'react';
import { useLogoutFunction } from "@propelauth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons'; 
import LLLogo from '../assets/LL-colored.png'; 

const TopBar = () => {
    const logout = useLogoutFunction();

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    const handleNotificationPrompt = () => {
        Notification.requestPermission()
            .then((permission) => {
                if (permission === "granted") {
                    alert("Notifications enabled!");
                } else {
                    alert("Notifications disabled.");
                }
            });
    };

    return (
        <div className="top-bar flex items-center">
            <div className="logo-container">
                <img src={LLLogo} alt="LineLogic Logo" className="logo" />
            </div>
            <div className="top-bar-container flex items-center ml-auto">
                <button 
                    onClick={handleNotificationPrompt} 
                    className="notification-button flex items-center justify-center mr-4 bg-transparent p-0 w-10 h-12 mt-2 hover:bg-gray-600 rounded-full transition" 
                    aria-label="Notifications"
                >
                    <FontAwesomeIcon 
                        icon={faBell} 
                        className="text-white text-2xl" // No need for vertical margin adjustment here
                    />
                </button>
                <div className="menu relative">
                    <div className="item">
                        <a href="#" className="link">
                            <span> Settings </span>
                            <svg viewBox="0 0 360 360" xmlSpace="preserve">
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        id="XMLID_225_"
                                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                    ></path>
                                </g>
                            </svg>
                        </a>
                        <div className="submenu bg-gray-800">
                            <div className="submenu-item">
                                <a href="#" className="submenu-link">Profile details</a>
                            </div>
                            <div className="submenu-item">
                                <a onClick={handleLogout} className="submenu-link cursor-pointer">Log out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
