// Dashboard.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const username = user.email.split('@')[0];
  const airportInputRef = useRef(null); // Reference for the airport input
  const locationInputRef = useRef(null); // Reference for the current location input

  const handlePlusButtonClick = () => {
    navigate('/dashboard');
  };

  const handleCalculateClick = () => {
    // Collect values from inputs
    const airportName = airportInputRef.current.value;
    const currentLocation = locationInputRef.current.value;

    // Navigate to Results page with the input values
    navigate('/results', {
      state: {
        airportName,
        currentLocation,
      },
    });
  };

  // Load Google Maps script with Places API
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const initAutocomplete = () => {
      // Initialize Autocomplete for airport input
      const airportInput = airportInputRef.current;
      const airportAutocomplete = new window.google.maps.places.Autocomplete(airportInput);
      
      // Add listener to handle place selection for airport
      airportAutocomplete.addListener('place_changed', () => {
        const place = airportAutocomplete.getPlace();
        console.log('Selected airport:', place);
      });

      // Initialize Autocomplete for location input
      const locationInput = locationInputRef.current;
      const locationAutocomplete = new window.google.maps.places.Autocomplete(locationInput);
      
      // Add listener to handle place selection for location
      locationAutocomplete.addListener('place_changed', () => {
        const place = locationAutocomplete.getPlace();
        console.log('Selected location:', place);
      });
    };

    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyAauVIY1eTqZxVgjYVrw38Ki-LJxqm6iFM&libraries=places`)
      .then(() => {
        if (window.google) {
          initAutocomplete();
        }
      });
  }, []);

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
            ref={airportInputRef}
          />
          <input
            type="text"
            placeholder="Enter your current location"
            className="input-field"
            ref={locationInputRef}
          />
          <input
            type="text"
            placeholder="Enter your gate number"
            className="input-field"
          />
          <button className="calculate-button" onClick={handleCalculateClick}>
            Calculate
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
