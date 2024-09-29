import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

function Results() {
  const location = useLocation();
  const { airportName, currentLocation, tripTime } = location.state || {};

  const userName = 'almontejoshua2';

  // Ensure tripTime is a valid number, fallback to 0 if not
  const validTripTime = isNaN(Number(tripTime)) ? 0 : Number(tripTime); // Default to 0 if tripTime is invalid

  // Initialize live updates with placeholders
  const [liveUpdates, setLiveUpdates] = useState({
    'Check-in': `${validTripTime} minutes`, // Use valid tripTime
    'Baggage': '5-10 minutes', // Placeholder
    'Security Check': '24 minutes', // Placeholder
    'Immigration': '8-20 minutes', // Placeholder
    'To Gate': '5-20 minutes', // Placeholder
  });

  const [randomValues, setRandomValues] = useState([]);
  const [totalTime, setTotalTime] = useState('');

  // Function to generate a random integer between min and max
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to update the live updates with randomized values
  const updateLiveUpdates = () => {
    setLiveUpdates({
      'Check-in': `${validTripTime} minutes`,
      'Baggage': `${getRandomInt(5, 10)} minutes`, // Randomized between 5-10 minutes
      'Security Check': `${(getRandomInt(24, 24))} minutes`, // Security Check will remain as a static placeholder for now
      'Immigration': `${getRandomInt(8, 20)} minutes`, // Randomized between 8-20 minutes
      'To Gate': `${getRandomInt(5, 20)} minutes`, // Randomized between 5-20 minutes
    });
  };

  useEffect(() => {
    updateLiveUpdates(); // Update the live updates with random values
  }, [tripTime]); // Trigger when tripTime changes

  useEffect(() => {
    const generateRandomValues = () => {
      const ranges = [
        { time: [110, 130], people: [13, 18] },
        { time: [280, 330], people: [14, 18] },
        { time: [210, 260], people: [13, 17] },
      ];

      const results = ranges.map((range) => ({
        time: (Math.random() * (range.time[1] - range.time[0]) + range.time[0]).toFixed(2),
        people: (Math.random() * (range.people[1] - range.people[0]) + range.people[0]).toFixed(2),
      }));

      setRandomValues(results);
    };

    generateRandomValues();
  }, []);

  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAauVIY1eTqZxVgjYVrw38Ki-LJxqm6iFM&libraries=places`;
      script.async = true; // Ensure async is set to true
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => resolve(); // Resolve the promise when the script loads
      script.onerror = () => reject(new Error('Google Maps script failed to load'));
    });
  };

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 }, // Default location; can be set to the current location
      zoom: 10,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
      origin: currentLocation,
      destination: airportName,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);

        // Get the estimated travel time in minutes
        const travelDuration = result.routes[0].legs[0].duration.value; // Duration in seconds
        const travelDurationInMinutes = Math.floor(travelDuration / 60); // Convert to minutes
        
        // Update liveUpdates with the calculated travel time
        setLiveUpdates(prev => ({
          ...prev,
          'Check-in': `${validTripTime + travelDurationInMinutes} minutes`,
        }));

        // Calculate total time from live updates
        calculateTotalTime(validTripTime + travelDurationInMinutes); // Pass the calculated time to total calculation
      } else {
        console.error('Directions request failed due to ' + status);
        alert('Unable to find directions. Please check your input locations.');
      }
    });
  };

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        if (window.google && window.google.maps) {
          initMap(); // This will be called when the script has fully loaded
        } else {
          throw new Error('Google Maps is not available.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to load Google Maps. Please try again later.');
      });
  }, [airportName, currentLocation]);

  const calculateTotalTime = () => {
    // Parse time from liveUpdates
    const timeValues = Object.values(liveUpdates).map((time) => {
      const match = time.match(/(\d+)\s*minutes?/);
      return match ? parseInt(match[1], 10) : 0; // Convert minutes to integers
    });

    // Calculate total minutes
    const totalMinutes = timeValues.reduce((acc, curr) => acc + curr, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setTotalTime(`${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`);
  };

  useEffect(() => {
    // Recalculate total time whenever liveUpdates change or randomValues change
    if (randomValues.length > 0) {
      // Calculate average time of all videos in minutes
      const averageTime = randomValues.reduce((sum, value) => sum + (parseFloat(value.time) / 60), 0) / randomValues.length; // Average time in minutes
      const securityCheckTime = (averageTime * 3).toFixed(2); // Multiply average by 3 and convert to string
      setLiveUpdates(prev => ({
        ...prev,
        'Security Check': `${securityCheckTime} minutes`, // Update Security Check time
      }));
    }
  }, [randomValues]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar onPlusButtonClick={() => {}} />
      <div className="flex-1 relative p-6 space-y-6 overflow-y-auto ml-[80px] mt-[120px] w-full">
        <TopBar />
        <div className="flex w-full">
          <div className="w-1/2" style={{ height: '443px' }}>
            <div
              id="map"
              className="rounded-lg w-full h-full border border-gray-300 mb-6 transition-transform transform hover:scale-105 hover:shadow-lg mt-10"
            />
          </div>

          <div className="w-1/2 p-4 space-y-14 mt-6">
            <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg w-full transition-transform transform hover:scale-105 hover:shadow-lg">
              <h1 className="text-xl font-bold">
                Hi&nbsp;
                {userName.split('').map((letter, index) => (
                  <span key={index} className="inline-block">{letter}</span>
                ))}
                ,
              </h1>
              <p>
                The estimated time to get to your gate from your location is: <strong>{totalTime}</strong> →
              </p>
            </div>

            <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg w-full transition-transform transform hover:scale-105 hover:shadow-lg">
              <span className="text-green-400">● Live Updates</span>
              <ul className="list-disc pl-5">
                {Object.entries(liveUpdates).map(([key, value]) => (
                  <li key={key} className="py-1">
                    <div className="bg-gray-700 rounded-lg p-2 w-full transition-transform transform hover:scale-105 hover:shadow-lg">
                      {key}: {value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-[30px]">
          {randomValues.map((value, index) => (
            <div key={index} className="bg-gray-800 text-white rounded-lg p-4 shadow-lg w-full transition-transform transform hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold">Video: {`Video ${index + 1}`}</h2>
              <input
                type="text"
                value={`Estimated time: ${(parseFloat(value.time) / 60).toFixed(2)} minutes`}
                readOnly
                className="bg-transparent border-none w-full text-base font-inherit"
              />
              <input
                type="text"
                value={`People in frame: ${value.people}`}
                readOnly
                className="bg-transparent border-none w-full text-base font-inherit"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
